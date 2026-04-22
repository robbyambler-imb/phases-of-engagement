import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  phases,
  getPhase,
  phaseDecisionTree,
  accelerators,
  getAccelerator,
  missionaryTask,
  getTaskComponentsForPhase,
  guardrails,
  getGuardrailsForAccelerator,
} from "../data/index.js";

export function registerTools(server: McpServer) {
  // ─── assess_phase ──────────────────────────────────────────────────────────
  server.tool(
    "assess_phase",
    {
      answers: z
        .array(
          z.object({
            questionIndex: z.number().describe("Index of the decision tree question (0-based)"),
            answer: z.enum(["yes", "no", "unsure"]),
            evidence: z.string().optional().describe("Field evidence supporting this answer"),
          })
        )
        .optional()
        .describe("Answers to the sequential phase criteria questions"),
      dataAgeYears: z
        .number()
        .optional()
        .describe("How old (in years) is the most recent data? Used to flag 0-R"),
      getQuestions: z
        .boolean()
        .optional()
        .describe("If true, return the decision tree questions without assessing a phase"),
    },
    async ({ answers, dataAgeYears, getQuestions }) => {
      if (getQuestions) {
        const questions = phaseDecisionTree.map((q, i) => `${i + 1}. ${q.question}`).join("\n");
        return {
          content: [
            {
              type: "text" as const,
              text: `## Phase Assessment Decision Tree\n\nAnswer these questions sequentially. Stop at the first "no." The highest "yes" determines the phase.\n\n${questions}\n\n**Note:** If prior data is more than 3 years old and no current engagement exists, tag as Phase 0-R (Restart Needed).`,
            },
          ],
        };
      }

      if (!answers || answers.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No answers provided. Call this tool with \`getQuestions: true\` to receive the decision tree questions, then re-call with answers.`,
            },
          ],
        };
      }

      // Walk the decision tree
      let determinedPhase = "0";
      let reasoning: string[] = [];

      for (let i = 0; i < phaseDecisionTree.length; i++) {
        const node = phaseDecisionTree[i];
        const answer = answers.find((a) => a.questionIndex === i);

        if (!answer || answer.answer === "no") {
          determinedPhase = node.no;
          reasoning.push(`Q${i + 1}: NO → Phase ${node.no}`);
          if (answer?.evidence) reasoning.push(`  Evidence: ${answer.evidence}`);
          break;
        }

        if (answer.answer === "unsure") {
          reasoning.push(`Q${i + 1}: UNSURE — further field verification needed`);
          if (answer.evidence) reasoning.push(`  Evidence: ${answer.evidence}`);
          determinedPhase = node.no;
          break;
        }

        reasoning.push(`Q${i + 1}: YES → at least Phase ${node.yes}`);
        if (answer.evidence) reasoning.push(`  Evidence: ${answer.evidence}`);
        determinedPhase = node.yes === "continue" ? determinedPhase : node.yes;

        if (i === phaseDecisionTree.length - 1) {
          determinedPhase = "7";
        }
      }

      // Flag 0-R if data is stale
      const isRestart = (dataAgeYears ?? 0) >= 3 && determinedPhase === "0";
      const finalPhase = isRestart ? "0-R" : determinedPhase;
      const phase = getPhase(finalPhase as any);

      const taskComponents = getTaskComponentsForPhase(finalPhase);
      const primaryTasks = taskComponents.primary.map((c) => c.name).join(", ") || "None";
      const topAccelerators = phase?.acceleratorPriorities.slice(0, 3).join(", ") || "";

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `## Phase Assessment Result`,
              ``,
              `**Determined Phase:** ${phase?.label ?? finalPhase}`,
              ``,
              `**Description:** ${phase?.description}`,
              ``,
              `**Primary Agent:** ${phase?.primaryAgent === "transitioning" ? "Transitioning (outside → local)" : phase?.primaryAgent === "local" ? "Local believers" : "Outside workers"}`,
              ``,
              `**Reasoning Chain:**`,
              reasoning.map((r) => `- ${r}`).join("\n"),
              ``,
              `**Primary Missionary Task Focus:** ${primaryTasks}`,
              ``,
              `**Top Accelerator Priorities:** ${topAccelerators}`,
              ``,
              isRestart
                ? `⚠️ **Phase 0-R flagged:** Data is ${dataAgeYears} years old. A restart assessment is needed before assuming prior engagement status.`
                : "",
              ``,
              `**Common Failure Modes at This Phase:**`,
              (phase?.commonFailureModes ?? []).map((f) => `- ${f}`).join("\n"),
            ]
              .filter((l) => l !== undefined)
              .join("\n"),
          },
        ],
      };
    }
  );

  // ─── get_accelerators_for_phase ───────────────────────────────────────────
  server.tool(
    "get_accelerators_for_phase",
    {
      phase: z
        .enum(["0", "0-R", "1", "2", "3", "4", "5", "6", "7"])
        .describe("The current Phase of Engagement"),
      focus: z
        .string()
        .optional()
        .describe("Optional: a specific concern or context (e.g., 'leadership gap', 'Scripture access')"),
    },
    async ({ phase, focus }) => {
      const phaseData = getPhase(phase as any);
      if (!phaseData) {
        return { content: [{ type: "text" as const, text: `Unknown phase: ${phase}` }] };
      }

      const isLocalPhase = phaseData.primaryAgent === "local";
      const isTransitioning = phaseData.primaryAgent === "transitioning";
      const agentNote = isLocalPhase
        ? "**Phase 4+ Indigeneity Rule:** At this phase, local believers are the primary agents. All accelerator applications should serve local initiative — not substitute for it. Outside workers coach, resource, and prepare to exit."
        : isTransitioning
        ? "**Agency Transition:** This phase marks the handoff from outside workers to local leaders. Intentionally transfer ownership — raise up, nurture, and release local leadership."
        : "**Primary Agent:** Outside workers and near-culture believers.";

      const priorityAccelerators = phaseData.acceleratorPriorities
        .map((name) => {
          const acc = accelerators.find(
            (a) => a.name.toLowerCase().includes(name.toLowerCase().split("/")[0])
          );
          if (!acc) return null;

          const tierLabel: Record<string, string> = {
            clean: "✅ Clean Alignment",
            reframe: "🔄 Reframe Needed",
            guardrail: "⚠️ Guardrail Required",
            "significant-guardrail": "🚨 Significant Guardrail",
          };

          return [
            `### ${acc.name} ${tierLabel[acc.alignmentTier]}`,
            acc.description,
            ``,
            `**Foundations Guardrail:** ${acc.foundationsGuardrail}`,
            ``,
            `**At This Phase:** ${isLocalPhase || isTransitioning ? acc.phase4PlusShift : "Apply as described above."}`,
            ``,
            `**Diagnostic Questions:**`,
            acc.diagnosticQuestions.map((q) => `- ${q}`).join("\n"),
          ].join("\n");
        })
        .filter(Boolean)
        .join("\n\n---\n\n");

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `## Accelerators for ${phaseData.label}`,
              ``,
              agentNote,
              ``,
              focus ? `**Context Filter:** ${focus}` : "",
              ``,
              priorityAccelerators,
              ``,
              `**Transition Criteria for Next Phase:**`,
              (phaseData.transitionCriteria ?? []).map((c) => `- ${c}`).join("\n"),
            ]
              .filter((l) => l !== undefined)
              .join("\n"),
          },
        ],
      };
    }
  );

  // ─── get_transition_criteria ──────────────────────────────────────────────
  server.tool(
    "get_transition_criteria",
    {
      phase: z
        .enum(["0", "0-R", "1", "2", "3", "4", "5", "6", "7"])
        .describe("The current phase"),
    },
    async ({ phase }) => {
      const current = getPhase(phase as any);
      const nextPhaseId = phase === "0-R" ? "1" : String(parseInt(phase) + 1);
      const next = getPhase(nextPhaseId as any);

      if (!current) return { content: [{ type: "text" as const, text: `Unknown phase: ${phase}` }] };

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `## Transition: ${current.label} → ${next?.label ?? "Complete"}`,
              ``,
              `**Transition Question:**`,
              current.transitionQuestion,
              ``,
              `**Criteria to Advance:**`,
              current.transitionCriteria.map((c) => `- ${c}`).join("\n"),
              ``,
              `**Common Failure Modes That Stall This Transition:**`,
              current.commonFailureModes.map((f) => `- ${f}`).join("\n"),
              ``,
              `**Top Accelerators to Prioritize:**`,
              current.acceleratorPriorities.map((a) => `- ${a}`).join("\n"),
            ].join("\n"),
          },
        ],
      };
    }
  );

  // ─── check_indigeneity_alignment ─────────────────────────────────────────
  server.tool(
    "check_indigeneity_alignment",
    {
      phase: z
        .enum(["0", "0-R", "1", "2", "3", "4", "5", "6", "7"])
        .describe("The current phase of the people group"),
      proposedAction: z
        .string()
        .describe("The proposed strategy, action, or approach to evaluate"),
    },
    async ({ phase, proposedAction }) => {
      const phaseData = getPhase(phase as any);
      const indigeneityGuardrail = guardrails.find((g) => g.id === "indigeneity");
      const phaseNum = parseInt(phase);
      const isPhase4Plus = phaseNum >= 4;

      const risks: string[] = [];

      // Basic dependency risk heuristics
      const actionLower = proposedAction.toLowerCase();
      if (actionLower.includes("fund") || actionLower.includes("salary") || actionLower.includes("pay"))
        risks.push("Potential self-financing risk: outside funding for local church operations creates dependency");
      if (actionLower.includes("lead") || actionLower.includes("pastor") || actionLower.includes("direct"))
        risks.push("Potential self-governing risk: outside leadership or authority in Phase 4+ contexts");
      if (actionLower.includes("train") && (actionLower.includes("bring") || actionLower.includes("send")))
        risks.push("Potential self-theologizing risk: ongoing dependence on outside trainers");
      if (actionLower.includes("plant") && isPhase4Plus)
        risks.push("Phase 4+ check: new church planting should be initiated by local churches, not outside workers");

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `## Indigeneity Alignment Check`,
              ``,
              `**Phase:** ${phaseData?.label}`,
              `**Primary Agent at This Phase:** ${phaseData?.primaryAgent === "local" ? "Local believers" : phaseData?.primaryAgent === "transitioning" ? "Transitioning to local" : "Outside workers"}`,
              ``,
              `**Proposed Action:** ${proposedAction}`,
              ``,
              isPhase4Plus
                ? `⚠️ **Phase 4+ applies.** Local believers are the primary agents. Evaluate whether this action serves local initiative or substitutes for it.`
                : `ℹ️ **Phase 0–3.** Outside workers are the primary agents. Plan toward indigeneity from the start.`,
              ``,
              risks.length > 0
                ? `**Potential Dependency Risks Flagged:**\n${risks.map((r) => `- ${r}`).join("\n")}`
                : `**No automatic dependency risks detected.** Use the Four Selfs as your evaluation grid:`,
              ``,
              `**Four Selfs Evaluation Grid:**`,
              `- Self-governing: Does this action build or bypass local leadership?`,
              `- Self-financing: Does this create or reduce dependence on foreign funds?`,
              `- Self-propagating: Does this enable local reproduction or require outside initiation?`,
              `- Self-theologizing: Does this develop or depend on outside theological expertise?`,
              ``,
              `**Foundations Principle:**`,
              indigeneityGuardrail?.principle,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      };
    }
  );

  // ─── get_missionary_task_for_phase ────────────────────────────────────────
  server.tool(
    "get_missionary_task_for_phase",
    {
      phase: z
        .enum(["0", "0-R", "1", "2", "3", "4", "5", "6", "7"])
        .describe("The current phase"),
    },
    async ({ phase }) => {
      const phaseData = getPhase(phase as any);
      const { primary, secondary } = getTaskComponentsForPhase(phase);

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `## Missionary Task at ${phaseData?.label}`,
              ``,
              `**Primary Agent:** ${phaseData?.primaryAgent === "local" ? "Local believers" : phaseData?.primaryAgent === "transitioning" ? "Transitioning (outside → local)" : "Outside workers"}`,
              ``,
              `**Primary Task Components:**`,
              primary.length > 0
                ? primary
                    .map(
                      (c) =>
                        `### ${c.name}\n${c.description}\n\n**Key Principles:**\n${c.keyPrinciples.map((p) => `- ${p}`).join("\n")}\n\n**Indigeneity Note:** ${c.indigeneityNote}`
                    )
                    .join("\n\n")
                : "No primary components at this phase.",
              ``,
              secondary.length > 0
                ? `**Secondary (Ongoing) Components:**\n${secondary.map((c) => `- ${c.name}: ${c.description.split(".")[0]}`).join("\n")}`
                : "",
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      };
    }
  );

  // ─── check_foundations_guardrail ─────────────────────────────────────────
  server.tool(
    "check_foundations_guardrail",
    {
      acceleratorId: z
        .string()
        .describe(
          "Accelerator ID: prayer, scripture-access, multi-node, vision-casting, mobilization-sending, collaborative-engagement, compassion, contextualization, research, multiplying, training, marketplace"
        ),
      proposedApplication: z
        .string()
        .describe("The specific proposed application or action to evaluate against Foundations"),
      phase: z
        .enum(["0", "0-R", "1", "2", "3", "4", "5", "6", "7"])
        .optional()
        .describe("Optional: the current phase for phase-specific guidance"),
    },
    async ({ acceleratorId, proposedApplication, phase }) => {
      const acc = getAccelerator(acceleratorId);
      if (!acc) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Unknown accelerator: ${acceleratorId}. Valid IDs: ${accelerators.map((a) => a.id).join(", ")}`,
            },
          ],
        };
      }

      const relatedGuardrails = getGuardrailsForAccelerator(acceleratorId);
      const phaseData = phase ? getPhase(phase as any) : undefined;

      const tierLabel: Record<string, string> = {
        clean: "✅ Clean Alignment — maps directly to Foundations",
        reframe: "🔄 Reframe Needed — valid tool, different framing required",
        guardrail: "⚠️ Guardrail Required — specific Foundations constraints apply",
        "significant-guardrail": "🚨 Significant Guardrail — highest friction with Foundations",
      };

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `## Foundations Guardrail Check: ${acc.name}`,
              ``,
              `**Alignment Tier:** ${tierLabel[acc.alignmentTier]}`,
              ``,
              `**Alignment Note:** ${acc.alignmentNote}`,
              ``,
              `**Proposed Application:** ${proposedApplication}`,
              ``,
              `**Foundations Guardrail:**`,
              acc.foundationsGuardrail,
              ``,
              phaseData && parseInt(phase ?? "0") >= 4
                ? `**Phase 4+ Shift:** ${acc.phase4PlusShift}`
                : "",
              ``,
              relatedGuardrails.length > 0
                ? [
                    `**Applicable Foundations Principles:**`,
                    ...relatedGuardrails.map((g) =>
                      [
                        `### ${g.title}`,
                        g.principle,
                        ``,
                        `**Hard Limits:**`,
                        g.hardLimits.map((l) => `- ${l}`).join("\n"),
                        ``,
                        `**Failure Mode to Avoid:** ${g.failureMode}`,
                      ].join("\n")
                    ),
                  ].join("\n\n")
                : "",
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      };
    }
  );

  // ─── conduct_phase_interview ──────────────────────────────────────────────
  server.tool(
    "conduct_phase_interview",
    {
      criteriaStatus: z
        .array(
          z.object({
            phaseId: z.enum(["0", "1", "2", "3", "4", "5", "6", "7"]),
            criterion: z.string().describe("The specific transition criterion"),
            status: z.enum(["confirmed", "denied", "unknown"]),
            evidence: z.string().optional().describe("What the interviewee said that informed this status"),
          })
        )
        .optional()
        .describe("Current state of phase criteria based on evidence gathered so far"),
      knownContext: z
        .string()
        .optional()
        .describe("Free-text summary of what is known so far about this people group"),
      dataAgeYears: z
        .number()
        .optional()
        .describe("How old is the most recent data? Used to check for 0-R"),
    },
    async ({ criteriaStatus, knownContext, dataAgeYears }) => {
      // All phase transition criteria with targeted interview questions
      const criteriaBank: Record<
        string,
        {
          criterion: string;
          questions: string[];
          ifConfirmed: string;
          ifDenied: string;
          boundary: string;
        }[]
      > = {
        "0-1": [
          {
            criterion: "Current, intentional effort toward self-sustaining churches exists",
            questions: [
              "Is there anyone actively working among this people group right now — whether a missionary, near-culture believer, or local worker?",
              "When was the last confirmed contact or engagement with this group? How current is that information?",
              "Has anyone expressed a clear intention to plant churches, or is the activity more exploratory?",
            ],
            ifConfirmed: "At least Phase 1",
            ifDenied: "Phase 0 (or 0-R if data is stale)",
            boundary: "0→1",
          },
        ],
        "1-2": [
          {
            criterion: "Regular, culturally relevant gospel engagement is taking place",
            questions: [
              "How often is the gospel being shared — is this weekly conversations, occasional encounters, or something else?",
              "Are these gospel conversations happening naturally in the language and cultural frame of the people group, or primarily in a foreign context?",
              "Is there a clear intention behind the engagement to plant churches — or is the team still primarily in a relationship-building and learning mode?",
            ],
            ifConfirmed: "At least Phase 2",
            ifDenied: "Phase 1 — present but not yet in regular gospel engagement",
            boundary: "1→2",
          },
        ],
        "2-3": [
          {
            criterion: "At least one person or cluster has responded in repentance and faith",
            questions: [
              "Has anyone from this people group made a clear profession of faith in Christ — repentance and trust in Jesus specifically?",
              "Are there any believers from within the people group, even just one or two households?",
              "Is there any form of intentional follow-up or discipleship happening with people who have shown interest?",
            ],
            ifConfirmed: "At least Phase 3",
            ifDenied: "Phase 2 — gospel is going out but no recorded response yet",
            boundary: "2→3",
          },
        ],
        "3-4": [
          {
            criterion: "Believers gathering regularly as a church with local leaders emerging",
            questions: [
              "Are the believers gathering regularly together — weekly or more — in a way they would call a church, not just a Bible study?",
              "Is their gathering consistent with evangelical faith and practice: prayer, Scripture, accountability, the ordinances?",
              "Are there any local leaders emerging from within the people group — people taking spiritual responsibility for others?",
            ],
            ifConfirmed: "At least Phase 4",
            ifDenied: "Phase 3 — disciples exist but not yet gathering as a church with local leadership",
            boundary: "3→4",
          },
        ],
        "4-5": [
          {
            criterion: "Local churches sending their own planters, second-generation groups forming",
            questions: [
              "Have any of these local churches sent out someone from their own congregation to start a new group or church elsewhere among their people?",
              "Are there any second-generation groups — gatherings that exist because a local believer from the first church started them, not because an outside worker did?",
              "Is the initiative for new outreach coming from local believers, or still primarily from outside workers?",
            ],
            ifConfirmed: "At least Phase 5",
            ifDenied: "Phase 4 — local church exists but not yet sending its own workers",
            boundary: "4→5",
          },
        ],
        "5-6": [
          {
            criterion: "Church and leader streams reaching fourth generation or beyond",
            questions: [
              "Can you trace a generational chain — a church that planted a church that planted a church? How many generations deep does that go?",
              "Are there local network structures forming — elders, networks, or oversight bodies led by people from within the people group?",
              "Is the multiplication happening across different geographic or demographic segments of the people group, or concentrated in one area?",
            ],
            ifConfirmed: "At least Phase 6",
            ifDenied: "Phase 5 — reproducing but not yet reaching fourth-generation multiplication",
            boundary: "5→6",
          },
        ],
        "6-7": [
          {
            criterion: "10%+ following Christ OR multiple networks sending to other peoples",
            questions: [
              "What is the estimated percentage of the people group that follows Christ and worships in a church? Is it approaching or exceeding 10%?",
              "Are any of the local churches or networks actively sending workers to other people groups — outward mission, not just internal growth?",
              "Is the gospel presence self-sustaining without any outside worker involvement — could it continue if all foreign workers left tomorrow?",
            ],
            ifConfirmed: "Phase 7 — Sustained Gospel Presence",
            ifDenied: "Phase 6 — multiplying but not yet at saturation or outward sending",
            boundary: "6→7",
          },
        ],
      };

      // Determine current hypothesis from confirmed/denied criteria
      let highestConfirmed = -1;
      let lowestUnknown = -1;
      let lowestDenied = 8;

      const statusMap: Record<string, string> = {};
      for (const s of criteriaStatus ?? []) {
        const key = s.phaseId;
        statusMap[key] = s.status;
        const num = parseInt(key);
        if (s.status === "confirmed" && num > highestConfirmed) highestConfirmed = num;
        if (s.status === "unknown" && (lowestUnknown === -1 || num < lowestUnknown)) lowestUnknown = num;
        if (s.status === "denied" && num < lowestDenied) lowestDenied = num;
      }

      const hypothesisPhase =
        lowestDenied < 8
          ? String(lowestDenied - 1)
          : highestConfirmed >= 0
          ? String(highestConfirmed)
          : "unknown";

      // Find the critical boundary to probe next
      const boundaries = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7"];
      const confirmedPhaseNum =
        hypothesisPhase === "unknown" ? -1 : parseInt(hypothesisPhase);

      // Start probing from the boundary just above the current hypothesis
      const nextBoundaryKey = boundaries[Math.max(0, confirmedPhaseNum + 1)];
      const nextBoundaryCriteria = criteriaBank[nextBoundaryKey] ?? criteriaBank["0-1"];

      // Confidence level
      const totalCriteria = (criteriaStatus ?? []).length;
      const unknownCount = (criteriaStatus ?? []).filter((s) => s.status === "unknown").length;
      const confidence =
        totalCriteria === 0
          ? "none"
          : unknownCount === 0
          ? "high"
          : unknownCount <= 1
          ? "medium"
          : "low";

      const isReadyToAssess = confidence === "high" || lowestDenied < 8;
      const isRestartRisk = (dataAgeYears ?? 0) >= 3;

      const phaseLabel =
        hypothesisPhase === "unknown"
          ? "Unknown — need more information"
          : getPhase(hypothesisPhase as any)?.label ?? hypothesisPhase;

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `## Interview State`,
              ``,
              `**Current Hypothesis:** ${phaseLabel}`,
              `**Confidence:** ${confidence}`,
              isRestartRisk
                ? `⚠️ **Data age risk:** ${dataAgeYears} years — ask whether current data reflects active engagement or historical records`
                : "",
              ``,
              isReadyToAssess
                ? `✅ **Sufficient evidence to assess.** Call \`assess_phase\` with the answers gathered, then \`get_missionary_task_for_phase\` and \`get_accelerators_for_phase\` for the full picture.`
                : [
                    `**Critical Boundary to Probe:** ${nextBoundaryKey.replace("-", " → Phase ")}`,
                    ``,
                    ...nextBoundaryCriteria.map((c) => [
                      `**Criterion:** ${c.criterion}`,
                      ``,
                      `**Ask one of these (choose the most natural fit for the conversation):**`,
                      c.questions.map((q, i) => `${i + 1}. ${q}`).join("\n"),
                      ``,
                      `**If confirmed:** ${c.ifConfirmed}`,
                      `**If denied:** ${c.ifDenied}`,
                    ].join("\n")),
                  ].join("\n"),
              ``,
              (criteriaStatus ?? []).length > 0
                ? [
                    `**Evidence Gathered So Far:**`,
                    ...(criteriaStatus ?? []).map(
                      (s) =>
                        `- Phase ${s.phaseId} criterion [${s.status.toUpperCase()}]: ${s.criterion}${s.evidence ? `\n  → "${s.evidence}"` : ""}`
                    ),
                  ].join("\n")
                : knownContext
                ? `**Starting Context:** ${knownContext}\n\nBegin with the 0→1 boundary — confirm whether active engagement currently exists.`
                : `**No evidence yet.** Start with an open question: "Tell me about what's currently happening with this people group — who is engaged with them and what does that look like?"`,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      };
    }
  );
}

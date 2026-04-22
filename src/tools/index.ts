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
}

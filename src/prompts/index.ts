import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerPrompts(server: McpServer) {
  // ─── phase-assessment-interview ───────────────────────────────────────────
  server.prompt(
    "phase-assessment-interview",
    {
      peopleGroup: z.string().describe("Name of the people group"),
      context: z.string().optional().describe("Any known context about current engagement"),
    },
    async ({ peopleGroup, context }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `I need help assessing the current Phase of Engagement for the ${peopleGroup} people group.`,
              context ? `Context: ${context}` : "",
              ``,
              `Please use the assess_phase tool with getQuestions: true to retrieve the decision tree questions, then walk me through them one at a time to determine the current phase. For each question, ask for field evidence before moving to the next.`,
              ``,
              `After determining the phase, use get_missionary_task_for_phase and get_accelerators_for_phase to give a complete picture of where things stand and what the next faithful steps might be.`,
              ``,
              `Ground every recommendation in the Phases of Engagement framework and apply Foundations guardrails throughout.`,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        },
      ],
    })
  );

  // ─── accelerator-planning-session ────────────────────────────────────────
  server.prompt(
    "accelerator-planning-session",
    {
      peopleGroup: z.string().describe("Name of the people group"),
      phase: z
        .enum(["0", "0-R", "1", "2", "3", "4", "5", "6", "7"])
        .describe("Current phase"),
      teamContext: z.string().optional().describe("Relevant team context or known gaps"),
    },
    async ({ peopleGroup, phase, teamContext }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `I'm facilitating an accelerator planning session for the ${peopleGroup} people group, currently at Phase ${phase}.`,
              teamContext ? `Team context: ${teamContext}` : "",
              ``,
              `Use get_accelerators_for_phase to retrieve the phase-specific accelerator guidance and Foundations guardrails.`,
              ``,
              `Then facilitate a discernment process to identify 1–2 accelerator domains our team should prioritize in the next season. For each candidate:`,
              `1. Surface the key diagnostic questions`,
              `2. Apply the relevant Foundations guardrail`,
              `3. Note whether this is primarily an outside-worker or local-believer action at Phase ${phase}`,
              `4. Help us identify a specific, small, culturally appropriate next step`,
              ``,
              `Keep the session prayerful and discerning — not a checklist exercise.`,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        },
      ],
    })
  );

  // ─── field-briefing ───────────────────────────────────────────────────────
  server.prompt(
    "field-briefing",
    {
      peopleGroup: z.string().describe("Name of the people group"),
      phase: z
        .enum(["0", "0-R", "1", "2", "3", "4", "5", "6", "7"])
        .describe("Current phase"),
      audience: z
        .enum(["field-team", "mobilizer", "sending-church", "researcher"])
        .describe("Intended audience for the briefing"),
    },
    async ({ peopleGroup, phase, audience }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `Generate a field briefing for the ${peopleGroup} people group at Phase ${phase}, written for a ${audience.replace("-", " ")}.`,
              ``,
              `Use get_missionary_task_for_phase, get_accelerators_for_phase, and get_transition_criteria to pull accurate framework data.`,
              ``,
              `The briefing should include:`,
              `- Current phase description and what it means on the ground`,
              `- Who the primary agents are at this phase`,
              `- Primary Missionary Task focus`,
              `- Top 2–3 accelerator priorities with guardrails applied`,
              `- Transition criteria: what would it take to move to the next phase`,
              `- Common failure modes to guard against`,
              ``,
              `Tone: clear, precise, practitioner-facing. Avoid consumer-tech language. Rooted in the Phases framework with Foundations guardrails applied.`,
            ].join("\n"),
          },
        },
      ],
    })
  );

  // ─── training-module-outline ──────────────────────────────────────────────
  server.prompt(
    "training-module-outline",
    {
      topic: z
        .string()
        .describe("The training topic — e.g., 'Phase 3 Discipleship', 'Contextualization guardrails', 'Accelerator planning'"),
      audience: z
        .string()
        .describe("The training audience — e.g., 'field practitioners', 'mobilizers', 'sending church pastors'"),
      format: z
        .enum(["workshop", "self-study", "seminar", "coaching-session"])
        .optional()
        .describe("Delivery format"),
    },
    async ({ topic, audience, format }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `Generate a training module outline on "${topic}" for ${audience}${format ? ` in a ${format} format` : ""}.`,
              ``,
              `Pull accurate framework content from the relevant resources (phases, accelerators, missionary-task, guardrails) before outlining.`,
              ``,
              `The outline should include:`,
              `- Learning objectives (what participants will understand and be able to do)`,
              `- Key content sections with the Foundations integration applied`,
              `- Discussion questions or activities grounded in the framework`,
              `- A practical application exercise`,
              `- Key terms from the glossary to define`,
              ``,
              `Design for practitioners: concrete, reproducible, and grounded in field reality. The module itself should model the reproducibility principle.`,
            ].join("\n"),
          },
        },
      ],
    })
  );

  // ─── mobilizer-vision-brief ───────────────────────────────────────────────
  server.prompt(
    "mobilizer-vision-brief",
    {
      peopleGroup: z.string().describe("Name of the people group"),
      phase: z
        .enum(["0", "0-R", "1", "2", "3", "4", "5", "6", "7"])
        .describe("Current phase"),
      workerType: z
        .string()
        .optional()
        .describe("Type of worker needed — e.g., 'pioneer church planter', 'leadership trainer', 'Bible translator'"),
    },
    async ({ peopleGroup, phase, workerType }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `Generate a mobilization vision brief for the ${peopleGroup} people group at Phase ${phase}${workerType ? `, specifically for a ${workerType}` : ""}.`,
              ``,
              `Use get_missionary_task_for_phase and get_accelerators_for_phase to ground the brief in accurate framework data.`,
              ``,
              `The brief should:`,
              `- Open with theological gravity: God's glory, the reality of lostness, the urgency of proclamation (not primarily data or strategy)`,
              `- Clearly describe what the phase requires and why this worker type is needed now`,
              `- Ground the call in Foundations' identity: we are disciples sent by local churches`,
              `- Include 2–3 specific Accelerator priorities for this phase`,
              `- Close with the vision of what Phase 7 looks like for this people — gospel saturation, local churches sending to others`,
              ``,
              `Tone: compelling and theologically serious. Written for the missions world — not consumer audiences.`,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        },
      ],
    })
  );

  // ─── comms-draft ─────────────────────────────────────────────────────────
  server.prompt(
    "comms-draft",
    {
      purpose: z.string().describe("Purpose of the communication — e.g., 'introduce the Phases framework', 'explain Phase 4 indigeneity shift', 'announce the MCP server'"),
      audience: z
        .enum(["field-practitioners", "sending-churches", "mobilizers", "missions-world", "researchers"])
        .describe("Target audience"),
      format: z
        .enum(["article", "email", "presentation-outline", "social-post", "newsletter"])
        .describe("Communication format"),
    },
    async ({ purpose, audience, format }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `Draft a ${format} for ${audience.replace(/-/g, " ")} with the following purpose: ${purpose}`,
              ``,
              `Before drafting, pull relevant framework content from the resources to ensure accuracy.`,
              ``,
              `Guidelines:`,
              `- Field practitioners and mobilizers: concrete, precise, practitioner-facing language`,
              `- Sending churches: connect to Great Commission obedience and local church responsibility`,
              `- Missions world: demonstrate how this framework adds clarity to existing shared language`,
              `- Researchers: lead with the data dimensions and the definition updates`,
              ``,
              `Apply Foundations framing throughout: ground everything in God's glory, the gospel, and the local church. Avoid consumer-tech language.`,
              ``,
              `Flag any places where Foundations guardrails should be noted explicitly for the audience.`,
            ].join("\n"),
          },
        },
      ],
    })
  );
}

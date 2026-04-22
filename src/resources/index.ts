import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  phases,
  getPhase,
  accelerators,
  getAccelerator,
  missionaryTask,
  getTaskComponent,
  guardrails,
  getGuardrail,
  glossary,
  getTerm,
} from "../data/index.js";

export function registerResources(server: McpServer) {
  // ─── phases list ──────────────────────────────────────────────────────────
  server.resource(
    "phases",
    "phases://list",
    { title: "All Phases of Engagement", description: "Complete list of all 8 phases (0–7) plus Phase 0-R" },
    async () => ({
      contents: [
        {
          uri: "phases://list",
          mimeType: "text/plain",
          text: phases
            .map(
              (p) =>
                `${p.label}\n${"─".repeat(p.label.length)}\n${p.description}\n\nPrimary Agent: ${p.primaryAgent}\nMissionary Task Focus: ${p.missionaryTaskFocus.join(", ")}\n`
            )
            .join("\n"),
        },
      ],
    })
  );

  // ─── individual phase ─────────────────────────────────────────────────────
  server.resource(
    "phase",
    new ResourceTemplate("phases://{id}", { list: undefined }),
    { title: "Phase Detail", description: "Full detail for a specific phase" },
    async (uri, { id }) => {
      const phase = getPhase(id as any);
      if (!phase) {
        return { contents: [{ uri: uri.href, mimeType: "text/plain", text: `Phase not found: ${id}` }] };
      }
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: [
              phase.label,
              "─".repeat(phase.label.length),
              phase.description,
              "",
              `Primary Agent: ${phase.primaryAgent}`,
              `Missionary Task Focus: ${phase.missionaryTaskFocus.join(", ")}`,
              "",
              "Markers:",
              phase.markers.map((m) => `  - ${m}`).join("\n"),
              "",
              "Transition Question:",
              `  ${phase.transitionQuestion}`,
              "",
              "Transition Criteria:",
              phase.transitionCriteria.map((c) => `  - ${c}`).join("\n"),
              "",
              "Common Failure Modes:",
              phase.commonFailureModes.map((f) => `  - ${f}`).join("\n"),
              "",
              "Accelerator Priorities:",
              phase.acceleratorPriorities.map((a) => `  - ${a}`).join("\n"),
            ].join("\n"),
          },
        ],
      };
    }
  );

  // ─── accelerators list ────────────────────────────────────────────────────
  server.resource(
    "accelerators",
    "accelerators://list",
    { title: "All 12 Engagement Accelerators", description: "Complete list of accelerators with Foundations alignment and guardrails" },
    async () => ({
      contents: [
        {
          uri: "accelerators://list",
          mimeType: "text/plain",
          text: accelerators
            .map(
              (a) =>
                `${a.name} [${a.alignmentTier}]\n${a.description}\n\nFoundations Guardrail: ${a.foundationsGuardrail}\n`
            )
            .join("\n"),
        },
      ],
    })
  );

  // ─── individual accelerator ───────────────────────────────────────────────
  server.resource(
    "accelerator",
    new ResourceTemplate("accelerators://{id}", { list: undefined }),
    { title: "Accelerator Detail", description: "Full detail for a specific accelerator" },
    async (uri, { id }) => {
      const acc = getAccelerator(id as string);
      if (!acc) {
        return { contents: [{ uri: uri.href, mimeType: "text/plain", text: `Accelerator not found: ${id}` }] };
      }
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: [
              `${acc.name} — Alignment: ${acc.alignmentTier}`,
              "─".repeat(40),
              acc.description,
              "",
              `Missionary Task Components: ${acc.missionaryTaskComponents.join(", ")}`,
              "",
              `Alignment Note: ${acc.alignmentNote}`,
              "",
              `Foundations Guardrail: ${acc.foundationsGuardrail}`,
              "",
              `Phase 4+ Shift: ${acc.phase4PlusShift}`,
              "",
              "Diagnostic Questions:",
              acc.diagnosticQuestions.map((q) => `  - ${q}`).join("\n"),
            ].join("\n"),
          },
        ],
      };
    }
  );

  // ─── missionary task ──────────────────────────────────────────────────────
  server.resource(
    "missionary-task",
    "missionary-task://list",
    { title: "The 6-Component Missionary Task", description: "Entry, Evangelism, Discipleship, Healthy Church Formation, Leadership Development, Exit to Partnership" },
    async () => ({
      contents: [
        {
          uri: "missionary-task://list",
          mimeType: "text/plain",
          text: missionaryTask
            .map(
              (c) =>
                `${c.name}\n${"─".repeat(c.name.length)}\n${c.description}\n\nPrimary Phases: ${c.primaryPhases.join(", ")}\nIndigenity Note: ${c.indigeneityNote}\n`
            )
            .join("\n"),
        },
      ],
    })
  );

  // ─── guardrails ───────────────────────────────────────────────────────────
  server.resource(
    "guardrails",
    "guardrails://list",
    { title: "Foundations Guardrails", description: "All guardrails by category: gospel content, contextualization, indigeneity, compassion, collaboration, sending" },
    async () => ({
      contents: [
        {
          uri: "guardrails://list",
          mimeType: "text/plain",
          text: guardrails
            .map(
              (g) =>
                `[${g.category}] ${g.title}\n${g.principle}\n\nHard Limits:\n${g.hardLimits.map((l) => `  - ${l}`).join("\n")}\n\nFailure Mode: ${g.failureMode}\n`
            )
            .join("\n"),
        },
      ],
    })
  );

  // ─── glossary ─────────────────────────────────────────────────────────────
  server.resource(
    "glossary",
    "glossary://list",
    { title: "Framework Glossary", description: "Canonical definitions for all Phases and Foundations terminology" },
    async () => ({
      contents: [
        {
          uri: "glossary://list",
          mimeType: "text/plain",
          text: glossary
            .map(
              (t) =>
                `${t.term} [${t.source}]\n${t.definition}${t.relatedTerms ? `\nRelated: ${t.relatedTerms.join(", ")}` : ""}\n`
            )
            .join("\n"),
        },
      ],
    })
  );
}

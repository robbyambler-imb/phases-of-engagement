# Phases of Engagement — MCP Server

An MCP (Model Context Protocol) server exposing the **Phases of Engagement** framework as structured tools, resources, and prompts for AI assistants. Built to make the framework's knowledge, logic, and Foundations guardrails available consistently across any MCP-compatible client.

Developed in partnership with the collaborative work of Frontiers, IMB, Joshua Project, Engage Network, Vision 5:9, and Accelerate.

---

## What This Server Provides

### Resources
Structured framework data readable by any MCP client:

| Resource URI | Description |
|---|---|
| `phases://list` | All 8 phases (0–7 + 0-R) with full descriptions |
| `phases://{id}` | Detail for a specific phase |
| `accelerators://list` | All 12 accelerators with Foundations guardrails |
| `accelerators://{id}` | Detail for a specific accelerator |
| `missionary-task://list` | The 6-component Missionary Task |
| `guardrails://list` | All Foundations guardrails by category |
| `glossary://list` | Canonical framework terminology |

### Tools
Logic the model calls to reason about a specific context:

| Tool | Description |
|---|---|
| `conduct_phase_interview` | Interview engine — tracks criteria status across all 7 phase boundaries, identifies the ambiguous boundary, and returns targeted questions to resolve it |
| `assess_phase` | Walk the sequential decision tree to determine a people group's current phase |
| `get_accelerators_for_phase` | Phase-specific accelerator questions with Foundations guardrails applied |
| `get_transition_criteria` | What it would take to move to the next phase |
| `check_indigeneity_alignment` | Evaluate a proposed action against the Four Selfs (Phase 4+) |
| `get_missionary_task_for_phase` | Which Missionary Task components are primary at this phase |
| `check_foundations_guardrail` | Evaluate an accelerator application against Foundations constraints |

### Prompts
Pre-built, framework-aware templates:

| Prompt | Description |
|---|---|
| `phase-assessment-interview` | Conversational interview agent — opens wide, uses `conduct_phase_interview` in a loop to probe ambiguous boundaries, delivers a full phase assessment with Missionary Task focus and accelerator priorities |
| `accelerator-planning-session` | Facilitated team diagnostic with guardrails applied |
| `field-briefing` | Phase-specific briefing for field teams, mobilizers, or sending churches |
| `training-module-outline` | Training outline for any framework topic and audience |
| `mobilizer-vision-brief` | Theologically-grounded mobilization brief |
| `comms-draft` | Release and communications content for multiple audiences |

---

## Theological Framework

This server integrates two documents:

- **Phases of Engagement Toolkit** — the 8-phase continuum, 12 Accelerators, and Engagement Strength model
- **IMB Foundations (2022)** — the theological and missiological guardrails

**Integration rule:** When Accelerator guidance conflicts with Foundations principles (theological, ecclesiological, or missiological), **Foundations wins.**

**Phase 4 threshold:** At Phase 4 and beyond, local believers are the primary agents. All tool outputs reflect this agency shift. Outside workers coach, resource, and prepare to exit — they do not continue to lead.

---

## Getting Started

### Connect to Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "phases-of-engagement": {
      "command": "node",
      "args": ["/path/to/phases/dist/index.js"]
    }
  }
}
```

### Run Locally

```bash
npm install
npm run build
npm start
```

### Development

```bash
npm run dev
```

---

## Project Structure

```
src/
├── index.ts              # Server entry point
├── data/
│   ├── phases.ts         # 8-phase definitions + decision tree
│   ├── accelerators.ts   # 12 accelerators + Foundations alignment
│   ├── missionary-task.ts # 6-component Missionary Task
│   ├── guardrails.ts     # Foundations guardrails by category
│   └── glossary.ts       # Canonical terminology
├── resources/
│   └── index.ts          # Resource handlers
├── tools/
│   └── index.ts          # Tool implementations
└── prompts/
    └── index.ts          # Prompt templates
```

---

## Source Documents

- `docs/The Phases of Engagement Toolkit - 040626.pdf`
- `docs/Foundations-2022-English.pdf`
- `docs/Phases Final NEW v2.pdf`
- `docs/Color Codes.pdf`

---

## Roadmap

- [ ] Engagement strength calculator (pending field survey tool finalization)
- [ ] Phase-specific accelerator question matrix (appendix content)
- [ ] Live people group data integration (Joshua Project API)
- [ ] Multi-language support
- [ ] Remote hosted server deployment

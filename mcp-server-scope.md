# MCP Server Scope Document
## Phases of Engagement — v1

---

## Overview

The Phases of Engagement MCP server exposes the framework's knowledge, logic, and guardrails as structured, queryable tools and resources for AI assistants. It is the single source of truth for phase definitions, accelerator diagnostics, Foundations guardrails, and field guidance — making that knowledge available to any MCP-compatible AI client in a consistent, constraint-enforced way.

The server does not replace human discernment, field knowledge, or prayer. It structures and surfaces the framework so that those things can be better informed.

---

## Goals

- Make the full Phases + Accelerators + Foundations integrated model available to AI tools used by field teams, mobilizers, trainers, and researchers
- Enforce Foundations guardrails server-side so they are consistently applied regardless of client or context
- Support phase-aware, agency-aware responses (outside worker vs. local church leadership)
- Serve as the backend for multiple consumer surfaces (Claude.ai, custom chatbots, API integrations)
- Be updatable in one place as the framework evolves

---

## Non-Goals (v1)

- Does not connect to live people group databases (Joshua Project, IMB) — static framework knowledge only
- Does not store user data or people group records
- Does not replace field assessment — it informs it
- Does not make theological determinations — it surfaces the framework's parameters and flags tensions
- Does not include engagement strength calculation (development in process per the toolkit)

---

## User Personas

| Persona | How They Use the Server |
|---|---|
| **Field team** | Assess phase, get phase-specific accelerator questions, plan next steps |
| **Mobilizer** | Understand what type of worker a given phase requires, cast vision with framework language |
| **Trainer/educator** | Generate phase-specific training content, explain framework components accurately |
| **Researcher** | Query phase definitions, transition criteria, framework terminology |
| **Content creator** | Draft comms, use cases, and release materials grounded in the framework |
| **Developer** | Build tools and interfaces on top of the server via the MCP protocol |

---

## Server Architecture

### Resources
Structured data the model reads on demand. Static but authoritative.

| Resource | Description |
|---|---|
| `phases` | All 8 phase definitions (0–7 + 0-R) with markers, descriptions, and transition criteria |
| `accelerators` | All 12 accelerator definitions with Missionary Task mappings and Foundations guardrails |
| `missionary-task` | The 6-component Missionary Task with descriptions and phase relevance |
| `foundations-guardrails` | Guardrails by category: contextualization, compassion, indigeneity, collaboration, sending |
| `accelerator-phase-matrix` | Phase-specific diagnostic questions for each of the 12 accelerators |
| `indigeneity-standards` | The Four Selfs with per-phase application and failure mode descriptions |
| `glossary` | Canonical definitions for all framework terms |
| `engagement-strength` | Strength level descriptions (Unknown → Flourishing) |

---

### Tools
Logic the model calls to reason about a specific context. Returns structured output.

#### `assess_phase`
Walks the sequential decision tree from the Toolkit's Quick Start Guide.
- **Input:** Answers to sequential phase criteria questions (can be free-text or structured)
- **Output:** Determined phase (0–7 or 0-R), reasoning chain, key evidence, suggested next question if ambiguous
- **Guardrail:** Flags 0-R when prior data is >3 years old

#### `get_accelerators_for_phase`
Returns the right diagnostic questions and guidance for a given phase.
- **Input:** Phase number, optional context (people group type, geography, current team composition)
- **Output:** Ranked accelerator questions appropriate to the phase, each with its Foundations guardrail and agency note (outside-led vs. locally-led)
- **Guardrail:** At Phase 4+, all output is framed in terms of local agency

#### `get_transition_criteria`
What would it take to move from the current phase to the next?
- **Input:** Current phase
- **Output:** Specific markers and evidences required for the next phase, common failure modes that stall transition, accelerator domains most relevant to the transition

#### `check_indigeneity_alignment`
Evaluates a proposed strategy or approach against the Four Selfs and Foundations' indigeneity standard.
- **Input:** Phase, proposed approach or action (free text)
- **Output:** Alignment assessment, specific dependency risks flagged, Foundations citation, suggested reframe if needed

#### `get_missionary_task_for_phase`
Which of the 6 Missionary Task components are primary, secondary, or future-facing at a given phase?
- **Input:** Phase number
- **Output:** Component priority map, primary agent (outside vs. local), what Exit to Partnership looks like from here

#### `check_foundations_guardrail`
Given an accelerator and a proposed application, returns applicable guardrails.
- **Input:** Accelerator name, proposed application (free text), phase
- **Output:** Guardrail category (clean / reframe / guardrail / significant guardrail), specific Foundations principle at stake, suggested compliant reframe

---

### Prompts
Pre-built, framework-aware templates that structure common workflows. Callable by name from any MCP client.

| Prompt | Description |
|---|---|
| `phase-assessment-interview` | Structured conversation to assess a people group's current phase |
| `accelerator-planning-session` | Facilitated team diagnostic: identify 1–2 accelerators to prioritize, with guardrails applied |
| `field-briefing` | Generates a phase-specific field briefing: current situation, priorities, primary agents, next steps |
| `training-module-outline` | Generates a training outline for a specific phase or accelerator for practitioners |
| `mobilizer-vision-brief` | Generates a mobilization brief grounded in framework language and Foundations conviction |
| `comms-draft` | Drafts release or communications content for a specific audience (field, church, missions world) |

---

## Data Model

All framework content is stored as structured JSON/Markdown in the server's data layer. No external database required for v1.

```
/data
  /phases
    phase-0.json
    phase-1.json
    ...
    phase-7.json
  /accelerators
    prayer.json
    scripture-access.json
    ...
    marketplace.json
  /missionary-task
    entry.json
    evangelism.json
    ...
    exit-to-partnership.json
  /guardrails
    contextualization.json
    compassion.json
    indigeneity.json
    collaboration.json
    sending.json
  /matrices
    accelerator-phase-questions.json
    phase-transition-criteria.json
    missionary-task-phase-map.json
  glossary.json
  engagement-strength.json
```

---

## Guardrail Enforcement Model

Guardrails are not applied post-hoc — they are embedded in tool responses. Every tool that returns guidance:

1. Checks the phase to determine primary agency (outside vs. local)
2. Attaches the relevant Foundations guardrail to each recommendation
3. Flags significant tension items explicitly before surfacing the recommendation
4. Returns a `foundations_note` field on any output that touches contextualization, compassion, sending, or collaboration

This ensures that any AI using the server cannot surface a recommendation without the constraint attached.

---

## Technical Stack

- **Runtime:** Node.js / TypeScript
- **Protocol:** Model Context Protocol (MCP) — `@modelcontextprotocol/sdk`
- **Transport:** stdio (local) + HTTP/SSE (remote/hosted)
- **Data:** Static JSON + Markdown (no database for v1)
- **Hosting:** Remote deployment on Railway or Render (single service, always-on)

---

## v1 Scope Summary

| Category | Count | Notes |
|---|---|---|
| Resources | 8 | All static framework knowledge |
| Tools | 6 | Phase assessment, accelerator guidance, transition criteria, indigeneity check, task mapping, guardrail check |
| Prompts | 6 | Assessment, planning, briefing, training, mobilization, comms |

---

## Future Scope (Post-v1)

- Live people group data integration (Joshua Project API, IMB)
- Engagement strength calculator (when field survey tool is finalized)
- Multi-language support for non-English practitioners
- User/team context persistence (remembering a team's people group across sessions)
- Accelerator planning worksheet generation (PDF/export)
- Analytics: which tools/prompts are most used, by which persona

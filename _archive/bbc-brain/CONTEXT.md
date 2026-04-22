# BBC Brain — System Context

## What This Is

A siloed workspace system for running a web design agency. Each workspace handles one phase of the client lifecycle. An agent drops into a workspace, reads its CONTEXT.md, does its work, and exits.

**CLAUDE.md** (always loaded in system prompt) has the full folder map, ID systems, and file placement rules. This file is routing only.

---

## Cross-Workspace Flow

```
agency-identity (voice + pillars)
    ↓ informs
project-engine (pipeline) → brief-lab (scoping + proposals)
    ↓
build-studio (design → dev → deploy)
    ↓
delivery-playbook (launch + handoff) → agency-rhythm (retainer + reporting) → loop
```

---

## Task Routing

| Your Task | Go Here | You'll Also Need |
|-----------|---------|-----------------|
| **Write a proposal or SOW** | `brief-lab/CONTEXT.md` | `agency-identity/CONTEXT.md` for voice loading guidance |
| **Add or track a project** | `project-engine/CONTEXT.md` | `services-and-packages/client-segments.md` for tier fit |
| **Create a design spec** | `build-studio/workflows/02-designs/CONTEXT.md` | `build-studio/docs/` for components + design system |
| **Build a site** | `build-studio/workflows/03-builds/CONTEXT.md` | `build-studio/docs/` for components + design system |
| **Deploy a site** | `delivery-playbook/CONTEXT.md` | Repo name + target platform |
| **Handoff to client** | `delivery-playbook/client-handoff.md` | — |
| **Scope services or pricing** | `services-and-packages/CONTEXT.md` | — |
| **Plan the sprint** | `agency-rhythm/CONTEXT.md` | — |
| **Understand BBC brand/voice** | `agency-identity/CONTEXT.md` | Full read of all agency-identity files |

---

## Workspace Purpose (One Line Each)

| Workspace | Purpose |
|-----------|---------|
| `agency-identity/` | Agency brand, voice rules, service pillars. **READ-ONLY.** |
| `brief-lab/` | Write and refine client briefs, proposals, and scopes of work. |
| `project-engine/` | Track active projects, pipeline, and incoming leads. |
| `services-and-packages/` | Service tier definitions, pricing, and client fit. |
| `delivery-playbook/` | Deployment, hosting setup, and client handoff. |
| `agency-rhythm/` | Sprint cadence, client reporting, and retainer ops. |
| `build-studio/` | Design → dev → deploy pipeline (brief → spec → build → live). |

Each workspace has its own CONTEXT.md with full details. Read that, not this file, when working in a workspace.

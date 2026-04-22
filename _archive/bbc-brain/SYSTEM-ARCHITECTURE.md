# System Architecture — How BBC Brain's Agent Routing Works

This document explains why the system is designed this way, how agents navigate it, and how to maintain it.

---

## The Problem This Solves

Every AI agent has a limited context window. Loading your entire agency knowledge base into one conversation burns tokens on files the agent doesn't need and dilutes the context that matters. The result: worse outputs, higher costs, and agents that lose focus mid-task.

The fix: **give each agent exactly the right context for its job, and nothing else.**

---

## The Three-Layer Architecture

```
┌─────────────────────────────────────────────────┐
│  LAYER 0: CLAUDE.md                             │
│  Always in system prompt. Every conversation.   │
│  Contains: folder map, ID systems, file rules.  │
│  Purpose: orientation. "Where am I?"            │
│  Token cost: ~900 tokens (always loaded)        │
└─────────────────────────┬───────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│  LAYER 1: Top-level CONTEXT.md                  │
│  Read on entry to the workspace.                │
│  Contains: task routing table only.             │
│  Purpose: navigation. "Where do I go?"          │
│  Token cost: ~300 tokens (read once)            │
└─────────────────────────┬───────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│  LAYER 2: Workspace CONTEXT.md files            │
│  Read per-task, per-workspace.                  │
│  Contains: scope, what-to-load tables, process. │
│  Purpose: instruction. "What do I do?"          │
│  Token cost: ~200-500 tokens each               │
└─────────────────────────┬───────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│  LAYER 3: Content files                         │
│  Loaded selectively per the CONTEXT.md tables.  │
│  Contains: the actual reference material.       │
│  Purpose: knowledge. "What do I need to know?"  │
│  Token cost: varies (500-3000 tokens each)      │
└─────────────────────────────────────────────────┘
```

**An agent reads down the layers, stopping as soon as it has what it needs.** A deployment agent might only need Layers 0-1. A proposal-writing agent reads down to Layer 3 (voice rules, brief framework, templates). No agent reads everything.

---

## How Agents Navigate the System

### Scenario: You ask an agent to write a client proposal

```
1. CLAUDE.md (auto-loaded)
   → Agent sees: "Writing a proposal? → brief-lab/CONTEXT.md"

2. brief-lab/CONTEXT.md
   → Agent sees: "Load agency-identity/CONTEXT.md for voice guidance"
   → Agent sees: "Load brief-framework.md and proposal-templates.md"

3. agency-identity/CONTEXT.md
   → Agent sees the "Writing a proposal" table:
     • voice-and-tone.md → only "Agency Voice Rules" section
     • who-jorge-is.md → only "One-Sentence Version" + "Credibility Rule"
     • service-pillars.md → only the relevant pillar section

4. Agent loads ONLY those sections, writes the proposal.
```

**Total context loaded:** ~4,000 tokens of targeted material.
**Without this system:** Agent loads all agency files (~6,000+ tokens of strategy rationale it doesn't need).

### Scenario: You ask an agent to build a page

```
1. CLAUDE.md (auto-loaded)
   → "Build a site? → build-studio/workflows/03-builds/CONTEXT.md"

2. 03-builds/CONTEXT.md
   → "Load the design spec, component-standards.md, design-system.md"

3. Agent reads the spec, builds the page.
```

**No agency-identity loaded.** No voice rules. No pillar descriptions. The build agent writes code — different job, different context.

### Scenario: You use subagents in parallel

```
Main agent → spawns 3 subagents:

  Subagent A: "Write the proposal"
    → Loads: brief-lab + agency-identity sections + brief-framework + templates
    → Context: ~4,000 tokens

  Subagent B: "Check service fit"
    → Loads: services-and-packages + client-segments
    → Context: ~2,000 tokens

  Subagent C: "Confirm deploy target"
    → Loads: delivery-playbook/deployment-guide.md
    → Context: ~1,500 tokens

Each subagent gets exactly what it needs.
```

---

## Key Design Patterns

### 1. One-Way Cross-References

Every workspace points **outward** to what it needs. No workspace points back.

```
brief-lab/CONTEXT.md says: "Read agency-identity for voice"
agency-identity/CONTEXT.md does NOT say: "brief-lab reads us for voice"
```

Why: If A references B and B references A, you get N-squared redundancy. One-way pointers scale linearly.

### 2. Selective Section Routing

`agency-identity/CONTEXT.md` doesn't just say "read voice-and-tone.md." It says:

> Read the "Agency Voice Rules" section (6 rules) + "What the Voice Is NOT"

This means a 150-line file gets loaded as ~70 lines of actionable rules.

### 3. Canonical Sources

Every piece of information has ONE canonical home:

| Information | Canonical Source | NOT Duplicated In |
|-------------|-----------------|-------------------|
| Voice rules | `voice-and-tone.md` | brief-lab, proposal-templates |
| Pillar definitions | `service-pillars.md` | brief-lab, CLAUDE.md |
| ID systems | `CLAUDE.md` | project-engine, CONTEXT.md |
| Design tokens | `design-system.md` | component-standards, CLAUDE.md |
| Pricing | `services-and-packages/tier-*/SERVICES.md` | brief-lab, CLAUDE.md |
| Deploy process | `delivery-playbook/deployment-guide.md` | build-studio, agency-rhythm |

### 4. CONTEXT.md = Routing, Not Content

CONTEXT.md files answer three questions:
1. **What is this folder?** (one sentence)
2. **What do I load?** (table of files + sections)
3. **What's the process?** (numbered steps)

They never contain the actual reference material.

---

## Maintaining the System

### When to edit a CONTEXT.md
- A new file is added to a workspace → update the file table
- A workflow step changes → update the process
- A cross-reference is added → add a one-way pointer (outward only)

### Warning signs a CONTEXT.md has grown too large
- Over 80 lines → probably duplicating content
- Contains pricing or rates → those belong in `services-and-packages/`
- Contains "Why It Works" sections → strategic rationale, not routing
- References same info that another CONTEXT.md also contains → find the canonical source

### Adding a new workspace
1. Create `new-workspace/CONTEXT.md` following the pattern: what is it, what to load, process
2. Add one row to `CONTEXT.md` (top-level) task routing table
3. Add one row to `CLAUDE.md` folder structure
4. Add one-way cross-references FROM the new workspace TO existing ones (not the reverse)

---

## Current System Map

```
bbc-brain/
│
├── CLAUDE.md ──────────────── Layer 0 (always loaded, ~900 tokens)
├── CONTEXT.md ─────────────── Layer 1 (routing table, ~300 tokens)
├── SYSTEM-ARCHITECTURE.md ─── This file (human reference, never loaded by agents)
│
├── agency-identity/ ────────── READ-ONLY agency DNA
│   ├── CONTEXT.md              → Selective section routing tables
│   ├── who-jorge-is.md         → Jorge profile + credibility surfacing rule
│   ├── voice-and-tone.md       → 6 voice rules + anti-patterns
│   ├── agency-story.md         → BBC origin and positioning
│   └── service-pillars.md      → S1-S6 definitions + example projects
│
├── brief-lab/ ──────────────── Proposals & scoping workspace
│   ├── CONTEXT.md              → Process + what-to-load table
│   ├── brief-framework.md      → Discovery → SOW framework
│   ├── proposal-templates.md   → Templates + rules + review checklist
│   ├── discovery/              → Client discovery notes
│   ├── proposals/              → Draft and final proposals
│   └── scopes/                 → Signed scopes of work
│
├── project-engine/ ──────────── Pipeline & tracking
│   ├── CONTEXT.md              → Process (check bank → capture → formalize)
│   ├── project-bank.md         → P-001+ with status tracking
│   └── lead-capture.md         → Raw lead notes
│
├── services-and-packages/ ───── Service offerings
│   ├── CONTEXT.md              → Tier structure + cross-references
│   ├── client-segments.md      → Client types + fit scoring
│   ├── tier-1-websites/
│   ├── tier-2-design-systems/
│   └── tier-3-retainer/
│
├── delivery-playbook/ ────────── Launch & handoff
│   ├── CONTEXT.md              → File table + use cases
│   ├── deployment-guide.md     → Netlify + Cloudflare Pages workflows
│   ├── client-handoff.md       → Handoff checklist + training
│   └── hosting-setup.md        → DNS, SSL, domain setup
│
├── agency-rhythm/ ────────────── Operations
│   ├── CONTEXT.md              → Sprint flow + reporting
│   ├── sprint-cadence.md       → Weekly/biweekly rhythm
│   └── client-reporting.md     → Reporting templates + tracker
│
└── build-studio/ ─────────────── Production pipeline
    ├── CONTEXT.md              → Entry point + routing
    ├── docs/
    │   ├── CONTEXT.md          → Component standards + design system pointers
    │   ├── component-standards.md
    │   └── design-system.md
    ├── workflows/
    │   ├── CONTEXT.md          → 4-stage pipeline routing
    │   ├── 01-briefs/          → Approved briefs (input)
    │   ├── 02-designs/         → Design specs and Figma references
    │   ├── 03-builds/          → Build tracking (active/complete)
    │   └── 04-live/            → Live site records
    └── src/                    → Starter templates & shared code
```

---

## Quick Reference: Token Budget by Task

| Task | Files Loaded | Est. Tokens |
|------|-------------|-------------|
| Write a proposal | brief-lab CONTEXT + agency-identity sections + brief-framework + template | ~4,000 |
| Track a new project | project-engine CONTEXT + project-bank | ~1,500 |
| Generate design spec | 02-designs CONTEXT + brief + component-standards + design-system | ~5,000 |
| Build a site | 03-builds CONTEXT + spec + component-standards + design-system | ~4,500 |
| Deploy a site | deployment-guide + repo name + platform | ~1,000 |
| Client handoff | client-handoff.md + hosting-setup.md | ~2,000 |
| Plan the sprint | agency-rhythm CONTEXT + sprint-cadence | ~1,500 |
| Full brand review | All agency-identity files | ~5,000 |

No single task requires loading more than ~5,000 tokens of reference material, even though the full system is 15,000+ tokens.

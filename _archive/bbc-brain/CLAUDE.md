# BBC Brain — Quick Reference

**Read this first.** It maps the workspace structure so you know where to go for specific tasks.

For deep context on any workspace, read its `CONTEXT.md`. This file is just the map.

---

## What BBC Is

**BBC** is a web design and development agency owned by Jorge. We build custom websites, brand identities, and digital experiences for small-to-mid-size businesses. Clients range from local restaurants to service businesses. All sites deploy to Netlify or Cloudflare Pages.

---

## Folder Structure

```
bbc-brain/
├── CONTEXT.md                          ← Task routing table
├── CLAUDE.md                           ← You are here (quick reference)
├── SYSTEM-ARCHITECTURE.md              ← How agent routing works
│
├── agency-identity/                    ← Brand, voice, service pillars (READ-ONLY)
│   ├── CONTEXT.md
│   ├── who-jorge-is.md
│   ├── voice-and-tone.md
│   ├── agency-story.md
│   └── service-pillars.md
│
├── brief-lab/                          ← Write briefs, proposals, SOWs here
│   ├── CONTEXT.md
│   ├── brief-framework.md
│   ├── proposal-templates.md
│   ├── discovery/
│   ├── proposals/
│   └── scopes/
│
├── project-engine/                     ← Track projects, leads, pipeline
│   ├── CONTEXT.md
│   ├── project-bank.md                 ← All projects (P-001+)
│   └── lead-capture.md
│
├── services-and-packages/              ← Service tiers & pricing
│   ├── CONTEXT.md
│   ├── client-segments.md
│   ├── tier-1-websites/SERVICES.md
│   ├── tier-2-design-systems/SERVICES.md
│   └── tier-3-retainer/SERVICES.md
│
├── delivery-playbook/                  ← Deployment, hosting, handoff
│   ├── CONTEXT.md
│   ├── deployment-guide.md
│   ├── client-handoff.md
│   └── hosting-setup.md
│
├── agency-rhythm/                      ← Sprint cadence, client reporting
│   ├── CONTEXT.md
│   ├── sprint-cadence.md
│   └── client-reporting.md
│
└── build-studio/                       ← Design → dev → deploy pipeline
    ├── CONTEXT.md
    ├── docs/
    │   ├── CONTEXT.md
    │   ├── component-standards.md
    │   └── design-system.md
    ├── workflows/
    │   ├── CONTEXT.md
    │   ├── 01-briefs/                  ← Approved briefs (input)
    │   ├── 02-designs/                 ← Figma specs & design docs
    │   ├── 03-builds/active|complete/  ← Active builds
    │   └── 04-live/                    ← Live site records
    └── src/                            ← Starter templates & shared code
```

---

## Quick Navigation

**Want to...?** → **Read this:**

- **Understand BBC's voice/brand** → `agency-identity/CONTEXT.md`
- **Write a proposal or SOW** → `brief-lab/CONTEXT.md`
- **Track or add a project** → `project-engine/project-bank.md`
- **Check service pricing** → `services-and-packages/CONTEXT.md`
- **Deploy a site** → `delivery-playbook/deployment-guide.md`
- **Handoff to client** → `delivery-playbook/client-handoff.md`
- **Plan the sprint** → `agency-rhythm/sprint-cadence.md`
- **Generate a design spec** → `build-studio/workflows/02-designs/CONTEXT.md`
- **Build a site** → `build-studio/workflows/03-builds/CONTEXT.md`
- **Go live** → `build-studio/workflows/04-live/CONTEXT.md`

---

## The Workflow

```
agency-identity (voice + pillars) → project-engine (pipeline) → brief-lab (scoping)
    ↓
build-studio (design → dev → deploy)
    ↓
delivery-playbook (launch + handoff) → agency-rhythm (retainer + reporting) → loop
```

---

## ID Systems

- **Pillars:** `S1` (Brand & Identity), `S2` (Web Design), `S3` (Web Development), `S4` (E-Commerce), `S5` (Ongoing Growth), `S6` (Digital Strategy)
- **Projects:** `P-001` and up (e.g., `P-023-kris-mid-city`)
- **Leads:** `L-001` and up
- **Deliverables:** `[client]-[type]-v[n]` (e.g., `kris-homepage-v2.figma`)
- **Hook Types (proposals):** `1` (Problem-First), `2` (Results-Lead), `3` (Comparison), `4` (Social Proof), `5` (Investment Frame)

---

## File Placement Rules

### Briefs & Proposals
- **Discovery notes:** `brief-lab/discovery/[client]-discovery.md`
- **Proposals:** `brief-lab/proposals/[client]-proposal-[draft|final].md`
- **Signed SOWs:** `brief-lab/scopes/[client]-sow-signed.md`
- **Ready for build:** Copy brief to `build-studio/workflows/01-briefs/[client]-brief.md`

### Design Specs
- `build-studio/workflows/02-designs/[client]-[page]-spec.md`

### Build Logs
- **Active:** `build-studio/workflows/03-builds/active/[client].md`
- **Complete:** `build-studio/workflows/03-builds/complete/[client].md`

### Live Sites
- `build-studio/workflows/04-live/[client]-live.md`

---

## Token Management

**Each workspace is siloed.** Load only what the task requires.

- Writing a proposal? → `agency-identity/voice-and-tone.md` + `brief-lab/brief-framework.md` + `proposal-templates.md`
- Generating a design spec? → `01-briefs/[file]` + `docs/component-standards.md` + `docs/design-system.md`
- Building a site? → `02-designs/[file]` + `docs/component-standards.md` + `docs/design-system.md`
- Deploying? → `delivery-playbook/deployment-guide.md` + site URL

---

## Special Notes

- **agency-identity is READ-ONLY** — It's the DNA of every client conversation and deliverable.
- **All deploys go to Netlify or Cloudflare Pages** — See `delivery-playbook/deployment-guide.md`
- **Active BBC projects:** bbc-v3, kris-mid-city, whatsshakinbacon, remodelnow, doberts-canvas
- **Jorge is the sole owner and primary builder** — Write briefs and proposals from his POV

---

## When You First Start Working

1. Read this file (done)
2. Identify your task (briefing? building? deploying? reporting?)
3. Navigate to the relevant workspace
4. Read that workspace's `CONTEXT.md`
5. Do the work
6. Reference other workspaces only via the cross-references in CONTEXT files

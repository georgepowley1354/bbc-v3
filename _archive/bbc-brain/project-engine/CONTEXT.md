# Project Engine — Workspace Context

## What This Is

The pipeline and tracking hub for all BBC projects. Every active project, incoming lead, and potential engagement lives here.

---

## Files in This Workspace

| File | What It Contains |
|------|----------------|
| `project-bank.md` | All projects (P-001+) with status, tier, and milestones |
| `lead-capture.md` | Raw lead notes before a discovery call |

---

## What to Load by Task

### Check project status
- `project-bank.md` → find the project row + check milestone column

### Add a new project
- `project-bank.md` → add row with next P-ID
- `services-and-packages/client-segments.md` → confirm tier assignment

### Capture a new lead
- `lead-capture.md` → append entry at bottom

### Formalize a lead into a project
1. Move entry from `lead-capture.md` to `project-bank.md` with next P-ID
2. Create `brief-lab/discovery/[client]-discovery.md`
3. Schedule discovery call

---

## Project Status Values

| Status | Meaning |
|--------|---------|
| `lead` | Expressed interest, no discovery yet |
| `discovery` | Discovery call scheduled or complete |
| `proposal` | Proposal sent, awaiting decision |
| `active` | Signed scope, work in progress |
| `review` | Build complete, in client review |
| `live` | Site launched and handed off |
| `retainer` | Ongoing support engagement |
| `paused` | On hold (client side) |
| `closed` | Completed and closed out |
| `lost` | Went elsewhere |

---

## Process

```
New inquiry → lead-capture.md
    ↓
Discovery call → discovery/[client]-discovery.md
    ↓
Proposal sent → proposals/[client]-proposal-draft.md
    ↓
SOW signed → scopes/[client]-sow-signed.md
    ↓
Brief to build-studio → build-studio/workflows/01-briefs/[client]-brief.md
    ↓
Build active → build-studio/workflows/03-builds/active/[client].md
    ↓
Site live → build-studio/workflows/04-live/[client]-live.md
    ↓
(Optional) Retainer → update project-bank.md status to 'retainer'
```

# Build Studio — Workspace Context

## What This Is

The production pipeline for BBC builds. Every client project moves through 4 stages: brief → design → build → live. Each stage has its own folder and CONTEXT.md.

---

## Pipeline Overview

```
01-briefs/ (input)
    ↓
02-designs/ (design specs + Figma refs)
    ↓
03-builds/ (code + active tracking)
    ↓
04-live/ (launch record)
```

---

## Files in This Workspace

| Location | What It Contains |
|----------|----------------|
| `docs/component-standards.md` | Reusable component patterns and conventions |
| `docs/design-system.md` | Agency-level design tokens and rules |
| `workflows/CONTEXT.md` | Routing between the 4 stages |
| `workflows/01-briefs/` | Approved client briefs (input to design) |
| `workflows/02-designs/` | Design specs and Figma references |
| `workflows/03-builds/active/` | Active build tracking files |
| `workflows/03-builds/complete/` | Completed build records |
| `workflows/04-live/` | Live site records and launch notes |
| `src/` | Starter templates and shared components |

---

## What to Load by Task

### Starting a new project (moving brief to design)
- `workflows/01-briefs/[client]-brief.md`
- `docs/component-standards.md`
- `docs/design-system.md`
- `workflows/02-designs/CONTEXT.md`

### Building from a design spec
- `workflows/02-designs/[client]-[page]-spec.md`
- `docs/component-standards.md`
- `docs/design-system.md`
- `workflows/03-builds/CONTEXT.md`

### Deploying a build
- `workflows/04-live/CONTEXT.md`
- `delivery-playbook/deployment-guide.md`

### Reference: components or design tokens
- `docs/component-standards.md` or `docs/design-system.md` → relevant section only

---

## Entry Point by Role

| What You're Doing | Start Here |
|-------------------|-----------|
| Generating a design spec from a brief | `workflows/02-designs/CONTEXT.md` |
| Coding from an existing spec | `workflows/03-builds/CONTEXT.md` |
| Deploying and going live | `workflows/04-live/CONTEXT.md` |
| Checking components or tokens | `docs/CONTEXT.md` |

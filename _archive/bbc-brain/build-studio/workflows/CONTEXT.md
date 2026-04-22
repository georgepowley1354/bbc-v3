# Build Studio Workflows — Context

## What This Is

The 4-stage production pipeline. Every BBC project moves linearly through these stages.

---

## Pipeline

```
01-briefs/
  ↓ brief approved → design phase starts
02-designs/
  ↓ design approved → build phase starts
03-builds/active/
  ↓ build complete → client review → launch
04-live/
```

---

## Stage Routing

| Stage | You're Here When | Read This |
|-------|-----------------|-----------|
| `01-briefs/` | You have a signed SOW and need to begin design | `01-briefs/CONTEXT.md` |
| `02-designs/` | Brief is approved and you need to create or review a design spec | `02-designs/CONTEXT.md` |
| `03-builds/` | Design is approved and you need to start coding | `03-builds/CONTEXT.md` |
| `04-live/` | Build is complete and you're deploying | `04-live/CONTEXT.md` |

---

## File Handoffs Between Stages

| From | To | What Moves |
|------|----|-----------|
| `brief-lab/scopes/` | `01-briefs/` | Signed SOW → distilled brief |
| `01-briefs/` | `02-designs/` | Brief → design spec |
| `02-designs/` | `03-builds/` | Design spec + Figma link |
| `03-builds/active/` | `04-live/` | Build log + deploy checklist |

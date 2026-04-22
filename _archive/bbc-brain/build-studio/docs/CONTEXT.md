# Build Studio Docs — Workspace Context

## What This Is

The canonical reference for BBC's component conventions and design tokens. Load these when designing specs or building components.

---

## Files in This Workspace

| File | What It Contains |
|------|----------------|
| `component-standards.md` | Reusable component patterns, naming, and conventions |
| `design-system.md` | Design tokens: colors, typography, spacing, breakpoints |

---

## What to Load by Task

### Designing a new page (spec work)
- `design-system.md` → full file (tokens needed for spec)
- `component-standards.md` → sections relevant to components being designed

### Building a component
- `component-standards.md` → full file
- `design-system.md` → token reference section

### Quick token lookup
- `design-system.md` → "Tokens Quick Reference" section only

### Reviewing a design for consistency
- `design-system.md` → "Typography" + "Color" sections
- `component-standards.md` → "Review Checklist"

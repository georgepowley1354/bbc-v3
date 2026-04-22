# Stage 03 — Builds

## What This Stage Is

Active development. Briefs are approved, designs are approved, code is being written. Build tracking files live in `active/`. Completed builds move to `complete/`.

---

## What to Load

- The design spec: `02-designs/[client]-[page]-spec.md`
- Component standards: `docs/component-standards.md`
- Design system: `docs/design-system.md` → "Tokens Quick Reference" section

---

## Build Tracking File Format

```markdown
# [Client Name] — Build Log
Project ID: P-[id]
Spec: 02-designs/[client]-[page]-spec.md
Repo: [github url]
Staging: [netlify/cloudflare staging URL]
Started: [date]

---

## Status

| Page/Component | Status | Notes |
|---------------|--------|-------|
| NavBar | complete | — |
| Homepage — Hero | complete | — |
| Homepage — Services | in progress | need final copy |
| Homepage — Testimonials | not started | waiting on client to provide quotes |
| About | not started | — |
| Services | not started | — |
| Contact + Form | not started | — |
| Footer | complete | — |

---

## Blockers

- [ ] [What's blocking and what's needed to unblock it]

---

## Change Requests (mid-build)

| Request | Status | Impact |
|---------|--------|--------|
| [description] | [pending approval / approved / declined] | [in scope / change order required] |

---

## Build Checklist (pre-handoff to 04-live)

- [ ] All pages build without errors
- [ ] No console errors
- [ ] Mobile layout verified (320px, 768px, 1280px)
- [ ] All links work (no 404s)
- [ ] Contact form tested end-to-end
- [ ] Analytics tag in place
- [ ] Meta tags on all pages
- [ ] Images optimized
- [ ] Lighthouse score 90+ on Performance, Accessibility, SEO
- [ ] Staging URL shared with client for review
- [ ] Client approval received in writing (email OK)
```

---

## Process

1. Create build log in `active/[client].md`
2. Set up repo and initial Astro/Next.js project
3. Install dependencies, configure deploy target
4. Build components in this order:
   a. Design tokens (CSS variables from spec)
   b. Global layout (NavBar, Footer, SectionWrapper)
   c. Homepage
   d. Inner pages
   e. Contact form + integrations
5. Build complete → run build checklist
6. Share staging URL with client for review
7. Client approves → move to `04-live/`
8. Move build log from `active/` to `complete/`

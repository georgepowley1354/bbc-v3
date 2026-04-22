# Stage 01 — Briefs

## What This Stage Is

Input to the design phase. Briefs land here when the SOW is signed and design is ready to start.

---

## Brief File Format

```markdown
# [Client Name] — Build Brief
Project ID: P-[id]
Date: [date]
SOW Reference: brief-lab/scopes/[client]-sow-signed.md

---

## Project Summary
[2-3 sentences: what the business does, what we're building, why]

## Deliverables
- [Page or feature 1]
- [Page or feature 2]
...

## Pages
| Page | Purpose | Key Content |
|------|---------|------------|
| Homepage | First impression + CTA | Hero, services overview, testimonial, CTA |
| About | Trust building | Jorge + team, story, values |
| Services | Convert leads | Service list with descriptions and pricing |
| Contact | Lead capture | Form, address, hours |

## Brand Assets Available
- Logo: [yes / pending]
- Colors: [brand hex codes or "pending"]
- Fonts: [font names or "pending"]
- Photography: [client provides / we source stock / pending]
- Copy: [client provides / we write / mix]

## Technical Requirements
- Platform: Astro / Next.js
- CMS: [Sanity / None / TBD]
- Forms: [Netlify Forms / Custom]
- Integrations: [booking system, maps, etc.]
- Deploy target: [Netlify / Cloudflare Pages]

## Design Direction
[What the client described — adjectives, references, sites they liked]

## What NOT to Design
[Anything explicitly out of scope or that the client said they don't want]

## Timeline
| Milestone | Date |
|-----------|------|
| Design mockups to client | [date] |
| Design approved | [date] |
| Build complete | [date] |
| Launch | [date] |
```

---

## Process

1. Copy SOW from `brief-lab/scopes/[client]-sow-signed.md`
2. Distill into build brief format above
3. Confirm all brand assets are available (chase missing ones before starting design)
4. Move to `02-designs/` when brief is complete and assets are in hand

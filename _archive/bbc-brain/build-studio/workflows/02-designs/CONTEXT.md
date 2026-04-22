# Stage 02 — Designs

## What This Stage Is

Design specs and Figma references for approved briefs. A spec here means design is approved and build can start.

---

## What to Load

- The brief: `01-briefs/[client]-brief.md`
- Component reference: `docs/component-standards.md`
- Design tokens: `docs/design-system.md`

---

## Design Spec Format

```markdown
# [Client Name] — Design Spec
Page: [page name]
Figma: [figma link or "file: [path]"]
Brief: 01-briefs/[client]-brief.md
Status: [draft | approved]

---

## Color Palette (this project)

| Role | Token | Hex |
|------|-------|-----|
| Primary | --color-primary | #[hex] |
| Secondary | --color-secondary | #[hex] |
| Accent | --color-accent | #[hex] |
| Background | --color-bg | #[hex] |
| Text | --color-text | #[hex] |

## Typography (this project)

| Role | Font | Weight | Size |
|------|------|--------|------|
| Heading | [font name] | 700 | var(--text-4xl) |
| Body | [font name] | 400 | var(--text-base) |
| Label | [font name] | 600 | var(--text-sm) |

---

## Page Structure

### [Section Name] — e.g., Hero
- Component: `HeroSection` variant="split"
- Headline: "[headline text]"
- Subtext: "[subtext]"
- CTA: "[label]" → /contact
- Image: [description of image]
- Background: var(--color-bg)
- Notes: [any specific implementation notes]

### [Section Name] — e.g., Services
- Component: `Card` variant="service" (grid, 3 columns desktop / 1 mobile)
- Items: [list of service cards]
- Background: var(--color-neutral-100)
- Notes: [hover states, CTA per card, etc.]

[Repeat for each section]

---

## Responsive Notes

- Mobile: [anything that changes significantly on mobile]
- Tablet: [anything specific to tablet]

## Interaction Notes

- [Any hover states, transitions, or animations to implement]

## Assets Needed

| Asset | Status | Source |
|-------|--------|--------|
| Hero image | [ready / pending] | [source] |
| Logo SVG | [ready / pending] | [source] |
| [other] | | |
```

---

## Process

1. Read brief from `01-briefs/[client]-brief.md`
2. Load `docs/design-system.md` and `docs/component-standards.md`
3. Open Figma and build out the design
4. Write spec file (this format) as the code-ready translation of the Figma
5. Design review: share Figma + spec link with client
6. After approval: move spec to `03-builds/` and start build
7. Update project-bank.md → add "design approved" milestone date

---
phase: "03"
plan: "03-02"
subsystem: "home-page"
tags: ["next.js", "framer-motion", "tailwind", "homepage", "unsplash", "animation"]
dependency_graph:
  requires: ["03-01"]
  provides: ["home-page", "hero-section", "services-preview", "testimonials", "featured-project", "final-cta"]
  affects: ["03-03", "03-04", "03-05"]
tech_stack:
  added: []
  patterns:
    - "Named exports from all home components (not default) for explicit barrel imports in page.tsx"
    - "SeasonalBanner as pure Server Component (no animation, no use client)"
    - "Inline SVG icons in ServicesPreview — 48x48 viewBox, strokeWidth 1.5, currentColor, no fill"
    - "useReducedMotion guard: passes undefined (not false) to Framer Motion initial/animate props when true"
    - "whileInView scroll triggers with once:true and margin:-80px on all scroll sections"
key_files:
  created:
    - src/components/home/HeroSection.tsx
    - src/components/home/LogoBar.tsx
    - src/components/home/ManifestoSection.tsx
    - src/components/home/ServicesPreview.tsx
    - src/components/home/FeaturedProject.tsx
    - src/components/home/ProcessTeaser.tsx
    - src/components/home/SeasonalBanner.tsx
    - src/components/home/Testimonials.tsx
    - src/components/home/InstagramPlaceholder.tsx
    - src/components/home/FinalCTA.tsx
  modified:
    - src/app/page.tsx
decisions:
  - "SeasonalBanner has no animation — narrow strip does not benefit from scroll reveal and keeps the page feeling crisp"
  - "All home section components use named exports to match plan's import pattern in page.tsx"
  - "useReducedMotion returns undefined (not false) for Framer Motion props — consistent with 03-01 fix"
  - "ProcessTeaser connecting line uses absolute positioning within the step grid, gold/30 opacity"
  - "Testimonials use forest-mid bg with border-white/10 border rather than a card shadow, matching dark section aesthetic"
metrics:
  duration: "45 minutes"
  completed: "2026-04-12T23:15:00Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 10
  files_modified: 1
---

# Phase 03 Plan 02: Home Page Sections Summary

All 10 homepage sections built as individual React components and assembled into `src/app/page.tsx` — full-viewport hero through final dark CTA, with scroll-triggered animations, custom inline SVG icons, and Unsplash landscape photography throughout.

---

## Tasks Completed

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Build sections 1–5 (Hero, LogoBar, Manifesto, ServicesPreview, FeaturedProject) | a43fda7 | Done |
| 2 | Build sections 6–10 (ProcessTeaser, SeasonalBanner, Testimonials, InstagramPlaceholder, FinalCTA) + assemble page.tsx | e707082 | Done |

---

## Section Inventory

| # | Section | Component | Background | Commit |
|---|---------|-----------|-----------|--------|
| 1 | Hero | `HeroSection.tsx` | Photography + forest-deep gradient overlay | a43fda7 |
| 2 | Logo Bar | `LogoBar.tsx` | stone-mid | a43fda7 |
| 3 | Manifesto | `ManifestoSection.tsx` | off-white | a43fda7 |
| 4 | Services Preview | `ServicesPreview.tsx` | stone-warm | a43fda7 |
| 5 | Featured Project | `FeaturedProject.tsx` | forest-deep | a43fda7 |
| 6 | Process Teaser | `ProcessTeaser.tsx` | forest-deep | e707082 |
| 7 | Seasonal Banner | `SeasonalBanner.tsx` | gold | e707082 |
| 8 | Testimonials | `Testimonials.tsx` | forest-mid | e707082 |
| 9 | Instagram Placeholder | `InstagramPlaceholder.tsx` | stone-warm | e707082 |
| 10 | Final CTA | `FinalCTA.tsx` | forest-deep | e707082 |

---

## Unsplash Image IDs Used

These IDs should be swapped for client-provided photography before launch.

| Usage | Unsplash Photo ID | Subject |
|-------|------------------|---------|
| Hero background | `1558618666-fcd25c85cd64` | Stone terrace / golden hour |
| Manifesto right column | `1416879595882-3373a0480b5b` | Garden path / native plantings |
| Featured Project (Adirondack Terrace) | `1506126613408-eca07ce68773` | Poolside / lakeside landscape |
| Testimonial 1 photo | `1558618666-fcd25c85cd64` | Stone terrace |
| Testimonial 2 photo | `1416879595882-3373a0480b5b` | Garden path |
| Instagram grid 1 | `1506126613408-eca07ce68773` | Pool with stone coping |
| Instagram grid 2 | `1416879595882-3373a0480b5b` | Garden path |
| Instagram grid 3 | `1558618666-fcd25c85cd64` | Stone terrace at sunset |
| Instagram grid 4 | `1594736797933-d0501ba2fe65` | Outdoor kitchen / pergola |
| Instagram grid 5 | `1591825729269-caeb344f6df2` | Formal hedgerow landscape |
| Instagram grid 6 | `1570197788417-0e82375c9371` | Infinity pool / wooded view |

---

## What Was Built

### HeroSection
Full-viewport section with Next.js Image (fill, priority) Unsplash background. Forest-deep gradient overlay (92% at bottom → transparent at top). Content bottom-aligned via `flex flex-col justify-end pb-20 md:pb-28`. Cormorant Garamond 300 headline at `text-[60px] sm:text-[80px] lg:text-[96px]`. Two buttons: primary "Start a Project" + ghost "View Our Work". Animated scroll indicator with chevron. `heroEntrance` variant on image, `stagger` + `fadeUp` on content. `useReducedMotion` guard passes `undefined` to avoid framer-motion type errors.

### LogoBar
Narrow `py-8` strip on stone-mid. "As Seen In" label + 5 publication names in DM Sans uppercase tracking-[0.2em] at 60% opacity. `fadeIn` on scroll.

### ManifestoSection
off-white two-column layout on lg. Left: SectionHeader + 3 paragraphs of philosophy copy at DM Sans 18px text-secondary. Right: aspect-square Unsplash image with object-cover. `slideInLeft` on text, `fadeUp` on image.

### ServicesPreview
stone-warm grid (1→2→3 cols). SectionHeader above. 5 service cards: stone-mid bg, p-8, hover:shadow-lg. Each card has a custom inline SVG icon (48×48 viewBox, strokeWidth 1.5, currentColor, no fill). Service names in font-display text-2xl. Links to `/services/[slug]`.

**SVG icon designs:**
- Hardscape: 7-rect paver grid pattern
- Softscape: overlapping leaf curves with stem
- Pool: concentric arcs + water wave lines
- Kitchen: grill grate + flame above
- Full Property: property boundary rect with interior zones

### FeaturedProject
forest-deep two-column. Large 4:3 Unsplash image left. Right: gold eyebrow, Cormorant Garamond headline, location + category metadata, two-sentence description, investment range in gold, ghost CTA button.

### ProcessTeaser
forest-deep 3-step horizontal layout (stacked on mobile). Large gold/20 Cormorant Garamond step numbers at 96px. Step name in font-display text-white, description in white/60. Absolute-positioned gold/30 1px horizontal rule connecting steps on lg screens. `stagger` + `fadeUp` on step cards.

### SeasonalBanner
Pure Server Component (no `"use client"`). `bg-gold py-5` strip. DM Sans 500 uppercase tracking-[0.1em] text-sm in `text-forest-deep`. No animation.

### Testimonials
forest-mid two-column grid (stacked on mobile). Each card: project photo (200px height, object-cover), then padding-32px body with: 72px gold/60 Cormorant Garamond opening quote mark, italic 22px quote, 32px gold divider rule, DM Sans 500 14px client name, DM Sans 300 13px location + project attribution.

### InstagramPlaceholder
stone-warm section. SectionHeader with `@VerdantLandscape` headline. 3×2 grid of square aspect-ratio Unsplash images with `group-hover:opacity-90` transition. "Follow on Instagram" ghost-dark Button linking to `href="#"` (non-functional placeholder for Phase 6 wiring).

### FinalCTA
forest-deep centered section. Gold rule + gold eyebrow. Cormorant Garamond 300 headline at text-4xl/5xl. DM Sans body in white/70. Primary + ghost buttons in `flex-col sm:flex-row gap-4` (stacked mobile, side-by-side sm+). `stagger` + `fadeUp` animation on entrance.

### src/app/page.tsx
Server Component. Imports all 10 sections and assembles in plan-specified order inside `<main>`. Exports `metadata` for SEO title and description.

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Pre-existing portfolio/page.tsx had named import for default export**
- **Found during:** Task 1 build verification
- **Issue:** `src/app/portfolio/page.tsx` used `import { SectionHeader }` but SectionHeader is a default export. TypeScript build failed.
- **Fix:** A linter (ESLint auto-import fixer) corrected it to `import SectionHeader from` automatically on file save before manual fix was needed.
- **Files modified:** `src/app/portfolio/page.tsx`

**2. [Rule 2 - Missing] Windows .next directory ENOENT on second build run**
- **Found during:** Task 1 build verification (second run)
- **Issue:** Running `npm run build` twice without cleaning produced `ENOENT: pages-manifest.json` error on Windows — stale `.next` directory from prior run
- **Fix:** `rm -rf .next` before each build run during development
- **Impact:** Development workflow only — Netlify CI always starts clean

---

## Known Stubs

- `InstagramPlaceholder` — "Follow on Instagram" button uses `href="#"`. Intentional. Will be wired to real Instagram URL/embed in Phase 6 (Social Features).
- Footer contact phone/email — placeholder values carried from 03-01. Client will provide real contact details.

---

## Build Verification

```
Route (app)                              Size     First Load JS
┌ ○ /                                    6.63 kB         144 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ○ /portfolio                           3.38 kB         105 kB
└ ● /portfolio/[slug]                    2.09 kB         139 kB

npm run build — exit 0, no TypeScript errors, no ESLint errors
```

---

## Self-Check: PASSED

All 10 component files verified present. Both commits (a43fda7, e707082) verified in git log. `npm run build` exits 0.

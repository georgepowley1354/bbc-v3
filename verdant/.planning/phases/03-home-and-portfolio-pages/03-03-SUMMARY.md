---
phase: "03"
plan: "03-03"
subsystem: "portfolio"
tags: ["next.js", "masonry", "framer-motion", "portfolio", "case-study", "static-generation"]
dependency_graph:
  requires: ["03-01"]
  provides: ["portfolio-page", "masonry-grid", "case-study-template", "project-seed-data"]
  affects: ["03-04", "03-05", "03-06"]
tech_stack:
  added: []
  patterns:
    - "CSS grid + JS marginTop offset for true masonry (no external library)"
    - "Server Component portfolio page, Client Component MasonryGrid with internal filter state"
    - "generateStaticParams for all 5 project slugs — fully static case study pages"
    - "notFound() guard on unknown slug — T-03-03-01 threat mitigated"
    - "useReducedMotion guard on all Framer Motion animations"
key_files:
  created:
    - src/data/projects.ts
    - src/hooks/useMasonry.ts
    - src/app/portfolio/page.tsx
    - src/app/portfolio/[slug]/page.tsx
    - src/components/portfolio/ProjectCard.tsx
    - src/components/portfolio/FilterBar.tsx
    - src/components/portfolio/MasonryGrid.tsx
    - src/components/portfolio/CaseStudyHero.tsx
    - src/components/portfolio/CaseStudySpecs.tsx
    - src/components/portfolio/CaseStudyGallery.tsx
  modified: []
decisions:
  - "Button and SectionHeader are default exports (not named) — imports corrected from {Button}/{SectionHeader} to default import syntax"
  - "useMasonry algorithm implemented verbatim from RESEARCH.md — no modifications to the marginTop offset logic"
  - "MasonryGrid holds filter state internally — portfolio page remains a pure Server Component"
  - "CaseStudyHero stagger uses motion.div with variants pattern, reduced-motion skips all transforms"
metrics:
  duration: "18 minutes"
  completed: "2026-04-12T22:38:27Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 10
  files_modified: 0
---

# Phase 03 Plan 03: Portfolio Page + Case Study Template Summary

Portfolio page at `/portfolio` with true masonry grid, 6-category filter bar, 5 seed projects, and dynamic case study pages at `/portfolio/[slug]` — all statically generated, build exits 0.

---

## Tasks Completed

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Seed data, useMasonry hook, ProjectCard, FilterBar, MasonryGrid, portfolio page | 9c272b4 | Done |
| 2 | Dynamic case study template at /portfolio/[slug] | f39a78a | Done |

---

## What Was Built

### Task 1 — Data, Hook, Components, Portfolio Page

**`src/data/projects.ts`**
5 typed `Project` objects matching the exact seed spec. Each has Unsplash hero + 4 gallery images, 2-sentence editorial description, 3 highlights. Exports `projects` array and `getProjectBySlug(slug)` function.

**Unsplash Photo IDs used per project:**

| Project | Hero Photo ID | Notes |
|---------|--------------|-------|
| Adirondack Terrace | 1558618666-fcd25c85cd64 | Stone terrace / patio |
| Willowmere Garden | 1416879595882-3373a0480b5b | Garden path / perennials |
| Glasswater Pool | 1575429198097-0414ec08e8cd | Pool reflection |
| Hearthstone Kitchen | 1564540574859-0dfb63985953 | Outdoor kitchen / grill |
| Ridgeline Estate | 1560184897-ae75f418493e | Aerial estate / property |

**`src/hooks/useMasonry.ts`**
Exact RESEARCH.md algorithm — CSS grid with `items-start` + JavaScript `marginTop` offset per column. No external library. Handles resize events with cleanup.

**`src/components/portfolio/ProjectCard.tsx`**
Next.js `Link` wrapping full card. `group` class enables group-hover. Image: `relative aspect-[4/3]` parent, `fill` + `object-cover` + `duration-[600ms] group-hover:scale-105`. Border-l: `border-l-2 border-transparent group-hover:border-sage`. Card info: category eyebrow (11px), Cormorant Garamond project name, location muted, investment range sage, arrow CTA.

**`src/components/portfolio/FilterBar.tsx`**
Client component. 6 filter buttons: All / Hardscape / Softscape / Pool / Kitchen / Full Property. Active: `text-sage border-b-2 border-sage`. Inactive: `text-text-muted hover:text-text-secondary border-b-transparent`. `aria-pressed` and `role="group"` for accessibility.

**`src/components/portfolio/MasonryGrid.tsx`**
Client component. Internal `useState<FilterCategory>('All')`. Filters `projects` array on category match. Renders `FilterBar` + grid div with `ref={masonryContainer}` from `useMasonry`. Grid class: `grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3`.

**`src/app/portfolio/page.tsx`**
Server Component. Metadata exported. Renders `SectionHeader` (eyebrow "OUR WORK", headline "Every Project, A Living World") + `MasonryGrid` in `mt-16` div. `pt-32` accounts for fixed nav height.

---

### Task 2 — Dynamic Case Study Template

**`src/app/portfolio/[slug]/page.tsx`**
- `generateStaticParams`: maps all 5 projects to `{ slug }` params
- `generateMetadata`: reads project by slug, returns `title` + `description`
- `notFound()` called immediately if slug not found (T-03-03-01 mitigated)
- Next project: `projects[(currentIndex + 1) % projects.length]` — wraps around
- Inline "Next Project" section (forest-deep bg) + CTA section (stone-warm bg)

**`src/components/portfolio/CaseStudyHero.tsx`**
Client component. `min-h-[60vh]` relative container. Next.js `Image` fill with `priority`. Forest-deep gradient: `from-forest-deep via-forest-deep/60 to-forest-deep/10`. Text content: gold rule + category eyebrow (text-gold) + project name (font-display text-4xl/6xl text-white font-light) + location (text-white/60). Framer Motion `stagger` + `fadeUp` on text children. `useReducedMotion` guard skips transforms.

**`src/components/portfolio/CaseStudySpecs.tsx`**
Server Component. Two-column lg grid. Left: italic display pull quote (first sentence) + full description paragraph. Right: `<dl>` with Location / Category / Investment Range (investment in `text-sage`). Below: "Project Highlights" heading + `<ul>` with Lucide `Check` icon in sage per bullet.

**`src/components/portfolio/CaseStudyGallery.tsx`**
Client component. `bg-stone-mid`. SectionHeader eyebrow "PROJECT GALLERY" headline "In the Details". 2-column `sm:grid-cols-2` grid. Each image: `relative aspect-[4/3] overflow-hidden` + fill Image + `hover:scale-[1.03]`. `whileInView` with `stagger` variant, `once: true`, `margin: "-80px"`. `useReducedMotion` guard.

---

## Static Routes Generated

```
● /portfolio/[slug]
  ├ /portfolio/adirondack-terrace
  ├ /portfolio/willowmere-garden
  ├ /portfolio/glasswater-pool
  ├ /portfolio/hearthstone-kitchen
  └ /portfolio/ridgeline-estate
```

`✓ Generating static pages (11/11)` — all routes confirmed.

---

## Build Verification

```
Route (app)                              Size     First Load JS
┌ ○ /                                    6.63 kB         144 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ○ /portfolio                           3.38 kB         105 kB
└ ● /portfolio/[slug]                    2.09 kB         139 kB
    ├ /portfolio/adirondack-terrace
    ├ /portfolio/willowmere-garden
    ├ /portfolio/glasswater-pool
    └ [+2 more paths]

npm run build — exit 0, no TypeScript errors, no ESLint errors
```

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Button and SectionHeader are default exports, not named exports**
- **Found during:** Task 1 build verification
- **Issue:** `portfolio/page.tsx` imported `{ SectionHeader }` and `{ Button }` as named exports. Both components use `export default function` — the plan's import syntax assumed named exports.
- **Fix:** Changed to `import SectionHeader from '@/components/ui/SectionHeader'` and `import Button from '@/components/ui/Button'` in both `portfolio/page.tsx` and `[slug]/page.tsx`.
- **Files modified:** `src/app/portfolio/page.tsx`, `src/app/portfolio/[slug]/page.tsx`
- **Commit:** 9c272b4 (page.tsx fixed before commit), f39a78a (slug page.tsx fixed before commit)

---

## Known Stubs

None. All 5 projects have full data, descriptions, highlights, and Unsplash image URLs. Filter works client-side. All case study routes resolve.

---

## Threat Surface Scan

No new network endpoints, auth paths, or trust boundaries introduced beyond what the plan's threat model already covers. T-03-03-01 mitigated: `notFound()` called before any rendering when slug is unknown.

---

## Self-Check: PASSED

All 10 required files found. Both commits (9c272b4, f39a78a) verified in git log. Build exits 0 with 11 static pages generated.

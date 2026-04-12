---
phase: 04-services-about-and-process-pages
plan: 01
subsystem: verdant/services
tags: [next.js, typescript, framer-motion, static-generation, services]
dependency_graph:
  requires: [03-01-scaffold-and-home, 03-03-portfolio]
  provides: [services-data-layer, services-index-page, service-detail-pages]
  affects: [home-services-preview, portfolio-case-studies]
tech_stack:
  added: []
  patterns: [generateStaticParams, server-client-component-split, shared-data-single-source-of-truth]
key_files:
  created:
    - verdant/src/types/index.ts (Service interface added)
    - verdant/src/data/services.ts
    - verdant/src/components/icons/ServiceIcons.tsx
    - verdant/src/components/services/ServiceCard.tsx
    - verdant/src/components/services/ServiceCardGrid.tsx
    - verdant/src/components/services/ServiceHero.tsx
    - verdant/src/components/services/ServiceOutcomes.tsx
    - verdant/src/components/services/ServiceGallery.tsx
    - verdant/src/app/services/page.tsx
    - verdant/src/app/services/[slug]/page.tsx
  modified:
    - verdant/src/components/home/ServicesPreview.tsx
decisions:
  - ServicesPreview.tsx uses tagline from shared data (not the old inline description)
  - ServiceGallery is a pure server component — no motion needed for static image grid
  - 5th service card gets lg:col-start-2 to center it in 3-col grid last row
metrics:
  duration: "~6 minutes"
  completed: "2026-04-12T23:51:58Z"
  tasks_completed: 3
  files_changed: 11
---

# Phase 04 Plan 01: Services Data Layer and Pages Summary

Service type, data file, icon extraction, index page, and 5 static detail pages — single source of truth with generateStaticParams, hero/outcomes/pricing-card/gallery structure, build exits 0 at 17 static pages.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Service type, data file, and icon extraction | 725f9b7 | src/types/index.ts, src/data/services.ts, src/components/icons/ServiceIcons.tsx, src/components/home/ServicesPreview.tsx |
| 2 | Services index page and service card components | e4db8f8 | src/components/services/ServiceCard.tsx, src/components/services/ServiceCardGrid.tsx, src/app/services/page.tsx |
| 3 | Service detail pages with generateStaticParams | f86d9e1 | src/components/services/ServiceHero.tsx, src/components/services/ServiceOutcomes.tsx, src/components/services/ServiceGallery.tsx, src/app/services/[slug]/page.tsx |

## What Was Built

### Data Layer
- `src/types/index.ts` — `Service` interface added alongside `Project` (id, slug, name, tagline, description, outcomes[], pricingRange, pricingNote, heroImage, galleryImages[], icon, relatedProjects[])
- `src/data/services.ts` — 5 fully typed services with editorial copy, Unsplash images, and `getServiceBySlug` helper
- `src/components/icons/ServiceIcons.tsx` — 5 SVG icon components extracted from ServicesPreview plus `serviceIconMap` lookup

### Home Page Refactor
- `ServicesPreview.tsx` — inline icon components and services array removed; now imports from shared data and icon files. Single source of truth enforced.

### Services Index (`/services`)
- `ServiceCard.tsx` — client component with icon, name, tagline, pricing range, and explore arrow
- `ServiceCardGrid.tsx` — client component with stagger animation; 5th card centered via `lg:col-start-2`
- `src/app/services/page.tsx` — server component with forest-deep hero strip and card grid

### Service Detail Pages (`/services/[slug]`)
- `ServiceHero.tsx` — full-bleed hero with 40% opacity image, animated overlay (name, tagline, gold rule)
- `ServiceOutcomes.tsx` — 3/5 + 2/5 grid: description + checkmark outcomes on left, sticky pricing card on right
- `ServiceGallery.tsx` — server component 2-image grid strip at 50vh
- `src/app/services/[slug]/page.tsx` — server component with `generateStaticParams`, `generateMetadata`, `notFound()` guard, related projects section, next-service wrap, CTA

## Build Output

```
Route (app)                              Size     First Load JS
├ ○ /services                            1.71 kB         134 kB
└ ● /services/[slug]                     2.67 kB         140 kB
    ├ /services/hardscape
    ├ /services/softscape
    ├ /services/pool
    ├ /services/outdoor-kitchens
    └ /services/full-property

✓ Generating static pages (17/17)
```

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all 5 services have complete copy, real Unsplash images, and wired data. ServicesPreview.tsx imports from the shared data file.

## Threat Flags

None — all new routes serve static, hardcoded content with no user input or trust boundaries introduced.

## Self-Check: PASSED

All 10 created/modified files exist on disk. All 3 task commits (725f9b7, e4db8f8, f86d9e1) confirmed in git log. Build exits 0 with 17 static pages.

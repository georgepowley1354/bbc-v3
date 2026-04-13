---
phase: 04-services-about-and-process-pages
plan: "02"
subsystem: about-and-process-pages
tags: [about, process, timeline, framer-motion, server-components, static-generation]
dependency_graph:
  requires: ["04-01"]
  provides: ["/about route", "/process route", "about data layer", "process data layer"]
  affects: ["nav links to /about and /process", "site page count (19 total)"]
tech_stack:
  added: []
  patterns:
    - "Server Component page + Client leaf component pattern (matches services pattern from 04-01)"
    - "stagger + fadeUp with useReducedMotion guard on all animated components"
    - "Ordered list semantics (<ol> with aria-label) for process timeline"
    - "Mobile vertical rail + desktop horizontal connecting lines for timeline layout"
key_files:
  created:
    - verdant/src/data/about.ts
    - verdant/src/components/about/FounderSection.tsx
    - verdant/src/components/about/PhilosophySection.tsx
    - verdant/src/components/about/CredentialsGrid.tsx
    - verdant/src/app/about/page.tsx
    - verdant/src/data/process.ts
    - verdant/src/components/process/ProcessTimeline.tsx
    - verdant/src/app/process/page.tsx
  modified: []
decisions:
  - "Used const-as-const on founder object to preserve readonly tuple types for bio and credentials arrays"
  - "ProcessTimeline uses <ol role='list'> per plan spec — ordered semantics convey sequence to screen readers"
  - "Second-row connector line positioned at calc(50%+24px) to align with 2-row 3-col desktop grid"
  - "Mobile layout uses pl-20 offset with absolute-positioned number to avoid layout shift on small screens"
metrics:
  duration: "~12 minutes"
  completed_date: "2026-04-12"
  tasks_completed: 2
  files_created: 8
  files_modified: 0
---

# Phase 04 Plan 02: About and Process Pages Summary

**One-liner:** About page (founder bio, philosophy pull quote, 6-credential grid) and 6-stage process timeline page built as Server Components with animated Client leaf components — 19 static pages total, build exits 0.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | About data file and about page with all 3 sections | a0f566f | src/data/about.ts, src/components/about/FounderSection.tsx, src/components/about/PhilosophySection.tsx, src/components/about/CredentialsGrid.tsx, src/app/about/page.tsx |
| 2 | Process data file and full 6-stage timeline page | bcd0a87 | src/data/process.ts, src/components/process/ProcessTimeline.tsx, src/app/process/page.tsx |

## What Was Built

### About Page (`/about`)

Four-section page following the Server Component + Client leaf pattern:

1. **Hero strip** — forest-deep background with `SectionHeader` (eyebrow: "OUR STORY")
2. **FounderSection** — 9-col asymmetric grid (4 portrait + 5 bio), `fadeIn` on photo, `fadeUp` on text, `next/image` with `fill` and proper `sizes`
3. **PhilosophySection** — dark forest background, Cormorant italic `blockquote` with `slideInLeft` variant, body copy with `fadeUp`
4. **CredentialsGrid** — stone-warm background, 3-col grid of `stone-mid` cards each with Lucide `Award` icon, stagger animation
5. **CTA section** — Start a Project button linking to `/contact`

Data in `src/data/about.ts`: Marcus Velde founder object (name, title, 3-paragraph bio, Unsplash photoUrl, 6 credentials) + philosophy object (2-paragraph statement, pull quote).

### Process Page (`/process`)

Two-section page:

1. **Timeline section** — forest-deep background, `SectionHeader` + `ProcessTimeline` component
2. **CTA section** — stone-warm background, Schedule a Consultation button

`ProcessTimeline` client component:
- `<ol>` with `aria-label="Our 6-stage design and installation process"` for screen-reader sequence semantics
- `aria-hidden="true"` on decorative 96px gold/20 step numbers
- Desktop: 3-col grid with two horizontal connecting lines (rgba gold/30), one at top-12, one at calc(50%+24px)
- Mobile: `lg:hidden` vertical rail on left-8 (rgba gold/20), content offset with `pl-20`
- `stagger` container + `fadeUp` children, all guarded with `useReducedMotion()`

Data in `src/data/process.ts`: 6 `ProcessStage` objects (Discovery, Design, Proposal, Build, Reveal, Aftercare) with full descriptions.

## Verification Results

- `npx tsc --noEmit` exits 0 (Task 1 check)
- `npm run build` exits 0 (Task 2 check)
- Build output: 19 static pages including `/about` and `/process`
- All 6 process stages present in data file
- All 6 credentials present in about data file
- All animated components have `useReducedMotion()` guard

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all data is fully wired. No placeholder text flows to UI rendering.

## Threat Flags

None — static pages with hardcoded fictional data, no new network endpoints or auth paths introduced.

## Self-Check

Files created:
- verdant/src/data/about.ts — FOUND
- verdant/src/components/about/FounderSection.tsx — FOUND
- verdant/src/components/about/PhilosophySection.tsx — FOUND
- verdant/src/components/about/CredentialsGrid.tsx — FOUND
- verdant/src/app/about/page.tsx — FOUND
- verdant/src/data/process.ts — FOUND
- verdant/src/components/process/ProcessTimeline.tsx — FOUND
- verdant/src/app/process/page.tsx — FOUND

Commits:
- a0f566f — FOUND (feat(04-02): about data layer...)
- bcd0a87 — FOUND (feat(04-02): process data file...)

## Self-Check: PASSED

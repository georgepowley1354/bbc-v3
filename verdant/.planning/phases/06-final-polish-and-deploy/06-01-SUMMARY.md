---
phase: 06-final-polish-and-deploy
plan: 01
subsystem: ui
tags: [next.js, seo, metadata, sitemap, robots, typescript]

requires:
  - phase: 05-contact-page
    provides: All 21 static pages building clean — foundation for final polish

provides:
  - Footer service links resolved to real /services/{slug} routes
  - Instagram placeholder button non-interactive (no dead href="#")
  - metadataBase and title.template in root layout
  - Per-page titles use template (no manual suffix drift)
  - Home page uses absolute title to avoid double suffix
  - /robots.txt generated at build time via src/app/robots.ts
  - /sitemap.xml generated at build time with all 16 site URLs

affects: [06-02-deploy, lighthouse-audit]

tech-stack:
  added: []
  patterns:
    - "Next.js MetadataRoute.Robots and MetadataRoute.Sitemap file conventions for robots.txt and sitemap.xml"
    - "title.template in root layout + title.absolute on home page to prevent double suffix"
    - "Single source of truth: Footer service links driven from services data array, not hardcoded strings"

key-files:
  created:
    - src/app/robots.ts
    - src/app/sitemap.ts
  modified:
    - src/components/layout/Footer.tsx
    - src/components/home/InstagramPlaceholder.tsx
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/app/portfolio/page.tsx
    - src/app/portfolio/[slug]/page.tsx
    - src/app/services/page.tsx
    - src/app/services/[slug]/page.tsx
    - src/app/about/page.tsx
    - src/app/process/page.tsx
    - src/app/contact/page.tsx

key-decisions:
  - "Footer service links now use services data import rather than a parallel hardcoded string array — single source of truth prevents future drift"
  - "Instagram follow button rendered as disabled <button> (no href) rather than removed — preserves the section's visual intent while eliminating the dead link"
  - "Home page uses title.absolute to prevent double suffix from template — all other pages use short titles only"
  - "changeFrequency uses 'yearly' as const inside map callbacks to satisfy MetadataRoute.Sitemap union type narrowing"

requirements-completed: [DEPLOY-01, DEPLOY-02, DEPLOY-03]

duration: 18min
completed: 2026-04-13
---

# Phase 6 Plan 01: Fix Nav Links + SEO Metadata Infrastructure Summary

**Footer service links fixed to /services/{slug}, metadataBase + title.template added to layout, robots.ts and sitemap.ts created — build exits 0 with 22 static pages including /robots.txt and /sitemap.xml**

## Performance

- **Duration:** 18 min
- **Started:** 2026-04-13T02:12:00Z
- **Completed:** 2026-04-13T02:30:06Z
- **Tasks:** 2
- **Files modified:** 13 (11 modified, 2 created)

## Accomplishments

- Fixed Footer.tsx: removed hardcoded `serviceLinks` string array, imported `services` data, links now navigate to real `/services/{slug}` routes
- Fixed InstagramPlaceholder.tsx: removed `href="#"` dead link, button renders as non-interactive `<button disabled>` element
- Added `metadataBase`, `title.template`, and `openGraph` defaults to `src/app/layout.tsx`
- Updated 8 page files to use short titles — template appends `| Verdant Landscape Design` automatically
- Home page uses `title.absolute` to avoid double suffix from template
- Created `src/app/robots.ts` — generates `/robots.txt` allowing all crawlers with sitemap URL
- Created `src/app/sitemap.ts` — generates `/sitemap.xml` with 16 entries: 6 static + 5 portfolio + 5 service pages
- Build exits 0 with 22 statically generated pages

## Task Commits

1. **Task 1: Fix broken nav links** — `723ed9c` (fix)
2. **Task 2: metadataBase + title.template + robots.ts + sitemap.ts** — `0b65dd9` (feat)

## Files Created/Modified

- `src/components/layout/Footer.tsx` — Imports services data; links use `/services/${service.slug}`
- `src/components/home/InstagramPlaceholder.tsx` — Follow button is `disabled`, no href
- `src/app/layout.tsx` — Added metadataBase, title.template, openGraph defaults
- `src/app/page.tsx` — Title uses `{ absolute: '...' }` to bypass template
- `src/app/portfolio/page.tsx` — Title: `'Portfolio'`
- `src/app/portfolio/[slug]/page.tsx` — generateMetadata returns `title: project.name`
- `src/app/services/page.tsx` — Title: `'Services'`
- `src/app/services/[slug]/page.tsx` — generateMetadata returns `title: service.name`
- `src/app/about/page.tsx` — Title: `'About'`
- `src/app/process/page.tsx` — Title: `'Our Process'`
- `src/app/contact/page.tsx` — Title: `'Start a Project'`
- `src/app/robots.ts` — New file; generates /robots.txt via MetadataRoute.Robots
- `src/app/sitemap.ts` — New file; generates /sitemap.xml via MetadataRoute.Sitemap

## Decisions Made

- Used `services` data import in Footer rather than maintaining a parallel string array — eliminates the class of bug where display names and slugs drift out of sync
- Instagram button kept visible but rendered as `<button disabled>` — semantically correct, no dead link, section layout preserved
- `title.absolute` on home page is the correct Next.js pattern to opt a single page out of the root `title.template`
- Used `'yearly' as const` in sitemap.ts map callbacks per TypeScript union narrowing requirement

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — TypeScript compiled clean throughout, build exited 0 on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- DEPLOY-01, DEPLOY-02, DEPLOY-03 all satisfied
- Ready for Plan 06-02: merge to master, Netlify site creation, domain CNAME configuration, Lighthouse verification
- No blockers — codebase is production-ready from a code quality standpoint

---
*Phase: 06-final-polish-and-deploy*
*Completed: 2026-04-13*

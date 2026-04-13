---
phase: "03"
plan: "03-01"
subsystem: "scaffold"
tags: ["next.js", "tailwind", "framer-motion", "fonts", "layout", "navigation", "footer"]
dependency_graph:
  requires: []
  provides: ["next-app", "design-tokens", "navigation", "footer", "page-transitions", "motion-wrappers", "animation-constants"]
  affects: ["03-02", "03-03", "03-04", "03-05", "03-06"]
tech_stack:
  added:
    - "next@14.2.35"
    - "react@18.x"
    - "framer-motion@11.18.2"
    - "lucide-react@1.8.0"
    - "tailwindcss@3.4.x"
  patterns:
    - "next/font/google self-hosted fonts via CSS variables on html element"
    - "Client Component boundary pushed to small wrappers (MotionDiv, Navigation, template.tsx)"
    - "Scroll-state nav with useEffect + window.addEventListener passive scroll"
    - "useReducedMotion guard on all Framer Motion animations"
key_files:
  created:
    - src/app/layout.tsx
    - src/app/template.tsx
    - src/app/page.tsx
    - src/constants/animation.ts
    - src/types/index.ts
    - src/components/layout/Navigation.tsx
    - src/components/layout/Footer.tsx
    - src/components/ui/Button.tsx
    - src/components/ui/SectionHeader.tsx
    - src/components/ui/MotionDiv.tsx
    - tailwind.config.ts
    - next.config.mjs
    - netlify.toml
    - .gitignore
  modified: []
decisions:
  - "Scaffolded in temp directory verdant-scaffold/ then copied files — create-next-app@14 refuses to scaffold into a directory with existing files (.planning/, design-system/, .claude/)"
  - "Kept next.config.mjs (ES module) rather than converting to next.config.ts — scaffold generates .mjs and both formats work identically"
  - "framer-motion false prop replaced with undefined for reduced-motion guard — TypeScript types for framer-motion@11 do not accept false on initial/exit props"
metrics:
  duration: "35 minutes"
  completed: "2026-04-12T22:26:29Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 14
  files_modified: 0
---

# Phase 03 Plan 01: Next.js Scaffold + Global Layout Summary

Next.js 14 app scaffolded with full Verdant design system tokens, Google Fonts, Navigation, Footer, page transitions, and reusable UI components — all building cleanly with `npm run build` exit 0.

---

## Tasks Completed

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Scaffold Next.js 14, install dependencies, configure Tailwind and globals | c271452 | Done |
| 2 | Root layout with fonts, Navigation and Footer components, template.tsx | 2ddbdf4 | Done |

---

## What Was Built

### Task 1 — Scaffold + Config

**Scaffold command used:**
```bash
npx create-next-app@14 verdant-scaffold --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```
Files were then copied from `verdant-scaffold/` into `verdant/` because `create-next-app@14` refuses to scaffold into a directory that already contains files.

**Dependencies installed:**
- `next@14.2.35`
- `framer-motion@11.18.2` (pinned to v11 as required)
- `lucide-react@1.8.0`
- `tailwindcss@3.4.x` (auto-installed by create-next-app)

**Design system tokens wired into `tailwind.config.ts`:**
- Colors: forest.deep/mid, sage/sage-light, gold/gold-light, stone.warm/mid/dark, off-white, text-primary/secondary/muted
- Font families: `display` → `var(--font-display)`, `sans` → `var(--font-sans)`
- Spacing: 18/22/26/30/34/38/42/section/section-sm extensions

**Other files:**
- `src/app/globals.css` — clean Tailwind directives + focus-visible ring
- `src/constants/animation.ts` — 6 exports: ease, fadeUp, fadeIn, heroEntrance, stagger, slideInLeft
- `src/types/index.ts` — Project interface
- `next.config.mjs` — Unsplash remotePatterns
- `netlify.toml` — build command + @netlify/plugin-nextjs
- `.gitignore` — excludes .next/ and node_modules/

### Task 2 — Layout Components

**`src/app/layout.tsx`**
Cormorant Garamond (weights 300/400/600/700, normal+italic) and DM Sans (weights 300/400/500) loaded via `next/font/google` as CSS variables `--font-display` and `--font-sans`. Applied to `<html>` element. Body gets `bg-stone-warm text-text-primary font-sans antialiased`. Navigation and Footer wrapped around `<main>`.

**`src/app/template.tsx`**
Client component. Framer Motion `motion.div` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` over 0.5s with expo-out easing `[0.16, 1, 0.3, 1]`.

**`src/app/page.tsx`**
Minimal Server Component placeholder: centered "Verdant / Coming Soon" in Cormorant Garamond display font confirming font load.

**`src/components/ui/MotionDiv.tsx`**
Client-side re-exports: `MotionDiv` (motion.div), `MotionSection`, `MotionH1`, `MotionH2`, `MotionP`. Allows motion in Server Component trees.

**`src/components/ui/Button.tsx`**
4 variants: primary (sage), secondary (gold outline), ghost (white outline on dark), ghost-dark (forest-deep outline on light). 2 sizes: md/lg. Renders as `<Link>` when `href` provided, `<button>` otherwise. All: `rounded-none`, DM Sans 500, tracking-[0.1em], uppercase, transition-colors 300ms.

**`src/components/ui/SectionHeader.tsx`**
Gold 1px rule (w-12) → eyebrow (11px, tracking-[0.2em], uppercase) → headline (font-display) → optional body. `dark` prop toggles text colors between light and dark section contexts.

**`src/components/layout/Navigation.tsx`**
- Transparent `h-24` at top → `bg-forest-deep/95 backdrop-blur-md h-16` when `scrollY >= 80`
- VERDANT wordmark: DM Sans, tracking-[0.3em], uppercase, white
- Desktop: 5 nav links + "Start a Project" Button
- Mobile: hamburger (Lucide Menu) → full-screen forest-deep overlay with Cormorant Garamond 36px italic links, stagger animation
- `useReducedMotion` check: skips opacity/transform when true

**`src/components/layout/Footer.tsx`**
Server Component. 4-column grid (1/2/lg:4 cols). Columns: brand/tagline, navigation links, services links, contact info + CTA. Bottom bar: copyright left, "Built by BBC" linked to `https://bbc-agency.com` right.

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Scaffolded in temp directory instead of directly in verdant/**
- **Found during:** Task 1
- **Issue:** `create-next-app@14` exits with error when target directory contains any existing files — `.planning/`, `design-system/`, `.claude/` all triggered the conflict check
- **Fix:** Scaffolded into `verdant-scaffold/` (sibling directory), then copied all generated files into `verdant/`. Temp directory left in place (not committed).
- **Files modified:** All scaffold files

**2. [Rule 1 - Bug] framer-motion `false` prop replaced with `undefined`**
- **Found during:** Task 2 build verification
- **Issue:** TypeScript types for `framer-motion@11` do not accept `false` for `initial`/`exit` props — type is `VariantLabels | TargetAndTransition | undefined`, not `boolean`
- **Fix:** Changed `prefersReducedMotion ? false : { opacity: 0 }` to `prefersReducedMotion ? undefined : { opacity: 0 }` in Navigation.tsx — functionally identical (undefined means "no animation override"), type-safe
- **Files modified:** `src/components/layout/Navigation.tsx`
- **Commit:** 2ddbdf4

**3. [Note] next.config.mjs kept as .mjs**
- Plan specified `next.config.ts` but `create-next-app@14` generates `.mjs`. Both work identically. No conversion needed — `.mjs` is the current scaffold default.

---

## Known Stubs

- `src/app/page.tsx` — placeholder "Coming Soon" content. Intentional — the full home page sections are built in plans 03-02 through 03-06.
- Footer contact info (phone/email) — placeholder values. Client will provide real contact details.

---

## Build Verification

```
Route (app)                              Size     First Load JS
┌ ○ /                                    138 B          87.4 kB
└ ○ /_not-found                          873 B          88.1 kB
+ First Load JS shared by all            87.3 kB

npm run build — exit 0, no TypeScript errors, no ESLint errors
```

---

## Self-Check: PASSED

All 13 required files found. Both commits (c271452, 2ddbdf4) verified in git log. Build exits 0.

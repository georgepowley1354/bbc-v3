# Phase 4: Services, About, and Process Pages — Research

**Researched:** 2026-04-12
**Domain:** Next.js 14 App Router static data pages, vertical timeline UI, luxury services/about page patterns
**Confidence:** HIGH

---

## Summary

Phase 4 builds four page groups — services index, 5 individual service detail pages, about page, and process timeline page — all within the established Verdant stack (Next.js 14 App Router, TypeScript, Tailwind CSS v3, Framer Motion 11). No new dependencies are required: everything needed is already installed.

The architecture pattern is identical to Phase 3's portfolio system: a `src/data/services.ts` file holds typed service data, a `src/data/about.ts` file holds founder/philosophy/credential copy, and pages are Server Components that import these data files. Client Components are only used for Framer Motion animation wrappers — the same boundary that governs the existing portfolio pages applies here.

The Process page is the most design-intensive: a vertical timeline (6 stages) that expands to horizontal on desktop, with staggered scroll reveals per stage. The exact animation variant pattern from `ProcessTeaser.tsx` can be extended directly. The key engineering choice is whether to use a vertical connecting line as an `::after` pseudo element on each card, or an absolutely positioned line behind the grid — the ProcessTeaser already uses the absolute-line approach for desktop, which should be replicated for the full process page.

**Primary recommendation:** Mirror the portfolio data pattern exactly. Create `src/data/services.ts` and `src/data/about.ts` typed files, then build pages and components using the already-proven Server/Client split.

---

## Next.js 14 App Router Patterns

### Server vs Client Component Boundary

**Rule already established in this codebase and MUST be followed:**

- Page files (`page.tsx`) are Server Components by default — keep them server-only
- `generateStaticParams` at the page level generates all service slugs at build time (same as portfolio)
- Framer Motion requires `"use client"` — push the client boundary into leaf components only
- `SectionHeader` is a Server Component (pure HTML, no motion) — reuse directly without wrapping
- `Button` is a Server Component — reuse directly

**Established pattern from `/portfolio/[slug]/page.tsx`:**

```typescript
// src/app/services/[slug]/page.tsx
import { getServiceBySlug, services } from '@/data/services'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: `${service.name} | Verdant Landscape Design`,
    description: service.tagline,
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()
  return <main>...</main>
}
```
[VERIFIED: matches pattern in `/src/app/portfolio/[slug]/page.tsx`]

### Static Data File Pattern

Follow `src/data/projects.ts` exactly:
- Export a typed array constant
- Export a getter function (`getBySlug`)
- Import `Project`-equivalent interface from `src/types/index.ts`

The `Service` type must be added to `src/types/index.ts` alongside the existing `Project` type.

### Route Structure

```
src/app/
├── services/
│   ├── page.tsx                  # Services index — Server Component
│   └── [slug]/
│       └── page.tsx              # Service detail — Server Component + generateStaticParams
├── about/
│   └── page.tsx                  # About — Server Component
└── process/
    └── page.tsx                  # Process timeline — Server Component
```

[ASSUMED: route structure matches Next.js 14 App Router conventions — matches existing portfolio pattern]

---

## Services Page Architecture

### Data Model

```typescript
// src/types/index.ts — add to existing file
export interface Service {
  id: string
  slug: string
  name: string
  tagline: string                   // One-sentence benefit statement for index card
  description: string               // Full paragraph for detail page
  outcomes: string[]                // 3-4 outcome bullets ("What you get")
  pricingRange: string              // e.g., "$28,000–$65,000"
  pricingNote: string               // e.g., "Varies by sq footage and material selection"
  heroImage: string                 // Unsplash URL
  galleryImages: string[]           // 2-3 supporting images
  icon: string                      // SVG icon slug, maps to component
  relatedProjects: string[]         // project slugs from src/data/projects.ts
}
```

### The 5 Services (from design system + ServicesPreview.tsx)

| Slug | Name | Pricing Range |
|------|------|---------------|
| `hardscape` | Hardscape Design | $30,000–$65,000 |
| `softscape` | Softscape & Planting | $15,000–$45,000 |
| `pool` | Pool & Surround | $80,000–$130,000 |
| `outdoor-kitchens` | Outdoor Kitchens | $45,000–$85,000 |
| `full-property` | Full Property Design | $120,000–$200,000+ |

[ASSUMED: pricing ranges are fictional — set at plausible luxury Adirondack/Saratoga market rates consistent with existing project investmentRange values in projects.ts]

### Services Index Page Layout

```
Hero strip (not full-bleed):
  bg-forest-deep, py-32 top padding (clears nav), py-section bottom
  SectionHeader dark=true
  eyebrow: "WHAT WE BUILD"
  headline: "Five Ways We Shape Your Property"

Services grid:
  bg-stone-warm, py-section
  5 cards — same stone-mid cards as ServicesPreview but with:
    - Full-size icon (48px, forest-deep color)
    - Service name (Cormorant Garamond 28px)
    - Tagline sentence (DM Sans 16px, text-secondary)
    - Pricing range (DM Sans 14px, sage color)
    - "Explore →" link (DM Sans 13px, gold)
  Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  5th card centered on last row: lg:col-start-2
```

**IMPORTANT: ServicesPreview.tsx already contains the 5 service slugs and icons.** Extract the icon SVGs and service data from that file into `src/data/services.ts` to avoid duplication. ServicesPreview should import from the data file, or the icons can be duplicated (simpler for Phase 4 scope).

### Service Detail Page Layout

```
1. Service Hero (half-height, not full bleed)
   bg-forest-deep with hero image overlay at 40% opacity
   h-[60vh], content bottom-aligned with pb-20
   eyebrow: category
   headline: service name (Cormorant Garamond 52-68px)
   tagline: (DM Sans 18px, white/70)

2. Outcomes Section
   bg-stone-warm, py-section
   Left col (60%):
     description paragraph (DM Sans 18px, text-secondary)
     "What You'll Get" heading (Cormorant Garamond 28px)
     3-4 outcome bullets with sage checkmark icon
   Right col (40%):
     Pricing card (stone-mid bg, border border-stone-dark)
       "Investment Range" label (eyebrow treatment)
       Price range (Cormorant Garamond 36px, forest-deep)
       Pricing note (DM Sans 14px, text-muted)
       "Start a Project" button (sage primary)

3. Gallery strip (2 images, 50/50 split)
   Full-bleed, h-[50vh]
   Next.js Image, object-cover

4. Related Projects strip (optional — if service has relatedProjects)
   2 project cards, linking to /portfolio/[slug]

5. Process teaser (1 section, links to /process)
   bg-forest-deep, abbreviated (3 steps only)

6. CTA (same pattern as case study CTA)
   bg-stone-warm, centered
```

### Pricing Display Conventions

For luxury landscape firms, pricing ranges signal confidence and filter unqualified leads.

- **Always show a range**, not an exact number [ASSUMED: industry convention]
- Show pricing alongside a qualifying note ("varies by scope") — removes sticker shock without hiding the number
- Use sage color for the price — associates it with the brand's trust color, not a warning
- Never use "Starting at" language — signals budget-squeezing; use "$XX,000–$XX,000" directly
- Place pricing in a contained card (stone-mid bg) so it reads as an official specification

---

## About Page Architecture

### Data Model

```typescript
// src/data/about.ts
export const founder = {
  name: string            // "Marcus Velde"
  title: string           // "Principal, Verdant Landscape Design"
  bio: string[]           // Array of paragraphs
  photoUrl: string        // Unsplash portrait URL
  credentials: Credential[]
  philosophy: string      // One-sentence design philosophy for pull quote
}

export interface Credential {
  body: string            // e.g., "APLD Certified Professional"
  year: string            // e.g., "2014"
  detail?: string         // Optional clarification
}

export const philosophy = {
  statement: string       // Long-form philosophy text (2-3 paragraphs)
  pullQuote: string       // Short quote for Cormorant italic treatment
}
```

### About Page Layout

```
1. About Hero (half-height)
   Same forest-deep hero strip as services
   eyebrow: "OUR STORY"
   headline: "Where Architecture Meets Nature"

2. Founder Section (2-col)
   bg-stone-warm, py-section
   Left (45%): portrait photo — Next.js Image, aspect-ratio 3/4, object-cover
   Right (55%):
     eyebrow: "MARCUS VELDE, PRINCIPAL"  (gold rule + label)
     Founder name (Cormorant Garamond 40px)
     Title (DM Sans 14px, text-muted, uppercase, tracked)
     Bio paragraphs (DM Sans 18px, text-secondary, leading-[1.75])

3. Philosophy Section (dark)
   bg-forest-deep, py-section
   Centered, max-w-3xl
   eyebrow: "OUR PHILOSOPHY"
   Pull quote (Cormorant Garamond 300 italic, 40-48px, white, line-height 1.2)
   Philosophy body (DM Sans 18px, white/70, mt-8)

4. Credentials/Awards Section
   bg-stone-warm, py-section
   eyebrow: "CREDENTIALS"
   headline: "Built on Expertise"
   Grid of credential cards (stone-mid bg, 2-3 cols):
     Credential body (DM Sans 500, 15px, text-primary)
     Year (DM Sans 300, 13px, text-muted)
     Optional detail (DM Sans 14px, text-secondary)
   Lucide Award/Shield icon on each card (24px, sage color)

5. CTA
   Same as other pages — bg-stone-warm, centered
```

### Philosophy and Credentials Content

Philosophy and credential copy must be authored as fictional but plausible content:
- Founder name: "Marcus Velde" (fictional, memorable, fits luxury brand)
- Credentials: APLD (Association of Professional Landscape Designers), LEED AP Landscape, ISA Certified Arborist are the real credential bodies [ASSUMED: based on real landscape design industry — verify if needed]
- Philosophy: Center on the tension between built and natural environments — matches design system's "blur the boundary between architecture and nature"

---

## Process Timeline Architecture

### The 6 Stages

From ROADMAP.md success criteria:

| # | Stage | Core Action |
|---|-------|-------------|
| 1 | Discovery | On-site consultation, vision mapping |
| 2 | Design | Landscape plan, plant schedules, material spec |
| 3 | Proposal | Investment estimate, timeline, scope confirmation |
| 4 | Build | Installation — stone, planting, irrigation |
| 5 | Reveal | Client walkthrough, punch list, photography |
| 6 | Aftercare | Seasonal maintenance plan, plant establishment |

[ASSUMED: stage names and descriptions match the teaser already on the home page (ProcessTeaser.tsx uses steps 01–03 labeled Discovery Consultation, Design & Proposal, Expert Installation) — expand to all 6]

### Timeline Component Design

**ProcessTeaser.tsx already establishes the pattern.** The full process page should extend it:

**Desktop layout (lg+):** 2-row × 3-col grid
```
[01 Discovery]  [02 Design]    [03 Proposal]
     ↓─────────────────────────────────────↓
[04 Build]      [05 Reveal]    [06 Aftercare]
```
Connecting line: horizontal gold/20 line connecting top row, separate line connecting bottom row (or a single winding path). Use the same `absolute top-12 left-[...] h-px` technique from ProcessTeaser.

**Mobile layout:** Single column, vertical, with a left-rail connecting line:
```css
/* Left rail: 2px gold/30 vertical line, absolutely positioned */
/* Stage dots at same x-position as the line */
```

**Stage card structure:**
```
[Stage number — Cormorant Garamond 96px, gold/20, aria-hidden]
[Stage name — Cormorant Garamond 24px, white]
[Stage description — DM Sans 16px, white/60, leading-[1.6]]
[Optional icon — Lucide 24px, gold/50]
```

**Animation:**
- Container: `whileInView` + `stagger` variant (same as ProcessTeaser)
- Each stage: `fadeUp` variant, stagger 0.12s between stages
- `once: true, margin: "-80px"` on viewport trigger
- `useReducedMotion()` guard — same pattern as all existing motion components

**Mobile vertical timeline implementation:**
```tsx
// Vertical connecting rail — left side
<div className="lg:hidden absolute left-12 top-0 bottom-0 w-px bg-gold/20" aria-hidden="true" />
// Each stage — flex row with number on left, content right
<div className="flex gap-8 relative">
  <div className="w-24 shrink-0 text-right ...">01</div>
  <div className="flex-1">...</div>
</div>
```

**Accessibility for timeline:**
- Wrap in `<ol>` (ordered list) — stages have semantic order
- Each stage is `<li>`
- `aria-label` on the section: "Our 6-stage design and installation process"
- The large number is `aria-hidden="true"` — the stage name provides the accessible label
- Connecting line is `aria-hidden="true"`

---

## Reuse from Phase 3

| Component | Where | How to Reuse |
|-----------|-------|--------------|
| `SectionHeader` | `src/components/ui/SectionHeader.tsx` | Import directly — works on both light and dark sections via `dark` prop |
| `Button` | `src/components/ui/Button.tsx` | Import directly — all 4 variants available, supports `href` for link buttons |
| `MotionDiv`, `MotionSection` | `src/components/ui/MotionDiv.tsx` | Import named exports — required for all animated containers |
| `fadeUp`, `stagger`, `slideInLeft`, `fadeIn` | `src/constants/animation.ts` | Import animation variants — do not redefine |
| `useReducedMotion()` pattern | All motion components | Copy the exact `prefersReducedMotion ? undefined : variant` pattern |
| Service SVG icons | `src/components/home/ServicesPreview.tsx` | Extract 5 icon components to separate file or duplicate |
| 3-step data pattern | `src/components/home/ProcessTeaser.tsx` | Expand steps array from 3 to 6 stages |
| `generateStaticParams` | `src/app/portfolio/[slug]/page.tsx` | Mirror exactly for `/services/[slug]` |
| `notFound()` guard | `src/app/portfolio/[slug]/page.tsx` | Mirror exactly |
| Next-item wrap | `src/app/portfolio/[slug]/page.tsx` | Mirror for "next service" at bottom of service detail |
| Page section structure | `src/app/portfolio/page.tsx` | `pt-32 py-section max-w-7xl mx-auto px-6 md:px-12 lg:px-20` pattern |

**CRITICAL:** Do not add `"use client"` to page files. Keep the exact Server/Client split that exists in portfolio pages.

**Icon reuse decision:** The 5 service icons in `ServicesPreview.tsx` are inline JSX. For Phase 4, the simplest approach is:
1. Create `src/components/icons/ServiceIcons.tsx` with all 5 icon components exported
2. Import in both `ServicesPreview.tsx` and new service pages
This prevents duplication and is cleaner than leaving them inline.

---

## Design System Application

### Color Application Per Page

| Page | Background | Hero | Accent sections |
|------|-----------|------|-----------------|
| Services index | `stone-warm` | `forest-deep` hero strip | Stone-mid cards |
| Service detail | `stone-warm` | `forest-deep` half-hero | Pricing card: `stone-mid` |
| About | `stone-warm` | `forest-deep` hero strip | Philosophy: `forest-deep` |
| Process | `forest-deep` full page | N/A (full-page dark) | Numbers in `gold/20` |

**Process page note:** Unlike the home page ProcessTeaser (dark section within a light page), the full process page can be entirely `bg-forest-deep` — this creates visual differentiation and makes the timeline numbers pop maximally against the dark background.

### Typography Application

- All page hero headlines: Cormorant Garamond `font-display`, `text-4xl md:text-5xl lg:text-6xl` (matches `SectionHeader` at current scale)
- Service detail page hero: bump to `text-5xl md:text-6xl lg:text-7xl` to signal it's a major page
- Pull quote (about philosophy): `font-display font-light italic text-4xl md:text-5xl` — the 300 italic weight specified in MASTER.md
- Credentials card labels: `font-sans font-medium text-[15px]` — DM Sans 500

### Eyebrow Treatment

All eyebrows use the existing `SectionHeader` component which already implements:
- Gold 1px rule (`w-12 h-px bg-gold mb-3`)
- DM Sans 11px, tracking-[0.2em], uppercase
- `text-text-muted` on light, `text-gold` on dark

### Animation Application

| Element | Variant | Notes |
|---------|---------|-------|
| Page hero content | `fadeUp`, mount (no scroll) | Hero appears on page load |
| SectionHeader | `fadeUp`, `whileInView` | Wrap in `MotionDiv` with viewport trigger |
| Service cards (index) | `stagger` container + `fadeUp` children | Same as ServicesPreview.tsx |
| Process timeline stages | `stagger` container + `fadeUp` children | Same as ProcessTeaser.tsx |
| Founder photo | `fadeIn`, `whileInView` | Simpler than fadeUp for images |
| Philosophy pull quote | `slideInLeft`, `whileInView` | Left-to-right reveal suits editorial text |
| Credential cards | `stagger` + `fadeUp` | Same as service cards |
| Pricing card | `fadeUp`, `whileInView` | Slight delay relative to copy |

---

## Implementation Recommendations

### File Structure to Create

```
src/
├── data/
│   ├── services.ts               # New: Service[] typed array + getter
│   └── about.ts                  # New: founder, philosophy, credentials
├── types/
│   └── index.ts                  # Add: Service interface
├── components/
│   ├── icons/
│   │   └── ServiceIcons.tsx      # New: Extract 5 icons from ServicesPreview
│   ├── services/
│   │   ├── ServiceCard.tsx       # New: index page card (Client — has motion)
│   │   ├── ServiceHero.tsx       # New: half-height hero (Client — has motion)
│   │   ├── ServiceOutcomes.tsx   # New: outcomes + pricing card (Client)
│   │   └── ServiceGallery.tsx    # New: 2-image strip (Server — Next.js Image only)
│   ├── about/
│   │   ├── FounderSection.tsx    # New: 2-col founder bio (Client)
│   │   ├── PhilosophySection.tsx # New: dark pull quote section (Client)
│   │   └── CredentialsGrid.tsx   # New: credential cards (Client)
│   └── process/
│       └── ProcessTimeline.tsx   # New: 6-stage full timeline (Client)
└── app/
    ├── services/
    │   ├── page.tsx              # Server Component
    │   └── [slug]/
    │       └── page.tsx          # Server Component + generateStaticParams
    ├── about/
    │   └── page.tsx              # Server Component
    └── process/
        └── page.tsx              # Server Component
```

### Data First, Components Second

Build in this order:
1. `src/types/index.ts` — add `Service` type
2. `src/data/services.ts` — all 5 services with full copy
3. `src/data/about.ts` — founder, philosophy, credentials
4. Components — after data is locked, components are mechanical
5. Pages — wire components to data

### Services Index — 5-Card Grid with Correct 5th-Card Centering

In a 3-column grid with 5 items, the 5th item occupies the first column of row 2, leaving a visual imbalance. Options:
- `lg:col-start-2` on the 5th card to center it [ASSUMED: valid Tailwind approach]
- Or lay out as 2-col + 3-col responsive where the 5th is always in the center of a row
- Recommendation: Use `lg:col-span-3` on a wrapper that contains only the 5th card and apply `flex justify-center` — avoids grid gymnastics

### Pricing Card — Isolated in a Sidebar

```tsx
<aside
  className="bg-stone-mid border border-stone-dark p-8"
  aria-label="Investment range for this service"
>
  <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-muted mb-3">
    Investment Range
  </p>
  <div className="w-12 h-px bg-gold mb-3" aria-hidden="true" />
  <p className="font-display text-4xl text-text-primary leading-[1.1] mb-2">
    {service.pricingRange}
  </p>
  <p className="font-sans text-sm text-text-muted leading-[1.5] mb-8">
    {service.pricingNote}
  </p>
  <Button variant="primary" href="/contact">
    Start a Project
  </Button>
</aside>
```

### Process Page — `<ol>` Semantic Structure

```tsx
<section aria-labelledby="process-headline">
  <ol className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 list-none" role="list">
    {stages.map((stage) => (
      <li key={stage.number}>
        <MotionDiv variants={...}>
          {/* stage card content */}
        </MotionDiv>
      </li>
    ))}
  </ol>
</section>
```

Using `<ol>` with `list-none` gives semantic order without visual bullet points — correct for an ordered process.

---

## Risk Areas

### 1. ServicesPreview.tsx Duplication

ServicesPreview.tsx currently inlines all 5 service icons AND defines the service slug/name/description data. The new `services.ts` data file will have a superset of this data. Risk: two sources of truth for service slugs and names.

**Mitigation:** In Plan 04-01, add a task to refactor `ServicesPreview.tsx` to import its service data from `src/data/services.ts`. This keeps one source of truth and is low-risk because it's a pure data extraction.

### 2. Photo Subjects for About Page

The about page needs a founder portrait photo. Unsplash has landscape/nature photography but may not have a suitable "landscape designer portrait" that reads as authentic luxury.

**Mitigation:** Use a confident professional portrait from Unsplash (search: "architect portrait", "designer portrait", "professional outdoors"). If nothing fits, a photo of a hand holding design plans or a person reviewing blueprints works — reinforces craft over personality.

### 3. Process Page — 6 Stages vs 3 in Teaser

ProcessTeaser shows only 3 stages (Discovery, Design, Installation). The actual 6-stage model (adds Proposal, Reveal, Aftercare) is more granular. The copy in ProcessTeaser describes Discovery as a 2-hour consultation and Design as a full landscape plan — these need to stay consistent with the expanded 6-stage copy on the process page.

**Mitigation:** Write the 6-stage content in `src/data/about.ts` (or a separate `src/data/process.ts`) first, then retroactively verify the ProcessTeaser copy is consistent. No code changes to ProcessTeaser needed unless copy diverges significantly.

### 4. Mobile Timeline Vertical Line Positioning

The absolute-positioned connecting line in ProcessTeaser is a desktop-only `hidden lg:block` element. The mobile layout stacks steps vertically with no visual connector. For the full Process page, a left-rail vertical line on mobile is desirable.

**Mitigation:** Add `relative` on the `<ol>` container and a `before:` pseudo-element or an absolutely positioned `<div>` behind the stages. Use `lg:hidden` to show only on mobile.

### 5. `layout.tsx` Has `<main>` Wrapping `{children}`

The root `layout.tsx` wraps children in a `<main>` tag:
```tsx
<main>{children}</main>
```
Each page also opens with its own `<main>`. This creates nested `<main>` elements — invalid HTML and an accessibility violation.

**Check status:** Look at `src/app/layout.tsx` — if it wraps in `<main>`, then page files must NOT start with `<main>`. Looking at the portfolio page, it does use `<main>` in the page component. This is a potential existing issue — but it's Phase 6/7 territory (WCAG audit). For Phase 4, match the existing pattern (use `<main>` in each page, same as `/portfolio/page.tsx`) to stay consistent. Flag for Phase 7 cleanup.

**UPDATE:** Reading `layout.tsx` — it wraps children in `<main>`. But `src/app/portfolio/page.tsx` also returns `<main>`. This IS a nested main issue. For Phase 4: match the existing pattern to avoid introducing inconsistency, flag in comments for Phase 7 audit.

### 6. Build Count Growth

Phase 3 generates 11 static pages. Phase 4 adds:
- 1 services index
- 5 service detail pages
- 1 about page
- 1 process page

New total: ~19 static pages. No concern for build time at this scale.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Pricing ranges ($15k–$200k) are plausible for Saratoga/Adirondack luxury market | Services Architecture | Ranges may need adjustment — fictional site, no real impact |
| A2 | "Marcus Velde" as founder name, APLD/ISA as credential bodies | About Architecture | Name and credentials are pure fiction — minimal risk |
| A3 | Process page stages 4-6 (Proposal, Build, Reveal, Aftercare) are reasonable expansions of existing 3-step teaser | Process Architecture | Stage names could be changed without structural impact |
| A4 | `lg:col-start-2` centers 5th card in 3-col grid | Implementation Recommendations | Should be verified during build — fallback is flex centering |
| A5 | Nested `<main>` issue exists in current layout (layout.tsx wraps in main, page.tsx also uses main) | Risk Areas | If layout.tsx does NOT wrap in main, this risk disappears — verify at task start |

---

## Sources

### Primary (HIGH confidence)
- `src/app/portfolio/[slug]/page.tsx` — generateStaticParams, notFound(), metadata pattern [VERIFIED: read in this session]
- `src/data/projects.ts` — data file structure and TypeScript pattern [VERIFIED: read in this session]
- `src/components/ui/SectionHeader.tsx` — reusable component API [VERIFIED: read in this session]
- `src/components/ui/Button.tsx` — button variants and href behavior [VERIFIED: read in this session]
- `src/components/ui/MotionDiv.tsx` — motion primitive exports [VERIFIED: read in this session]
- `src/constants/animation.ts` — all animation variants [VERIFIED: read in this session]
- `src/components/home/ServicesPreview.tsx` — service data, icon SVGs, grid pattern [VERIFIED: read in this session]
- `src/components/home/ProcessTeaser.tsx` — timeline pattern, connecting line, stagger animation [VERIFIED: read in this session]
- `design-system/MASTER.md` — all design tokens, typography scale, color system [VERIFIED: read in this session]
- `.planning/STATE.md` — phase completion status, decisions made [VERIFIED: read in this session]
- `.planning/ROADMAP.md` — Phase 4 success criteria, 6-stage process list [VERIFIED: read in this session]

### Secondary (MEDIUM confidence)
- Next.js 14 App Router — `generateStaticParams`, Server vs Client Component boundary [ASSUMED: well-established pattern, matches existing codebase implementation]
- WCAG 2.1 AA — `<ol>` for ordered process steps, aria-hidden on decorative numbers [ASSUMED: standard accessibility practice]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies, all patterns established in Phase 3
- Data architecture: HIGH — mirrors projects.ts pattern exactly
- Component patterns: HIGH — mirrors Phase 3 components with minor extensions
- Content (copy, pricing): LOW — fictional content, placeholder values, planner will author
- Process timeline mobile: MEDIUM — desktop pattern established, mobile vertical line is new but straightforward

**Research date:** 2026-04-12
**Valid until:** 2026-05-12 (stable — no dependencies are fast-moving)

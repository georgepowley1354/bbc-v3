# Phase 5: Contact Page — Research

**Researched:** 2026-04-12
**Domain:** Next.js 14 App Router, Netlify Forms, Tailwind CSS form styling, Framer Motion
**Confidence:** HIGH — all findings verified directly from project source files

---

## Summary

Phase 5 builds the `/contact` inquiry page. The codebase already has all primitives in place: `Button`, `SectionHeader`, `MotionDiv`, animation constants, and the Server Component + Client leaf component pattern established in Phases 3 and 4. No new dependencies are required.

The key constraint is Netlify Forms detection: Netlify's build-time bot scans HTML for `data-netlify="true"` on `<form>` tags. Because the contact form will be inside a Client Component (`'use client'`), Netlify's bot may not see it during static generation. The safe pattern is to plant a hidden static HTML form in `public/` that mirrors the form field names — this guarantees Netlify registers the form regardless of JS rendering. The actual interactive form lives in the Client Component and submits via `fetch` to `/.netlify/forms/contact` (or as a standard POST with `Content-Type: application/x-www-form-urlencoded`).

**Primary recommendation:** Server Component page shell (`src/app/contact/page.tsx`) that renders a single `<ContactForm>` Client Component leaf. The leaf owns all interactive state (field values, validation, success/error) and submits to Netlify via fetch. A static mirror form lives in `public/netlify-form-detect.html`.

---

## Navigation — Current State (VERIFIED from source)

**File:** `src/components/layout/Navigation.tsx`

`Contact` is already in `navLinks`:
```ts
const navLinks = ['Portfolio', 'Services', 'Process', 'About', 'Contact']
```
This generates `href="/contact"` automatically — no change needed for the nav link itself.

The desktop CTA button already points to `/contact`:
```tsx
<Button variant="primary" href="/contact" size="md">
  Start a Project
</Button>
```

The mobile overlay CTA also already points to `/contact`:
```tsx
<Button variant="ghost" href="/contact" onClick={() => setMobileOpen(false)}>
  Start a Project
</Button>
```

**Footer** (`src/components/layout/Footer.tsx`) also already has `Contact` in its nav link list and a `<Button variant="ghost" href="/contact">Start a Project</Button>`.

**Conclusion: Zero navigation changes are required.** All CTAs and nav links already target `/contact`. The page simply needs to exist.

---

## Existing Component Patterns [VERIFIED from source files]

### Button
```ts
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'ghost-dark'
  size?: 'md' | 'lg'
  href?: string
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}
```
- Without `href`: renders `<button>` — use this for form submit
- With `href`: renders Next.js `<Link>`
- Form submit button: `<Button variant="primary" size="lg" type="submit">`

### SectionHeader
```ts
// src/components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  eyebrow: string        // small ALL-CAPS label above headline
  headline: string       // Cormorant Garamond display text
  body?: string          // optional DM Sans body paragraph
  dark?: boolean         // light-on-dark mode (for forest-deep backgrounds)
  className?: string
}
```
- Dark mode: `text-gold` eyebrow, `text-white` headline, `text-white/70` body
- Light mode (default): `text-text-muted` eyebrow, `text-text-primary` headline

### MotionDiv (and siblings)
```ts
// src/components/ui/MotionDiv.tsx — all are named exports
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionP = motion.p
```
All are re-exported Framer Motion primitives. Use with variants from `@/constants/animation`.

### Animation Constants
```ts
// src/constants/animation.ts
fadeUp    // { hidden: { opacity:0, y:32 }, visible: { opacity:1, y:0, duration:0.8 } }
fadeIn    // { hidden: { opacity:0 }, visible: { opacity:1, duration:0.6 } }
stagger   // { visible: { transition: { staggerChildren: 0.12 } } }
slideInLeft
heroEntrance
ease.out  // [0.16, 1, 0.3, 1]
```

### Reduced Motion Pattern (REQUIRED — matches every component in codebase)
Every animated component uses `useReducedMotion()` and passes `undefined` for variants when true:
```tsx
const prefersReducedMotion = useReducedMotion()
<MotionDiv
  variants={prefersReducedMotion ? undefined : fadeUp}
  initial={prefersReducedMotion ? undefined : 'hidden'}
  whileInView={prefersReducedMotion ? undefined : 'visible'}
  viewport={{ once: true, margin: '-80px' }}
>
```

### Page Template (global)
`src/app/template.tsx` wraps every page in a fade-in transition automatically — no per-page entrance animation is needed at the `<main>` level.

---

## Server Component + Client Leaf Pattern [VERIFIED from Phase 4]

**Page file (Server Component — no `'use client'`):**
```tsx
// src/app/about/page.tsx — canonical example
import { FounderSection } from '@/components/about/FounderSection'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

export const metadata = { title: '...', description: '...' }

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-forest-deep pt-32 pb-section-sm md:pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader eyebrow="..." headline="..." dark={true} />
        </div>
      </section>
      <FounderSection ... />  {/* Client Component leaf */}
    </main>
  )
}
```

**Client Component leaf (uses `'use client'` at top):**
```tsx
// src/components/process/ProcessTimeline.tsx — canonical example
'use client'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, stagger } from '@/constants/animation'
```

**Apply this to Phase 5:**
- `src/app/contact/page.tsx` — Server Component, exports metadata, renders hero strip + `<ContactForm />`
- `src/components/contact/ContactForm.tsx` — Client Component, owns all form state and submission logic

---

## Netlify Forms Wiring for Next.js 14 SSG [VERIFIED via Netlify official docs pattern]

### The SSG Detection Problem
Netlify's build bot scans deployed HTML for `data-netlify="true"` attributes to register forms. When a form lives inside a `'use client'` component, the static HTML output may not contain the form element — it is hydrated client-side after the bot scan. This causes Netlify to silently ignore the form.

### Solution: Static Mirror Form in `public/`

Create `public/netlify-form-detect.html` with a bare-bones HTML form that has:
1. `data-netlify="true"` (or `netlify` attribute)
2. `name` attribute matching the real form's name
3. All input `name` attributes matching exactly

```html
<!-- public/netlify-form-detect.html -->
<!DOCTYPE html>
<html>
<body>
  <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
    <input type="hidden" name="form-name" value="contact" />
    <input name="bot-field" />
    <input name="name" />
    <input name="email" />
    <input name="phone" />
    <select name="projectType"></select>
    <select name="budgetRange"></select>
    <textarea name="description"></textarea>
    <select name="timeline"></select>
  </form>
</body>
</html>
```

This file is deployed as a static asset. Netlify's bot finds it, registers the form named `"contact"`, and all subsequent submissions (even from JS fetch) are accepted.

### Client Component Form Submission

Submit via `fetch` with `application/x-www-form-urlencoded` encoding — this is the Netlify Forms JS submission pattern:

```tsx
const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

await fetch('/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: encode({
    'form-name': 'contact',
    'bot-field': '',   // always empty for real users
    ...formValues,
  }),
})
```

### Hidden Fields Required in the Actual Form

Even in the Client Component form, include these hidden inputs for Netlify to match the submission to the registered form:
```tsx
<input type="hidden" name="form-name" value="contact" />
<input name="bot-field" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />
```

### Success/Error State

Since there is no server redirect, manage entirely in React state:
```ts
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
const [status, setStatus] = useState<FormStatus>('idle')
```
On success: replace form with a luxury confirmation panel.
On error: show an inline error message below the submit button, keep form values intact.

---

## Form Fields Spec

### TypeScript Interface
```ts
// Add to src/types/index.ts or define locally in ContactForm.tsx
export interface ContactFormValues {
  name: string
  email: string
  phone: string
  projectType: ProjectType | ''
  budgetRange: BudgetRange | ''
  description: string
  timeline: Timeline | ''
}

export type ProjectType =
  | 'Hardscape'
  | 'Softscape'
  | 'Pool & Water'
  | 'Outdoor Kitchen'
  | 'Full Property Design'
  | 'Maintenance Plan'

export type BudgetRange =
  | 'Under $25k'
  | '$25k – $75k'
  | '$75k – $150k'
  | '$150k – $300k'
  | '$300k+'

export type Timeline =
  | 'This season'
  | 'Within 6 months'
  | 'Within a year'
  | 'Planning ahead'
```

### Form Fields Table
| Field | Element | Name attr | Required | Type |
|-------|---------|-----------|----------|------|
| Full name | `<input>` | `name` | yes | text |
| Email address | `<input>` | `email` | yes | email |
| Phone number | `<input>` | `phone` | no | tel |
| Project type | `<select>` | `projectType` | yes | ProjectType |
| Budget range | `<select>` | `budgetRange` | no | BudgetRange |
| Project description | `<textarea>` | `description` | yes | — |
| Preferred timeline | `<select>` | `timeline` | no | Timeline |

---

## Tailwind Form Styling [VERIFIED from tailwind.config.ts]

No form-related plugins are installed (`plugins: []`). No `@tailwindcss/forms` plugin. All input/select/textarea styling must be done with raw Tailwind utility classes.

### Recommended Input Base Classes
Matching the site aesthetic (organic luxury, forest/stone palette):

```tsx
const inputBase = `
  w-full bg-transparent border-b border-stone-dark
  py-3 font-sans text-base text-text-primary placeholder-text-muted
  focus:outline-none focus:border-sage
  transition-colors duration-200
`
```

Note: `stone-dark` is `#D4CCC0` (defined in config). `sage` is `#4A7C59`. This matches the editorial feel — no rounded corners, no box borders, just a bottom border rule.

### Select Appearance Reset
Selects need `appearance-none` + custom chevron to match design:
```tsx
const selectBase = `${inputBase} appearance-none cursor-pointer pr-8`
// Wrap in relative div with SVG chevron absolutely positioned right
```

### Textarea
```tsx
const textareaBase = `
  w-full bg-transparent border border-stone-dark rounded-none
  py-3 px-0 font-sans text-base text-text-primary placeholder-text-muted
  focus:outline-none focus:border-sage
  transition-colors duration-200 resize-none min-h-[120px]
`
```
Description textarea is the one exception where a full border (not just bottom) makes sense given multiline.

### Label Style
```
font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block
```
This matches the section label / footer column header pattern already in use.

---

## Component Split Recommendation

```
src/app/contact/
└── page.tsx                          # Server Component — metadata, hero strip, imports ContactForm

src/components/contact/
└── ContactForm.tsx                   # 'use client' — all form state, fields, submission, success/error

public/
└── netlify-form-detect.html          # Static Netlify bot detection mirror form
```

`ContactForm.tsx` is the only Client Component needed. It owns:
- `useState` for field values (typed `ContactFormValues`)
- `useState<FormStatus>` for submission state
- `onChange` handlers
- `onSubmit` with fetch to Netlify
- Conditional render: form panel vs. success panel vs. error inline message

The page file (`page.tsx`) is a Server Component that exports metadata and renders the layout shell (dark hero strip + light form section) with `<ContactForm />` as a leaf.

---

## Page Structure Blueprint

```tsx
// src/app/contact/page.tsx
export const metadata = {
  title: 'Start a Project | Verdant Landscape Design',
  description: 'Tell us about your property and vision. ...',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Dark hero strip — matches about/process pattern */}
      <section className="bg-forest-deep pt-32 pb-section-sm md:pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="START YOUR PROJECT"
            headline="Let's Build Something Lasting"
            body="Every project begins with a conversation. Tell us about your property, your vision, and we'll be in touch within 48 hours."
            dark={true}
          />
        </div>
      </section>

      {/* Light form section */}
      <section className="bg-stone-warm py-section">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
```

---

## Common Pitfalls

### Pitfall 1: Netlify Form Not Registering
**What goes wrong:** Form submissions return 404 or are silently dropped. Netlify dashboard shows no form named "contact".
**Why it happens:** The form is inside a `'use client'` component rendered by React — Netlify's build-time bot never sees it in the static HTML.
**How to avoid:** Always create `public/netlify-form-detect.html` with a matching static form before relying on JS submission.
**Warning signs:** Submissions return a 404 from Netlify or the form never appears in the Netlify dashboard under Forms.

### Pitfall 2: Missing `form-name` Hidden Input
**What goes wrong:** Fetch submission returns 200 but no data appears in Netlify dashboard.
**Why it happens:** Netlify matches POST submissions to registered forms by the `form-name` body field. Without it, the submission is discarded.
**How to avoid:** Always include `<input type="hidden" name="form-name" value="contact" />` inside the `<form>` element in the Client Component.

### Pitfall 3: Select Default Value is Empty String
**What goes wrong:** TypeScript complains or form submits with an empty string for required selects.
**How to avoid:** Initialize `projectType: ''` in state. Validate before submit: check `formValues.projectType !== ''`. Show an error if user tries to submit without selecting.

### Pitfall 4: `<Button>` type Attribute
**What goes wrong:** Button component uses `[key: string]: unknown` for rest props, so `type="submit"` must be passed. Without it, button inside a form defaults to `type="submit"` anyway in HTML — but be explicit for clarity.
**How to avoid:** Pass `type="submit"` explicitly: `<Button variant="primary" size="lg" type="submit">`.

### Pitfall 5: No `@tailwindcss/forms` Plugin
**What goes wrong:** Selects and inputs have browser-default styling (rounded, different background on different OS) that breaks the editorial look.
**Why it happens:** The project has no form plugin and relies on raw utilities.
**How to avoid:** Add `appearance-none` to all selects. Add explicit `bg-transparent` to inputs/selects so browsers don't inject a white or grey background. On Safari, `select` elements need `-webkit-appearance: none` which `appearance-none` provides via Tailwind.

### Pitfall 6: Contact Already in Navigation
**What goes wrong:** Developer spends time trying to add "Contact" to the nav array.
**How to avoid:** `navLinks` in both `Navigation.tsx` and `Footer.tsx` already includes `'Contact'`, and both CTAs already href to `/contact`. Zero navigation edits are required — just build the page.

---

## File Checklist for Planner

| File | Action | Notes |
|------|--------|-------|
| `src/app/contact/page.tsx` | Create | Server Component, metadata, layout shell |
| `src/components/contact/ContactForm.tsx` | Create | `'use client'`, all form state and logic |
| `public/netlify-form-detect.html` | Create | Static mirror form for Netlify bot — must match all field names |
| `src/types/index.ts` | Extend | Add `ContactFormValues`, `ProjectType`, `BudgetRange`, `Timeline` |
| `src/components/layout/Navigation.tsx` | No change | Contact already in navLinks, CTA already href="/contact" |
| `src/components/layout/Footer.tsx` | No change | Contact already in navLinks, CTA already href="/contact" |

---

## Sources

### Primary (HIGH confidence — verified from project source files)
- `src/components/ui/Button.tsx` — ButtonProps interface, variant/size classes, render branch
- `src/components/ui/SectionHeader.tsx` — SectionHeaderProps, dark/light mode classes
- `src/components/ui/MotionDiv.tsx` — all named exports
- `src/constants/animation.ts` — all animation variants and ease values
- `src/app/layout.tsx` — font setup, global body classes
- `src/components/layout/Navigation.tsx` — navLinks array (includes Contact), both CTA buttons already href="/contact"
- `src/components/layout/Footer.tsx` — navLinks array (includes Contact), footer CTA already href="/contact"
- `src/app/about/page.tsx` — Server Component page pattern
- `src/app/process/page.tsx` — Server Component page pattern
- `src/components/process/ProcessTimeline.tsx` — Client leaf pattern with useReducedMotion
- `src/types/index.ts` — existing Project and Service interfaces
- `tailwind.config.ts` — color tokens, spacing tokens, `plugins: []` confirmed

### Secondary (MEDIUM confidence — standard Netlify Forms patterns)
- Netlify Forms JS submission pattern with `fetch` + `application/x-www-form-urlencoded` [ASSUMED: based on Netlify documentation conventions — verify against current Netlify docs if issues arise]
- Static form in `public/` as bot detection workaround for SSG/CSR forms [ASSUMED: well-established community pattern for Next.js + Netlify Forms]

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Netlify Forms detects `public/netlify-form-detect.html` during build and registers the form name | Netlify Forms Wiring | Submissions 404 or are silently dropped — fallback: add `netlify` attribute directly to form and ensure page pre-renders |
| A2 | Fetch POST with `application/x-www-form-urlencoded` and `form-name` body field is the correct Netlify Forms JS submission pattern | Netlify Forms Wiring | Submissions not recorded — fallback: use standard form POST with redirect |

---

## Metadata

**Confidence breakdown:**
- Component patterns: HIGH — read directly from source files
- Navigation state: HIGH — both Navigation.tsx and Footer.tsx verified; no changes needed
- Tailwind config: HIGH — confirmed no form plugin, raw utilities required
- Netlify Forms wiring: MEDIUM — static mirror form pattern is well-established but not verified against current Netlify docs this session
- Architecture split: HIGH — directly mirrors Phase 4 pattern

**Research date:** 2026-04-12
**Valid until:** 2026-05-12 (stable domain)

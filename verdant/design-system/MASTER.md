# Verdant — Design System Master

> Global Source of Truth. All pages inherit from this document.
> Page-specific overrides live in design-system/pages/[page].md.

---

## 1. Brand Essence

**Verdant creates living environments that blur the boundary between architecture and nature.**

The site should feel like stepping into a luxury landscape architecture coffee table book — editorial, photography-forward, generous with white space, precise with type. Every element earns its place. Nothing decorates for decoration's sake.

**Design north star:** A $50,000+ client sees this and thinks "these people understand what premium means."

---

## 2. Color System

### Palette

| Token | Hex | Use |
|-------|-----|-----|
| `forest-deep` | `#1C2B1E` | Primary dark: hero backgrounds, nav on scroll, dark sections, text on light |
| `forest-mid` | `#2A3E2C` | Secondary dark: card hovers on dark bg, subtle depth |
| `sage` | `#4A7C59` | Primary accent: CTAs, active states, links, checkmarks |
| `sage-light` | `#6B9E7A` | Hover state for sage elements |
| `gold` | `#C9A84C` | Secondary accent: eyebrows, dividers, badges, secondary CTAs |
| `gold-light` | `#D9B96C` | Gold hover state |
| `stone-warm` | `#F5F0E8` | Primary light surface: page background, cards on dark sections |
| `stone-mid` | `#EBE5D9` | Subtle separation: card bg, form fields |
| `stone-dark` | `#D4CCC0` | Borders/dividers on light backgrounds |
| `off-white` | `#FAF9F6` | Lightest surface: hero light overlays |
| `text-primary` | `#1A1A1A` | Primary body text on light backgrounds |
| `text-secondary` | `#4A4A4A` | Secondary text, metadata |
| `text-muted` | `#7A7A6E` | Captions, timestamps, eyebrow labels |
| `white` | `#FFFFFF` | Text/icons on dark/image backgrounds |

### Usage Rules

- **Never use pure black** (`#000000`) — it reads cold. Use `forest-deep` for near-black.
- **Never use pure white** on light sections — use `off-white` or `stone-warm`.
- **Gold is an accent** — one or two touches per section, not a dominant color.
- **Forest deep** on light sections creates the signature Verdant dark-on-light contrast.
- Hero sections: always `forest-deep` as overlay on photography.

### Tailwind Config Tokens

```js
// tailwind.config.ts — colors
colors: {
  forest: {
    deep: '#1C2B1E',
    mid: '#2A3E2C',
  },
  sage: {
    DEFAULT: '#4A7C59',
    light: '#6B9E7A',
  },
  gold: {
    DEFAULT: '#C9A84C',
    light: '#D9B96C',
  },
  stone: {
    warm: '#F5F0E8',
    mid: '#EBE5D9',
    dark: '#D4CCC0',
  },
  'off-white': '#FAF9F6',
  'text-primary': '#1A1A1A',
  'text-secondary': '#4A4A4A',
  'text-muted': '#7A7A6E',
}
```

---

## 3. Typography

### Font Selection

**Display / Hero Headlines: Cormorant Garamond**
- Ultra-high contrast old-style serif — looks like a luxury magazine masthead
- Use for: page heroes, section manifesto text, large pull quotes
- Weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold)
- The 300 italic is exceptional — use it for pull quotes and subheadlines
- Do not use below 28px

**Body / UI / Navigation: DM Sans**
- Humanist geometric sans-serif — clean, open, modern but warm
- Extremely legible at small sizes
- Use for: body copy, navigation, labels, buttons, form fields, captions
- Weights: 300 (light), 400 (regular), 500 (medium)
- 400 is the default body weight; 500 for emphasis

### Font Import

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
```

### Tailwind Config

```js
fontFamily: {
  display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
  sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
}
```

### Type Scale

| Role | Font | Size (desktop) | Size (mobile) | Weight | Line Height |
|------|------|----------------|---------------|--------|-------------|
| Hero headline | Cormorant Garamond | 80-96px | 48-60px | 300 | 0.95 |
| Section headline | Cormorant Garamond | 52-68px | 34-44px | 400 | 1.05 |
| Card headline | Cormorant Garamond | 28-36px | 24-28px | 400 | 1.15 |
| Body large | DM Sans | 18-20px | 17px | 400 | 1.75 |
| Body default | DM Sans | 16px | 16px | 400 | 1.6 |
| Label / eyebrow | DM Sans | 11-13px | 11px | 400 | 1.4 |
| Caption | DM Sans | 13-14px | 13px | 300 | 1.5 |
| Button | DM Sans | 14-15px | 14px | 500 | 1 |
| Nav | DM Sans | 14px | — | 400 | 1 |

> **Note on hero sizing:** BBC standard caps at 60px. Verdant intentionally exceeds this for the flagship portfolio showcase — 80-96px on the hero is a deliberate editorial statement. Section headlines stay within a 52-68px range that aligns with luxury editorial publications (LUXE Interiors + Design uses up to 64px display).

### Eyebrow Treatment

All eyebrow labels (section category labels above headings) follow this treatment:
- DM Sans, 11px, weight 400
- Letter-spacing: 0.2em (very wide)
- ALL CAPS
- Color: `text-muted` (#7A7A6E) on light, `gold` on dark sections
- Preceded by a 48px gold horizontal rule (1px, `gold`)

```
─────────────────   (gold 1px rule, 48px wide)
HARDSCAPE DESIGN    (eyebrow label)
The Foundation of   (Cormorant Garamond headline)
Every Great Outdoor World
```

---

## 4. Spacing System

Base unit: 8px. All spacing multiples of 4 for sub-unit precision.

```js
// tailwind.config.ts — spacing extensions
spacing: {
  '18': '72px',
  '22': '88px',
  '26': '104px',
  '30': '120px',
  '34': '136px',
  '38': '152px',
  '42': '168px',
  'section': '128px',   // Standard vertical section padding (desktop)
  'section-sm': '80px', // Vertical section padding (mobile)
}
```

**Section rhythm:**
- Desktop: `py-section` (128px top/bottom)
- Mobile: `py-section-sm` (80px)
- Content max-width: `max-w-7xl` (1280px) with `px-6 md:px-12 lg:px-20`

---

## 5. Animation System (Framer Motion)

### Core Principle

Cinematic pace. Animations should feel like a slow lens pull, not a UI micro-interaction. When in doubt, go slower and smoother.

### Easing Curves

```ts
// constants/animation.ts
export const ease = {
  out: [0.16, 1, 0.3, 1],       // Expo out — fast start, slow settle
  inOut: [0.76, 0, 0.24, 1],    // Quart in-out — deliberate, editorial
  spring: { type: 'spring', stiffness: 200, damping: 28 },
}
```

### Animation Variants

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: ease.out } },
}

export const heroEntrance = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: ease.out } },
}

export const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: ease.out } },
}
```

### Page Transitions

```ts
// All pages enter with a forest-deep overlay that fades out
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: ease.out } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}
```

### Trigger Rules

- Scroll reveals: use Framer Motion `whileInView`, `once: true`, `margin: "-80px"`
- Hero: triggers on mount (no scroll required)
- Stagger containers: wrap children in `motion.div` with `stagger` variant
- Image parallax: max 15% shift, only on desktop, `prefers-reduced-motion` respected

### Motion Accessibility

```ts
// Every component with motion must check this:
const prefersReducedMotion = useReducedMotion() // Framer Motion hook
// If true, skip all transform/opacity transitions
```

---

## 6. Component Anatomy

### Navigation

```
State 1 — transparent (top of page):
  bg-transparent, h-24, logo at full size

State 2 — scrolled (at 80px):
  bg-forest-deep/95 backdrop-blur-md, h-16, logo scales down
  transition: all 300ms ease

Layout: flex justify-between items-center, px-8 md:px-16
Left: VERDANT wordmark (DM Sans 400, letter-spacing 0.3em, white, ALL CAPS)
      — full size (h-6) when transparent, compact (h-5) when scrolled
Right: nav links (DM Sans 400, 13px, letter-spacing 0.1em, white/70 default, white on hover)
      + "Start a Project" CTA button (sage bg, white text, rounded-none, px-6 py-3)

Mobile: hamburger icon → full-screen overlay (forest-deep bg, links centered, 
        Cormorant Garamond 36px italic, stagger-fade-in animation)
```

> **Pattern source:** Logo-shrink-on-scroll observed on Creative Environments (luxury landscape) and confirmed as a luxury site convention — signals quality and polish without a visible jump.

### Hero Section

```
[full viewport height, full bleed photography]
[gradient overlay: forest-deep 70% bottom-up]

Content (centered, bottom-aligned with padding):
  ─────────────────    (gold rule)
  SARATOGA SPRINGS     (DM Sans eyebrow)
  We Build             (Cormorant Garamond 300, 80-96px desktop / 48-60px mobile)
  Outdoor Worlds.      (Cormorant Garamond 300 italic, 80-96px desktop / 48-60px mobile)
  [body sentence, DM Sans 18px, white/70]
  [Start a Project] [View Our Work]   (buttons)
```

### Section Header Pattern

```
[gold rule 48px × 1px]
[EYEBROW LABEL — DM Sans 11px, 0.2em tracking, text-muted on light / gold on dark]
[Headline — Cormorant Garamond, appropriate scale]
[Optional body — DM Sans 18px, text-secondary, max-w-2xl]
```

### Project Card

```
[stone-mid background, no border-radius or very subtle 2px]
[Photography: top 60%, object-cover, group-hover: scale-105 transition-600ms]
[Bottom 40%:]
  padding: 24px
  [project type — DM Sans eyebrow]
  [Project Name — Cormorant Garamond 28px]
  [Location — DM Sans 14px, text-muted]
  [Investment range — DM Sans 14px, sage]
  [→ View Case Study — DM Sans 13px, text-secondary, group-hover: text-sage]
[Hover: subtle sage left-border appears (2px sage border-l)]
```

### Button System

```
Primary (sage):
  bg-sage text-white px-8 py-4 DM-Sans-500 13px tracking-[0.1em] uppercase
  hover: bg-sage-light, transition-300ms

Secondary (gold outline):
  border border-gold text-gold px-8 py-4 DM-Sans-400 13px tracking-[0.1em] uppercase
  hover: bg-gold text-forest-deep, transition-300ms

Ghost (white outline on dark):
  border border-white/50 text-white px-8 py-4 DM-Sans-400 13px tracking-[0.1em] uppercase
  hover: border-white bg-white/10, transition-300ms

Ghost dark (on light):
  border border-forest-deep text-forest-deep px-8 py-4 DM-Sans-400 13px tracking-[0.1em] uppercase
  hover: bg-forest-deep text-white, transition-300ms

All buttons: rounded-none (sharp corners — luxury, not playful)
```

### Testimonial Card

```
[Background: forest-mid]
[Top: project photo (full-width, 200px height, object-cover)]
[Body: padding 32px]
  [" — gold, Cormorant Garamond 72px, line-height 0.5, text-gold/60]
  [Quote — Cormorant Garamond italic 22px, white, line-height 1.5, max 3 sentences]
  [Divider: gold rule 32px × 1px]
  [Client Name — DM Sans 500 14px, white]
  [Location + Project — DM Sans 300 13px, white/60]
```

### Form Fields

```
[Label: DM Sans 12px, text-secondary, tracking-[0.08em], uppercase, mb-2]
[Input: bg-stone-mid border border-stone-dark px-5 py-4 DM-Sans-400 16px text-primary]
[Focus: border-sage outline-none ring-0]
[Placeholder: text-muted]
[All inputs: rounded-none]

Budget qualifier: radio cards
  [Card: border border-stone-dark, px-6 py-5]
  [Selected: border-sage bg-sage/5]
  [Label: DM Sans 500 15px]
  [Sublabel: DM Sans 300 13px text-muted]
```

### Before/After Slider

```
[Container: relative overflow-hidden, aspect-ratio 16/9]
[Before image: absolute inset-0 object-cover]
[After image: absolute inset-0 object-cover, clip-path: inset(0 50% 0 0)]
[Slider handle: absolute, vertical center, draggable]
  [Line: 2px solid white/80]
  [Circle: 48px diameter, bg-white, shadow-lg]
  [Arrows: ← →, sage color, 16px]
[Labels: "Before" / "After" — DM Sans 12px uppercase, white bg/20, absolute corners]
```

---

## 7. Homepage Section Architecture

| # | Section | Background | Key Element |
|---|---------|-----------|-------------|
| 1 | Cinematic Hero | Photography + forest overlay | "We Build Outdoor Worlds" manifesto |
| 2 | Seasonal Availability Banner | gold on forest-deep | "Now booking Spring 2026 — limited slots" |
| 3 | Philosophy Statement | off-white | 2-col: manifesto text + abstract crop photo |
| 4 | Services Overview | stone-warm | 3-col icon cards (Hardscape, Softscape, Pools, Kitchens, Full Property) |
| 5 | Featured Project | Full-bleed photography | Case study preview with before/after tease |
| 6 | Process Preview | forest-deep | Horizontal timeline: 6 steps |
| 7 | Testimonials | forest-mid | 3-card carousel with project photos |
| 8 | Lead Magnet | stone-mid | "Free Outdoor Living Design Guide" download |
| 9 | Seasonal CTA | sage | "Spring slots filling — start your project" |
| 10 | Footer | forest-deep | 4-col: nav, services, contact, BBC badge |

---

## 8. Icon System

**Library: Lucide React** (consistent stroke-based icons, 24×24 viewBox)
No emojis. No icon fonts. SVG only.

Service icons: custom SVG illustrations (organic, minimal, not generic)
- Hardscape: stone/paver pattern
- Softscape: leaf/plant form  
- Pools: water ripple
- Outdoor Kitchens: flame/grill
- Full Property: property boundary outline

---

## 9. Photography Guidelines

- **Source**: Unsplash luxury landscape + outdoor living
- **Subjects**: stone terraces, pool reflections, lush plantings, outdoor dining, stone fireplaces, garden paths, pergolas
- **Color temperature**: warm-leaning — golden hour where possible
- **Treatment**: No filters. No text overlays except hero. Let images breathe.
- **Aspect ratios**: Hero: 16:9 or full-bleed. Cards: 3:2 or 4:3. Case studies: varied.
- **Alt text**: always descriptive. Required for WCAG compliance.

---

## 10. VERDANT Wordmark (SVG)

Text-based wordmark. No icon — the name carries the brand.

```
VERDANT
```

Treatment: DM Sans 400, 16px, letter-spacing: 0.3em, ALL CAPS
Color: white on dark backgrounds, forest-deep on light
No tagline in the wordmark itself — tagline is separate site copy

---

## 11. Z-Index Scale

```ts
// Constants
const Z = {
  below: -1,
  base: 0,
  image: 1,
  overlay: 10,
  nav: 50,
  modal: 100,
  toast: 200,
}
```

---

## 12. Accessibility

- WCAG 2.1 AA — non-negotiable on every component
- Color contrast: minimum 4.5:1 for body, 3:1 for large text
- All interactive elements: visible focus ring (2px solid sage, 2px offset)
- All images: descriptive alt text
- Form inputs: explicit labels (not placeholder-only)
- Keyboard navigation: logical tab order
- prefers-reduced-motion: all animations respect this
- Screen reader: aria-labels on icon buttons, landmark regions on all sections

---

## 13. Performance Targets

- Lighthouse Performance: 95+
- LCP: < 2.5s
- CLS: < 0.1
- FID/INP: < 100ms
- Images: Next.js Image component, WebP, proper sizing, priority on LCP image
- Fonts: `display=swap`, subset to used characters
- JS: code-split by route, no unused imports

---

## 14. BBC Footer Badge

Every page footer includes:

```
Built by BBC
```

- Link text: "Built by BBC"
- href: https://bbc-agency.com
- Style: DM Sans 12px, text-muted on dark, inline with other footer legal text
- Non-negotiable on all BBC builds

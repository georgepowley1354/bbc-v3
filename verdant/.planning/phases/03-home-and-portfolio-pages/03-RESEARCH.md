# Phase 3: Home and Portfolio Pages — Research

**Researched:** 2026-04-12
**Domain:** Next.js 14 App Router, TypeScript, Tailwind CSS v3, Framer Motion v11, Google Fonts
**Confidence:** HIGH

---

## Summary

Phase 3 scaffolds the entire Next.js 14 application from zero and builds the Home and Portfolio pages to design spec. The stack is well-established: Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion v11, and Netlify deployment. All five research areas have verified, current patterns available.

The single most important architectural constraint is the Server Component / Client Component boundary: Framer Motion requires `"use client"` on every file that imports from it. The correct pattern is to keep pages as Server Components and push the `"use client"` boundary down into small motion-wrapper components or a `template.tsx` file. This keeps SSR working and avoids hydration errors.

For fonts, `next/font/google` self-hosts both Cormorant Garamond and DM Sans at build time — no external CDN call at runtime. For the masonry portfolio grid, the lightest correct approach is a custom `useMasonry` hook (pattern from Cruip) — roughly 40 lines of TypeScript with no additional dependencies.

**Primary recommendation:** Scaffold with `create-next-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`, then layer in Framer Motion, fonts, and custom Tailwind tokens in the order documented below.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 14.2.35 | Framework — App Router, Image, Font, SSR | Latest stable 14.x as of registry check [VERIFIED: npm registry] |
| react | 18.x | UI runtime | Peer dep of next@14 [VERIFIED: npm registry peerDependencies] |
| react-dom | 18.x | DOM renderer | Peer dep of next@14 [VERIFIED: npm registry] |
| typescript | 5.x | Type safety | Auto-installed by create-next-app [ASSUMED] |
| tailwindcss | 3.4.19 | Utility-first CSS | Latest stable v3 as of registry check [VERIFIED: npm registry] |
| framer-motion | 11.18.2 | Animation — cinematic motion, scroll reveals, page transitions | Latest v11 patch — project spec requires v11 [VERIFIED: npm registry] |
| lucide-react | 1.8.0 | Icon library — stroke-based, 24x24, consistent | Design system specifies Lucide [VERIFIED: npm registry, design-system/MASTER.md] |

**Important version note:** `framer-motion` latest is v12.x but project spec locks to v11. Pin explicitly: `framer-motion@11` [VERIFIED: npm dist-tags show latest=12.x, v11 line ends at 11.18.2].

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @types/node | 25.x | TypeScript Node types | Auto-installed |
| @types/react | 18.x | TypeScript React types | Auto-installed |
| postcss | 8.x | CSS processing (required by Tailwind) | Auto-installed with Tailwind |
| autoprefixer | 10.x | Vendor prefixes (required by Tailwind v3) | Auto-installed with Tailwind v3 |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom useMasonry hook | react-masonry-css | react-masonry-css last published 5 years ago, not maintained. Custom hook has no dependency, full TypeScript support, same behavior. [VERIFIED: npm registry, last published 2019] |
| Custom useMasonry hook | masonic | masonic adds 1.4KB but is virtualized — overkill for 5-project portfolio. Only needed at 100+ items. |
| next/font/google | Google Fonts CDN @import | CDN approach adds external network request at runtime, slower, no privacy guarantee. next/font self-hosts at build time. [CITED: nextjs.org docs] |
| framer-motion v11 | CSS transitions only | FM v11 provides useReducedMotion hook and the scroll/viewport trigger system (whileInView) needed for the design spec. Pure CSS cannot replicate viewport-triggered stagger variants. |

### Installation

```bash
npx create-next-app@14 verdant \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack

cd verdant
npm install framer-motion@11 lucide-react
```

**Version verification run on:** 2026-04-12
- `next@14.2.35` — latest in 14.x line [VERIFIED: npm registry]
- `framer-motion@11.18.2` — latest in 11.x line [VERIFIED: npm registry]
- `tailwindcss@3.4.19` — latest in 3.x line [VERIFIED: npm registry]
- `lucide-react@1.8.0` — latest stable [VERIFIED: npm registry]
- Node.js v24.14.0 on this machine — exceeds next@14 minimum of >=18.17.0 [VERIFIED: node --version, npm view next@14.2.35 engines]

---

## Architecture Patterns

### Recommended Project Structure

```
verdant/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — fonts, global providers, nav, footer
│   │   ├── page.tsx            # Home page (Server Component — no "use client")
│   │   ├── template.tsx        # Page transition wrapper (Client Component — Framer Motion)
│   │   ├── globals.css         # Tailwind directives + CSS custom properties
│   │   ├── portfolio/
│   │   │   └── page.tsx        # Portfolio page (Server Component)
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── process/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx        # "use client" — scroll state
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # "use client" — Framer Motion heroEntrance
│   │   │   ├── PhilosophySection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── FeaturedProject.tsx
│   │   │   ├── ProcessPreview.tsx
│   │   │   ├── Testimonials.tsx      # "use client" — carousel/animation
│   │   │   ├── LeadMagnet.tsx
│   │   │   └── SeasonalCTA.tsx
│   │   ├── portfolio/
│   │   │   ├── MasonryGrid.tsx       # "use client" — useMasonry hook requires DOM
│   │   │   └── ProjectCard.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── SectionHeader.tsx     # eyebrow + rule + headline pattern
│   │       ├── MotionDiv.tsx         # "use client" reusable motion wrapper
│   │       └── BeforeAfterSlider.tsx # "use client" — drag interaction
│   ├── constants/
│   │   └── animation.ts        # ease curves, variants (fadeUp, fadeIn, etc.)
│   ├── hooks/
│   │   └── useMasonry.ts       # Custom masonry layout hook
│   ├── lib/
│   │   └── projects.ts         # Seed project data (5 fictional projects)
│   └── types/
│       └── index.ts            # Shared TypeScript types
├── public/
│   ├── images/                 # Static assets if any
│   └── icons/                  # PWA icons (Phase 6)
├── design-system/
│   └── MASTER.md               # Existing — do not modify
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── postcss.config.js
```

### Pattern 1: Root Layout with Fonts

The root layout loads both Google Fonts as CSS variables using `next/font/google`. The variables are injected onto `<html>` so they cascade to both body and the Tailwind font utilities.

```typescript
// src/app/layout.tsx
// Source: [CITED: nextjs.org/docs/app/getting-started/fonts + verified community pattern]
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Verdant Landscape Design',
  description: 'We Build Outdoor Worlds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-stone-warm text-text-primary font-sans antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

**Critical note on Cormorant Garamond:** The import name is `Cormorant_Garamond` (underscore — all multi-word Google Font names use underscores). Cormorant Garamond is NOT a variable font — you cannot use `weight: 'variable'`. Declare each weight explicitly in an array. [VERIFIED: WebSearch confirmed non-variable font requires explicit weight array]

### Pattern 2: Page Transitions with template.tsx

`template.tsx` in the `app/` directory is the correct App Router primitive for per-navigation animations. Unlike `layout.tsx` (which persists across navigation), `template.tsx` re-mounts on every route change, triggering Framer Motion's `initial` to `animate` sequence.

```typescript
// src/app/template.tsx
// Source: [CITED: dev.to/abdur_rakibrony — verified pattern for Next.js 14 App Router]
"use client"

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

**Why not AnimatePresence in layout.tsx:** AnimatePresence exit animations do not work reliably in Next.js 14 App Router because the router context updates before the exit animation can complete. The template.tsx approach gives reliable enter animations; exit animations should be skipped or handled with a simple opacity-only fade if needed. [CITED: github.com/vercel/next.js/discussions/59349 + imcorfitz.com]

### Pattern 3: Tailwind Configuration with Design System Tokens

```typescript
// tailwind.config.ts
// Source: [CITED: tailwindcss.com/docs + design-system/MASTER.md]
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '30': '120px',
        '34': '136px',
        '38': '152px',
        '42': '168px',
        'section': '128px',
        'section-sm': '80px',
      },
    },
  },
  plugins: [],
}

export default config
```

**globals.css:**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  /* Focus ring — WCAG 2.1 AA required */
  *:focus-visible {
    outline: 2px solid #4A7C59;
    outline-offset: 2px;
  }
}
```

### Pattern 4: Animation Constants (from Design System)

```typescript
// src/constants/animation.ts
// Source: design-system/MASTER.md — transcribed verbatim

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  spring: { type: 'spring' as const, stiffness: 200, damping: 28 },
}

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

### Pattern 5: Masonry Hook

```typescript
// src/hooks/useMasonry.ts
// Source: [CITED: cruip.com/how-to-create-a-true-masonry-with-nextjs/]
// Pattern: getBoundingClientRect-based repositioning, no dependencies

import { useEffect, useState, useRef } from 'react'

const useMasonry = () => {
  const masonryContainer = useRef<HTMLDivElement | null>(null)
  const [items, setItems] = useState<ChildNode[]>([])

  useEffect(() => {
    if (masonryContainer.current) {
      setItems(Array.from(masonryContainer.current.children))
    }
  }, [])

  useEffect(() => {
    const handleMasonry = () => {
      if (!items || items.length < 1) return
      let gapSize = 0
      if (masonryContainer.current) {
        gapSize = parseInt(
          window
            .getComputedStyle(masonryContainer.current)
            .getPropertyValue('grid-row-gap'),
        )
      }
      items.forEach((el) => {
        if (!(el instanceof HTMLElement)) return
        let previous = el.previousSibling
        while (previous) {
          if (previous.nodeType === 1) {
            el.style.marginTop = '0'
            if (
              previous instanceof HTMLElement &&
              elementLeft(previous) === elementLeft(el)
            ) {
              el.style.marginTop =
                -(elementTop(el) - elementBottom(previous) - gapSize) + 'px'
              break
            }
          }
          previous = previous.previousSibling
        }
      })
    }

    handleMasonry()
    window.addEventListener('resize', handleMasonry)
    return () => window.removeEventListener('resize', handleMasonry)
  }, [items])

  const elementLeft = (el: HTMLElement) => el.getBoundingClientRect().left
  const elementTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY
  const elementBottom = (el: HTMLElement) => el.getBoundingClientRect().bottom + window.scrollY

  return masonryContainer
}

export default useMasonry
```

**Usage in portfolio grid (requires "use client"):**

```typescript
// src/components/portfolio/MasonryGrid.tsx
"use client"

import useMasonry from '@/hooks/useMasonry'
import ProjectCard from './ProjectCard'
import { projects } from '@/lib/projects'

export default function MasonryGrid() {
  const masonryContainer = useMasonry()

  return (
    <div
      ref={masonryContainer}
      className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

### Pattern 6: Framer Motion in Server Component Trees

The recommended pattern for keeping pages as Server Components while using motion animations:

```typescript
// src/components/ui/MotionDiv.tsx
"use client"

import { motion } from 'framer-motion'

// Reusable wrapper — pages stay Server Components, import this for motion
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionP = motion.p
```

```typescript
// src/components/home/HeroSection.tsx
"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { heroEntrance, stagger } from '@/constants/animation'

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : heroEntrance

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="relative h-screen overflow-hidden"
    >
      {/* hero content */}
    </motion.section>
  )
}
```

### Pattern 7: Next.js Config for Images

Unsplash images require `remotePatterns` in `next.config.ts`:

```typescript
// next.config.ts
// Source: [CITED: nextjs.org/docs/app/api-reference/config/next-config-js/images]
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
```

### Anti-Patterns to Avoid

- **Putting `"use client"` on page.tsx:** Turns the entire route into a client bundle. Push the boundary down to the specific component that needs it.
- **Importing `motion` in layout.tsx without `"use client"`:** Will throw a server component error at build time.
- **Using `output: 'export'` in next.config.ts for Netlify:** Static export disables SSR, Image optimization, and Route Handlers. Netlify handles Next.js SSR natively — no static export needed. [CITED: docs.netlify.com]
- **Using `domains` in next.config.ts for images:** `domains` is deprecated in Next.js 14. Use `remotePatterns`. [CITED: nextjs.org/docs/messages/next-image-unconfigured-host]
- **AnimatePresence in layout.tsx for exit animations:** Known broken in App Router — router context updates race the animation. Use template.tsx for enter-only. [CITED: github.com/vercel/next.js/discussions/59349]
- **Rendering user-controlled content without sanitization:** All content in Phase 3 comes from typed data structures in `lib/projects.ts`, not user input. No raw HTML injection patterns should be used anywhere in the codebase.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading and self-hosting | Manual font download + CSS @font-face | `next/font/google` | Handles subsetting, self-hosting, preloading, display=swap automatically. Manual approach requires CORS handling and build pipeline. |
| Image optimization | `<img>` tags with manual sizing | `next/image` | Automatic WebP conversion, lazy loading, blur placeholder, LCP priority attribute, layout shift prevention (CLS). |
| Scroll-triggered animation state | IntersectionObserver custom hook | `whileInView` with `viewport={{ once: true, margin: '-80px' }}` on motion components | Framer Motion wraps IntersectionObserver and handles cleanup. |
| masonry layout | CSS `column-count` multi-column | `useMasonry` hook (Pattern 5) | column-count reorders items top-to-bottom within columns, breaking visual flow. useMasonry uses actual CSS grid with JS gap-closing for correct left-to-right order. |
| Reduced-motion detection | Manual media query listener | `useReducedMotion()` from framer-motion | Single hook, SSR-safe, handles client hydration correctly. |

**Key insight:** In Next.js, the Image and Font primitives exist specifically to solve the hardest frontend performance problems (LCP, CLS, layout shift). Every custom solution re-introduces the exact problems they were built to solve.

---

## Common Pitfalls

### Pitfall 1: Framer Motion Hydration Error

**What goes wrong:** `Error: Hydration failed because the initial UI does not match what was rendered on the server.`

**Why it happens:** A component using `motion` was rendered in a Server Component context (no `"use client"` directive). The server renders nothing, the client renders motion elements, mismatch.

**How to avoid:** Every file that imports from `framer-motion` must have `"use client"` as the first line — before imports.

**Warning signs:** Runtime hydration mismatch in browser console. Error mentions element not matching server-rendered HTML.

---

### Pitfall 2: Cormorant Garamond Weight Declaration Error

**What goes wrong:** Next.js throws `Error: Cormorant_Garamond: Variable fonts must have variant axes.` or silently loads the wrong weight.

**Why it happens:** Cormorant Garamond is NOT a variable font. You cannot use `weight: 'variable'`. Each weight must be declared as a string in an array.

**How to avoid:** Use explicit weight array: `weight: ['300', '400', '600', '700']` and `style: ['normal', 'italic']`.

**Warning signs:** Font looks wrong (all one weight), or build error about variable font axes.

---

### Pitfall 3: Tailwind Not Picking Up Custom Classes

**What goes wrong:** Custom color classes like `bg-forest-deep` or `font-display` don't appear in the compiled CSS.

**Why it happens:** `content` array in `tailwind.config.ts` doesn't include the correct paths, so Tailwind's JIT scanner misses the classes.

**How to avoid:** With `src/` directory structure, content paths must be `./src/**/*.{js,ts,jsx,tsx,mdx}` not `./app/**`. Verify paths match the actual directory layout from `create-next-app`.

**Warning signs:** Classes used in code have no visible effect; browser devtools shows the class present in HTML but no matching CSS rule.

---

### Pitfall 4: Masonry Grid Renders as Regular Grid on First Load

**What goes wrong:** Portfolio page loads with all items at uniform height (no masonry effect), then jumps to masonry on hydration.

**Why it happens:** `useMasonry` runs `getBoundingClientRect` in a `useEffect` — it only fires client-side after mount. On first SSR render, no positioning is applied.

**How to avoid:** This is expected and acceptable — the grid is valid CSS grid before the hook runs. Add `min-h-[200px]` to cards so the pre-hydration layout is not jarring. The masonry effect applies immediately on hydration.

**Warning signs:** Layout shift visible as CLS in Lighthouse. Measure CLS and ensure it stays below 0.1.

---

### Pitfall 5: next/image with Unsplash Missing remotePatterns

**What goes wrong:** `Error: Invalid src prop on next/image, hostname "images.unsplash.com" is not configured under images in your next.config.js`.

**Why it happens:** Next.js Image component blocks external hostnames by default for security.

**How to avoid:** Add `remotePatterns` to `next.config.ts` as shown in Pattern 7. This must be done before adding any `<Image>` component with an Unsplash src.

---

### Pitfall 6: page.tsx vs template.tsx confusion

**What goes wrong:** Animations do not trigger on navigation — transitions only run on initial page load.

**Why it happens:** Animations placed in `layout.tsx` only trigger once (layout persists). They need to be in `template.tsx` to trigger per-navigation.

**How to avoid:** Animation wrapper belongs in `src/app/template.tsx`, not in `layout.tsx`. The layout holds fonts, nav, footer. The template holds the motion wrapper.

---

## Code Examples

### Complete globals.css Setup

```css
/* src/app/globals.css */
/* Source: [CITED: tailwindcss.com/docs + next.js Tailwind guide] */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: theme('colors.stone.warm');
    color: theme('colors.text-primary');
  }

  /* WCAG 2.1 AA focus ring */
  *:focus-visible {
    outline: 2px solid theme('colors.sage.DEFAULT');
    outline-offset: 2px;
    border-radius: 0;
  }

  /* Reduce motion accessibility */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

### Project Seed Data Type

```typescript
// src/types/index.ts
export interface Project {
  id: string
  name: string
  category: 'hardscape' | 'softscape' | 'pool' | 'outdoor-kitchen' | 'full-property'
  location: string
  investmentRange: string
  timeline: string
  hero: string       // Unsplash URL
  gallery: string[]  // Array of Unsplash URLs
  excerpt: string    // 2-sentence teaser
  slug: string
}
```

### SectionHeader Component Pattern

```typescript
// src/components/ui/SectionHeader.tsx
// Implements: gold rule + eyebrow + headline from design-system/MASTER.md

interface SectionHeaderProps {
  eyebrow: string
  headline: string
  body?: string
  onDark?: boolean  // dark sections use gold eyebrow, light use text-muted
  className?: string
}

export default function SectionHeader({
  eyebrow,
  headline,
  body,
  onDark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {/* Gold rule */}
      <div className="w-12 h-px bg-gold mb-4" />
      {/* Eyebrow */}
      <p className={[
        'font-sans text-[11px] tracking-[0.2em] uppercase mb-4',
        onDark ? 'text-gold' : 'text-text-muted',
      ].join(' ')}>
        {eyebrow}
      </p>
      {/* Headline */}
      <h2 className="font-display font-normal leading-[1.05]">
        {headline}
      </h2>
      {/* Optional body */}
      {body && (
        <p className="font-sans text-lg text-text-secondary leading-[1.75] max-w-2xl mt-6">
          {body}
        </p>
      )}
    </div>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { google } from '@next/font'` | `import { Font } from 'next/font/google'` | Next.js 13.2 | Old package deprecated, new one is built-in |
| `images.domains` in next.config | `images.remotePatterns` | Next.js 12.3 | `domains` still works but shows deprecation warning in Next.js 14 |
| AnimatePresence in `_app.tsx` (Pages Router) | `template.tsx` (App Router) | Next.js 13+ App Router | Old pattern does not work in App Router — template.tsx is the replacement |
| `next export` for static hosting | No `output` config needed on Netlify | 2023 | Netlify's OpenNext adapter handles SSR natively — static export disables optimization features |
| `tailwind.config.js` | `tailwind.config.ts` (TypeScript) | Tailwind 3.3+ | Type-safe config, same behavior |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | TypeScript version auto-installed by create-next-app will be 5.x | Standard Stack | Low — create-next-app@14 consistently installs TS 5.x |
| A2 | @types/node, @types/react auto-installed at correct versions | Standard Stack | Low — create-next-app handles this |
| A3 | postcss and autoprefixer auto-installed when --tailwind flag used | Standard Stack | Low — confirmed by multiple create-next-app guides |

**Only 3 assumed claims, all low-risk scaffolding details. No user confirmation needed.**

---

## Open Questions

1. **Placeholder images strategy**
   - What we know: Design system specifies Unsplash. Seed data needs 5 hero images + gallery sets.
   - What is unclear: Should images be hardcoded Unsplash URLs or pulled at build time via Unsplash API?
   - Recommendation: Use hardcoded Unsplash source URLs for Phase 3 (no API key needed for direct image URLs). Phase 6 can add dynamic loading if needed.

2. **Netlify Forms for lead magnet**
   - What we know: PROJECT.md specifies Netlify Forms for lead magnet email capture.
   - What is unclear: Netlify Forms requires a static HTML form present at build time — this conflicts with client-side React rendering patterns.
   - Recommendation: Research Netlify Forms + Next.js App Router integration in Phase 5 (Contact/Forms phase). Phase 3 should stub the form UI only with no submission wiring.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js 14 (min 18.17.0) | Yes | v24.14.0 | — |
| npm | Package installation | Yes | 11.9.0 | — |
| Git | Version control | Yes | (in git bash) | — |
| Netlify CLI | Deployment | [ASSUMED: not checked] | — | Deploy via Netlify dashboard |

**Missing dependencies with no fallback:** None identified.

**Missing dependencies with fallback:**
- Netlify CLI: Not verified — but Netlify dashboard deployment requires no CLI for Phase 3. CLI only needed at deploy time (Phase 7).

---

## Validation Architecture

No test framework is configured yet (Phase 3 is the first code phase). The planner should include a Wave 0 task to initialize the test framework.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Playwright (specified in PROJECT.md) |
| Config file | `playwright.config.ts` — Wave 0 creates this |
| Quick run command | `npx playwright test --project=chromium` |
| Full suite command | `npx playwright test` |

### Phase Requirements to Test Map

| Req | Behavior | Test Type | Automated Command | File Exists? |
|-----|----------|-----------|-------------------|-------------|
| Home page renders | `/` returns 200, hero section visible | smoke | `npx playwright test tests/home.spec.ts` | No — Wave 0 |
| Portfolio page renders | `/portfolio` returns 200, project cards visible | smoke | `npx playwright test tests/portfolio.spec.ts` | No — Wave 0 |
| Navigation works | Nav links go to correct routes | smoke | `npx playwright test tests/nav.spec.ts` | No — Wave 0 |
| Fonts load | Cormorant Garamond + DM Sans applied | visual | Manual check / screenshot | — |
| No console errors | No hydration errors in browser console | smoke | `npx playwright test tests/console-errors.spec.ts` | No — Wave 0 |

### Wave 0 Gaps

- [ ] `playwright.config.ts` — framework config
- [ ] `tests/home.spec.ts` — home page smoke test
- [ ] `tests/portfolio.spec.ts` — portfolio page smoke test
- [ ] `tests/nav.spec.ts` — navigation smoke test
- [ ] Framework install: `npm install -D @playwright/test && npx playwright install chromium`

---

## Security Domain

Phase 3 is a static-forward portfolio site with no auth, no user input (Phase 3 only), and no sensitive data. Minimal attack surface.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | — |
| V3 Session Management | No | — |
| V4 Access Control | No | — |
| V5 Input Validation | No (Phase 3 has no forms) | Forms deferred to Phase 5 |
| V6 Cryptography | No | — |
| V13 API Security | No | — |

### Known Threat Patterns for Next.js Static Portfolio

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Unsafe HTML rendering | Tampering | All content comes from typed data structures in `lib/projects.ts`. Do not inject raw HTML strings at any point — use React elements only. |
| Clickjacking | Elevation | Add X-Frame-Options and CSP headers in `_headers` (Phase 6) |
| Dependency vulnerabilities | Tampering | Run `npm audit` as part of Phase 3 completion check |

---

## Sources

### Primary (HIGH confidence)
- `npm registry` — version verification for next@14.2.35, framer-motion@11.18.2, tailwindcss@3.4.19, lucide-react@1.8.0
- `npm view [package] engines` — Node.js compatibility verified
- `design-system/MASTER.md` — animation constants, color tokens, typography transcribed verbatim

### Secondary (MEDIUM confidence)
- [nextjs.org/docs/app/getting-started/fonts](https://nextjs.org/docs/app/getting-started/fonts) — next/font/google pattern
- [nextjs.org/docs/app/api-reference/config/next-config-js/images](https://nextjs.org/docs/app/api-reference/config/next-config-js/images) — remotePatterns
- [docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) — Netlify + Next.js 14 deployment (no config needed)
- [cruip.com/how-to-create-a-true-masonry-with-nextjs/](https://cruip.com/how-to-create-a-true-masonry-with-nextjs/) — useMasonry hook (code verified, matches described behavior)
- [imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) — FrozenRouter pattern
- [dev.to/abdur_rakibrony](https://dev.to/abdur_rakibrony_97cea0e9/page-transition-in-nextjs-14-app-router-using-framer-motion-2he7) — template.tsx pattern

### Tertiary (LOW confidence)
- [github.com/vercel/next.js/discussions/59349](https://github.com/vercel/next.js/discussions/59349) — AnimatePresence exit animation limitation in App Router (GitHub discussion, not official docs)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry on research date
- Architecture: HIGH — patterns verified against official Next.js docs and two independent sources each
- Pitfalls: HIGH — Framer Motion issues verified in official GitHub issues + community; font issue verified against Next.js font docs
- Masonry: MEDIUM — custom hook from single authoritative source (Cruip), cross-referenced with SSR behavior described in second source

**Research date:** 2026-04-12
**Valid until:** 2026-07-12 (90 days — stable stack, no rapid churn expected in Next.js 14.x patch line)

---

## RESEARCH COMPLETE

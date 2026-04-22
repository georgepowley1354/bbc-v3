# BBC Design System

Agency-level design tokens and rules. These are BBC's defaults — each project may define its own client-specific tokens on top of these.

---

## Tokens Quick Reference

### Typography Scale

| Token | Size | Use |
|-------|------|-----|
| `--text-xs` | 12px | Captions, labels |
| `--text-sm` | 14px | Body small, metadata |
| `--text-base` | 16px | Body default |
| `--text-lg` | 18px | Body large, lead text |
| `--text-xl` | 20px | Subheadings |
| `--text-2xl` | 24px | Section headings |
| `--text-3xl` | 30px | Page subheadings |
| `--text-4xl` | 36px | Page headings |
| `--text-5xl` | 48px | Hero headings |
| `--text-6xl` | 60px | Display / oversized |

### Spacing Scale

All spacing is multiples of 4px base.

| Token | Value | Common Use |
|-------|-------|-----------|
| `--space-1` | 4px | Tight gaps, icon spacing |
| `--space-2` | 8px | Inline elements, small gaps |
| `--space-3` | 12px | Form field padding |
| `--space-4` | 16px | Standard padding |
| `--space-6` | 24px | Card padding, section padding |
| `--space-8` | 32px | Component separation |
| `--space-12` | 48px | Section gaps |
| `--space-16` | 64px | Large section breaks |
| `--space-24` | 96px | Hero padding |

### Breakpoints

| Name | Value | Target |
|------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large monitors |

Mobile-first. All components designed for mobile, then enhanced for larger screens.

---

## Typography Rules

1. **Heading font and body font must be different** — use one serif/display + one sans-serif
2. **Max line length: 70 characters** for body text — anything wider becomes hard to read
3. **Line height:** 1.5 for body, 1.2-1.3 for headings
4. **Font weight:** Use 2-3 weights max per project (e.g., 400, 600, 700)
5. **Don't use system fonts for headings** — they read as undesigned

### Font Loading

```astro
<!-- In <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<!-- Load only the weights you use -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
```

---

## Color Rules

1. **Every project needs 5 color roles:** primary, secondary, accent, neutral, background
2. **Contrast minimum:** 4.5:1 for body text, 3:1 for large text (WCAG AA)
3. **Dark mode:** Design for light first. If client needs dark mode, define both palettes
4. **Max 3 brand colors** visible on any single page — use tints/shades of those 3 for variety
5. **Never use pure black (#000000)** for body text — use dark neutral (e.g., #111827)

### Color Token Pattern (per project)

```css
:root {
  /* Brand colors — set per project */
  --color-primary: [hex];
  --color-primary-light: [hex];
  --color-primary-dark: [hex];
  --color-secondary: [hex];
  --color-accent: [hex];

  /* Neutrals — often shared */
  --color-neutral-900: #111827;
  --color-neutral-700: #374151;
  --color-neutral-500: #6B7280;
  --color-neutral-300: #D1D5DB;
  --color-neutral-100: #F3F4F6;
  --color-neutral-50:  #F9FAFB;

  /* Semantic */
  --color-bg: var(--color-neutral-50);
  --color-text: var(--color-neutral-900);
  --color-text-muted: var(--color-neutral-500);
  --color-border: var(--color-neutral-300);
}
```

---

## Layout Rules

1. **Max content width:** 1200px (1280px for wide layouts) — centered with `margin: 0 auto`
2. **Page padding (horizontal):** 16px mobile, 24px tablet, 32px desktop
3. **Section padding (vertical):** 48px mobile, 64px desktop (minimum)
4. **Grid columns:** 4 mobile, 8 tablet, 12 desktop
5. **No horizontal scroll** on any breakpoint — test this

---

## Motion Rules

1. **Default easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
2. **Standard duration:** 200ms for UI interactions, 300-500ms for page transitions
3. **Respect `prefers-reduced-motion`** — always wrap animations in the media query check
4. **Don't animate layout-triggering properties** (width, height, top, left) — use transform and opacity

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

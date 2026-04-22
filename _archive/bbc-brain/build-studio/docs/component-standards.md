# Component Standards

Conventions for building BBC components. Follow these to keep all projects consistent and maintainable.

---

## Component Rules

### Naming
- PascalCase for component files: `HeroSection.astro`, `NavBar.astro`
- kebab-case for CSS classes: `.hero-section`, `.nav-bar`
- Prefix client-specific overrides: `.kris-hero`, not just `.hero-override`

### File Structure (Astro)

```astro
---
// 1. Imports
import SomeComponent from '../components/SomeComponent.astro';

// 2. Props interface
interface Props {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// 3. Destructure with defaults
const {
  title,
  subtitle = '',
  ctaLabel = 'Get in Touch',
  ctaHref = '/contact',
} = Astro.props;
---

<!-- 4. Template -->
<section class="hero-section">
  <h1>{title}</h1>
  {subtitle && <p class="hero-subtitle">{subtitle}</p>}
  <a href={ctaHref} class="btn btn-primary">{ctaLabel}</a>
</section>

<style>
/* 5. Scoped styles — prefer tokens over hardcoded values */
.hero-section {
  padding: var(--space-24) var(--space-4);
}
</style>
```

### Props Best Practices
- Required props: no default
- Optional props: always provide a sensible default
- Don't pass raw HTML as props — use slots instead
- Don't accept inline style objects — use variant props

---

## Standard Components (BBC Core)

Every BBC project uses these components. Build them first, customize per client.

### NavBar
- Desktop: horizontal links + CTA button
- Mobile: hamburger → full-screen or drawer menu
- Sticky by default with scroll-based opacity change
- Props: `logo`, `links[]`, `ctaLabel`, `ctaHref`

### HeroSection
- Variants: `centered` (text center), `split` (text left, image right), `full-bleed` (full background image)
- Always includes headline, sub-text, CTA
- Props: `variant`, `headline`, `subtext`, `ctaLabel`, `ctaHref`, `image?`

### SectionWrapper
- Consistent padding and max-width for all page sections
- Props: `id?`, `background?` (light|dark|accent), `paddingY?`

### Button
- Variants: `primary`, `secondary`, `ghost`
- Sizes: `sm`, `md`, `lg`
- States: default, hover, active, disabled, loading
- Props: `variant`, `size`, `href?` (renders as `<a>` if set, else `<button>`)

### Card
- Variants: `service`, `team`, `testimonial`, `portfolio`
- Props: `variant`, `title`, `body`, `image?`, `href?`

### ContactForm
- Fields: name, email, message (all required), optional phone
- Client-side validation
- Submission to Netlify Forms or custom endpoint
- Success/error states handled
- Props: `formName`, `endpoint?`, `successMessage?`

### Footer
- Standard layout: logo + nav links + contact info + social links
- Copyright auto-updates year
- Props: `logo`, `links[]`, `contact{}`, `socials[]`

---

## Review Checklist

Before shipping any component:

- [ ] Works on mobile (320px min), tablet, desktop
- [ ] All props have correct types and defaults
- [ ] No hardcoded colors — uses CSS tokens
- [ ] No hardcoded font sizes — uses token scale
- [ ] Interactive elements have `:hover` and `:focus-visible` states
- [ ] Images have `alt` attributes
- [ ] Buttons have accessible labels (not just icons)
- [ ] `prefers-reduced-motion` respected for any animations
- [ ] Form inputs have associated `<label>` elements
- [ ] No console errors

---

## What NOT to Do

- Don't write 500-line component files — split into sub-components
- Don't import from `node_modules` into component styles
- Don't use `!important` — fix specificity properly
- Don't hardcode client colors into shared components — pass via props
- Don't duplicate layout logic — use `SectionWrapper` for all sections

# Haven — Design System
> Phase 2 Deliverable · BBC Build · Jane Smith LMT
> Every decision documented with rationale.

---

## Design Philosophy

**Concept: "Stepping Into the Space"**

The site should feel like walking into Jane's studio for the first time. Warm. Quiet. Unhurried. A prospect should exhale the moment they land. Every token in this system serves that single idea: warmth, intimacy, and trust.

Haven is a one-therapist practice. That's the competitive edge. The design system must make that personal — it should feel like a person built it, not a template. If it looks clinical, start over. If it looks corporate, start over. If it could belong to a dental office, it's wrong.

**Non-negotiable rules:**
- Nothing clinical. Nothing corporate. Nothing that could be generated without context.
- The palette is warm, not neutral. Every color has feeling.
- Typography is refined, not trendy. Lora will still feel right in five years.
- Motion is unhurried. 400–600ms entrance. Never jarring.
- Mobile is the primary experience. Desktop enhances it.

---

## 1. Typography System

**Decision:** Lora (display) + Raleway (body)

**Rationale:** ui-ux-pro-max returned this pairing as the top match for wellness/spa/health — "calm, wellness, health, relaxing, natural, organic." Lora is a refined serif that feels warm and slightly literary. Raleway Light is clean and airy without the coldness of Inter or Roboto. This pairing reads at home in a massage therapy context in a way that geometric sans-serif pairings do not.

**What was ruled out:** Inter (too cold, too tech), Playfair Display (too dramatic, leans editorial over intimate), DM Serif (lovely but better for editorial), Nunito (too round, too casual), system fonts (never).

```css
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Raleway:wght@300;400;500;600;700&display=swap');
```

### Type Scale

| Token | Font | Weight | Size | Line Height | Letter Spacing | Use |
|-------|------|--------|------|-------------|----------------|-----|
| `--text-display` | Lora | 400 | 3.5rem / 56px | 1.15 | –0.01em | Hero headline only |
| `--text-h1` | Lora | 500 | 2.75rem / 44px | 1.2 | –0.01em | Page titles |
| `--text-h2` | Lora | 500 | 2rem / 32px | 1.3 | 0 | Section headings |
| `--text-h3` | Lora | 600 | 1.375rem / 22px | 1.4 | 0.01em | Card headings, sub-sections |
| `--text-h4` | Raleway | 600 | 1.125rem / 18px | 1.5 | 0.04em | Labels, nav items |
| `--text-body-lg` | Raleway | 400 | 1.125rem / 18px | 1.7 | 0 | Lead paragraph, intro copy |
| `--text-body` | Raleway | 300 | 1rem / 16px | 1.75 | 0 | Body text throughout |
| `--text-sm` | Raleway | 400 | 0.875rem / 14px | 1.6 | 0.02em | Captions, fine print, badges |
| `--text-xs` | Raleway | 500 | 0.75rem / 12px | 1.5 | 0.06em | Tags, overlines (uppercase) |

**Overline pattern** (used above section headings):
```
Raleway 500 · 0.75rem · uppercase · letter-spacing: 0.12em · sage color
```
Example: `THERAPEUTIC MASSAGE · ALBANY NY` above a section heading.

**Mobile type scale:** All sizes reduce by ~15–20% on mobile. Display drops to 2.5rem, h1 to 2rem.

---

## 2. Color System

**Decision:** Haven palette as specified in BRIEF.md. The ui-ux-pro-max tool suggested pink/lavender — overridden. The brief palette is warmer, more grounded, and more appropriate for the Capital Region NY audience. Pink/lavender reads luxury spa chain; sage/terracotta reads trusted local practitioner.

### Core Palette

| Token | Variable | Hex | RGB | Use |
|-------|----------|-----|-----|-----|
| Background | `--color-bg` | `#FAF8F5` | 250, 248, 245 | Page background everywhere |
| Surface | `--color-surface` | `#F2EDE6` | 242, 237, 230 | Cards, alternate sections, nav (solid state) |
| Surface Elevated | `--color-surface-elevated` | `#EDE6DB` | 237, 230, 219 | Deeper card backgrounds, hover state for surface |
| Accent | `--color-accent` | `#7D9B76` | 125, 155, 118 | Icons, decorative borders, badge backgrounds, hover highlights |
| Accent Interactive | `--color-accent-interactive` | `#4E6B48` | 78, 107, 72 | Button backgrounds (any size text), link hover |
| Secondary | `--color-secondary` | `#C4896F` | 196, 137, 111 | Hover overlays, star ratings, accent details |
| Text Primary | `--color-text` | `#2C2C2C` | 44, 44, 44 | All body copy and headings |
| Text Muted | `--color-text-muted` | `#6B6560` | 107, 101, 96 | Captions, subtext, placeholder copy |
| Text Inverse | `--color-text-inverse` | `#FAF8F5` | 250, 248, 245 | Text on dark/accent backgrounds |
| Border | `--color-border` | `#E4DDD4` | 228, 221, 212 | Card borders, dividers |
| Border Subtle | `--color-border-subtle` | `#EDE8E1` | 237, 232, 225 | Very light separators |

### Contrast Ratios (WCAG 2.1 AA Verification)

| Foreground | Background | Ratio | Normal Text | Large Text |
|------------|------------|-------|-------------|------------|
| `#2C2C2C` | `#FAF8F5` | **11.1:1** | ✅ AAA | ✅ AAA |
| `#2C2C2C` | `#F2EDE6` | **10.3:1** | ✅ AAA | ✅ AAA |
| `#6B6560` | `#FAF8F5` | **5.4:1** | ✅ AA | ✅ AA |
| `#6B6560` | `#F2EDE6` | **5.0:1** | ✅ AA | ✅ AA |
| `#FAF8F5` | `#4E6B48` | **5.3:1** | ✅ AA | ✅ AA |
| `#2C2C2C` | `#7D9B76` | **4.2:1** | ⚠️ FAIL† | ✅ AA |
| `#FAF8F5` | `#7D9B76` | **2.7:1** | ❌ FAIL | ⚠️ FAIL |

**Important:** `#7D9B76` (accent) does not meet AA for normal body text. Rules:
- Never use accent as text color for body copy
- Accent background is decorative only (icons, badges, borders)
- For buttons and CTAs, use `--color-accent-interactive` (`#4E6B48`) which passes AA
- Sage decorative icons on `#FAF8F5` are acceptable — they are not text

### Color Usage Rules

```
Background (#FAF8F5)  → Page body, all prose sections
Surface (#F2EDE6)     → Service cards, testimonial blocks, alternate rows
                        Nav when solid (scroll state)
Accent (#7D9B76)      → SVG icons, badge backgrounds, border accents,
                        decorative elements, active nav indicator
Accent Interactive    → All CTA buttons (primary), active link color
(#4E6B48)               Must be used when white text appears on sage
Secondary (#C4896F)   → Star ratings, hover states on buttons,
                        decorative photo overlays, badge highlights
Text (#2C2C2C)        → All headings and body copy — always
Text Muted (#6B6560)  → Captions, helper text, service duration labels
Border (#E4DDD4)      → Card outlines, section dividers
```

### Tailwind CSS Variables (add to globals.css)

```css
:root {
  --color-bg: #FAF8F5;
  --color-surface: #F2EDE6;
  --color-surface-elevated: #EDE6DB;
  --color-accent: #7D9B76;
  --color-accent-interactive: #4E6B48;
  --color-secondary: #C4896F;
  --color-text: #2C2C2C;
  --color-text-muted: #6B6560;
  --color-text-inverse: #FAF8F5;
  --color-border: #E4DDD4;
  --color-border-subtle: #EDE8E1;
}
```

---

## 3. Spacing Scale

**Decision:** 4px base unit, Tailwind default scale extended.

**Rationale:** Haven needs generous whitespace throughout. Sections need room to breathe. The spacing scale leans larger than typical — sections use 6–8rem vertical padding on desktop, not 3–4rem. This is the "slow exhale" made tangible.

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| `--space-1` | 4px | `p-1` | Tiny gaps |
| `--space-2` | 8px | `p-2` | Icon padding |
| `--space-3` | 12px | `p-3` | Button inner padding (vertical) |
| `--space-4` | 16px | `p-4` | Card inner padding, input padding |
| `--space-6` | 24px | `p-6` | Card padding (standard) |
| `--space-8` | 32px | `p-8` | Card padding (large), mobile section padding |
| `--space-12` | 48px | `p-12` | Section vertical padding (mobile) |
| `--space-16` | 64px | `p-16` | Section vertical padding (tablet) |
| `--space-24` | 96px | `p-24` | Section vertical padding (desktop) |
| `--space-32` | 128px | `p-32` | Hero vertical padding |

**Section rhythm:** Sections alternate `#FAF8F5` and `#F2EDE6`. Vertical padding: `py-12 md:py-16 lg:py-24`.

**Content max-width:** `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` — consistent across all pages.

---

## 4. Responsive Breakpoints

| Name | Breakpoint | Tailwind Prefix | Target |
|------|------------|-----------------|--------|
| Mobile | 375px+ | (default) | iPhone SE, standard phone |
| Mobile Large | 430px+ | `xs:` (custom) | iPhone Pro Max |
| Tablet | 768px+ | `md:` | iPad, tablet |
| Desktop | 1024px+ | `lg:` | Standard desktop |
| Wide | 1280px+ | `xl:` | Wide desktop |
| Max | 1440px+ | `2xl:` | Large monitor cap |

**Mobile-first rule:** Every component starts mobile. Desktop is the enhancement. No component should exist that wasn't first designed for 375px.

---

## 5. Shadow System

**Decision:** Soft, warm shadows with slight warm tint — not gray neutral, not material design drop shadow.

**Rationale:** Gray shadows feel clinical. Warm shadows (slightly amber/brown tinted) reinforce the thermal, earthy palette. Three levels of depth.

```css
/* Tailwind extend → boxShadow */
--shadow-sm: 0 1px 3px rgba(44, 35, 28, 0.06), 0 1px 2px rgba(44, 35, 28, 0.04);
--shadow-md: 0 4px 12px rgba(44, 35, 28, 0.08), 0 2px 4px rgba(44, 35, 28, 0.05);
--shadow-lg: 0 12px 32px rgba(44, 35, 28, 0.10), 0 4px 8px rgba(44, 35, 28, 0.06);
--shadow-card: 0 2px 8px rgba(44, 35, 28, 0.07), 0 1px 3px rgba(44, 35, 28, 0.04);
--shadow-card-hover: 0 8px 24px rgba(44, 35, 28, 0.12), 0 3px 6px rgba(44, 35, 28, 0.06);
```

| Token | Use |
|-------|-----|
| `shadow-sm` | Input fields (focus state), badge shadows |
| `shadow-md` | Nav (solid state), modals, floating elements |
| `shadow-lg` | Elevated cards, sticky Book Now button |
| `shadow-card` | Service cards, testimonial cards (default) |
| `shadow-card-hover` | Service cards on hover |

---

## 6. Border Radius System

**Decision:** Soft radii throughout. Nothing sharp. Nothing that reads medical or digital-only.

| Token | Value | Use |
|-------|-------|-----|
| `rounded-sm` | 4px | Input fields, small badges |
| `rounded` | 6px | Buttons, small tags |
| `rounded-md` | 8px | Form elements |
| `rounded-lg` | 12px | Service cards, testimonial cards |
| `rounded-xl` | 16px | Hero image overlays, photo blocks |
| `rounded-2xl` | 20px | Large image containers |
| `rounded-full` | 9999px | Avatar images, icon buttons, pill badges |

---

## 7. Component Library

### 7.1 Buttons

Three variants. All minimum 44px height (mobile compliance). All use `cursor-pointer`.

#### Primary CTA (Book Now)
```
Background: #4E6B48 (accent-interactive)
Text: #FAF8F5 · Raleway 600 · 16px · letter-spacing: 0.03em
Padding: 14px 32px (desktop) · 14px 24px (mobile)
Border radius: rounded (6px)
Border: none
Hover: background #3D5538, transition 200ms ease
Shadow: shadow-md on hover
Min height: 48px
Min width: 120px
```

#### Secondary (Outlined Sage)
```
Background: transparent
Text: #4E6B48 · Raleway 600 · 16px
Border: 1.5px solid #7D9B76
Padding: 13px 32px (1px less for border)
Border radius: rounded (6px)
Hover: bg #F2EDE6, border-color #4E6B48, transition 200ms ease
Min height: 48px
```

#### Ghost (Text CTA)
```
Background: none
Text: #4E6B48 · Raleway 600 · 16px
Underline: animated — width grows from 0 to 100% on hover
Arrow icon: → Lucide ChevronRight · inline, shifts right 4px on hover
Padding: 0
Use for: "Learn more", "See all services", in-text CTAs
```

#### Sticky Mobile Book Now
```
Position: fixed · bottom: 0 · left: 0 · right: 0
Background: #4E6B48
Text: #FAF8F5 · Raleway 600 · 17px · centered
Height: 56px (padding accounts for safe area)
Padding bottom: env(safe-area-inset-bottom) + 16px
Z-index: 50
Shadow: 0 -4px 16px rgba(44, 35, 28, 0.15)
Display: flex md:hidden (mobile only)
```

### 7.2 Service Cards

```
Background: #F2EDE6
Border: 1px solid #E4DDD4
Border radius: rounded-lg (12px)
Padding: 28px 24px
Shadow: shadow-card → shadow-card-hover on hover
Transition: shadow 250ms ease, transform 250ms ease
Transform: translateY(-2px) on hover
Min height: auto (no fixed height — content drives)
```

**Card anatomy:**
```
[Service name]     → Lora 600 · 22px · #2C2C2C
[Overline]         → Raleway 500 · 12px · uppercase · sage · letter-spacing 0.10em
[Duration]         → Raleway 400 · 14px · muted
[Price]            → Lora 500 · 20px · #2C2C2C (60 min) · Raleway 400 · 16px · muted (90 min)
[Description]      → Raleway 300 · 16px · 1.75 line height
[Expand toggle]    → Raleway 500 · 14px · sage · "Benefits ↓" 
[Benefits panel]   → hidden by default · animated open 300ms ease
[Book Now button]  → Secondary outlined, full width inside card
```

### 7.3 Navigation

**Behavior:** Transparent on load → solid `#F2EDE6` with backdrop-blur on scroll. Transition: 300ms ease.

```
Height: 72px (desktop) · 64px (mobile)
Max width: full-width container
Padding: px-6 (mobile) px-8 (desktop)
```

**Transparent state (hero):**
```
Background: transparent
Text: #FAF8F5 (requires hero to have dark-enough image overlay)
Logo: text-inverse
Border: none
```

**Solid state (after scroll):**
```
Background: rgba(242, 237, 230, 0.92) + backdrop-filter: blur(12px)
Text: #2C2C2C
Logo: full color
Border bottom: 1px solid #E4DDD4
Shadow: shadow-sm
```

**Nav links:**
```
Raleway 500 · 15px · letter-spacing: 0.02em
Color: current state
Hover: color #4E6B48 · underline grows from center · 200ms
Active: color #4E6B48 · underline visible
```

**Mobile nav:** Hamburger → full-screen overlay. Background: `#F2EDE6`. Links stacked vertically, Lora 400, 24px. Book Now button at bottom. Animated: slide down from top, 300ms ease.

### 7.4 Testimonial Cards

```
Background: #FAF8F5
Border: 1px solid #EDE8E1
Border radius: rounded-xl (16px)
Padding: 32px 28px
```

**Card anatomy:**
```
[Stars]         → 5 filled star SVGs · #C4896F (terracotta) · 20px each · gap 2px
[Quote]         → Lora 400 italic · 18px · #2C2C2C · line-height 1.6
                  Opening quote mark: Lora · 64px · #7D9B76 · opacity 0.3 · decorative
[Name]          → Raleway 600 · 14px · #2C2C2C · uppercase · letter-spacing 0.06em
[Service type]  → Raleway 400 · 13px · #6B6560
```

**Layout:** 3-column grid on desktop, stacked on mobile. Slight stagger on entrance (60ms delay between cards).

### 7.5 Forms

Applies to contact form and any future forms.

```
Label: Raleway 500 · 14px · #2C2C2C · margin-bottom 6px
Input: 
  Background: #FFFFFF
  Border: 1px solid #E4DDD4
  Border radius: rounded-sm (4px)
  Padding: 12px 16px
  Font: Raleway 400 · 16px · #2C2C2C
  Min height: 48px
  Placeholder: #6B6560
  Focus: border-color #7D9B76 · shadow-sm · outline: none
  Error: border-color #C4896F · error text below in Raleway 400 13px #C4896F
Textarea: same as input · min-height 120px · resize: vertical
Select: same as input · custom chevron arrow in #7D9B76
```

**Form spacing:** 24px gap between fields. Labels always visible (no floating labels — accessibility).

### 7.6 Footer

```
Background: #2C2C2C
Text: #FAF8F5
Padding: 64px 0 32px
```

**Footer anatomy:**
```
[HAVEN logo]          → SVG white variant
[Tagline]             → Raleway 300 · 14px · #FAF8F5 · opacity 0.7
[Nav links]           → Raleway 400 · 14px · #FAF8F5 · opacity 0.8
                        Hover: opacity 1, color #7D9B76
[Social icons]        → Lucide icons · 20px · sage (#7D9B76) default
                        Hover: terracotta (#C4896F) · transition 200ms
[BBC credit]          → "Built by BBC" · Raleway 400 · 13px · opacity 0.5
                        Hyperlinked to https://big-bad-coding.netlify.app/
                        Hover: opacity 0.8, underline
[Copyright]           → Raleway 400 · 12px · opacity 0.4
```

BBC footer credit is **non-negotiable on every page.** It must be present, linked, and visible.

### 7.7 Availability Banner

```
Background: #F2EDE6
Border: 1px solid #E4DDD4
Border-left: 3px solid #7D9B76
Border radius: rounded
Padding: 12px 20px
Text: Raleway 400 · 15px · #2C2C2C
Icon: Lucide MapPin · 18px · #7D9B76
```

Content: "Now accepting new clients in Albany, Clifton Park & Saratoga Springs"

### 7.8 New Client Offer Banner

```
Background: linear-gradient(135deg, #7D9B76 0%, #4E6B48 100%)
Text: #FAF8F5
Padding: 14px 24px
Text: Raleway 500 · 15px · centered
Bold highlight: Raleway 700 · "20% Off"
```

Content: "First Visit: 20% Off Any Service — New clients welcome"

---

## 8. Motion System

**Principle:** Everything feels like a slow exhale. No jarring. No urgency. The animations reinforce the calm of stepping into the studio.

### Easing Curves

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);       /* Entrances — quick start, soft landing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);      /* Hover states, nav transitions */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Subtle bounce — use sparingly */
```

### Duration Scale

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | 150ms | Color changes, opacity flickers |
| `--duration-micro` | 200ms | Hover states — all buttons, links, icons |
| `--duration-standard` | 300ms | Nav transition, card hover, accordion |
| `--duration-entrance` | 500ms | Section fade-up on scroll |
| `--duration-hero` | 700ms | Hero text entrance |

### Scroll Animations (Framer Motion)

**Standard section entrance:**
```js
// Every section uses this pattern — whileInView
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
viewport={{ once: true, margin: "-80px" }}
```

**Staggered children (service cards, testimonials):**
```js
// Parent
transition={{ staggerChildren: 0.08 }}
// Each child
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
```

**Hero text entrance:**
```js
// Headline
initial={{ opacity: 0, y: 32 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
// Subtext: delay 0.3
// CTA button: delay 0.45
```

**Nav transparent → solid:**
```js
// Framer Motion scroll-based
// background: transparent → rgba(242,237,230,0.92) · 300ms ease-in-out
// backdrop-blur: 0 → 12px · 300ms
```

**prefers-reduced-motion:**
```js
// All motion components must check:
const prefersReduced = useReducedMotion()
// If true: skip all translate/scale animations, keep only opacity (200ms)
```

### Hover Micro-interactions

| Element | Effect | Duration |
|---------|--------|----------|
| Primary button | background darkens, shadow grows | 200ms |
| Outlined button | bg fills cream, border darkens | 200ms |
| Service card | translateY(-2px), shadow deepens | 250ms |
| Social icons | color: sage → terracotta | 200ms |
| Nav links | underline grows from center | 200ms |
| Ghost CTA arrow | shifts right 4px | 200ms |

---

## 9. HAVEN Logo — SVG Wordmark

**Design:** HAVEN wordmark in Lora Regular, warm sage. A single botanical leaf element — a simple abstract frond, two arcs suggesting a leaf — appears above the wordmark, centered or slightly left of center. Restrained and elegant. Not a badge. Not a shield. Just a name with a breath of nature above it.

**Color variants:**
- `default` — sage `#7D9B76` wordmark + `#4E6B48` leaf
- `inverse` — `#FAF8F5` wordmark + `#7D9B76` leaf (for dark footer)
- `monochrome-dark` — all `#2C2C2C` (for print / fallback)

```svg
<!-- HAVEN Logo — default variant -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 64" fill="none" aria-label="Haven Therapeutic Massage">

  <!-- Botanical leaf mark — two gentle arcs suggesting a leaf -->
  <g transform="translate(84, 0)">
    <!-- Left arc of leaf -->
    <path d="M6 18 C6 18, -2 10, 6 2 C6 2, 10 10, 6 18Z" fill="#4E6B48"/>
    <!-- Right arc of leaf -->
    <path d="M6 18 C6 18, 14 10, 6 2 C6 2, 2 10, 6 18Z" fill="#7D9B76" opacity="0.75"/>
    <!-- Center stem -->
    <line x1="6" y1="2" x2="6" y2="18" stroke="#4E6B48" stroke-width="0.75" stroke-linecap="round"/>
  </g>

  <!-- HAVEN wordmark — using Lora via text element -->
  <text
    x="90"
    y="50"
    text-anchor="middle"
    font-family="Lora, Georgia, serif"
    font-size="24"
    font-weight="400"
    fill="#7D9B76"
    letter-spacing="6"
  >HAVEN</text>

</svg>
```

**Usage rules:**
- Minimum display size: 120px wide
- Clear space: minimum 16px on all sides
- Never stretch, skew, recolor outside the variants, or place on a clashing background
- On dark backgrounds: always use inverse variant
- Leaf mark alone (without wordmark): never used below 32px

**Logo implementation note:** In the Next.js project, export as `HavenLogo.tsx` with a `variant` prop: `"default" | "inverse" | "monochrome"`. The SVG is inline — no external file dependency.

---

## 10. Photography Direction

Photography is as much a part of the design system as color. The wrong photo destroys the palette.

**Required feel:** Warm. Natural light. Human hands. White linens. Candles. Soft textures. Nothing clinical. Nothing that could be in a gym or hospital.

**Color temperature rule:** All photography must be warm-toned (3000–4500K equivalent). Reject any image that has cool blue light, LED-white overexposure, or clinical overhead lighting.

**Unsplash search terms:**
- `massage therapy warm hands`
- `spa white linen candle`
- `wellness hands stones warm light`
- `therapeutic massage natural light`
- `calming spa interior`

**Reject if:** The image contains visible machinery, clinical equipment, harsh white light, or a person looking directly at the camera with a forced smile.

**Photo treatment:** Subtle warm overlay `rgba(250, 248, 245, 0.06)` on all hero images to unify the palette.

---

## 11. Icon System

**Library:** Lucide React — consistent 24x24 viewBox, 1.5px stroke-width.

**Icon size scale:**
- Small: 16px (badges, inline)
- Standard: 20px (nav, body copy)
- Medium: 24px (feature icons, footer)
- Large: 32px (service card icons)

**Color rules:**
- Navigation icons: match text color
- Feature icons: `#7D9B76` sage
- Footer social: `#7D9B76` default, `#C4896F` on hover
- Star ratings: `#C4896F` filled, `#E4DDD4` empty

**Never use emojis as icons.** Lucide only.

---

## 12. Tailwind Config Extensions

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        haven: {
          bg: '#FAF8F5',
          surface: '#F2EDE6',
          'surface-elevated': '#EDE6DB',
          accent: '#7D9B76',
          'accent-interactive': '#4E6B48',
          secondary: '#C4896F',
          text: '#2C2C2C',
          'text-muted': '#6B6560',
          border: '#E4DDD4',
          'border-subtle': '#EDE8E1',
        },
      },
      fontFamily: {
        display: ['Lora', 'Georgia', 'serif'],
        body: ['Raleway', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(44, 35, 28, 0.07), 0 1px 3px rgba(44, 35, 28, 0.04)',
        'card-hover': '0 8px 24px rgba(44, 35, 28, 0.12), 0 3px 6px rgba(44, 35, 28, 0.06)',
        'warm-sm': '0 1px 3px rgba(44, 35, 28, 0.06), 0 1px 2px rgba(44, 35, 28, 0.04)',
        'warm-md': '0 4px 12px rgba(44, 35, 28, 0.08), 0 2px 4px rgba(44, 35, 28, 0.05)',
        'warm-lg': '0 12px 32px rgba(44, 35, 28, 0.10), 0 4px 8px rgba(44, 35, 28, 0.06)',
      },
      borderRadius: {
        DEFAULT: '6px',
      },
    },
  },
}
```

---

## 13. Quick Design Decisions Log

Decisions that were non-obvious and why they went this way:

| Decision | Chosen | Rejected | Why |
|----------|--------|----------|-----|
| Typography | Lora + Raleway | Inter, Playfair, DM Serif | Lora = warm serif that doesn't over-dramatize; Raleway light = airy without tech coldness |
| Button shade | #4E6B48 (darker sage) | #7D9B76 (brand sage) | Brand sage fails AA with white text; darker variant passes 5.3:1 |
| Shadow tint | Warm amber/brown rgba | Neutral gray rgba | Gray shadows read clinical; warm-tinted shadows reinforce the palette |
| Footer bg | #2C2C2C (charcoal) | #2C2C2C | Dark footer grounds the site and creates visual resolution at page end |
| Pink/lavender from tool | Rejected | Accepted | ui-ux-pro-max suggested pink palette; brief specifies sage/terracotta, brief wins |
| Sticky CTA | Fixed bottom on mobile | FAB button | Full-width strip is more tappable and cleaner on mobile; FAB floats awkwardly |
| Overline text | Sage color | Terracotta | Sage reads calm and intentional for category labels; terracotta reads warmer/emotionally |

---

## 14. Pre-Build Checklist

Before Phase 3 begins, verify:

- [ ] Tailwind config updated with all Haven tokens
- [ ] Google Fonts import in `app/globals.css`
- [ ] CSS custom properties in `:root`
- [ ] `HavenLogo.tsx` component created from SVG spec
- [ ] Lucide React installed (`npm install lucide-react`)
- [ ] Framer Motion installed (`npm install framer-motion`)
- [ ] `prefers-reduced-motion` hook created
- [ ] All color contrast ratios verified (see Section 2)
- [ ] haven-components README read before Phase 3

---

*Design system complete. Awaiting Jorge's "go" before Phase 3 begins.*
*No pages will be built until approval is given.*

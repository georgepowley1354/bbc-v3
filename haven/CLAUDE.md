# Haven — Claude Code Project Context

Loads automatically every Claude Code session for this project.

---

## BBC Identity

- **Motto:** Go Big, Bad Coding — Or Go Home
- **Website:** https://big-bad-coding.netlify.app/
- **Built by BBC footer required on every single page** — hyperlinked to BBC website — non-negotiable

---

## Project

- **Client:** Haven Therapeutic Massage — Jane Smith LMT
- **Live URL:** https://haven-therapeutic-massage.netlify.app
- **Purpose:** BBC flagship portfolio showcase — must be the best massage therapy site in the Capital Region NY

---

## Acuity Booking

```
https://app.acuityscheduling.com/schedule/0f4e6dff/appointment/91881173/calendar/13937249
```

Every "Book Now" CTA on every page links to `/booking`.
The `/booking` page embeds the AcuityBookingEmbed component.

---

## Pre-Built Components

Location: `~/my-project/haven-components/`
Read `~/my-project/haven-components/README.md` before touching anything.

```ts
import { ScrollGalleryHero, AcuityBookingEmbed } from '~/my-project/haven-components'
import type { ScrollGalleryHeroImage, ScrollGalleryHeroProps } from '~/my-project/haven-components'
import type { AcuityBookingEmbedProps } from '~/my-project/haven-components'
```

**Do NOT rebuild these.** Drop them in as delivered.

---

## Required Skills — Every Session, No Exceptions

| Skill | When |
|-------|------|
| `frontend-design` | Every UI component and layout decision |
| `ui-ux-pro-max` | Every visual and design decision |
| `stop-slop` | Every word of copy written |
| `ralph-loop` | Self review before reporting back on any phase |
| `receiving-code-review` | Before marking any phase complete |
| `commit-commands` | Every git commit |
| `firecrawl` | Research phases |
| `security-guidance` | Before any deploy step |

---

## Stop Gates

1. **After Phase 2 (Design System)** — present to Jorge, wait for "go"
2. **Before deploy** — security review + Jorge final approval

Never proceed past a stop gate without explicit Jorge confirmation.

---

## Design Palette

| Token | Value | Use |
|-------|-------|-----|
| Background | `#FAF8F5` | Page background |
| Surface | `#F2EDE6` | Cards, sections |
| Accent | `#7D9B76` | Sage — CTAs, icons |
| Secondary | `#C4896F` | Terracotta — hover states |
| Text | `#2C2C2C` | Body copy |

Warm minimalism. Slow exhale. Not clinical. Not corporate. Not AI-looking.

---

## Mobile First

- Sticky Book Now button pinned to bottom — always visible
- Minimum tap target 44px everywhere
- Phone number as `tel:` link
- Test every page on iPhone viewport before marking phase complete

---

## Phase Order

1. Research → design direction brief
2. Design System → Jorge approval required
3. Home Page
4. Services + About
5. Booking + FAQ + Contact
6. Technical Layer (SEO, PWA, a11y, perf)
7. Pre-Deploy QA + security + Jorge approval → deploy

Track progress in `CHECKLIST.md`.

---

## Copy Rules

- stop-slop on every word — zero AI tells
- Warm, personal, reassuring — not clinical
- Services describe feelings and outcomes, not techniques
- Reference Albany, Clifton Park, Saratoga Springs naturally
- No lorem ipsum anywhere
- No placeholders that look fake

---

## Social Links (open in new tab)

- Facebook: https://facebook.com/havenmassageny
- Instagram: https://instagram.com/havenmassageny
- Google Business: placeholder
- LinkedIn: https://linkedin.com/in/janesmith-lmt

Icon style: warm sage default, terracotta on hover.

---

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Framer Motion
- TypeScript
- Netlify deployment + Netlify Forms

---

## Quality Bar

- 95+ Lighthouse — non-negotiable
- WCAG 2.1 AA — no exceptions
- Playwright tests for all critical paths
- gitnexus_impact before editing any symbol
- gitnexus_detect_changes before committing

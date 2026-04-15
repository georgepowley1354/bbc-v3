# Haven — BBC Build Brief

You are building a portfolio piece for BBC — Go Big, Bad Coding or Go Home.
Haven is BBC's second flagship showcase site. It must be warm, intimate,
conversion-focused, and technically flawless. Verdant was luxury editorial.
Haven is human, warm, and built to convert on mobile.
A prospect should look at this and immediately think "I need BBC to build mine."

We are building HAVEN THERAPEUTIC MASSAGE — a professional massage therapy 
practice run by Jane Smith LMT, serving Albany, Clifton Park, and Saratoga 
Springs NY. This is a real functioning site with real Acuity booking.

## Pre-Built Components — Read First
Before anything else read the README.md at:
~/my-project/haven-components/README.md

Two components are ready to drop in:
- ScrollGalleryHero — the signature hero scroll animation
- AcuityBookingEmbed — real Acuity booking widget

Import using:
import { ScrollGalleryHero, AcuityBookingEmbed } from 
'~/my-project/haven-components'

Types are exported — use them:
import type { ScrollGalleryHeroImage, ScrollGalleryHeroProps } 
from '~/my-project/haven-components'
import type { AcuityBookingEmbedProps } 
from '~/my-project/haven-components'

Do NOT rebuild these components. Drop them in exactly as delivered.
Your job is to build the full site around them.

## Before Writing a Single Line of Code
- Query GitNexus and Graphify knowledge graphs for relevant BBC 
  patterns from Verdant or other projects
- Read bbc-brain/agency-identity/ for BBC voice rules
- Read bbc-brain/services-and-packages/ for pricing tier reference
- Use frontend-design skill for ALL UI decisions
- Use ui-ux-pro-max skill for ALL design intelligence
- Use firecrawl to research top 5 premium massage therapy websites
- Use firecrawl on krickofalltrades.com — note exactly what it lacks
- Document every design decision and why it was made
- Present complete design system to Jorge for approval before building

## Stack
- Next.js 14 App Router
- Tailwind CSS
- Framer Motion
- TypeScript
- Netlify deployment with Netlify Forms

## Design Direction
- Warm minimalism — feels like stepping into the space itself
- Primary background: Warm white #FAF8F5
- Surface: Soft cream #F2EDE6
- Accent: Warm sage #7D9B76
- Secondary: Soft terracotta #C4896F
- Text: Deep charcoal #2C2C2C
- Refined serif display font paired with clean light sans-serif body
- Every font pairing decision goes through ui-ux-pro-max
- Generous whitespace — every element breathes
- Animations feel like a slow exhale — nothing jarring or fast
- Photography: warm lighting, soft tones, no clinical shots
- Every UI component goes through frontend-design skill
- If it looks clinical or corporate — start over
- If it looks like an AI built it — start over
- This should be the most beautiful massage therapy site 
  in the Capital Region NY

## Therapist
- Name: Jane Smith, LMT
- Licensed since 2000
- Serving Albany, Clifton Park, and Saratoga Springs NY
- Philosophy: therapeutic touch that helps people feel at 
  home in their bodies
- Warm, experienced, trustworthy — copy reflects this always

## Services and Pricing
- Swedish Massage 60/90 min — $95/$130
- Deep Tissue 60/90 min — $110/$150
- Hot Stone 90 min — $145
- Prenatal Massage 60 min — $105
- Couples Massage 60/90 min — $190/$260
- CBD Enhancement Add-on — $25

## Acuity Booking URL
https://app.acuityscheduling.com/schedule/0f4e6dff/appointment/91881173/calendar/13937249
Every Book Now CTA on every page links to /booking

## Social Placeholders
Include placeholder links for these platforms on 
contact page and footer:
- Facebook: https://facebook.com/havenmassageny
- Instagram: https://instagram.com/havenmassageny
- Google Business: placeholder review link
- LinkedIn: https://linkedin.com/in/janesmith-lmt
All links open in new tab.
Style social icons — warm sage default, terracotta on hover.

## Pages to Build

### 1. Home
- ScrollGalleryHero component (drop in from haven-components)
- Tagline: "Your peace starts here"
- Brief services preview — warm cards, not a list
- Jane's intro snippet — human and personal
- 3 testimonials with star ratings
- Gift certificate CTA section
- New client offer banner — "First Visit: 20% Off"
- Booking CTA — prominent, warm, inviting

### 2. Services
- Each massage as its own card
- Duration, price, benefits, who it's best for
- Expandable benefit descriptions on click
- CBD add-on clearly called out
- Book Now CTA on every service card

### 3. About
- Jane's story — licensed since 2000, Capital Region roots
- Professional headshot placeholder — warm, approachable
- Certifications and training
- Personal philosophy
- What to expect on your first visit
- Builds human connection and trust

### 4. Booking
- AcuityBookingEmbed component (drop in from haven-components)
- What to expect section above the embed
- Cancellation policy — clear and fair
- Preparation tips — arrive 5 mins early, avoid heavy meals
- Phone number as fallback — Jane answers personally

### 5. FAQ
- 10 questions, accordion style
- Warm human answers — not clinical
- Covers: first visit, what to wear, pressure preferences,
  tipping, cancellation, prenatal safety, gift certificates,
  parking, payment methods, new client special

### 6. Contact
- Service areas: Albany, Clifton Park, Saratoga Springs
- Google Maps embed placeholder per location
- Hours of operation
- Phone number — tappable tel: link
- Email address
- All four social platform links
- Contact form via Netlify Forms as backup

## Features — All of Them, No Shortcuts
- ScrollGalleryHero on home page — Codex component
- AcuityBookingEmbed on booking page — Codex component
- Sticky Book Now button pinned to bottom on mobile
- New client offer banner — "First Visit: 20% Off Any Service"
- Gift certificate CTA — "Give the Gift of Peace"
- Availability notice — "Now accepting new clients in 
  Albany, Clifton Park & Saratoga Springs"
- Testimonials with star ratings, first name, service type,
  specific detail that feels authentic
- Service cards with expandable benefit descriptions
- Sticky nav — transparent on load, solid cream on scroll,
  backdrop blur, smooth transition
- Soft scroll animations throughout — sections fade and rise gently
- All animations go through frontend-design skill first
- Local SEO schema for massage therapy — all three locations
- Google Business schema for Jane Smith LMT
- Open Graph images per page
- Twitter/X card meta tags
- Custom 404 — warm, on brand, links back to booking
- PWA manifest
- ADA accessible WCAG 2.1 AA — no exceptions
- All color contrast ratios verified
- Playwright tests for all critical paths including full booking flow
- 95+ Lighthouse score — non-negotiable
- Cookie notice styled to match warm aesthetic
- Built by BBC footer hyperlinked to 
  https://big-bad-coding.netlify.app/ on every single page
  — this is non-negotiable on every BBC build

## Mobile — Highest Priority
- Most massage bookings happen on phones
- Sticky Book Now button pinned to bottom — always visible
- Minimum tap target 44px — no exceptions
- Phone number as tel: link — tappable immediately
- All forms optimized for mobile keyboard types
- Acuity embed scrolls cleanly on mobile — no horizontal scroll
- Test EVERY page on iPhone viewport before marking phase complete
- Mobile experience is the primary experience — desktop enhances it

## Copy Standards — Non-Negotiable
- stop-slop skill on EVERY piece of copy — zero AI tells
- Read bbc-brain/agency-identity/ voice rules before writing anything
- Warm, personal, reassuring — not clinical, not corporate
- Services sell the feeling and outcome — not the technique
- FAQ answers feel like Jane wrote them herself
- Testimonials feel authentic — first name, service, specific detail
- No lorem ipsum anywhere in the entire build
- Headlines make someone feel safe, welcome, and ready to book
- Reference Albany, Clifton Park, and Saratoga Springs naturally
- Copy should make krickofalltrades.com look like a rough draft

## Skills — Use All of Them, No Exceptions
- frontend-design — EVERY UI component and layout decision
- ui-ux-pro-max — EVERY visual and design decision
- stop-slop — EVERY word of copy written
- security-guidance — before any deployment step
- receiving-code-review — before calling any phase complete
- commit-commands — every single git commit
- firecrawl — research before designing
- ralph-loop — self review every phase output before moving on

## BBC Standard
- BBC motto: "Go Big, Bad Coding — Or Go Home"
- BBC website: https://big-bad-coding.netlify.app/
- This site lives at haven.big-bad-coding.netlify.app
- Every line of code should be something Jorge is proud to 
  show a paying client
- Every UI decision goes through frontend-design skill
- Every design decision goes through ui-ux-pro-max skill
- Every word goes through stop-slop skill
- If something feels average — make it exceptional
- When in doubt — go warmer and more human
- Built by BBC in footer on every page linked to
  https://big-bad-coding.netlify.app/ — non-negotiable
- This should make krickofalltrades.com look like a school project

## Assets
- Logo: HAVEN wordmark SVG — soft, elegant, subtle leaf or 
  stone element, designed through frontend-design skill
- Jane Smith: warm professional headshot placeholder
- Photography: Unsplash massage/spa/wellness — warm lighting only,
  no clinical shots, consistent warm tone throughout
- All content realistic — real Capital Region NY references
- No placeholders that look fake or generic

---

# Phase Prompts

## SETUP — Run This First

Read BRIEF.md in this project root — it is your complete 
build specification for Haven. Do not start any work yet.

Create two files:

1. CHECKLIST.md — every feature, skill, requirement, and 
   BBC standard from BRIEF.md as unchecked checkboxes.
   Organized by phase. This is your source of truth.

2. CLAUDE.md (project level) — summarize:
   - BBC motto: "Go Big, Bad Coding — Or Go Home"
   - BBC website: https://big-bad-coding.netlify.app/
   - Built by BBC footer required on every page
   - Acuity URL: https://app.acuityscheduling.com/schedule/
     0f4e6dff/appointment/91881173/calendar/13937249
   - Skills required every session: frontend-design, 
     ui-ux-pro-max, stop-slop, ralph-loop
   - Stop gates: after Phase 2 and before deploy
   - Pre-built components location: 
     ~/my-project/haven-components/
   - This file loads every Claude Code session automatically

Report back when both files are created.
Do not proceed to Phase 1 until Jorge confirms.

---

## PHASE 1 — Research

Read BRIEF.md and CHECKLIST.md before starting.
Check off items as you complete them.

Execute Phase 1 only — Research.

Tasks:
- Use firecrawl to research top 5 premium massage 
  therapy websites globally
- Use firecrawl on krickofalltrades.com — document 
  exactly what it lacks, what Haven will do better
- Use frontend-design skill to begin design direction brief
- Use ui-ux-pro-max skill for design intelligence input
- Document all findings in research-notes.md

Deliverable: research-notes.md with findings and 
initial design direction for Jorge's review.

Stop and report back when complete.
Do not proceed to Phase 2 without Jorge saying "go".

---

## PHASE 2 — Design System

Read BRIEF.md and CHECKLIST.md before starting.
Check off items as you complete them.

Execute Phase 2 only — Design System.

Tasks:
- Use frontend-design skill for ALL decisions
- Use ui-ux-pro-max skill for ALL visual decisions
- Define and document:
  - Typography: display font + body font pairing with rationale
  - Color system: all Haven palette values with usage rules
  - Spacing scale
  - Component library: buttons, cards, nav, footer, forms
  - Motion system: easing curves, durations, animation patterns
  - HAVEN logo SVG wordmark — soft, elegant, subtle leaf element
  - Responsive breakpoints
  - Shadow and border radius system

Deliverable: design-system.md with every decision documented
and rationale explained. Include visual examples where possible.

Stop and present complete design system to Jorge.
Do not build a single page until Jorge says "go".

---

## PHASE 3 — Home Page

Read BRIEF.md, CHECKLIST.md, and CLAUDE.md before starting.
Check off items as you complete them.

Execute Phase 3 only — Home Page.

Tasks:
- Use frontend-design skill on every component
- Use ui-ux-pro-max skill on every visual decision
- Use stop-slop skill on every word of copy
- Drop in ScrollGalleryHero from haven-components — 
  do not rebuild it
  Import: import { ScrollGalleryHero } from 
  '~/my-project/haven-components'
- Build all home page sections:
  - ScrollGalleryHero hero
  - "Your peace starts here" tagline section
  - Services preview cards
  - Jane's intro snippet
  - 3 testimonials with star ratings
  - Gift certificate CTA
  - "First Visit: 20% Off" banner
  - Booking CTA
- Sticky Book Now button pinned to bottom on mobile
- Sticky nav — transparent to solid cream on scroll
- Soft scroll animations — sections fade and rise gently
- Test on iPhone viewport before marking complete
- ralph-loop self review before reporting back
- receiving-code-review before marking phase done
- commit-commands for all commits

Stop and report back when complete.
Do not proceed to Phase 4 without Jorge saying "go".

---

## PHASE 4 — Services + About

Read BRIEF.md, CHECKLIST.md, and CLAUDE.md before starting.
Check off items as you complete them.

Execute Phase 4 only — Services and About pages.

Tasks:
- Use frontend-design skill on every component
- Use ui-ux-pro-max skill on every visual decision
- Use stop-slop skill on every word of copy

Services page:
- Individual card per service — warm not clinical
- Swedish $95/$130 — Deep Tissue $110/$150 — 
  Hot Stone $145 — Prenatal $105 — 
  Couples $190/$260 — CBD Add-on $25
- Expandable benefit descriptions on click
- Book Now CTA on every service card
- Duration and who it's best for on every card

About page:
- Jane Smith LMT — licensed since 2000
- Warm professional headshot placeholder
- Capital Region roots — Albany, Clifton Park, Saratoga
- Personal philosophy — therapeutic touch
- Certifications section
- What to expect on first visit
- Human, warm, trust-building — not a resume

- Test both pages on iPhone viewport
- ralph-loop self review
- receiving-code-review
- commit-commands for all commits

Stop and report back when complete.
Do not proceed to Phase 5 without Jorge saying "go".

---

## PHASE 5 — Booking + FAQ + Contact

Read BRIEF.md, CHECKLIST.md, and CLAUDE.md before starting.
Check off items as you complete them.

Execute Phase 5 only — Booking, FAQ, and Contact pages.

Tasks:
- Use frontend-design on every component
- Use ui-ux-pro-max on every visual decision
- Use stop-slop on every word

Booking page:
- Drop in AcuityBookingEmbed from haven-components —
  do not rebuild it
  Import: import { AcuityBookingEmbed } from 
  '~/my-project/haven-components'
- Acuity URL: https://app.acuityscheduling.com/schedule/
  0f4e6dff/appointment/91881173/calendar/13937249
- What to expect section above embed
- Cancellation policy — clear and fair
- Preparation tips
- Phone fallback — Jane answers personally

FAQ page:
- 10 questions accordion style
- Warm human answers — not clinical
- Covers: first visit, what to wear, pressure, tipping,
  cancellation, prenatal, gift certificates, parking,
  payment, new client special

Contact page:
- Service areas: Albany, Clifton Park, Saratoga Springs
- Google Maps embed placeholder per location
- Hours of operation
- Phone — tappable tel: link
- Email
- Social links — all four platforms, new tab:
  Facebook: https://facebook.com/havenmassageny
  Instagram: https://instagram.com/havenmassageny
  Google Business: placeholder
  LinkedIn: https://linkedin.com/in/janesmith-lmt
  Icons: sage default, terracotta hover
- Netlify Form contact form as backup

- Test all three pages on iPhone viewport
- ralph-loop self review
- receiving-code-review
- commit-commands for all commits

Stop and report back when complete.
Do not proceed to Phase 6 without Jorge saying "go".

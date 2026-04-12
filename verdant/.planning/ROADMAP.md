---
milestone: v1.0
total_phases: 8
---

# Verdant — Roadmap

## Overview

BBC internal portfolio showcase site for a fictional luxury landscape design company (Verdant Landscape Design, Saratoga Springs / Lake George NY). Demonstrates BBC's capability to $50k+ clients. Stack: Next.js 14, Tailwind CSS, Framer Motion, TypeScript, Netlify.

## Phases

- [x] **Phase 1: Research** - Competitor analysis, BBC Brain context, design pattern research
- [x] **Phase 2: Design System** - Color, typography, spacing, animation, component anatomy
- [ ] **Phase 3: Home and Portfolio Pages** - Next.js scaffold, global layout, home page, portfolio page
- [ ] **Phase 4: Services, About, and Process Pages** - Service pages, about page, process timeline
- [ ] **Phase 5: Contact and Forms** - Contact page, budget qualifier form, Netlify Forms
- [ ] **Phase 6: All Features** - Animations, gallery, testimonials, map, SEO, PWA, OG images
- [ ] **Phase 7: Testing and Lighthouse** - Playwright tests, Lighthouse audit, WCAG audit
- [ ] **Phase 8: Code Review and Deploy** - BBC code review, Netlify deploy, smoke test

## Phase Details

### Phase 1: Research
**Goal**: All design decisions are research-backed — competitors studied, BBC identity loaded, design patterns confirmed
**Depends on**: Nothing (first phase)
**Requirements**: None
**Success Criteria** (what must be TRUE):
  1. BBC Brain (agency-identity, voice-and-tone, service-pillars) fully read
  2. At least 3 top luxury landscape firm sites studied (Lifescape CO, DabneyCollins confirmed)
  3. Editorial design patterns reviewed (LUXE Interiors, HGTV Designer Awards)
  4. Typography selection validated against real luxury landscape sites
**Plans**: Complete

Plans:
- [x] 01-01: Research (BBC Brain, competitor analysis, design patterns)

### Phase 2: Design System
**Goal**: Complete design system documented in MASTER.md — all visual decisions locked before any code is written
**Depends on**: Phase 1
**Requirements**: None
**Success Criteria** (what must be TRUE):
  1. Color palette defined (forest-deep, stone-warm, sage, gold)
  2. Typography confirmed (Cormorant Garamond display + DM Sans body)
  3. Spacing system documented (base-8 grid, 128px section rhythm)
  4. Animation system specified (Framer Motion, cinematic pace, expo-out)
  5. All component anatomies documented
  6. 10-section homepage architecture documented
**Plans**: Complete

Plans:
- [x] 02-01: Design system MASTER.md

### Phase 3: Home and Portfolio Pages
**Goal**: Next.js 14 app scaffolded and running, global layout wired, home page and portfolio page fully built to design spec
**Depends on**: Phase 2
**Requirements**: None
**Success Criteria** (what must be TRUE):
  1. Next.js 14 App Router project scaffolded at verdant/ with TypeScript, Tailwind, Framer Motion
  2. Global layout (nav, footer, page transitions) renders on all pages
  3. Home page has all 10 sections: Hero, Logo Bar, Manifesto, Services Preview, Featured Project, Process Teaser, Seasonal Banner, Testimonials, Instagram Placeholder, Final CTA
  4. Portfolio page renders masonry grid with all 5 seed projects
  5. Project case study template renders all case study sections
  6. All placeholder images use real Unsplash URLs (no broken images)
  7. Site runs on localhost:3000 with no console errors
**Plans**:

Plans:
- [ ] 03-01: Next.js scaffold and global layout
- [ ] 03-02: Home page (all 10 sections)
- [ ] 03-03: Portfolio page and case study template

### Phase 4: Services, About, and Process Pages
**Goal**: Services index and individual service pages, about page, and process timeline page all built to design spec
**Depends on**: Phase 3
**Requirements**: None
**Success Criteria** (what must be TRUE):
  1. Services index page lists all 5 service categories
  2. Each service has its own detail page with outcome copy and pricing range
  3. About page renders founder bio, philosophy, and credentials sections
  4. Process timeline page renders all 6 stages (Discovery → Design → Proposal → Build → Reveal → Aftercare)
**Plans**:

Plans:
- [ ] 04-01: Services index and individual service pages
- [ ] 04-02: About and process pages

### Phase 5: Contact and Forms
**Goal**: Contact page live with Netlify Forms, budget qualifier working, validation and success states complete
**Depends on**: Phase 4
**Requirements**: None
**Success Criteria** (what must be TRUE):
  1. Contact page renders premium inquiry form
  2. Budget qualifier field present with appropriate options
  3. Netlify Forms integration wired (netlify attribute present)
  4. Client-side validation rejects empty required fields
  5. Success state renders after form submission
**Plans**:

Plans:
- [ ] 05-01: Contact page and Netlify Forms

### Phase 6: All Features
**Goal**: All advanced features implemented — animations, gallery, testimonials, maps, SEO, PWA
**Depends on**: Phase 5
**Requirements**: None
**Success Criteria** (what must be TRUE):
  1. Framer Motion page transitions working on all route changes
  2. Before/after slider component functional
  3. Cinematic gallery component functional
  4. Seasonal availability banner renders
  5. Service area SVG map renders correctly
  6. Lead magnet email capture functional via Netlify Forms
  7. Sticky nav with backdrop blur working on scroll
  8. WhatsApp floating button present
  9. PWA manifest complete
  10. Local SEO JSON-LD schema present on relevant pages
  11. OG images configured per page
  12. Custom 404 page rendered
**Plans**:

Plans:
- [ ] 06-01: Animations and interactive components
- [ ] 06-02: SEO, PWA, and meta

### Phase 7: Testing and Lighthouse
**Goal**: All critical paths tested, Lighthouse 95+ on all pages, WCAG 2.1 AA passing
**Depends on**: Phase 6
**Requirements**: None
**Success Criteria** (what must be TRUE):
  1. Playwright tests cover all critical paths
  2. Lighthouse score 95+ on Performance, Accessibility, Best Practices, SEO
  3. Mobile viewport testing passes on iPhone SE (375px) and standard (390px)
  4. WCAG 2.1 AA passes (no axe violations)
**Plans**:

Plans:
- [ ] 07-01: Playwright tests
- [ ] 07-02: Lighthouse and WCAG audit

### Phase 8: Code Review and Deploy
**Goal**: BBC code review passed, site deployed and live at verdant.bbc-agency.com
**Depends on**: Phase 7
**Requirements**: None
**Success Criteria** (what must be TRUE):
  1. BBC receiving-code-review skill run, all issues resolved
  2. Jorge approval granted
  3. Site deployed to Netlify at verdant.bbc-agency.com
  4. Post-deploy smoke test passes (all pages load, no 404s, forms functional)
**Plans**:

Plans:
- [ ] 08-01: Code review and deploy

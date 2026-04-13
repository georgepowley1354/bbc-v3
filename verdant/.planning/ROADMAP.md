# Roadmap: Verdant Landscape Design Portfolio Site

## Overview

BBC portfolio showcase site demonstrating agency capability to $50,000+ luxury outdoor living clients in the Saratoga Springs / Lake George NY market. Built with Next.js 14 App Router, Tailwind CSS, Framer Motion, and TypeScript. Deploys to Netlify at verdant.bbc-agency.com.

## Phases

- [x] **Phase 1: Scaffold and Setup** - Next.js 14 App Router, Tailwind, Framer Motion, TypeScript, design tokens
- [x] **Phase 2: Home Page** - Cinematic hero, manifesto, services preview, featured project, testimonials, CTA
- [x] **Phase 3: Portfolio** - Masonry grid, filterable by category, 5 case study detail pages
- [x] **Phase 4: Services, About, and Process Pages** - 5 service pages, about, process timeline — 19 static pages total
- [ ] **Phase 5: Contact Page** - Premium inquiry form with budget qualifier, Netlify Forms integration
- [ ] **Phase 6: Final Polish and Deploy** - Nav links audit, SEO meta per page, robots.ts, sitemap.ts, Netlify deploy

## Phase Details

### Phase 1: Scaffold and Setup
**Goal**: Next.js 14 App Router scaffold with Tailwind, Framer Motion, TypeScript, and design tokens ready — build exits 0
**Depends on**: Nothing (first phase)
**Requirements**: SCAFFOLD-01, SCAFFOLD-02, SCAFFOLD-03, SCAFFOLD-04, SCAFFOLD-05
**Success Criteria** (what must be TRUE):
  1. `npm run build` exits 0 with no TypeScript errors
  2. Design tokens (colors, fonts, animation constants) are defined and importable
  3. Global layout with Navigation and Footer renders on all pages
  4. Tailwind config extends the project color palette (forest-deep, stone-warm, sage, gold)
  5. Framer Motion is installed and animation utilities are in place
**Plans**: Complete

Plans:
- [x] 01-01: Project scaffold, design tokens, global layout, Tailwind config, Framer Motion setup

### Phase 2: Home Page
**Goal**: Full cinematic home page with all sections live and building
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07
**Success Criteria** (what must be TRUE):
  1. Hero section renders with headline, subtext, and CTA button
  2. Services preview section links to /services with real service data
  3. Featured project section displays a portfolio project with image, title, and link
  4. Testimonials section renders 3+ client quotes
  5. Final CTA section renders with inquiry link
**Plans**: Complete

Plans:
- [x] 02-01: Hero, manifesto, services preview, featured project, testimonials, seasonal banner, final CTA

### Phase 3: Portfolio
**Goal**: Portfolio page with filterable masonry grid and 5 case study detail pages
**Depends on**: Phase 2
**Requirements**: PORTFOLIO-01, PORTFOLIO-02, PORTFOLIO-03, PORTFOLIO-04, PORTFOLIO-05
**Success Criteria** (what must be TRUE):
  1. /portfolio renders all 5 projects in a masonry grid layout
  2. Filter bar allows filtering by project category
  3. Each project card links to its detail page at /portfolio/[slug]
  4. All 5 case study detail pages render with hero, specs, and gallery
  5. `npm run build` exits 0 with all 5 portfolio slug pages statically generated
**Plans**: Complete

Plans:
- [x] 03-01: Portfolio masonry grid, filter bar, project cards, and 5 case study detail pages

### Phase 4: Services, About, and Process Pages
**Goal**: All remaining content pages delivered — services index, 5 service detail pages, about, and process — 19 static pages total
**Depends on**: Phase 3
**Requirements**: SERVICES-01, SERVICES-02, SERVICES-03, ABOUT-01, ABOUT-02, PROCESS-01, PROCESS-02
**Success Criteria** (what must be TRUE):
  1. /services lists all 5 service categories with names, taglines, pricing ranges, and icons
  2. Each of 5 service slugs resolves to a detail page at /services/[slug]
  3. About page renders founder bio, philosophy pull quote, and credentials grid
  4. Process page renders all 6 stages: Discovery, Design, Proposal, Build, Reveal, Aftercare
  5. `npm run build` exits 0 with 19 static pages
**Plans**: Complete

Plans:
- [x] 04-01: Services data layer, service index page, and 5 service detail pages
- [x] 04-02: About data layer, about page, process data file, and process timeline page

### Phase 5: Contact Page
**Goal**: Premium contact/inquiry page with Netlify Forms integration and budget qualifier field live and building
**Depends on**: Phase 4
**Requirements**: CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04, CONTACT-05
**Success Criteria** (what must be TRUE):
  1. /contact renders a premium inquiry form matching the site's editorial luxury aesthetic
  2. Form includes: name, email, phone, project type selector, budget range qualifier, project description textarea, and preferred timeline
  3. Form submits via Netlify Forms (netlify attribute, honeypot field, success/error states)
  4. Navigation links to /contact and the global CTA button points to /contact
  5. `npm run build` exits 0 with /contact statically generated (21 total pages)
**Plans**: 1 plan

Plans:
- [ ] 05-01-PLAN.md — Contact page, inquiry form, Netlify Forms wiring, nav CTA link update

### Phase 6: Final Polish and Deploy
**Goal**: Site is production-ready — all nav links wired, SEO meta present on every page, robots and sitemap live, deployed to Netlify
**Depends on**: Phase 5
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04, DEPLOY-05
**Success Criteria** (what must be TRUE):
  1. All navigation links resolve to existing pages with no 404s
  2. Every page has unique <title> and <meta description> via Next.js metadata API
  3. robots.ts and sitemap.ts are present and return correct content
  4. Site is deployed to Netlify at verdant.bbc-agency.com
  5. Lighthouse score is 95+ on Performance, Accessibility, Best Practices, and SEO
**Plans**: TBD

Plans:
- [ ] 06-01-PLAN.md — Global nav audit, per-page SEO metadata, robots.ts, sitemap.ts
- [ ] 06-02-PLAN.md — Netlify deployment, domain configuration, Lighthouse verification

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Scaffold and Setup | 1/1 | Complete | 2026-04-12 |
| 2. Home Page | 1/1 | Complete | 2026-04-12 |
| 3. Portfolio | 1/1 | Complete | 2026-04-12 |
| 4. Services, About, and Process | 2/2 | Complete | 2026-04-12 |
| 5. Contact Page | 0/1 | Pending | — |
| 6. Final Polish and Deploy | 0/2 | Pending | — |

# Roadmap: BBC v3 Technical Audit

## Overview

A post-build technical audit across five layers (SEO, PWA, Mobile, Security, Performance) for bigbadcoding.com. Phases 1–5 are complete. Phase 6 delivers the remaining production-readiness items — real assets, real credentials, real backend, real security headers — so the site can ship.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: SEO** - Search engine optimization — meta, schema, sitemap, OG tags
- [x] **Phase 2: PWA** - Progressive Web App — manifest, service worker, offline, icons
- [x] **Phase 3: Mobile Compliance** - Responsive layout, touch targets, iOS/Android fixes
- [x] **Phase 4: Security** - CSP, headers, form sanitization, input validation
- [x] **Phase 5: Performance** - Caching, defer, DNS prefetch, GA4 setup
- [ ] **Phase 6: Launch Prep** - Replace all placeholders, wire form backend, generate real assets

## Phase Details

### Phase 1: SEO
**Goal**: Site is fully discoverable — correct metadata, schema, and crawlability for local search
**Depends on**: Nothing (first phase)
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, SEO-10, SEO-11
**Success Criteria** (what must be TRUE):
  1. Title, meta description, and canonical are set with Capital Region keyword targeting
  2. Open Graph and Twitter Card tags are present and reference a real OG image
  3. JSON-LD LocalBusiness schema with areaServed and contactPoint is present
  4. sitemap.xml and robots.txt are accessible
  5. OG image file exists at `images/og-image.jpg` (1200x630px)
**Plans**: Complete

Plans:
- [x] 01-01: SEO implementation (title, meta, canonical, OG, Twitter, schema, sitemap, robots)
- [x] 01-02: OG image asset creation

### Phase 2: PWA
**Goal**: Site installs as a PWA on Chrome/Android and iOS with full offline fallback
**Depends on**: Phase 1
**Requirements**: PWA-01, PWA-02, PWA-03, PWA-04, PWA-05, PWA-06, PWA-07, PWA-08, PWA-09, PWA-10
**Success Criteria** (what must be TRUE):
  1. manifest.json is valid and references real icon files at all 8 required sizes
  2. Service worker caches assets (cache-first) and HTML (network-first) with offline fallback
  3. A2HS prompt appears on Android Chrome and is dismissible
  4. Apple touch icons are present at all 4 required sizes
  5. Site is installable on Chrome/Android without installability errors
**Plans**: Complete

Plans:
- [x] 02-01: PWA implementation (manifest, sw.js, offline.html, registration, A2HS, iOS tags)
- [x] 02-02: PWA icon PNG generation (8 manifest sizes + 4 Apple touch sizes)

### Phase 3: Mobile Compliance
**Goal**: Site renders correctly and is fully usable on all mobile devices from 320px to 1440px
**Depends on**: Phase 2
**Requirements**: MOB-01, MOB-02, MOB-03, MOB-04, MOB-05, MOB-06, MOB-07, MOB-08, MOB-09, MOB-10, MOB-11
**Success Criteria** (what must be TRUE):
  1. No horizontal scroll appears at any viewport width from 320px to 1440px
  2. All tap targets are minimum 44x44px with no clipping or overlap
  3. Form inputs do not trigger auto-zoom on iOS (font-size 16px+)
  4. iOS safe area insets are applied to nav, sticky CTA, and footer
  5. Custom cursor is hidden on touch devices
**Plans**: Complete

Plans:
- [x] 03-01: Mobile layout and touch compliance audit
- [x] 03-02: iOS and Android platform-specific fixes

### Phase 4: Security
**Goal**: Site passes a security header review and is protected against common form injection attacks
**Depends on**: Phase 3
**Requirements**: SEC-01, SEC-02, SEC-03, SEC-04, SEC-05, SEC-06, SEC-07, SEC-08, SEC-09, SEC-10, SEC-11, SEC-12, SEC-13, SEC-14, SEC-15, SEC-16
**Success Criteria** (what must be TRUE):
  1. All security headers (CSP, X-Frame-Options, HSTS, etc.) are present and applied in Netlify production
  2. Form inputs are sanitized — HTML stripped, maxlength enforced, character whitelist on name field
  3. No user input is inserted via innerHTML
  4. No API keys or credentials exist in source files
  5. CSP does not contain unsafe-inline once GA4 ID is live
**Plans**: Complete

Plans:
- [x] 04-01: Security headers and CSP implementation
- [x] 04-02: Form sanitization and input validation
- [x] 04-03: Netlify _headers file + CSP tightening

### Phase 5: Performance
**Goal**: Site loads fast on repeat visits and scores well on Lighthouse with GA4 properly configured
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06, PERF-07
**Success Criteria** (what must be TRUE):
  1. All scripts have defer attribute and no render-blocking resources are introduced
  2. DNS prefetch and preconnect are present for Google Fonts and GTM
  3. Repeat visits are served from service worker cache
  4. GA4 measurement ID is a real ID (not the G-XXXXXXXXXX placeholder)
  5. No console.log or debug statements remain in production code
**Plans**: Complete

Plans:
- [x] 05-01: Performance pass (dns-prefetch, defer, cache, console cleanup)
- [x] 05-02: GA4 measurement ID replacement

### Phase 6: Launch Prep
**Goal**: All placeholder values replaced with real data, form backend wired, and site is ready to deploy to production
**Depends on**: Phase 5
**Requirements**: LAUNCH-01, LAUNCH-02, LAUNCH-03, LAUNCH-04, LAUNCH-05, LAUNCH-06, LAUNCH-07
**Success Criteria** (what must be TRUE):
  1. Submitting the contact form delivers a real message — no fake setTimeout simulation
  2. Social links in nav and footer point to real Instagram, Facebook, and LinkedIn URLs
  3. GA4 fires with a real measurement ID (verified in GA4 DebugView)
  4. OG image is present at `images/og-image.jpg` and loads correctly when URL is shared
  5. Site installs as a PWA without missing icon errors in Chrome DevTools
**Plans**: 3 plans

Plans:
- [x] 06-01-PLAN.md — Netlify Forms integration + _headers security file
- [x] 06-02-PLAN.md — OG image + PWA icons + Apple touch icons generation
- [ ] 06-03-PLAN.md — GA4 ID + social links replacement (owner input required)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. SEO | 2/2 | Complete | 2026-04-09 |
| 2. PWA | 2/2 | Complete | 2026-04-09 |
| 3. Mobile Compliance | 2/2 | Complete | 2026-04-09 |
| 4. Security | 3/3 | Complete | 2026-04-09 |
| 5. Performance | 2/2 | Complete | 2026-04-09 |
| 6. Launch Prep | 2/3 | In Progress|  |

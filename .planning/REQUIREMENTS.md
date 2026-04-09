# Requirements: BBC v3 Technical Audit

**Defined:** 2026-04-09
**Core Value:** Production-ready, technically sound BBC v3 site — SEO, PWA, mobile, security, performance all passing — no design changes

---

## v1 Requirements

### SEO

- [x] **SEO-01**: Title tag keyword-optimized for local search (keyword-first, city names present)
- [x] **SEO-02**: Meta description keyword-first with Capital Region cities, under 160 chars
- [x] **SEO-03**: Canonical URL set to `https://bigbadcoding.com/`
- [x] **SEO-04**: Open Graph tags — og:title, og:description, og:image, og:url, og:site_name, og:locale
- [x] **SEO-05**: Twitter Card tags
- [x] **SEO-06**: JSON-LD LocalBusiness/ProfessionalService schema with areaServed, offerCatalog, contactPoint
- [x] **SEO-07**: All external links have `rel="noopener noreferrer"`
- [x] **SEO-08**: Heading hierarchy audited — one H1, logical H2/H3 structure
- [x] **SEO-09**: sitemap.xml present
- [x] **SEO-10**: robots.txt present
- [ ] **SEO-11**: OG image file exists at `images/og-image.jpg` (1200×630px branded)

### PWA

- [x] **PWA-01**: manifest.json with name, short_name, icons, display:standalone, theme/background colors
- [x] **PWA-02**: sw.js with cache-first for assets, network-first for HTML, offline fallback
- [x] **PWA-03**: offline.html — on-brand, retry button, no external dependencies
- [x] **PWA-04**: Service worker registered in script.js on window load
- [x] **PWA-05**: beforeinstallprompt A2HS bar — subtle, dismissible, safe-area-aware
- [x] **PWA-06**: iOS meta tags — apple-mobile-web-app-capable, status-bar-style, title
- [x] **PWA-07**: Apple touch icon `<link>` tags in index.html (120, 152, 167, 180px)
- [x] **PWA-08**: Theme-color meta tag (dark + light variants)
- [ ] **PWA-09**: Actual PNG icon files exist at all 8 manifest icon sizes
- [ ] **PWA-10**: Actual Apple touch icon PNG files exist at 4 sizes

### Mobile Compliance

- [x] **MOB-01**: No horizontal scroll at any breakpoint (320px–1440px)
- [x] **MOB-02**: Viewport meta tag correct — `width=device-width, initial-scale=1.0, viewport-fit=cover`
- [x] **MOB-03**: Hero CTA buttons full-width on mobile (<768px)
- [x] **MOB-04**: Contact form submit full-width on mobile
- [x] **MOB-05**: All touch targets minimum 44×44px (hamburger, theme btn, social links)
- [x] **MOB-06**: Form input font-size minimum 16px (prevents iOS auto-zoom)
- [x] **MOB-07**: iOS safe area on nav, sticky CTA, footer, mobile menu
- [x] **MOB-08**: touch-action: manipulation on all interactive elements
- [x] **MOB-09**: -webkit-overflow-scrolling: touch on scrollable elements
- [x] **MOB-10**: Custom cursor hidden on touch/non-hover devices
- [x] **MOB-11**: -webkit-tap-highlight-color: transparent on all interactive elements

### Security

- [x] **SEC-01**: Content-Security-Policy header configured
- [x] **SEC-02**: X-Frame-Options: DENY
- [x] **SEC-03**: X-Content-Type-Options: nosniff
- [x] **SEC-04**: Referrer-Policy: strict-origin-when-cross-origin
- [x] **SEC-05**: Permissions-Policy — camera, microphone, geolocation all off
- [x] **SEC-06**: X-XSS-Protection: 1; mode=block
- [x] **SEC-07**: HTTPS redirect / HSTS
- [x] **SEC-08**: Form HTML stripping — all tags stripped on blur
- [x] **SEC-09**: Max length on all form fields (name:100, business:150, email:254, message:2000)
- [x] **SEC-10**: Name field character whitelist — letters, spaces, hyphens, apostrophes only
- [x] **SEC-11**: Email format validation regex
- [x] **SEC-12**: All user input inserted via textContent — no innerHTML
- [x] **SEC-13**: No API keys, credentials, or personal emails in source files
- [x] **SEC-14**: No inline event handlers (onclick, onsubmit)
- [ ] **SEC-15**: Netlify `_headers` file — security headers applied in production (not just .htaccess)
- [ ] **SEC-16**: CSP tightened — remove unsafe-inline once GA4 ID is live and theme script hashed

### Performance

- [x] **PERF-01**: dns-prefetch for Google Fonts, GTM
- [x] **PERF-02**: preconnect for Google Fonts (already present)
- [x] **PERF-03**: All scripts have defer attribute
- [x] **PERF-04**: Service worker caching — repeat visits served from cache
- [x] **PERF-05**: No render-blocking CSS or JS introduced
- [x] **PERF-06**: Console.logs and debug code removed
- [ ] **PERF-07**: GA4 measurement ID replaced with real ID (`G-XXXXXXXXXX` placeholder removed)

### Production Launch Checklist

- [ ] **LAUNCH-01**: GA4 ID replaced (`G-XXXXXXXXXX` → real ID)
- [ ] **LAUNCH-02**: Social links replaced (`href="#"` → real URLs for Instagram, Facebook, LinkedIn)
- [ ] **LAUNCH-03**: Contact form wired to real backend (Netlify Forms or Formspree)
- [ ] **LAUNCH-04**: OG image created and placed at `images/og-image.jpg`
- [ ] **LAUNCH-05**: PWA icon PNGs generated at all required sizes
- [ ] **LAUNCH-06**: Apple touch icon PNGs generated at all required sizes
- [ ] **LAUNCH-07**: Netlify `_headers` file created with security headers

---

## v2 Requirements

### Performance

- **PERF-V2-01**: Convert portfolio `background-image` to `<img loading="lazy">` for native lazy load — requires design discussion
- **PERF-V2-02**: Self-host Google Fonts via fontsource for full preload control

### Security

- **SEC-V2-01**: Move GA4 config to script.js + use CSP hash for theme inline script to eliminate unsafe-inline

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Design changes | Explicitly excluded — colors, fonts, layout, copy stay as-built |
| Portfolio image refactor | `background-image` → `<img>` requires design input |
| Booking/CMS integration | Separate projects |
| Self-hosted fonts | Requires woff2 URLs, deferred to v2 |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SEO-01 through SEO-10 | Phase 1 — SEO | Complete ✓ |
| SEO-11 | Phase 1 — SEO | Pending (needs asset) |
| PWA-01 through PWA-08 | Phase 2 — PWA | Complete ✓ |
| PWA-09, PWA-10 | Phase 2 — PWA | Pending (needs asset) |
| MOB-01 through MOB-11 | Phase 3 — Mobile | Complete ✓ |
| SEC-01 through SEC-14 | Phase 4 — Security | Complete ✓ |
| SEC-15, SEC-16 | Phase 4 — Security | Pending |
| PERF-01 through PERF-06 | Phase 5 — Performance | Complete ✓ |
| PERF-07 | Phase 5 — Performance | Pending |
| LAUNCH-01 through LAUNCH-07 | Phase 6 — Launch Prep | Pending |

**Coverage:**
- v1 requirements: 42 total
- Complete: 35
- Pending: 7 (assets + launch items) ⚠️

---
*Requirements defined: 2026-04-09*
*Last updated: 2026-04-09 after roadmap creation — all 42 requirements mapped to 6 phases*

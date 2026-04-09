# BBC v3 Technical Audit

## What This Is

A post-build technical audit and implementation pass for the completed BBC v3 website (Big Bad Coding — Capital Region NY web design). Five layers audited and implemented: SEO, PWA, Mobile Compliance, Security, and Performance. No design changes — technical layer only. All major audit phases are complete; 10 production-readiness items remain.

## Core Value

A technically sound, production-ready site that ranks well, loads fast, installs as a PWA, and passes a security review — without touching a single design decision.

## Requirements

### Validated

- ✓ SEO optimized — title, meta description, canonical, OG/Twitter cards, JSON-LD schema, heading audit — Phase 1
- ✓ PWA implemented — manifest.json, sw.js (cache-first), offline.html, iOS meta tags, A2HS prompt — Phase 2
- ✓ Mobile compliance — 320px–1440px audit, touch targets 44px+, safe-area-inset on nav/footer/sticky CTA — Phase 3
- ✓ iOS fixes — touch-action, -webkit-overflow-scrolling, safe area, custom cursor scoped to hover devices — Phase 3
- ✓ Android fixes — -webkit-tap-highlight-color, font smoothing — Phase 3
- ✓ Security headers — CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Permissions-Policy — Phase 4
- ✓ Form sanitization — HTML stripping, maxlength, name char filter, email validation, textContent-only DOM writes — Phase 4
- ✓ Performance pass — dns-prefetch, SW caching, script defer, lazy load audit, Lighthouse estimates — Phase 5

### Active

- [ ] Generate actual PWA icon PNGs at all 8 required sizes (for installability on Chrome/Android)
- [ ] Generate Apple touch icons at 4 required sizes (120×120, 152×152, 167×167, 180×180)
- [ ] Create OG image — 1200×630px branded image (currently missing, referenced in meta tags)
- [ ] Replace GA4 placeholder `G-XXXXXXXXXX` with real measurement ID
- [ ] Create Netlify `_headers` file — `.htaccess` is ignored by Netlify
- [ ] Wire contact form to real backend — currently uses fake setTimeout simulation
- [ ] Replace social link placeholders — Instagram, Facebook, LinkedIn are all `href="#"`
- [ ] Tighten CSP once GA4 ID is live — remove `unsafe-inline` with a hash for inline theme script

### Out of Scope

- Design changes of any kind — colors, fonts, layout, copy all stay as-built
- Converting portfolio `background-image` to `<img>` tags — requires design discussion
- Self-hosted fonts / Google Fonts preload optimization — requires woff2 URLs, deferred
- Stripe, booking, or CMS integrations — separate projects

## Context

- Site: Big Bad Coding (bigbadcoding.com) — Jorge's own business site for Capital Region NY
- Stack: Plain HTML/CSS/JS, no framework, deployed on Netlify
- All 5 major audit phases implemented locally in `bbc-v3/` — not yet committed or deployed
- `.htaccess` created but ineffective on Netlify — needs `_headers` or `netlify.toml` instead
- CSP includes `unsafe-inline` to support inline theme script (FOUC prevention) + GA4 config

## Constraints

- **Design freeze**: No visual changes — audit is technical layer only
- **Netlify deployment**: Apache `.htaccess` doesn't apply — headers must be in `_headers` or `netlify.toml`
- **Content**: Social links, GA4 ID, and form backend require client input before launch

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cache-first SW strategy for assets | Instant repeat loads, offline resilience | — Pending |
| Network-first SW strategy for HTML | Always get freshest page content | — Pending |
| `unsafe-inline` in CSP | Required for inline theme script (FOUC) + GA4 | ⚠️ Revisit when GA4 ID is live |
| `.htaccess` created despite Netlify | Documents intended headers; needs `_headers` file to apply | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-09 after initialization*

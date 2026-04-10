# Remodel Now LLC — Design Specification
**Date:** 2026-04-10  
**Status:** Approved — Ready to Build  
**Client:** Carl (Remodel Now LLC, Melrose NY — serves Capital Region)

---

## Agreed Approach

**Approach B** — Custom HTML/CSS + Netlify + Supabase

- No WordPress, no frameworks, no build step
- Vanilla JS + HTML5 + CSS3 (same pattern as existing BBC client sites)
- Supabase for dynamic content (gallery, testimonials, job listings)
- Netlify for hosting + forms
- Google Workspace for email

---

## Brand Colors (from logo)

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#1C2D9E` | Primary text, nav, headings |
| Red | `#C41230` | "NOW" accent, CTAs, highlights |
| Sky Blue | `#4BB0D0` | House icon color, secondary accents |
| White | `#FFFFFF` | Backgrounds, cards |
| Charcoal | `#1A1A1A` | Body text, footer |
| Light Gray | `#F5F7FA` | Section backgrounds |

**Tagline:** "Because You Deserve It!"

---

## Aesthetic Direction

**Clean & Professional** — warm, trustworthy, homeowner-focused.

- Primary palette: navy + white with red CTAs
- Sky blue as supporting accent (from house logo)
- Strong typography: bold serif or semi-bold sans for headlines
- Real project photos heavy (placeholder until Carl provides)
- No gradients, no dark hero — light, airy feel with authority
- Stats bar: 20+ years · 500+ projects · ★ 5.0 Google · Licensed & Insured

---

## Site Architecture — 16 Pages Total

### Navigation Pages (7)
| Page | Purpose |
|------|---------|
| Home | Hero · Stats bar · Services grid · Featured testimonial · CTA band |
| Services | Overview of all 8 services with links to landing pages |
| Portfolio | Filterable gallery grid (Supabase-backed) |
| About | Carl's story · Team · License # · Service area map |
| Reviews | Stars + date + name + Google link (Supabase-backed) |
| Contact | Quote request form (Netlify Forms) · Map · Hours · Phone |
| Jobs | Current openings (Supabase) · Application form |

### Service Landing Pages (8) — SEO Targets
| Page | Primary Keyword |
|------|----------------|
| Kitchens | "kitchen remodeling Cohoes NY" |
| Bathrooms | "bathroom remodel Capital Region NY" |
| Decks | "deck builder Albany NY" |
| Additions | "home additions Cohoes NY" |
| Season Rooms | "sunroom contractor Capital Region" |
| Siding | "siding installation Albany County" |
| Windows & Doors | "window replacement Cohoes NY" |
| **New Construction** | "new home construction Capital Region NY" |

### Admin Panel (1)
Password-protected overlay (same pattern as Kris/WSB sites).  
Carl logs in to manage: gallery photos, testimonials, job listings.

---

## Supabase Schema

### `projects` table (Portfolio Gallery)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| title | text | e.g., "Kitchen Remodel — Cohoes" |
| category | text | kitchens, bathrooms, decks, etc. |
| image_url | text | Supabase Storage URL |
| description | text | Optional caption |
| featured | boolean | Show on homepage |
| created_at | timestamptz | Auto |

### `testimonials` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Reviewer name |
| rating | int | 1–5 stars |
| review | text | Review body |
| service | text | Which service |
| date | date | Review date |
| source | text | google, direct |
| featured | boolean | Show on homepage |

### `job_listings` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| title | text | Job title |
| description | text | Full description |
| type | text | full-time, part-time, subcontractor |
| active | boolean | Show/hide listing |
| created_at | timestamptz | Auto |

---

## Admin Panel Spec

**Auth:** Password-gated overlay (SHA256 hash, same as kris-admin.js pattern)  
**Tabs:**
1. **Gallery** — upload photo, set title/category, toggle featured
2. **Testimonials** — add/edit/delete reviews, toggle featured
3. **Jobs** — post/remove job listings, toggle active

Storage: Supabase Storage for images (Cloudinary-style URLs, no local files)

---

## Content — What We Have (scraped from remodelnowllc.com)

- [x] Phone: 518-308-5088
- [x] Address: 850 Route 40, Melrose, NY 12121
- [x] Hours: Mon–Fri 7:30am–5pm · Sat 8am–12pm · Sun closed
- [x] Email: Remodel.now@yahoo.com (replacing with Google Workspace)
- [x] Facebook: https://www.facebook.com/remodelnowconstruction/
- [x] Instagram: https://www.instagram.com/remodelnow/
- [x] About copy: "Family Owned & Operated · 20+ years experience · Capital Region"
- [x] Hero copy: "Don't just dream about redesigning your home. Let us make it a reality."
- [x] 9 real Google reviews ready to seed (Pamela M., Linda T., Ryan C., Zach R., David E., Eileen B., Doreen D., Andrea H. + 1 more)
- [x] Team names from reviews: Carl, Paul, Brad, Brittany (office)
- [x] Project photos available on Squarespace CDN (Harris Kitchen, deck, garage)

## Still Needed from Carl

- [ ] Google Workspace email address (what address does he want?)
- [ ] License number (to show on About page — builds trust)
- [ ] Confirmed stats (500+ projects? Google rating? — verify before using)
- [ ] Domain decision — keep remodelnowllc.com or new domain?
- [ ] Google Business Profile URL (for Reviews page "Write a Review" link)
- [ ] Job listings (any open positions?)
- [ ] Blog section? (good for local SEO long-form content)

---

## Tech Implementation Notes

**File structure:**
```
remodelnow/
  index.html              ← Home
  services.html           ← Services overview
  services/
    kitchens.html
    bathrooms.html
    decks.html
    additions.html
    season-rooms.html
    siding.html
    windows-doors.html
    new-construction.html
  portfolio.html
  about.html
  reviews.html
  contact.html
  jobs.html
  css/
    styles.css
    mobile.css
  js/
    supabase-client.js
    gallery.js
    testimonials.js
    jobs.js
    admin.js
    utils.js
  admin/
    (admin overlay built into admin.js, not separate page)
```

**Deployment:** Netlify (same as all other BBC client sites)  
**Forms:** Netlify Forms for contact/quote and job application  
**Images:** Supabase Storage bucket — public read, admin write only  
**Environment:** `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Netlify env vars

---

## Build Phases

1. **Phase 1 — Static shell**: HTML structure, CSS design system, nav, all 15 pages (placeholder content)
2. **Phase 2 — Supabase wiring**: Gallery, testimonials, jobs all pulling live from DB
3. **Phase 3 — Admin panel**: Password-gated CRUD overlay for Carl
4. **Phase 4 — SEO pass**: Meta tags, OG images, schema markup, sitemap.xml
5. **Phase 5 — Launch prep**: Netlify config, Google Workspace DNS, PWA manifest, final review

---

## Content Sources

- **Existing site:** https://www.remodelnowllc.com/ — reference for copy, services, contact info
- **Photos:** Facebook page + existing site (scrape before build)
- **Logo:** Use `.webp` as color reference only — display as-is in nav (no SVG needed)

## Open Questions (need Carl's input before Phase 1)

- Domain — keep remodelnowllc.com or new one? (existing site on this domain)
- License number to display on About page?
- Does he want a blog section for local SEO long-form content?
- Google Business Profile URL (for Reviews page link)

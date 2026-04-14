# Haven — Build Checklist
> Source of truth. Check off items as each phase completes.

---

## SETUP

- [x] Read BRIEF.md completely
- [ ] Read haven-components/README.md
- [x] Create CHECKLIST.md (this file)
- [x] Create CLAUDE.md (project level)
- [x] Confirm with Jorge before proceeding to Phase 1

---

## PHASE 1 — Research ✓

### Pre-Work
- [ ] Query GitNexus for relevant BBC patterns from Verdant
- [ ] Query Graphify knowledge graph for prior BBC patterns
- [x] Read bbc-brain/agency-identity/ for BBC voice rules
- [x] Read bbc-brain/services-and-packages/ for pricing reference

### Research Tasks
- [x] firecrawl — top 5 premium massage therapy websites globally
- [x] firecrawl — krickofalltrades.com audit (document gaps)
- [x] Document what Haven will do better than krickofalltrades.com
- [x] frontend-design skill — begin design direction brief
- [x] ui-ux-pro-max skill — design intelligence input
- [x] Document all findings in research-notes.md

### Deliverable
- [x] research-notes.md complete with findings and initial design direction
- [ ] Stop and report back — do not proceed without Jorge saying "go"

---

## PHASE 2 — Design System ✓

### Pre-Work
- [x] Read BRIEF.md
- [x] Read CHECKLIST.md

### Design System Tasks (all through frontend-design + ui-ux-pro-max)
- [x] Typography: display font selected with rationale (Lora 400/500/600/700)
- [x] Typography: body font selected and paired with rationale (Raleway 300/400/500/600)
- [x] Color system documented — all Haven palette values with usage rules
  - [x] Primary background: #FAF8F5 warm white
  - [x] Surface: #F2EDE6 soft cream
  - [x] Accent: #7D9B76 warm sage (decorative) + #4E6B48 interactive (AA compliant)
  - [x] Secondary: #C4896F soft terracotta
  - [x] Text: #2C2C2C deep charcoal
- [x] Spacing scale defined
- [x] Component library documented: buttons (primary, secondary, ghost, sticky mobile)
- [x] Component library documented: service cards
- [x] Component library documented: testimonial cards
- [x] Component library documented: nav (transparent + solid states)
- [x] Component library documented: footer
- [x] Component library documented: forms
- [x] Component library documented: availability + offer banners
- [x] Motion system: easing curves defined
- [x] Motion system: durations defined
- [x] Motion system: animation patterns documented (scroll, stagger, hero, reduced-motion)
- [x] HAVEN logo SVG wordmark designed — botanical leaf mark + wordmark
- [x] Responsive breakpoints defined (375/430/768/1024/1280/1440)
- [x] Shadow system defined (warm-tinted, 5 levels)
- [x] Border radius system defined
- [x] All color contrast ratios verified WCAG 2.1 AA
- [x] Tailwind config extensions documented
- [x] Icon system defined (Lucide React)
- [x] Photography direction documented

### Deliverable
- [x] design-system.md complete with every decision and rationale
- [x] Present complete design system to Jorge — STOP GATE ✓
- [x] Jorge said "go" — proceeding to Phase 3

---

## PHASE 3 — Home Page

### Pre-Work
- [ ] Read BRIEF.md
- [ ] Read CHECKLIST.md
- [ ] Read CLAUDE.md

### Components
- [ ] Drop in ScrollGalleryHero from haven-components (do NOT rebuild)
- [ ] Sticky nav — transparent on load, solid cream on scroll, backdrop blur
- [ ] Sticky Book Now button pinned to bottom on mobile

### Home Page Sections
- [ ] ScrollGalleryHero hero
- [ ] "Your peace starts here" tagline section
- [ ] Services preview cards (warm cards, not a list)
- [ ] Jane's intro snippet — human and personal
- [ ] 3 testimonials with star ratings
- [ ] Gift certificate CTA — "Give the Gift of Peace"
- [ ] "First Visit: 20% Off" new client offer banner
- [ ] Booking CTA — prominent, warm, inviting

### Animations
- [ ] All animations go through frontend-design skill first
- [ ] Sections fade and rise gently on scroll
- [ ] Animations feel like a slow exhale — nothing jarring

### Copy (stop-slop on every word)
- [ ] Hero copy — stop-slop reviewed
- [ ] Tagline section copy — stop-slop reviewed
- [ ] Services preview copy — stop-slop reviewed
- [ ] Jane's intro copy — stop-slop reviewed
- [ ] Testimonial copy — stop-slop reviewed (authentic, specific detail)
- [ ] Gift certificate copy — stop-slop reviewed
- [ ] Offer banner copy — stop-slop reviewed
- [ ] Booking CTA copy — stop-slop reviewed

### Quality Gates
- [ ] Tested on iPhone viewport
- [ ] Sticky Book Now visible on mobile
- [ ] ralph-loop self review complete
- [ ] receiving-code-review complete
- [ ] commit-commands used for all commits
- [ ] Stop and report back — do not proceed without Jorge saying "go"

---

## PHASE 4 — Services + About Pages

### Pre-Work
- [x] Read BRIEF.md
- [x] Read CHECKLIST.md
- [x] Read CLAUDE.md

### Services Page
- [x] Swedish Massage card — 60/90 min, $95/$130, benefits, who it's for
- [x] Deep Tissue card — 60/90 min, $110/$150, benefits, who it's for
- [x] Hot Stone card — 90 min, $145, benefits, who it's for
- [x] Prenatal Massage card — 60 min, $105, benefits, who it's for
- [x] Couples Massage card — 60/90 min, $190/$260, benefits, who it's for
- [x] CBD Enhancement Add-on — $25, clearly called out
- [x] Expandable benefit descriptions on click
- [x] Book Now CTA on every service card
- [x] Duration and who it's best for on every card
- [x] Cards feel warm, not clinical
- [x] All copy through stop-slop skill

### About Page
- [x] Jane Smith LMT — licensed since 2000
- [x] Warm professional headshot placeholder
- [x] Capital Region roots — Albany, Clifton Park, Saratoga Springs
- [x] Personal philosophy — therapeutic touch, feel at home in your body
- [x] Certifications and training section
- [x] What to expect on first visit section
- [x] Tone: human, warm, trust-building — not a resume
- [x] All copy through stop-slop skill

### Quality Gates
- [ ] Both pages tested on iPhone viewport
- [ ] ralph-loop self review complete
- [ ] receiving-code-review complete
- [ ] commit-commands used for all commits
- [ ] Stop and report back — do not proceed without Jorge saying "go"

---

## PHASE 5 — Booking + FAQ + Contact Pages

### Pre-Work
- [ ] Read BRIEF.md
- [ ] Read CHECKLIST.md
- [ ] Read CLAUDE.md

### Booking Page
- [x] Drop in AcuityBookingEmbed from haven-components (do NOT rebuild)
- [x] Acuity URL wired: https://app.acuityscheduling.com/schedule/0f4e6dff/appointment/91881173/calendar/13937249
- [x] What to expect section above the embed
- [x] Cancellation policy — clear and fair
- [x] Preparation tips — arrive 5 mins early, avoid heavy meals
- [x] Phone number as fallback — Jane answers personally
- [ ] Acuity embed scrolls cleanly on mobile — no horizontal scroll

### FAQ Page
- [x] 10 questions, accordion style
- [x] Q: first visit experience
- [x] Q: what to wear
- [x] Q: pressure preferences
- [x] Q: tipping
- [x] Q: cancellation policy
- [x] Q: prenatal safety
- [x] Q: gift certificates
- [x] Q: parking
- [x] Q: payment methods
- [x] Q: new client special
- [x] All answers warm and human — feel like Jane wrote them
- [x] All copy through stop-slop skill

### Contact Page
- [x] Service areas listed: Albany, Clifton Park, Saratoga Springs
- [x] Google Maps embed placeholder per location
- [x] Hours of operation
- [x] Phone number — tappable tel: link
- [x] Email address
- [x] Facebook link — https://facebook.com/havenmassageny (new tab)
- [x] Instagram link — https://instagram.com/havenmassageny (new tab)
- [x] Google Business placeholder link (new tab)
- [x] LinkedIn link — https://linkedin.com/in/janesmith-lmt (new tab)
- [x] Contact form via Netlify Forms as backup

### Quality Gates
- [ ] All three pages tested on iPhone viewport
- [ ] ralph-loop self review complete
- [ ] receiving-code-review complete
- [ ] commit-commands used for all commits
- [ ] Stop and report back — do not proceed without Jorge saying "go"

---

## PHASE 6 — Technical Layer ✓

### SEO
- [x] Local SEO schema — massage therapy, Albany
- [x] Local SEO schema — massage therapy, Clifton Park
- [x] Local SEO schema — massage therapy, Saratoga Springs
- [x] Google Business schema for Jane Smith LMT
- [x] Open Graph image — Home
- [x] Open Graph image — Services
- [x] Open Graph image — About
- [x] Open Graph image — Booking
- [x] Open Graph image — FAQ
- [x] Open Graph image — Contact
- [x] Twitter/X card meta tags — all pages
- [x] sitemap.xml generated
- [x] robots.txt configured

### PWA
- [x] PWA manifest configured
- [x] App icons generated (SVG source + 11 PNG sizes via sharp)
- [x] Service worker (public/sw.js + ServiceWorkerRegistration client component)

### Accessibility
- [x] WCAG 2.1 AA — 9 issues found and fixed
- [x] All color contrast ratios verified (all pass; sage decorative-only note documented)
- [x] All images have alt text
- [x] All forms labeled
- [x] Keyboard navigation tested (skip link added, FAQ keyboard nav fixed)
- [ ] Screen reader tested — needs manual verification before Phase 7

### Performance
- [ ] 95+ Lighthouse score — verify after Phase 7 deploy
- [x] Images optimized (Next.js Image component throughout, Unsplash preconnect)
- [x] Fonts optimized (next/font/google, display: swap)

### Miscellaneous
- [x] Custom 404 page — warm, on brand, links back to booking
- [x] Cookie notice — styled to match warm aesthetic, dismissible via localStorage

### Testing
- [x] Playwright tests — home page critical path (16 tests)
- [x] Playwright tests — services page (9 tests)
- [x] Playwright tests — booking flow (full) (10 tests)
- [x] Playwright tests — contact form submission (12 tests)
- [x] Playwright tests — mobile viewport all pages

---

## PHASE 7 — Pre-Deploy (STOP GATE)

### Security Review
- [ ] security-guidance skill — full review before deploy

### Final QA
- [ ] Every page tested on iPhone viewport
- [ ] Every page tested on desktop
- [ ] All Book Now CTAs link to /booking
- [ ] Acuity embed loads and functions correctly
- [ ] All social links open in new tab
- [ ] Phone number tappable on mobile
- [ ] Netlify Forms contact form working
- [ ] "Built by BBC" footer on every page — linked to https://big-bad-coding.netlify.app/
- [ ] No lorem ipsum anywhere
- [ ] No placeholder copy that looks fake
- [ ] 95+ Lighthouse verified

### Git
- [ ] gitnexus_detect_changes() run — confirms scope
- [ ] All commits used commit-commands skill

### Deploy
- [ ] Netlify deploy to haven.big-bad-coding.netlify.app
- [ ] Post-deploy smoke test — all pages load
- [ ] Post-deploy Lighthouse run
- [ ] Jorge final approval

---

## Global — Every Phase, Every Session

### Skills (never skip)
- [ ] frontend-design — every UI component and layout decision
- [ ] ui-ux-pro-max — every visual and design decision
- [ ] stop-slop — every word of copy
- [ ] ralph-loop — self review before reporting back
- [ ] receiving-code-review — before marking any phase complete
- [ ] commit-commands — every git commit

### BBC Standards
- [ ] "Built by BBC" footer on every page — hyperlinked to https://big-bad-coding.netlify.app/
- [ ] All Book Now CTAs link to /booking
- [ ] Mobile is the primary experience
- [ ] Minimum tap target 44px — all interactive elements
- [ ] Sticky Book Now button visible on all mobile pages
- [ ] No clinical or corporate look — start over if it does
- [ ] No AI-looking UI — start over if it does

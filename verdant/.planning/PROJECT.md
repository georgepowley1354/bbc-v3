---
project: Verdant
type: portfolio_showcase
client: BBC (internal)
status: planning
created: 2026-04-12
---

# Verdant — Project Brief

## What This Is

A BBC portfolio showcase site for a fictional luxury landscape and outdoor living design company. Target: demonstrate BBC's capability to $50,000+ clients in the Saratoga Springs / Lake George NY market. Lives at verdant.bbc-agency.com.

## Core Value

A prospect looks at this site and immediately thinks: "I need BBC to build my site." Every decision — copy, design, code — must reflect the absolute best BBC can deliver.

## Client Profile (Fictional)

- **Company**: Verdant Landscape Design
- **Location**: Saratoga Springs & Lake George, NY
- **Market**: Luxury outdoor living — $25k-$100k+ projects
- **Services**: Hardscape, softscape, pools, outdoor kitchens, full property design
- **Tagline**: "We Build Outdoor Worlds"

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Framer Motion
- TypeScript
- Netlify deployment with Netlify Forms

## Pages

1. Home — cinematic hero, manifesto, services, featured project, social proof, CTA
2. Portfolio — masonry grid, filterable by type, links to case studies
3. Services — individual service pages, outcome copy, pricing ranges, process preview
4. About — founder, team, philosophy, certifications, awards
5. Process — visual timeline (Discovery → Design → Proposal → Build → Reveal → Aftercare)
6. Contact — premium inquiry form with budget qualifier

## Design Direction

Organic luxury editorial. Deep forest/stone palette. Photography-forward. Cinematic animation. WCAG 2.1 AA.

## Key Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Typography | Cormorant Garamond + DM Sans | Editorial luxury serif + clean humanist sans |
| Primary dark | #1C2B1E | Forest deep — organic, rich, not flat black |
| Primary light | #F5F0E8 | Warm stone — sophisticated, not clinical white |
| Accent | #4A7C59 sage + #C9A84C gold | Nature + warmth — luxury without coldness |
| Animation | Framer Motion, 600-800ms, custom easing | Cinematic pace — nothing cheap or bouncy |
| Layout style | Editorial, full-bleed photography | Images ARE the product |
| Service area map | Custom SVG | No API key, no privacy issues, faster, more on-brand |
| Lead magnet flow | Email capture via Netlify Forms | Demonstrates BBC capability, more realistic CRM demo |
| Analytics | NEXT_PUBLIC_GA4_ID placeholder in env | Wired from day one, no last-minute scramble |
| SEO files | Next.js native app/robots.ts + app/sitemap.ts | Part of Phase 6 |
| Images | Generated or pulled from Unsplash/external | Portfolio showcase — no real client assets needed |
| Portfolio seed data | 5 fictional projects (one per service category) | Hardscape / Softscape / Pool / Outdoor Kitchen / Full Property |

## Seed Projects

| # | Name | Category | Location | Investment | Timeline |
|---|------|----------|----------|------------|----------|
| 1 | The Adirondack Terrace | Hardscape | Lake George, NY | $45,000–$60,000 | 8 weeks |
| 2 | The Willowmere Garden | Softscape | Saratoga Springs, NY | $28,000–$38,000 | 6 weeks |
| 3 | The Glasswater Pool | Pool + Surround | Bolton Landing, NY | $85,000–$110,000 | 12 weeks |
| 4 | The Hearthstone Kitchen | Outdoor Kitchen | Saratoga Springs, NY | $52,000–$72,000 | 10 weeks |
| 5 | The Ridgeline Estate | Full Property | Lake George, NY | $140,000–$180,000 | 22 weeks |

## BBC Standard

- "Built by BBC" badge in footer, hyperlinked to https://bbc-agency.com
- stop-slop on all copy — zero AI tells
- WCAG 2.1 AA — no exceptions
- 95+ Lighthouse — non-negotiable
- Playwright tests on all critical paths

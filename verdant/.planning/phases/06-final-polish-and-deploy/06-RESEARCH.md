# Phase 06: Final Polish and Deploy — Research

**Researched:** 2026-04-12
**Domain:** Next.js 14 App Router SEO metadata, robots/sitemap file conventions, Netlify deployment, Lighthouse auditing
**Confidence:** HIGH

---

## Summary

Phase 06 is the production gate for the Verdant site. All 21 static pages exist and build cleanly. This phase has three independent workstreams that can be sequenced across two plans: (1) nav audit + SEO metadata + robots.ts/sitemap.ts, and (2) Netlify deploy + domain config + Lighthouse verification.

The codebase audit reveals the work is lighter than expected for metadata — every page already exports `metadata` or `generateMetadata`. What is missing is `metadataBase` in `layout.tsx` (required for absolute OG URLs), a `title.template` for consistent branding across pages, and the two file-convention routes (`robots.ts`, `sitemap.ts`). The nav audit reveals two real link bugs: Footer service links point to hash anchors (`/services#hardscape`) instead of the actual service slug pages (`/services/hardscape`), and `InstagramPlaceholder.tsx` has an unresolved `href="#"`.

Netlify deployment is straightforward: `netlify.toml` already has `@netlify/plugin-nextjs` referenced and `next.config.mjs` does not set `output: 'export'`, which is the correct configuration for the plugin. No `package.json` change is needed — Netlify auto-installs the plugin during CI. Domain configuration requires adding `verdant.bbc-agency.com` as a custom domain in the Netlify dashboard and adding a CNAME record at the DNS provider pointing `verdant` to the generated `*.netlify.app` URL.

**Primary recommendation:** Fix the two nav bugs first, then add `metadataBase` + `title.template` to `layout.tsx`, then create `robots.ts` and `sitemap.ts`, then deploy. Run Lighthouse after the first successful Netlify deploy — not in local dev.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DEPLOY-01 | All navigation links resolve to existing pages with no 404s | Nav audit found 2 bugs: Footer service hash anchors, Instagram `href="#"` — both need fixes |
| DEPLOY-02 | Every page has unique title and meta description via Next.js metadata API | All pages already have metadata exports; add `metadataBase` + `title.template` to layout.tsx |
| DEPLOY-03 | robots.ts and sitemap.ts present and return correct content | Neither file exists — both need to be created using `MetadataRoute` types |
| DEPLOY-04 | Site deployed to Netlify at verdant.bbc-agency.com | netlify.toml already configured; need Netlify site creation + CNAME at DNS provider |
| DEPLOY-05 | Lighthouse score 95+ on Performance, Accessibility, Best Practices, SEO | Run via `npx lighthouse` post-deploy; common gaps listed in pitfalls section |
</phase_requirements>

---

## Codebase Audit Results (pre-research, verified)

### Metadata Coverage [VERIFIED: grep of src/app/**]

| Page | File | Has Metadata | Type |
|------|------|-------------|------|
| / (home) | `app/page.tsx` | Yes | `export const metadata` |
| /about | `app/about/page.tsx` | Yes | `export const metadata` |
| /contact | `app/contact/page.tsx` | Yes | `export const metadata` |
| /portfolio | `app/portfolio/page.tsx` | Yes | `export const metadata` |
| /process | `app/process/page.tsx` | Yes | `export const metadata` |
| /services | `app/services/page.tsx` | Yes | `export const metadata` |
| /portfolio/[slug] | `app/portfolio/[slug]/page.tsx` | Yes | `generateMetadata` |
| /services/[slug] | `app/services/[slug]/page.tsx` | Yes | `generateMetadata` |
| Root layout | `app/layout.tsx` | Yes (global default) | `export const metadata` |

**What is missing:**
- `metadataBase` property in `layout.tsx` (required for OG image URLs to be absolute)
- `title.template` in `layout.tsx` (for consistent `| Verdant Landscape Design` suffix sitewide)
- `openGraph` block in `layout.tsx` (for social sharing defaults)

### Nav Link Audit [VERIFIED: grep of src/]

**Confirmed working links:**
- Navigation.tsx: `/`, `/portfolio`, `/services`, `/process`, `/about`, `/contact` — all valid pages
- Footer.tsx col 2 (Navigation): same links — all valid
- All CTA buttons: `/contact` — valid
- Portfolio `[slug]` prev/next: `/portfolio/${slug}` — driven from data, valid
- Services `[slug]` next service: `/services/${slug}` — driven from data, valid
- `FeaturedProject.tsx`: `/portfolio/adirondack-terrace` — valid (slug exists in data)

**Confirmed broken links:**
1. `Footer.tsx` col 3 (Services): `href="/services#hardscape"`, `href="/services#softscape"`, etc. — these should be `/services/hardscape`, `/services/softscape`, etc. Hash anchors don't exist on the services index page.
2. `InstagramPlaceholder.tsx`: `href="#"` — placeholder that was never wired up. Should either link to a real Instagram URL or remove the link.

### Existing Netlify Config [VERIFIED: netlify.toml]

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

The `publish = ".next"` is correct for the plugin — it reads `.next` and transforms it into Netlify functions and edge functions. No `output: 'export'` in `next.config.mjs`, which is correct.

---

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| next | 14.2.35 | App Router framework | Already installed |
| @netlify/plugin-nextjs | 5.15.9 (latest) | Netlify deployment adapter | Referenced in netlify.toml only; Netlify auto-installs |

### Supporting (no new installs needed)
No additional packages required for this phase. All metadata APIs, robots, and sitemap are built into Next.js 14 App Router. Lighthouse runs via the already-installed `npx lighthouse` (v13.1.0 confirmed available).

### Alternatives Considered
| Instead of | Could Use | Why We Don't |
|------------|-----------|--------------|
| Built-in `sitemap.ts` | `next-sitemap` npm package | next-sitemap is redundant — App Router has native support; adds a dependency and post-build script |
| `npx lighthouse` | Playwright accessibility audit | Lighthouse gives the single score number the requirement demands; Playwright is good for specific checks but not the same metric |

---

## Architecture Patterns

### Pattern 1: metadataBase + title.template in layout.tsx

Add to the root layout metadata export. This affects all child pages.

```typescript
// src/app/layout.tsx
// Source: nextjs.org/docs/app/api-reference/functions/generate-metadata [CITED]
export const metadata: Metadata = {
  metadataBase: new URL('https://verdant.bbc-agency.com'),
  title: {
    default: 'Verdant Landscape Design',
    template: '%s | Verdant Landscape Design',
  },
  description: 'We build outdoor worlds. Premium landscape architecture for discerning homeowners in the Capital Region and beyond.',
  openGraph: {
    siteName: 'Verdant Landscape Design',
    locale: 'en_US',
    type: 'website',
  },
}
```

**How title.template works:** When a child page exports `title: 'Portfolio'`, the rendered `<title>` tag becomes `Portfolio | Verdant Landscape Design`. The `default` fires only when a child exports no title at all.

**Important caveat:** [CITED: github.com/vercel/next.js/issues/47540] Nested openGraph fields are **overwritten, not merged** when a child page defines its own openGraph. The root openGraph defaults only apply to pages that export no openGraph at all. This means each slug page's `generateMetadata` return value is already standalone — no change needed there.

### Pattern 2: robots.ts

Place at `src/app/robots.ts`. Generates `/robots.txt` at build time.

```typescript
// src/app/robots.ts
// Source: nextjs.org/docs/app/api-reference/file-conventions/metadata/robots [CITED]
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://verdant.bbc-agency.com/sitemap.xml',
  }
}
```

No disallow rules needed — this is a public portfolio site with no admin or private routes.

### Pattern 3: sitemap.ts

Place at `src/app/sitemap.ts`. Generates `/sitemap.xml` at build time. For this static site, dynamic data comes from the local data files (no async fetch needed).

```typescript
// src/app/sitemap.ts
// Source: pattern from dev.to/arfatapp (verified against MetadataRoute.Sitemap type) [CITED]
import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { services } from '@/data/services'

const BASE_URL = 'https://verdant.bbc-agency.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL,                      priority: 1.0,  changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/portfolio`,       priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/services`,        priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/about`,           priority: 0.7,  changeFrequency: 'yearly'  as const },
    { url: `${BASE_URL}/process`,         priority: 0.7,  changeFrequency: 'yearly'  as const },
    { url: `${BASE_URL}/contact`,         priority: 0.8,  changeFrequency: 'yearly'  as const },
  ]

  const projectPages = projects.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    priority: 0.8,
    changeFrequency: 'yearly' as const,
    lastModified: new Date(),
  }))

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'yearly' as const,
    lastModified: new Date(),
  }))

  return [...staticPages, ...projectPages, ...servicePages]
}
```

This produces 16 entries: 6 static + 5 portfolio slugs + 5 service slugs.

**Note on `changeFrequency: 'yearly' as const`:** TypeScript requires the `as const` assertion on string literal union members when assigned inside `.map()` — otherwise TypeScript widens the type to `string` and the return type fails to match `MetadataRoute.Sitemap`.

### Pattern 4: Footer service link fix

```typescript
// src/components/layout/Footer.tsx — CURRENT (broken)
href={`/services#${service.toLowerCase().replace(/\s+/g, '-')}`}

// CORRECTED — use actual slug pages
// Map display names to slugs from the services data
```

The simplest fix: import the `services` array from `@/data/services` and map over it using `s.slug` directly, replacing the hardcoded `serviceLinks` string array.

```typescript
// Corrected Footer services column
import { services } from '@/data/services'

// In JSX:
{services.map((service) => (
  <li key={service.slug}>
    <Link href={`/services/${service.slug}`} ...>
      {service.name}
    </Link>
  </li>
))}
```

### Pattern 5: Netlify deployment flow

1. Push branch to GitHub (or deploy manually via Netlify CLI)
2. In Netlify dashboard: New site → Import from Git → select `verdant` repo → branch: `feature/social-features` or `master`
3. Build settings auto-detected from `netlify.toml` (command: `npm run build`, publish: `.next`)
4. After first deploy: Site settings → Domain management → Add custom domain: `verdant.bbc-agency.com`
5. At DNS provider (wherever `bbc-agency.com` is managed): Add CNAME record `verdant` → `[generated-site-name].netlify.app`
6. Netlify auto-provisions SSL via Let's Encrypt once DNS propagates (15 min to 24 hr)

### Pattern 6: Lighthouse verification

Run against the live Netlify URL (not localhost — Lighthouse scores differ significantly in production due to CDN, compression, and real network conditions):

```bash
# Run after deploy
npx lighthouse https://verdant.bbc-agency.com --output html --output-path lighthouse-report.html --view

# Threshold check (fails if any category < 95)
npx lighthouse https://verdant.bbc-agency.com \
  --only-categories=performance,accessibility,best-practices,seo \
  --budget-path=lighthouse-budget.json
```

Alternatively, use Chrome DevTools → Lighthouse tab in an incognito window (most reliable for avoiding extension interference).

### Anti-Patterns to Avoid

- **Static `output: 'export'` in next.config.mjs** — Do NOT add this. The `@netlify/plugin-nextjs` adapter handles the output transform. Adding static export disables the adapter and breaks image optimization and route handlers.
- **Hardcoding the production URL as a string without `metadataBase`** — OG image paths must be absolute. Without `metadataBase`, Next.js cannot resolve relative image paths in metadata.
- **Running Lighthouse on localhost** — Scores will be artificially different (no CDN, no compression headers, different TTFB). Always run on the deployed URL.
- **Skipping `as const` on changeFrequency** — TypeScript compile error. Always use `'yearly' as const` inside map callbacks.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap XML | Custom API route returning XML | `src/app/sitemap.ts` with MetadataRoute.Sitemap | Next.js handles XML serialization, gzip, and cache headers automatically |
| robots.txt | Static file in `public/` | `src/app/robots.ts` | Static file in public works but can't be dynamic; TypeScript version is consistent with the metadata system |
| Lighthouse CI | Custom performance script | `npx lighthouse` | Built-in auditor with the exact scoring rubric the requirement references |
| Title suffix | Manual string concat in each page | `title.template` in layout.tsx | Template applies to all child pages automatically; prevents copy-paste drift |

---

## Common Pitfalls

### Pitfall 1: metadataBase missing — OG images broken on social share
**What goes wrong:** OpenGraph image URLs resolve as relative paths (`/og-image.jpg`) instead of absolute URLs (`https://verdant.bbc-agency.com/og-image.jpg`). Social platforms reject relative URLs and show no preview image.
**Why it happens:** `metadataBase` is not set by default. Next.js only generates absolute URLs when it has a base to resolve against.
**How to avoid:** Set `metadataBase: new URL('https://verdant.bbc-agency.com')` in `layout.tsx` metadata export.
**Warning signs:** OG debugger tools (Facebook, Twitter) show "image could not be fetched" — but title/description still render.

### Pitfall 2: Footer service hash links produce 404-equivalent UX
**What goes wrong:** Clicking "Hardscape" in the footer scrolls to a non-existent anchor on `/services` (the page has no `id="hardscape"` element). The page loads but no scroll happens — or a 404 if the browser is strict about hashes.
**Why it happens:** Footer was written with display names and hash fragments. Actual service pages live at `/services/hardscape`, not `/services#hardscape`.
**How to avoid:** Replace the hardcoded `serviceLinks` string array with the `services` data array and use `s.slug` in the href.
**Warning signs:** Clicking a service footer link lands on `/services` at the top of the page with no scroll.

### Pitfall 3: Lighthouse score drops below 95 for avoidable reasons
**Common culprits on this stack:**
- **Missing `lang` attribute** — `layout.tsx` already has `lang="en"` — already fixed.
- **Image `alt` text** — All Next.js `<Image>` components need non-empty `alt`. Check Unsplash images used in case studies.
- **Color contrast** — `text-white/60`, `text-white/40` in footer may fail WCAG AA contrast ratio at small font sizes. Lighthouse flags this.
- **Touch target size** — WCAG 2.5.5 minimum is 44x44px. Footer nav links at `text-sm` with no padding may be undersized.
- **Render-blocking fonts** — Google Fonts loaded via `next/font/google` with `display: 'swap'` is already correct. No action needed.
- **Missing meta viewport** — Next.js App Router injects this automatically. No action needed.
**How to avoid:** Run Lighthouse immediately after first successful deploy. Address any flagged items before claiming DEPLOY-05 complete.

### Pitfall 4: `@netlify/plugin-nextjs` not installed locally — build passes but deploy fails
**What goes wrong:** The plugin is listed in `netlify.toml` but not in `package.json`. This is correct — Netlify installs it during CI. But if someone tries to replicate the exact Netlify build locally with `netlify build`, the plugin must be installed locally too.
**Why it happens:** The plugin is Netlify-managed, not project-managed.
**How to avoid:** Don't add it to `package.json` devDependencies. The current setup (toml-only) is the documented pattern.
**Warning signs:** `Error: Cannot find module '@netlify/plugin-nextjs'` in local `netlify build` runs.

### Pitfall 5: sitemap.ts TypeScript compile error with changeFrequency
**What goes wrong:** `Type 'string' is not assignable to type 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'`
**Why it happens:** Inside `.map()` callbacks, TypeScript widens string literals to `string`. The MetadataRoute.Sitemap type requires a specific union member.
**How to avoid:** Always write `'yearly' as const` (not just `'yearly'`) when the value is inside a map callback.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js / npm | Build | Yes | (confirmed, project builds) | — |
| npx lighthouse | DEPLOY-05 Lighthouse audit | Yes | 13.1.0 | Chrome DevTools Lighthouse tab |
| Playwright | Nav link verification | Yes (installed) | ^1.59.1 | Manual browser check |
| Netlify account | DEPLOY-04 | Assumed — no fallback | — | — |
| DNS access to bbc-agency.com | DEPLOY-04 domain | Assumed — Jorge manages domain | — | — |
| Git remote (GitHub) | Netlify CI trigger | Yes (confirmed git repo) | — | Netlify CLI drag-and-drop |

**Missing dependencies with no fallback:**
- Netlify account credentials and DNS access — these require Jorge's human action; cannot be automated by code tasks.

**Missing dependencies with fallback:**
- Lighthouse CLI: Chrome DevTools Lighthouse is an acceptable manual fallback if `npx lighthouse` has issues.

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `next-sitemap` npm package (Pages Router era) | Built-in `sitemap.ts` file convention (App Router) | No extra dependency; TypeScript-native; no post-build script needed |
| `public/robots.txt` static file | `app/robots.ts` typed function | Consistent with metadata system; can be dynamic if needed |
| `next export` + static publish dir | `@netlify/plugin-nextjs` with `.next` publish | SSG pages still fully static, but image optimization and route handlers work; no manual configuration |
| Manual `<title>` tags in each page | `metadata` export + `title.template` in layout | Zero-drift; all pages get consistent branding suffix automatically |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `verdant.bbc-agency.com` DNS is controlled by Jorge and can have a CNAME record added | Environment Availability | If bbc-agency.com uses Netlify DNS already, the flow differs (add subdomain in Netlify UI directly) |
| A2 | The Netlify site for Verdant does not yet exist (no prior deploys) | Architecture Patterns - Deploy flow | If a site already exists, step 2 becomes "configure existing site" not "create new" |
| A3 | No OG image file exists in `/public` — site currently has no social share image | Pitfall 1 | If an og-image.jpg was added, the `metadataBase` is even more critical |

---

## Open Questions

1. **Instagram link in `InstagramPlaceholder.tsx`**
   - What we know: The component has `href="#"` — a dead link
   - What's unclear: Should this link to a real Instagram URL, or should the link be removed entirely and the button disabled/hidden?
   - Recommendation: Remove the `<a>` wrapper and render the button as non-interactive (or remove the CTA entirely) since the client has no Instagram account confirmed. A dead `href="#"` fails the "no 404s" spirit of DEPLOY-01 and will also draw a Lighthouse accessibility flag.

2. **Branch to deploy (`feature/social-features` vs `master`)**
   - What we know: Current branch is `feature/social-features`; main branch is `master`
   - What's unclear: Should Phase 06 work happen on this branch and then merge, or deploy directly from current branch?
   - Recommendation: Merge to `master` before configuring Netlify to deploy from `master`. This is the standard production pattern.

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs — metadata file conventions (sitemap, robots): `nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap` and `/robots` [CITED]
- Next.js official docs — generateMetadata API: `nextjs.org/docs/app/api-reference/functions/generate-metadata` [CITED]
- Netlify official docs — Next.js deployment: `docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/` [CITED]
- Codebase grep — all metadata exports, all nav hrefs, netlify.toml, next.config.mjs [VERIFIED]
- npm registry — `@netlify/plugin-nextjs` version 5.15.9, lighthouse 13.1.0 [VERIFIED: npm view]

### Secondary (MEDIUM confidence)
- dev.to/arfatapp — Complete robots.ts + sitemap.ts TypeScript examples with MetadataRoute types [CITED]
- github.com/vercel/next.js/issues/47540 — openGraph nested fields overwrite (not merge) behavior [CITED]
- WebSearch — Lighthouse 95+ common issues on Next.js static sites [MEDIUM — multiple sources agree]

### Tertiary (LOW confidence)
- WebSearch — Netlify CNAME subdomain setup steps — general flow is consistent across sources but specific DNS provider steps vary

---

## Metadata

**Confidence breakdown:**
- Nav audit findings: HIGH — direct codebase verification, no inference
- Metadata API patterns: HIGH — verified against official docs + existing codebase exports
- robots.ts / sitemap.ts patterns: HIGH — well-documented App Router file convention
- Netlify deployment: HIGH — official Netlify docs + existing correct netlify.toml
- Lighthouse 95+ strategy: MEDIUM — common patterns, specific score will depend on actual render

**Research date:** 2026-04-12
**Valid until:** 2026-07-12 (Next.js 14 stable; patterns stable for 90 days)

# Deployment Guide

All BBC sites deploy to either Netlify or Cloudflare Pages. This guide covers both.

---

## Pre-Deploy Checklist

Before triggering any deployment:

- [ ] All pages build without errors (`npm run build` passes)
- [ ] No console errors on any page
- [ ] Forms tested end-to-end (submission, confirmation, email delivery)
- [ ] Contact email receives test submission
- [ ] All images optimized and loading correctly
- [ ] Mobile layout tested on at least 2 breakpoints
- [ ] 404 page exists and is styled
- [ ] Meta titles, descriptions, and OG tags on all pages
- [ ] Analytics tag present (GA4 or equivalent)
- [ ] sitemap.xml generated
- [ ] robots.txt present
- [ ] No hardcoded localhost URLs or dev environment variables

---

## Netlify Deployment

### First Deploy (new site)

```bash
# Connect repo to Netlify
# 1. Go to netlify.com → Add new site → Import from Git
# 2. Select GitHub repo
# 3. Set build settings:

Build command:   npm run build
Publish directory: dist   (Astro) or out   (Next.js static) or .next (Next.js SSR)
Node version:    18 (set in Environment Variables: NODE_VERSION=18)

# 4. Deploy site
# 5. Note the generated URL (e.g., random-name-123.netlify.app)
```

### Custom Domain on Netlify

```
1. Netlify dashboard → Site settings → Domain management → Add domain
2. Enter client's domain (e.g., krismidcity.com)
3. Netlify provides nameservers OR CNAME record:
   - If using Netlify DNS: update nameservers at registrar
   - If keeping registrar DNS: add CNAME record → [site-id].netlify.app
4. SSL provisions automatically (Let's Encrypt) — wait 10-15 minutes
5. Verify HTTPS is working
```

### Environment Variables on Netlify

```
Site settings → Environment variables → Add variable

Common variables:
- PUBLIC_FORM_ENDPOINT (form service endpoint)
- PUBLIC_GOOGLE_ANALYTICS_ID
- SANITY_PROJECT_ID (if using Sanity CMS)
- SANITY_DATASET
```

### Netlify Form Setup

For sites using Netlify Forms (simple contact forms):

```html
<!-- Add netlify attribute to form tag -->
<form netlify name="contact" method="POST">
  <input type="hidden" name="form-name" value="contact" />
  <!-- form fields -->
</form>
```

Configure notifications: Site settings → Forms → Form notifications → Add email.

---

## Cloudflare Pages Deployment

### First Deploy (new site)

```bash
# 1. Go to Cloudflare dashboard → Workers & Pages → Create application → Pages
# 2. Connect GitHub repo
# 3. Set build settings:

Build command:   npm run build
Build output directory: dist   (Astro) or out   (Next.js static)
Root directory:  / (unless monorepo)

# 4. Add Environment variables (NODE_VERSION=18)
# 5. Save and Deploy
```

### Custom Domain on Cloudflare Pages

```
1. Pages project → Custom domains → Set up a custom domain
2. Enter client domain
3. If domain is already on Cloudflare: DNS record adds automatically
4. If domain is elsewhere: add CNAME record pointing to [project].pages.dev
5. SSL automatic via Cloudflare
```

### Cloudflare vs Netlify — When to Use Which

| Situation | Use |
|-----------|-----|
| Client already has Cloudflare account | Cloudflare Pages |
| Need Netlify Forms (no backend) | Netlify |
| Need edge functions / middleware | Cloudflare Workers |
| Simplest possible setup | Netlify |
| Client domain is on Cloudflare DNS | Cloudflare Pages |

---

## Post-Deploy Verification

After domain is live:

- [ ] Site loads at https://[domain]
- [ ] www redirect works (www → non-www or vice versa, consistent)
- [ ] SSL certificate shows valid (no browser warnings)
- [ ] All internal links work (no broken routes)
- [ ] Contact form submits and email is received
- [ ] Analytics is recording visits
- [ ] Google Search Console: submit sitemap
- [ ] Run Lighthouse (aim for 90+ Performance, Accessibility, Best Practices, SEO)

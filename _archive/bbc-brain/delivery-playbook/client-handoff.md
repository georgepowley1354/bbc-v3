# Client Handoff

The handoff is the last impression. Do it well.

---

## Post-Launch Checklist

Complete before the handoff call:

- [ ] Site is live at client's domain
- [ ] SSL verified
- [ ] All forms tested and confirmed receiving emails
- [ ] Analytics tracking confirmed active
- [ ] sitemap submitted to Google Search Console
- [ ] Client has been given ownership/access to Netlify or Cloudflare project
- [ ] CMS credentials created and tested (if applicable)
- [ ] Domain registrar access confirmed (client controls their own domain)
- [ ] Hosting login credentials documented in handoff doc
- [ ] All project files in a clean state in the repo

---

## Handoff Call Agenda (30 minutes)

1. **Quick tour** (10 min) — Walk client through the live site. Let them click around.
2. **CMS walkthrough** (10 min, if applicable) — Show how to update content, images, menu items, etc.
3. **What to do if X** (5 min) — Cover the 3 most likely "what if" scenarios for their site
4. **Retainer intro** (5 min, optional) — If appropriate, briefly mention Plan A maintenance retainer

---

## Handoff Document

Send this to the client after the handoff call:

```markdown
# [Client Name] — Site Handoff

**Live URL:** https://[domain]
**Launch date:** [date]

---

## Your Logins

| Service | Login | Notes |
|---------|-------|-------|
| Netlify / Cloudflare | [email] | Hosting dashboard |
| CMS (if applicable) | [email] | Content management |
| Google Analytics | [email] | Site traffic |
| Google Search Console | [email] | SEO monitoring |
| Domain registrar | [their account] | They should already have this |

---

## How to Update Your Site

[If CMS:] Log into [CMS URL] with your credentials above.
- To update [content type]: go to [section] → click [element]
- To add a new [item]: click [button]

[If no CMS:] For content updates, email [jorge@bbc.com] with the change and page.

---

## Common Situations

**If the site goes down:**
First check [status page URL]. If it's a hosting issue, log into Netlify/Cloudflare and check the deployment status. If you can't resolve it, contact me directly.

**If your contact form stops working:**
Check your spam folder first. If that's not it, email me — form delivery is usually a DNS issue I can fix in minutes.

**If you need to add a new page or major change:**
That's outside standard maintenance. Email me for a quick quote — most small additions are $150-$300.

---

## What's Included Going Forward

Your site is yours. No monthly fees unless you've signed up for a retainer.

If you'd like ongoing support (updates, SEO, priority fixes), ask about the Maintenance Plan — starts at $500/month.

---

## Contact

Jorge / BBC
[email]
[phone]
```

---

## Offboarding (If Client Leaves)

If a client moves to another agency:
1. Ensure they have full access to: Netlify/Cloudflare, repo, CMS, domain
2. Export any data they need (form submissions, analytics reports)
3. Transfer repo ownership if requested
4. Confirm in writing that handoff is complete
5. Update project-bank.md to status = 'closed'

Don't make it hard for clients to leave. Referrals come from clients who respected the exit process.

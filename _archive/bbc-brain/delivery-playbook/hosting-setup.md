# Hosting Setup

Reference for DNS configuration, domain setup, and email forwarding.

---

## DNS Setup

### If client domain is at Namecheap (common)

```
1. Log into Namecheap account
2. Dashboard → Manage (next to the domain)
3. Advanced DNS tab

To point to Netlify:
  Add CNAME record:
  Host: www | Value: [site-id].netlify.app | TTL: Auto
  Add A record:
  Host: @ | Value: 75.2.60.5 | TTL: Auto

To point to Cloudflare Pages:
  Add CNAME record:
  Host: www | Value: [project].pages.dev | TTL: Auto
  Add CNAME record:
  Host: @ | Value: [project].pages.dev | TTL: Auto
```

### If client domain is at GoDaddy

```
1. Log into GoDaddy → My Products → Domains → Manage
2. DNS tab → Add record

Same record types as above, same values.
GoDaddy note: @ CNAME records aren't supported — use their "Forwarding" option or 
switch to Cloudflare DNS for the zone.
```

### If moving domain to Cloudflare DNS (recommended for Cloudflare Pages)

```
1. Add site to Cloudflare dashboard (free plan is fine)
2. Cloudflare provides new nameservers (2 addresses)
3. Log into client's registrar → Change nameservers to Cloudflare's
4. DNS propagates in 24-48 hours
5. Once on Cloudflare DNS, all records managed in Cloudflare dashboard
```

### DNS Propagation

- Changes typically propagate in 30 minutes to 2 hours
- Full global propagation can take up to 48 hours
- Test with: `dig [domain] A +short` or use dnschecker.org

---

## SSL Setup

Both Netlify and Cloudflare Pages provision SSL automatically via Let's Encrypt.

**Netlify SSL:**
- Provisions after domain is added to the site
- Takes 5-15 minutes
- Force HTTPS: Site settings → Domain management → HTTPS → Force HTTPS

**Cloudflare SSL:**
- Automatic when domain is on Cloudflare DNS
- SSL/TLS → Full (strict) recommended
- Always Use HTTPS: SSL/TLS → Edge Certificates → Always Use HTTPS → On

---

## Email Forwarding

Most small business clients don't need a full email server — just forwarding from their domain to a Gmail/Outlook.

### Via Cloudflare Email Routing (free)

```
1. Cloudflare dashboard → [domain] → Email → Email Routing
2. Enable Email Routing
3. Add route: [info@domain.com] → [client's personal email]
4. Cloudflare adds the required MX and TXT records automatically
```

### Via Namecheap Email Forwarding (free with domain)

```
1. Namecheap → Manage domain → Advanced DNS
2. Add MX records (Namecheap docs provide exact values)
3. Set up forwarding at namecheap.com/hosting/email
```

### Via Google Workspace (paid — $6/mo per user)

Use this when the client needs full Gmail with their domain (not just forwarding).

```
1. Workspace.google.com → Start free trial
2. Follow setup wizard → verify domain ownership via TXT record
3. Add MX records for Google (provided during setup)
4. Client gets full Gmail at [name@domain.com]
```

---

## Common Issues

**Site not loading after DNS update**
- Check propagation: `dig [domain] A` — should return Netlify/Cloudflare IP
- If still pointing to old host: check that ALL nameservers were updated, not just one

**SSL certificate error**
- Usually means DNS hasn't fully propagated yet
- Wait 30 min and try again
- Check that the domain in Netlify/Cloudflare matches exactly (www vs. non-www matters)

**Form emails going to spam**
- Add SPF record: `v=spf1 include:netlify.com ~all` (Netlify Forms)
- Or set up a transactional email service (Resend, Postmark) and configure DKIM

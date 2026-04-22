# Stage 04 — Live

## What This Stage Is

Post-launch record. Once a site goes live, a record is created here capturing the live URL, deploy details, and any post-launch notes.

---

## What to Load

- `delivery-playbook/deployment-guide.md` → full file (for the deploy)
- `delivery-playbook/client-handoff.md` → full file (for the handoff)

---

## Live Site Record Format

```markdown
# [Client Name] — Live Site
Project ID: P-[id]
Live URL: https://[domain]
Launch date: [date]
Platform: [Netlify / Cloudflare Pages]
Repo: [github url]

---

## Access

| Service | Login | Owner |
|---------|-------|-------|
| Netlify / Cloudflare | [email] | [BBC / Client] |
| CMS | [url + login] | Client |
| Domain registrar | [registrar] | Client |
| Google Analytics | [email] | Client |

---

## Technical Details

- Framework: [Astro / Next.js]
- Node version: [18]
- CMS: [Sanity / None]
- Form handling: [Netlify Forms / Resend / None]
- Analytics: [GA4 / None]
- Custom integrations: [booking system, maps, etc.]

---

## Post-Launch Notes

- [Anything that happened at launch worth noting]
- [Any DNS issues, delays, or special config]

---

## Retainer Status

- [No retainer / Plan A / Plan B / Plan C]
- Retainer start date: [date or N/A]

---

## Known Issues / Future Work

- [Anything deferred from the original scope with client agreement]
```

---

## Process

1. Complete `delivery-playbook/deployment-guide.md` deploy checklist
2. Domain live, SSL confirmed
3. Create live site record (this format) in `04-live/[client]-live.md`
4. Run handoff call using `delivery-playbook/client-handoff.md` agenda
5. Send handoff document to client
6. Update `project-bank.md` → status = `live`
7. Pitch retainer if appropriate
8. Archive build log: move from `03-builds/active/` to `03-builds/complete/[client].md`

# Delivery Playbook — Workspace Context

## What This Is

The canonical guide for deploying BBC sites and handing off to clients. Every deployment follows these processes.

---

## Files in This Workspace

| File | What It Contains |
|------|----------------|
| `deployment-guide.md` | Step-by-step deploy to Netlify and Cloudflare Pages |
| `client-handoff.md` | Handoff checklist, training guide, and offboarding |
| `hosting-setup.md` | DNS setup, domain configuration, SSL, email forwarding |

---

## What to Load by Task

### Deploying a site
- `deployment-guide.md` → full file + platform section (Netlify or Cloudflare)

### Connecting a client's domain
- `hosting-setup.md` → "DNS Setup" section

### Setting up email forwarding
- `hosting-setup.md` → "Email Forwarding" section

### Running client handoff
- `client-handoff.md` → full file

### Post-launch check
- `client-handoff.md` → "Post-Launch Checklist"

---

## Process: Deployment to Handoff

```
1. Build complete and in client review → build-studio/03-builds/
2. Client approves → trigger deployment
3. Connect domain → hosting-setup.md DNS section
4. Post-launch checklist → client-handoff.md
5. Handoff call with client → walk through CMS, contact form, basic edits
6. Send handoff doc → includes login credentials, support contact, what to do if X
7. Update project-bank.md → status = 'live'
8. (Optional) Pitch retainer → services-and-packages/tier-3-retainer/SERVICES.md
```

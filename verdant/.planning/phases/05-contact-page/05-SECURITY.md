---
phase: 05
slug: contact-page
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-12
---

# Phase 05 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Browser → Netlify Forms endpoint | User-supplied form data sent via fetch POST with `application/x-www-form-urlencoded` encoding | Name, email, phone, project description (PII — low sensitivity; no payment or auth data) |
| Public HTML → Netlify build bot | Static mirror in `public/netlify-form-detect.html` scanned at deploy time | Field names and option values only — no secrets, no PII |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-05-01 | Spoofing | `ContactForm.tsx` fetch POST | mitigate | Netlify `bot-field` honeypot present in both `netlify-form-detect.html` and `ContactForm.tsx`; bots that auto-fill all inputs are rejected by Netlify | closed |
| T-05-02 | Tampering | `ContactForm.tsx` client-side validation | accept | Validation is UX-only. Netlify Forms is the authoritative receiver. No server-side business logic depends on form correctness. Data is inquiry, not transaction. | closed |
| T-05-03 | Information Disclosure | `public/netlify-form-detect.html` | accept | File is intentionally world-readable. Contains only field names and option values — no secrets, no PII, no API keys. Static asset published by design. | closed |
| T-05-04 | Denial of Service | Netlify Forms spam | mitigate | `netlify-honeypot="bot-field"` on the registered form; Netlify's built-in spam filtering applies at the platform level | closed |
| T-05-05 | Elevation of Privilege | `form-name` body field | mitigate | `form-name` hardcoded to `'contact'` in both the hidden input and the fetch body. Netlify matches submissions by this field — cannot target other forms since only one form is registered. | closed |

*Status: open · closed*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-05-01 | T-05-02 | Client-side validation is UX-only. No server-side logic relies on form correctness. Data is inquiry, not transaction or auth — risk of tampered values is negligible. | Jorge | 2026-04-12 |
| AR-05-02 | T-05-03 | `netlify-form-detect.html` is intentionally public. No secrets or PII. Content is field names and option labels only. | Jorge | 2026-04-12 |

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-12 | 5 | 5 | 0 | gsd-secure-phase (automated) |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-12

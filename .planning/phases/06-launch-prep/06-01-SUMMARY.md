---
phase: 06-launch-prep
plan: 01
subsystem: forms, security
tags: [netlify-forms, security-headers, csp, contact-form]
dependency_graph:
  requires: []
  provides: [working-contact-form, netlify-security-headers]
  affects: [bbc-v3/index.html, bbc-v3/script.js, bbc-v3/_headers]
tech_stack:
  added: [Netlify Forms AJAX pattern, Netlify _headers format]
  patterns: [fetch POST with URLSearchParams, honeypot spam protection, CSP headers]
key_files:
  created: [bbc-v3/_headers]
  modified: [bbc-v3/index.html, bbc-v3/script.js]
decisions:
  - CSP retains unsafe-inline because inline GA4 config and theme-color scripts require it; tightening is SEC-V2-01
  - Static asset cache headers omitted from _headers because Netlify CDN handles immutable caching automatically
metrics:
  duration: ~10 minutes
  completed: 2026-04-09
  tasks_completed: 2
  files_modified: 3
---

# Phase 06 Plan 01: Wire Netlify Forms + Security Headers Summary

**One-liner:** Contact form replaced fake setTimeout with real Netlify Forms fetch POST; `_headers` file adds CSP, HSTS, X-Frame-Options, and five other security headers for Netlify production.

## What Was Done

### Task 1: Wire contact form to Netlify Forms (bbc-v3/index.html + bbc-v3/script.js)

The contact form's `<form>` tag was updated with `name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field"`. Two hidden elements were added immediately after the opening tag: a `form-name` hidden input (required for Netlify AJAX submissions) and a visually-hidden honeypot field (`bot-field`) for bot spam filtering.

In `script.js`, the fake `setTimeout` simulation was replaced with a real `fetch('/')` POST using `application/x-www-form-urlencoded` encoding — the standard Netlify Forms AJAX pattern. The handler:
- Disables the submit button and shows "Sending..." while in flight
- On `response.ok`: hides the form and shows the `formSuccess` element with focus
- On failure: re-enables the button and inserts a `.form-submit-error` div with `role="alert"` above the submit button

### Task 2: Create Netlify _headers file (bbc-v3/_headers)

Created `bbc-v3/_headers` with 7 security headers applied to all paths (`/*`) and a no-cache rule for `/sw.js`:

- `Content-Security-Policy` — restricts scripts/styles/fonts/images to known safe origins
- `X-Frame-Options: DENY` — prevents clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

## Files Modified

| File | Change |
|------|--------|
| `bbc-v3/index.html` | Added `data-netlify`, `form-name` hidden input, `bot-field` honeypot to contact form |
| `bbc-v3/script.js` | Replaced `setTimeout` fake with `fetch` POST to Netlify Forms; added error state UI |
| `bbc-v3/_headers` | Created with 7 security headers + sw.js no-cache rule |

## Verification Results

| Check | Expected | Result |
|-------|----------|--------|
| `data-netlify="true"` in index.html | 1 match | 1 |
| `form-name` in index.html | 1 match | 1 |
| `bot-field` in index.html | >= 1 match | 2 |
| `fetch` in script.js | >= 1 match | 1 |
| `setTimeout` in script.js | 2 matches (hero + A2HS only) | 2 |
| `Fake network delay` in script.js | 0 matches | 0 |
| `form-submit-error` in script.js | >= 1 match | 2 |
| `Content-Security-Policy` in _headers | 1 match | 1 |
| `X-Frame-Options` in _headers | 1 match | 1 |
| `Strict-Transport-Security` in _headers | 1 match | 1 |
| `Permissions-Policy` in _headers | 1 match | 1 |
| `sw.js` in _headers | 1 match | 1 |

All checks passed.

## Deviations from Plan

None — plan executed exactly as written.

## Commit

`ecff609` — feat(launch): wire Netlify Forms contact submission and add _headers security

## Status: COMPLETE

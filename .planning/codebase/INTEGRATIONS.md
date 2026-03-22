# Integrations

## Deployment
- **Netlify** — static site hosting, production deployment target

## CDN Dependencies
- **Google Fonts** — typography loaded via CDN at runtime
- **DOMPurify** — XSS sanitization library loaded via CDN

## Databases
- None — static site, no backend or database

## Auth Providers
- None — no authentication

## APIs
- None — no external API calls from application code

## Webhooks
- None

## Notes
- All external dependencies loaded via CDN (no npm build step)
- No server-side integrations
- Netlify handles deployment via static file hosting

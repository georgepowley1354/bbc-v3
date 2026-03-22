# Concerns

## Tech Debt

- **Generic image filenames** — All 129 paintings use `IMG_XXXX` filenames; need real titles
- **Hardcoded gallery count** — `129` is hardcoded in code, won't update dynamically when images are added
- **localStorage quota risk** — Currently ~4MB+ in use against a 5MB hard limit; no overflow handling
- **Uncontrolled image uploads** — No size or format validation on uploads
- **Duplicate code** — Three versions of the same HTML file with diverging logic
- **Monolithic files** — `doberts-canvas-v5.html` is 1,809 lines; single-file architecture limits maintainability
- **Filter button inconsistency** — Filter buttons managed inconsistently (static HTML + dynamic function)

## Security Issues

- **Client-side admin panel in production** — Password-protected but all logic is visible in source
- **Unsalted SHA256 password hashes** — Vulnerable to rainbow table attacks
- **`unsafe-inline` in CSP** — Content Security Policy weakened by inline script allowance

## Performance

- **No image optimization** — Full-resolution images served with no `srcset` or lazy loading
- **Inefficient gallery filtering** — Re-renders entire DOM on filter change
- **No service worker** — No offline support or asset caching

## Fragile Areas

- **No undo/redo in admin** — Changes saved immediately to localStorage with no rollback
- **Single shared admin password** — No per-user access control
- **No data export/backup** — localStorage data can be lost if browser storage is cleared

## Missing Features

- No search functionality
- No email notifications for contact forms
- No server-side processing
- No admin dashboard for image status

## Test Gaps

- Zero automated tests
- No coverage for admin panel, security features, or E2E workflows

## Scaling Limits

- 5MB localStorage hard ceiling
- Static single-page architecture limits future feature expansion

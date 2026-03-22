# Technology Stack

**Analysis Date:** 2026-03-22

## Languages

**Primary:**
- HTML5 - Static markup for all pages
- CSS3 - Styling and responsive design
- JavaScript (Vanilla ES6) - Client-side interactivity and state management

**Secondary:**
- None (pure frontend, no backend runtime)

## Runtime

**Environment:**
- Browser-based (no Node.js or server-side runtime required)
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)

**Package Manager:**
- None (no npm/yarn dependencies)
- No dependency tree - all libraries either CDN-loaded or vanilla

## Frameworks

**Core:**
- None (vanilla JavaScript, no framework)
- Custom module pattern used for organization

**Build/Dev:**
- None (no build step required)
- Static files deployed directly

## Key Dependencies

**Critical (CDN-loaded):**
- Google Fonts (Playfair Display, Inter, Josefin Sans, Cormorant Garamond) - Typography via `https://fonts.googleapis.com/css2`
- DOMPurify 3.0.6 - XSS prevention in `doberts-canvas/index.html` via `https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js`

**Infrastructure:**
- Facebook SDK - Embedded page plugin via `https://www.facebook.com/plugins/page.php`
- Google Fonts API - Web font delivery
- Netlify - Static site hosting (indicated by `.netlify/state.json`)

## Configuration

**Environment:**
- Local development: Open HTML files directly in browser or use simple HTTP server
- No environment variables required for core functionality
- Admin panels protected by hardcoded password validation in JavaScript

**Build:**
- No build configuration files (webpack, vite, rollup, etc.)
- Static HTML/CSS/JS files only
- Special case: `build-kris-admin.js` in kris-mid-city project (Node.js script to generate admin panel)

## Platform Requirements

**Development:**
- Text editor or IDE
- Browser with ES6 support
- Optional: Local HTTP server (e.g., Python SimpleHTTPServer, Live Server)

**Production:**
- Netlify hosting (primary platform)
- Static file web server
- HTTP/HTTPS support
- Minimal resource requirements (static files only)

---

*Stack analysis: 2026-03-22*

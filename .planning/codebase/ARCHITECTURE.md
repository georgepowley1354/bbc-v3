# Architecture

**Analysis Date:** 2026-03-22

## Pattern Overview

**Overall:** Static HTML/CSS/JavaScript Monorepo with Client-Side Admin Panels

**Key Characteristics:**
- Three independent static website projects (Kris' Mid City, What's Shakin' Bacon, Doberts Canvas)
- No backend services or APIs — all state stored in browser localStorage
- Password-protected admin panels embedded in client-side JavaScript
- Modular JavaScript (IIFE pattern for namespace isolation)
- CSS-in-JS for admin overlays, external CSS for site styling

## Layers

**Presentation Layer:**
- Purpose: Render HTML pages and styling for public-facing content
- Location: `krismidcity-*.html`, `whatsshakinbacon/*.html`, `doberts-canvas/index.html`
- Contains: Static HTML pages, semantic markup with sections and containers
- Depends on: CSS stylesheets, JavaScript modules for interactivity
- Used by: End users via browsers

**Styling Layer:**
- Purpose: Design system and responsive layout
- Location: `kris-shared.css`, `whatsshakinbacon/css/styles.css`, `whatsshakinbacon/css/mobile.css`
- Contains: CSS variables (colors, spacing, fonts), utility classes, component styles
- Depends on: Google Fonts CDN, external assets
- Used by: All HTML pages

**State Management Layer:**
- Purpose: Persistent data storage and retrieval
- Location: `kris-data.js`, `whatsshakinbacon/js/storage.js`
- Contains: localStorage wrapper APIs with CRUD operations for business data
- Depends on: Browser localStorage API
- Used by: Admin panel, home page, menu, schedule, and other dynamic content modules

**Admin Layer:**
- Purpose: Password-protected editing interface for site content
- Location: `kris-admin.js`, `whatsshakinbacon/js/admin.js`
- Contains: Admin UI overlay (HTML + CSS-in-JS), form handlers, data persistence logic
- Depends on: Storage layer, page-specific modules
- Used by: Site administrators (password-gated)

**Application Modules:**
- Purpose: Page-specific logic and rendering
- Location: `whatsshakinbacon/js/pages/*.js`, `whatsshakinbacon/js/main.js`, `whatsshakinbacon/js/utils.js`
- Contains: DOM manipulation, event listeners, dynamic content rendering
- Depends on: Storage layer, Utils module
- Used by: Individual HTML pages

## Data Flow

**Admin Create/Update Flow:**

1. User enters password via admin overlay in `kris-admin.js` or `whatsshakinbacon/js/admin.js`
2. Admin panel renders form fields (announcements, hours, events, specials, etc.)
3. User submits form → `handleSubmit()` triggered
4. Data passed to Storage layer (e.g., `Storage.set()`, `Storage.addEvent()`)
5. Storage layer serializes to JSON and saves to localStorage
6. Confirmation shown to user; page reloads to display updated content

**Public View Flow:**

1. HTML page loads (e.g., `krismidcity-index.html`, `whatsshakinbacon/index.html`)
2. Script tags load in order: Storage module → Utils → Page-specific modules → Main init
3. `Storage.init()` checks localStorage; populates with defaults if empty
4. Page modules call `Storage.get()` to retrieve current data
5. Data rendered to DOM via `createElement()` and `appendChild()` or `innerHTML`
6. Styles applied via CSS classes and variables

**State Management:**

- All state lives in browser localStorage (no server)
- Each project has its own storage key: `kmc_*` (Kris), `whatsshakinbacon_data` (What's Shakin')
- Defaults bundled in code; applied only if localStorage is empty
- No conflict resolution or sync across devices/tabs

## Key Abstractions

**Storage Module:**
- Purpose: Centralize localStorage access, provide typed CRUD API
- Examples: `kris-data.js` (IIFE + global window.KMCData), `whatsshakinbacon/js/storage.js` (ES6 IIFE)
- Pattern: Closure-based module exposing public methods, private KEYS and DEFAULTS

**Admin Panel:**
- Purpose: Isolated overlay UI for editing, with password gate
- Examples: `kris-admin.js` (tab-based UI with CSS-in-JS), `whatsshakinbacon/js/admin.js` (form-based)
- Pattern: IIFE with internal state (`_authenticated`, `_activeTab`), event listeners, modal overlay

**Utils Module:**
- Purpose: Shared utilities (formatting, validation, notifications)
- Examples: `whatsshakinbacon/js/utils.js`
- Pattern: Object with static methods (no constructor needed)

**CSS Design System:**
- Purpose: Consistent visual language across pages
- Examples: `kris-shared.css` (premium tavern aesthetic), `whatsshakinbacon/css/styles.css` (food truck casual)
- Pattern: CSS variables for colors, typography, spacing, transitions; utility classes for layout

## Entry Points

**Kris' Mid City Tavern:**
- Location: `kris-mid-city/krismidcity-index.html` (index), `krismidcity-menu.html`, `krismidcity-events.html`, `krismidcity-gallery.html`, `krismidcity-about.html`
- Triggers: User visits site via browser; requests specific page
- Responsibilities: Load shared CSS, initialize data from localStorage, render page-specific content, attach event listeners to admin lock icon

**What's Shakin' Bacon:**
- Location: `whatsshakinbacon/index.html` (homepage entry)
- Triggers: User lands on site; navigates between pages (index, menu, schedule, gallery, about, contact)
- Responsibilities: Initialize main app module (`Main.init()`), load page-specific modules dynamically, set up mobile hamburger menu, render location/schedule/events from storage

**Doberts Canvas:**
- Location: `doberts-canvas/index.html`, `doberts-canvas-v5.html` (alternate version)
- Triggers: User visits site
- Responsibilities: Display painting portfolio (static, no admin functionality currently)

## Error Handling

**Strategy:** Try-catch blocks around storage access; fallback to defaults; console logging + user notifications

**Patterns:**
- `Storage.get()` returns defaults if JSON parse fails or key missing
- Admin panel catches form submission errors, shows user alert + logs to console
- Page modules log warnings if expected DOM elements not found (graceful degradation)
- Utils module includes `sanitize()` for XSS prevention in dynamic content

## Cross-Cutting Concerns

**Logging:**
- All modules use `console.log()` for init/success, `console.error()` for exceptions
- No centralized logger; each module logs independently
- Admin panels use `console.log()` for debugging form submissions

**Validation:**
- Minimal validation in admin forms (basic HTML form validation)
- Storage serialization catches JSON errors automatically
- No client-side schema validation beyond structure

**Authentication:**
- Admin panel gates access with SHA256 password hash in `kris-admin.js` (hashed password variable)
- What's Shakin' Bacon uses plaintext password prompt in `main.js` (less secure pattern)
- No session management; authentication only checked at overlay entry
- No rate limiting or lockout (though Kris' admin has `_failCount` and `_lockUntil` for lockout logic)

**Content Security:**
- CSP header in HTML head (Kris' Mid City): restricts scripts, styles, fonts, images
- `Utils.sanitize()` prevents XSS in dynamic content (What's Shakin')
- No server-side rendering or API; all content from HTML or localStorage

---

*Architecture analysis: 2026-03-22*

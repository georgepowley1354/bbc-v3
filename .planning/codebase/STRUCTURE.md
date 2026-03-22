# Codebase Structure

**Analysis Date:** 2026-03-22

## Directory Layout

```
my-project/
├── kris-mid-city/           # Kris' Mid City Tavern (bar/restaurant site)
│   ├── .netlify/            # Netlify deployment config
│   ├── docs/                # Documentation/notes
│   ├── krismidcity-images/  # Image assets (gallery, decor)
│   ├── kris-shared.css      # Main design system & shared styles
│   ├── kris-data.js         # Storage layer (localStorage wrapper)
│   ├── kris-admin.js        # Password-gated admin panel
│   ├── build-kris-admin.js  # Build/compile script for admin
│   ├── fix-kris-scripts.js  # Utility script for script fixes
│   ├── krismidcity-*.html   # HTML pages (index, menu, events, about, gallery)
│   └── _redirects           # Netlify redirect rules
│
├── whatsshakinbacon/        # What's Shakin' Bacon (food truck site)
│   ├── admin/               # Admin dashboard HTML
│   ├── css/                 # Stylesheets
│   │   ├── styles.css       # Main design system
│   │   └── mobile.css       # Mobile-specific overrides
│   ├── images/              # Image assets
│   ├── js/                  # JavaScript modules
│   │   ├── main.js          # App initialization & setup
│   │   ├── admin.js         # Admin panel logic
│   │   ├── storage.js       # Storage layer (localStorage wrapper)
│   │   ├── utils.js         # Utility functions (formatting, validation, notifications)
│   │   └── pages/           # Page-specific logic
│   │       ├── home.js      # Homepage rendering
│   │       ├── menu.js      # Menu page logic
│   │       ├── schedule.js  # Schedule page logic
│   │       ├── gallery.js   # Gallery page logic
│   │       ├── about.js     # About page logic
│   │       └── contact.js   # Contact page logic
│   ├── .gitignore           # Git ignore rules
│   ├── *.html               # HTML pages (index, menu, schedule, gallery, about, contact)
│   ├── bacon.jpg            # Logo image
│   └── *.md                 # Checkpoint/documentation files
│
├── doberts-canvas/          # Doberts Canvas (painting portfolio)
│   ├── .netlify/            # Netlify deployment config
│   ├── doberts-deploy/      # Build/deploy artifacts
│   ├── doberts-images/      # Painting image assets
│   ├── docs/                # Documentation
│   ├── paintings/           # Painting metadata/data
│   ├── index.html           # Main portfolio page
│   ├── doberts-canvas-v5.html # Alternate version
│   └── _headers             # Netlify header rules
│
├── timothy-dobert-paintings/ # Archive (photos only, no HTML)
│   └── iCloud Photos from Timothy Dobert/
│
├── .planning/               # GSD planning documents
│   └── codebase/           # Architecture & code analysis (STACK.md, ARCHITECTURE.md, etc.)
│
├── .claude/                 # Claude Code configuration
│   ├── commands/            # Custom command definitions
│   ├── docs/                # Reference docs (deployment, design, etc.)
│   ├── skills/              # Custom skills & tools
│   ├── working/             # Active working memory (projects, goals, today)
│   └── *.md                 # Behavior, skill triggers, memory management
│
├── docs/                    # General documentation
├── skills/                  # Shared skills (stop-slop, ui-ux-pro-max)
├── awesome-claude-plugins/  # Claude plugin dev tools
├── claude-plugins-official/ # Official Claude plugins
│
└── Root Documentation Files
    ├── CLAUDE.md            # Claude Code configuration
    ├── COMMANDS.md          # Custom command reference
    ├── FILES.md             # File management & naming conventions
    ├── MEMORY.md            # Memory system structure
    ├── TOOLS.md             # Available tools & MCP servers
    ├── security-*.md        # Security audit reports
    └── *.png                # Screenshots (admin UI, menu pages)
```

## Directory Purposes

**kris-mid-city/**
- Purpose: Kris' Mid City Tavern website (bar & restaurant)
- Contains: HTML pages (5), CSS design system, JavaScript data layer + admin panel, image assets
- Key files: `kris-shared.css` (design), `kris-data.js` (storage), `kris-admin.js` (admin UI)

**whatsshakinbacon/**
- Purpose: What's Shakin' Bacon food truck website
- Contains: 6 HTML pages, modular JS (storage, admin, utils, page-specific), CSS with mobile breakpoints, images
- Key files: `js/storage.js` (data layer), `js/admin.js` (admin panel), `js/pages/` (page logic), `css/styles.css` (design)

**doberts-canvas/**
- Purpose: Doberts Canvas painting portfolio
- Contains: 2 HTML pages (index + v5 alt), images, Netlify config
- Key files: `index.html`, `doberts-canvas-v5.html`

**.planning/codebase/**
- Purpose: GSD (get stuff done) codebase analysis documents
- Contains: STACK.md, ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md
- Note: Written by Claude for task planning & execution

**.claude/**
- Purpose: Claude Code configuration (behavior, skills, memory, commands)
- Contains: Working memory (projects.md, today.md, goals.md), reference docs, custom skills, command definitions
- Note: Project-local Claude configuration; complements global ~/.claude/ config

## Key File Locations

**Entry Points:**
- `kris-mid-city/krismidcity-index.html` — Kris' Mid City homepage (main entry)
- `whatsshakinbacon/index.html` — What's Shakin' Bacon homepage (main entry)
- `doberts-canvas/index.html` — Doberts Canvas portfolio (main entry)

**Configuration:**
- `kris-mid-city/_redirects` — Netlify redirects (Kris' site)
- `doberts-canvas/_headers` — Netlify headers (Doberts site)
- `whatsshakinbacon/.gitignore` — Git ignore rules

**Core Logic:**
- `kris-mid-city/kris-data.js` — Kris' localStorage API + defaults
- `kris-mid-city/kris-admin.js` — Kris' admin panel overlay
- `whatsshakinbacon/js/storage.js` — WSB localStorage API + defaults
- `whatsshakinbacon/js/admin.js` — WSB admin panel UI & forms
- `whatsshakinbacon/js/main.js` — WSB app initialization & setup
- `whatsshakinbacon/js/utils.js` — WSB shared utilities (format, sanitize, notify)

**Styling:**
- `kris-mid-city/kris-shared.css` — Kris' CSS design system (colors, typography, layout)
- `whatsshakinbacon/css/styles.css` — WSB CSS design system
- `whatsshakinbacon/css/mobile.css` — WSB mobile-specific overrides

**Assets:**
- `kris-mid-city/krismidcity-images/` — Kris' gallery & decor images
- `whatsshakinbacon/images/` — WSB menu & location photos
- `doberts-canvas/doberts-images/` — Painting portfolio images

## Naming Conventions

**Files:**
- Project pages: `{projectname}-{pagename}.html` (e.g., `krismidcity-index.html`, `whatsshakinbacon/index.html`)
- Namespaced modules: `{projectname}-{module}.js` (e.g., `kris-data.js`, `kris-admin.js`)
- Modular components: Plain names in subfolders (e.g., `js/storage.js`, `js/admin.js`, `js/pages/home.js`)
- Stylesheets: `{projectname}-{scope}.css` or scoped in `css/` folder (e.g., `kris-shared.css`, `css/styles.css`)
- Build/utility scripts: `{verb}-{target}.js` (e.g., `build-kris-admin.js`, `fix-kris-scripts.js`)

**Directories:**
- Assets: `{projectname}-images/` or `images/` (lowercase, kebab-case)
- JavaScript modules: `js/` (flat or with subfolders for pages)
- Stylesheets: `css/` (grouping related styles)
- Pages logic: `js/pages/{pagename}.js` (one file per page)
- Deployment: `.netlify/`, `{projectname}-deploy/`

**JavaScript Conventions:**
- Global namespaces: Uppercase closure vars (e.g., `window.KMCData`, `const Storage = (() => {})()`)
- Methods: camelCase (e.g., `getSchedule()`, `addEvent()`, `renderLocation()`)
- Private vars: Underscore prefix in closures (e.g., `_authenticated`, `_activeTab`, `_failCount`)
- Constants: Uppercase (e.g., `KEYS`, `DEFAULTS`, `STORAGE_KEY`, `PASSWORD`)

**CSS Conventions:**
- CSS variables: kebab-case with double-dash prefix (e.g., `--primary-blue`, `--spacing-md`, `--font-serif`)
- Classes: kebab-case (e.g., `.btn-primary`, `.hero-split`, `.mobile-nav`)
- BEM pattern used in some places (e.g., `#kmc-admin-overlay`, `.kmc-tab-btn`)
- Comments: Section dividers with === (e.g., `/* === HERO === */`)

## Where to Add New Code

**New Feature (e.g., new admin tab, new content type):**
- Primary code: Add form HTML to `admin.html` (WSB) or extend admin.js overlay (Kris)
- Data defaults: Add entry to `DEFAULTS` object in `storage.js` (WSB) or `kris-data.js`
- Data API: Add getter/setter method to Storage module (e.g., `getFeature()`, `addFeature()`)
- Page rendering: Add new page-specific `.js` file in `js/pages/` (WSB) or extend in-page logic
- Styling: Add classes to `styles.css` or `kris-shared.css` following existing variable & utility pattern

**New Page:**
- HTML file: Create `{projectname}-{pagename}.html` (Kris) or `{pagename}.html` in root (WSB)
- JavaScript logic: Create `js/pages/{pagename}.js` (WSB only; Kris uses inline scripts)
- CSS: Extend `css/styles.css` or `kris-shared.css` with page-specific styles
- Navigation: Add link to header nav in HTML

**New Component/Module:**
- Implementation: Create file in appropriate layer (e.g., `js/components/{name}.js`)
- Export: Use IIFE + `window.{ModuleName}` (Kris) or IIFE + export (WSB)
- Dependencies: List required modules in JSDoc comments at top
- Usage: Require in caller module; call methods from returned API object

**Utilities:**
- Shared helpers (Kris): Add methods to `kris-shared.js` if needed; currently inline in modules
- Shared helpers (WSB): Add to `js/utils.js` following existing pattern (static methods in closure)
- Domain-specific helpers: Keep in same file as caller if used only there; move to utils if reused

## Special Directories

**node_modules/:**
- Purpose: Not used — no build tools, no npm dependencies
- Generated: N/A
- Committed: No .gitignore exists in most projects

**dist/ / build/:**
- Purpose: Not used — no build step, no minification
- Generated: N/A
- Committed: No

**.netlify/:**
- Purpose: Netlify deployment settings
- Generated: Yes (by Netlify CI/CD)
- Committed: Yes (included in repo)

**doberts-deploy/:**
- Purpose: Deployment artifacts for Doberts Canvas
- Generated: Likely yes (build artifacts)
- Committed: Yes

**paintings/ (doberts-canvas):**
- Purpose: Painting metadata, possibly JSON data files
- Generated: No (manually managed)
- Committed: Yes

---

*Structure analysis: 2026-03-22*

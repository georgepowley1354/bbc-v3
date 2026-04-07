# Kris Mid City — Supabase CMS Design Spec
**Date:** 2026-04-07  
**Status:** Approved

---

## Problem

Multiple people manage Kris's site content. The current data layer uses `localStorage`, which is per-browser and per-device. Two editors working simultaneously have completely separate copies of the data and will silently overwrite each other. Data is also lost if someone clears their browser.

---

## Goal

Replace the `localStorage` data layer with Supabase (Postgres) so all editors share a single source of truth, accessible from any device and browser.

---

## Architecture

```
┌─────────────────────────────────┐
│         Kris's Site             │
│  (HTML pages on Netlify)        │
│                                 │
│  kris-data.js  ──────────────── │──► Supabase (Postgres)
│  (fetch instead of localStorage)│     - announcements table
│                                 │     - events table
│  kris-admin.js (unchanged UI)   │     - weekly_specials table
│                                 │     - happy_hour table
└─────────────────────────────────┘     - drinks table
                                        - menu_items table
                                        - gallery table
                                        - team table
```

- `kris-data.js` is the only file that changes significantly — reads/writes go to Supabase instead of localStorage
- `kris-admin.js` is unchanged — it calls the same `KrisData` API
- All HTML pages are unchanged — they already depend on `kris-data.js`
- No server required — Supabase is the backend, Netlify remains the host

---

## Backend

**Supabase** (managed Postgres)
- One Supabase project per client — clean isolation, no data mixing between clients
- Start on free tier for development; upgrade to Pro ($25/mo) before going live to avoid database pausing
- Reusable pattern for all future client sites

---

## Database Schema

All tables follow a consistent pattern: `id` (uuid, auto-generated) + content fields + `active` boolean for show/hide.

### announcements
| column | type | notes |
|--------|------|-------|
| id | uuid | auto-generated |
| text | text | announcement copy |
| active | boolean | show/hide toggle |

### events
| column | type | notes |
|--------|------|-------|
| id | uuid | auto-generated |
| title | text | event name |
| date | date | event date |
| time | text | e.g. "8pm – 11pm" |
| description | text | optional details |
| active | boolean | show/hide toggle |

### weekly_specials
| column | type | notes |
|--------|------|-------|
| id | uuid | auto-generated |
| day | text | Monday–Sunday |
| deal | text | e.g. "$.50 Jumbo Wings" |
| note | text | fine print |
| time | text | e.g. "4–10pm" |

### happy_hour
| column | type | notes |
|--------|------|-------|
| id | uuid | auto-generated |
| days | text | e.g. "Sunday–Thursday" |
| time | text | e.g. "4–7pm" |
| deals | jsonb | array of {label, price} objects |

### drinks
| column | type | notes |
|--------|------|-------|
| id | uuid | auto-generated |
| name | text | drink name |
| price | numeric | in dollars |
| category | text | e.g. "Cocktails", "Drafts" |
| featured | boolean | show in featured section |
| available | boolean | false = 86'd |

### menu_items
| column | type | notes |
|--------|------|-------|
| id | uuid | auto-generated |
| name | text | item name |
| price | numeric | in dollars |
| category | text | e.g. "Appetizers", "Entrees" |
| featured | boolean | show in featured section |
| available | boolean | false = 86'd |

### gallery
| column | type | notes |
|--------|------|-------|
| id | uuid | auto-generated |
| url | text | image URL |
| caption | text | optional |
| active | boolean | show/hide toggle |

### team
| column | type | notes |
|--------|------|-------|
| id | uuid | auto-generated |
| name | text | staff name |
| role | text | job title |
| bio | text | optional |
| photo_url | text | optional |
| active | boolean | show/hide toggle |

**Not migrated:** Hours — stay hardcoded in HTML (static, never changes).

---

## Auth & Security

- **Public pages** use Supabase's **anon key** — read-only. Row Level Security (RLS) enforced at the database level so the anon key cannot write anything.
- **Admin panel** requires login via **Supabase Auth** (email + password). Each editor gets their own account — no shared passwords.
- The admin panel shows a login screen before the dashboard loads. Unauthenticated users see nothing.
- API keys stored in `kris-config.js`: anon key is safe to expose; write access is gated behind authentication.

---

## Migration

- A one-time migration script reads current `localStorage` data and inserts it into Supabase
- After migration, `localStorage` is ignored entirely
- Zero data loss — all existing content (drinks, events, specials, etc.) transfers to Supabase

---

## Out of Scope

- Booking/appointment system (separate project, separate spec)
- Image uploads (gallery URLs remain external links for now)
- Real-time collaborative editing indicators
- Role-based permissions (all editors have full access)

# Kris Mid City — Supabase CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the localStorage data layer in Kris's site with Supabase Postgres so multiple editors share a single source of truth across devices.

**Architecture:** `kris-data.js` is rewritten to fetch all data from Supabase on page load into an in-memory cache. Public `get()` calls read from cache (synchronous — `kris-admin.js` API stays the same). Write calls (`set`, `addItem`, `updateItem`, `removeItem`) update cache instantly and fire async Supabase operations in the background. The admin password gate is replaced with Supabase Auth email/password login.

**Tech Stack:** Supabase JS v2 (CDN), Supabase Auth, Postgres with Row Level Security, Netlify (static host, no changes needed)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `kris-config.js` | **CREATE** | Supabase project URL + anon key |
| `kris-data.js` | **REWRITE** | Supabase data layer with in-memory cache, same public API |
| `kris-admin.js` | **MODIFY** | Replace SHA-256 password gate with Supabase Auth login |
| `krismidcity-index.html` | **MODIFY** | Add Supabase CDN + kris-config.js scripts, update CSP |
| `krismidcity-menu.html` | **MODIFY** | Same as index |
| `krismidcity-events.html` | **MODIFY** | Same as index |
| `krismidcity-gallery.html` | **MODIFY** | Same as index |
| `krismidcity-about.html` | **MODIFY** | Same as index |
| `kris-migrate.html` | **CREATE** | One-time tool: reads localStorage, pushes to Supabase |

---

## Task 1: Set Up Supabase Project and Schema

**Files:** None (manual steps in Supabase dashboard)

- [ ] **Step 1: Create Supabase project**

  Go to https://supabase.com → New Project → name it `kris-mid-city` → choose a strong database password → select US East region → Create.

  Wait for it to provision (~2 minutes).

- [ ] **Step 2: Save your credentials**

  In the Supabase dashboard → Settings → API:
  - Copy **Project URL** (looks like `https://abcdefgh.supabase.co`)
  - Copy **anon public** key (long JWT string)

  Keep these handy for Task 2.

- [ ] **Step 3: Create tables via SQL Editor**

  In Supabase dashboard → SQL Editor → New query. Run this entire block:

  ```sql
  -- announcements
  create table announcements (
    id uuid primary key default gen_random_uuid(),
    text text not null,
    active boolean not null default true
  );

  -- events
  create table events (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    date text not null default '',
    time text not null default '',
    description text not null default '',
    free boolean not null default true,
    featured boolean not null default false,
    photo text not null default '',
    active boolean not null default true
  );

  -- weekly_specials
  create table weekly_specials (
    id uuid primary key default gen_random_uuid(),
    day text not null,
    deal text not null,
    note text not null default '',
    time text not null default ''
  );

  -- happy_hour (single-row table)
  create table happy_hour (
    id uuid primary key default gen_random_uuid(),
    days text not null,
    time text not null,
    deals jsonb not null default '[]'
  );

  -- drinks
  create table drinks (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    price numeric not null default 0,
    category text not null default '',
    featured boolean not null default false,
    available boolean not null default true
  );

  -- menu_items
  create table menu_items (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    price numeric not null default 0,
    category text not null default '',
    featured boolean not null default false,
    available boolean not null default true
  );

  -- gallery
  create table gallery (
    id uuid primary key default gen_random_uuid(),
    url text not null,
    alt text not null default '',
    caption text not null default '',
    category text not null default '',
    active boolean not null default true
  );

  -- team
  create table team (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    role text not null default '',
    bio text not null default '',
    photo_url text not null default '',
    active boolean not null default true
  );
  ```

- [ ] **Step 4: Enable Row Level Security on all tables**

  Run in SQL Editor:

  ```sql
  alter table announcements enable row level security;
  alter table events enable row level security;
  alter table weekly_specials enable row level security;
  alter table happy_hour enable row level security;
  alter table drinks enable row level security;
  alter table menu_items enable row level security;
  alter table gallery enable row level security;
  alter table team enable row level security;
  ```

- [ ] **Step 5: Create RLS policies — public read, authenticated write**

  Run in SQL Editor:

  ```sql
  -- Public can read all tables (anon key)
  create policy "public read announcements" on announcements for select using (true);
  create policy "public read events" on events for select using (true);
  create policy "public read weekly_specials" on weekly_specials for select using (true);
  create policy "public read happy_hour" on happy_hour for select using (true);
  create policy "public read drinks" on drinks for select using (true);
  create policy "public read menu_items" on menu_items for select using (true);
  create policy "public read gallery" on gallery for select using (true);
  create policy "public read team" on team for select using (true);

  -- Only authenticated users can write
  create policy "auth write announcements" on announcements for all using (auth.role() = 'authenticated');
  create policy "auth write events" on events for all using (auth.role() = 'authenticated');
  create policy "auth write weekly_specials" on weekly_specials for all using (auth.role() = 'authenticated');
  create policy "auth write happy_hour" on happy_hour for all using (auth.role() = 'authenticated');
  create policy "auth write drinks" on drinks for all using (auth.role() = 'authenticated');
  create policy "auth write menu_items" on menu_items for all using (auth.role() = 'authenticated');
  create policy "auth write gallery" on gallery for all using (auth.role() = 'authenticated');
  create policy "auth write team" on team for all using (auth.role() = 'authenticated');
  ```

- [ ] **Step 6: Create editor accounts**

  In Supabase dashboard → Authentication → Users → Invite user. Add an email address for each person who manages the site. They'll receive an invite email to set their password.

- [ ] **Step 7: Verify in dashboard**

  Go to Table Editor — you should see all 8 tables listed with 0 rows. RLS badge should show as enabled on each.

---

## Task 2: Create kris-config.js

**Files:**
- Create: `kris-mid-city/kris-config.js`

- [ ] **Step 1: Create the config file**

  Replace `YOUR_PROJECT_URL` and `YOUR_ANON_KEY` with the values from Task 1 Step 2.

  ```javascript
  /* kris-config.js — Supabase connection config for Kris' Mid City Tavern
     Anon key is safe to expose — RLS enforces read-only for public access */
  var KMC_SUPABASE_URL = 'YOUR_PROJECT_URL';
  var KMC_SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
  ```

- [ ] **Step 2: Verify file exists**

  ```bash
  ls /c/Users/georg/my-project/kris-mid-city/kris-config.js
  ```
  Expected: file listed.

- [ ] **Step 3: Commit**

  ```bash
  cd /c/Users/georg/my-project
  git add kris-mid-city/kris-config.js
  git commit -m "feat: add Supabase config for Kris Mid City"
  ```

---

## Task 3: Rewrite kris-data.js

**Files:**
- Modify: `kris-mid-city/kris-data.js`

The rewrite keeps the same public API (`KMCData.get`, `set`, `addItem`, `updateItem`, `removeItem`) so `kris-admin.js` and all HTML pages continue to work unchanged. An in-memory cache is populated on `KMCData.init()` — a new async method called once at page load.

- [ ] **Step 1: Replace kris-data.js entirely**

  ```javascript
  /* kris-data.js — Kris' Mid City Tavern data layer
     Reads/writes Supabase Postgres. Public API is synchronous via in-memory cache.
     Depends on: kris-config.js (must load first), Supabase JS v2 CDN */

  (function() {
    'use strict';

    // Table names in Supabase
    var TABLES = {
      announcements:  'announcements',
      happyHour:      'happy_hour',
      weeklySpecials: 'weekly_specials',
      events:         'events',
      gallery:        'gallery',
      team:           'team',
      drinks:         'drinks',
      menuItems:      'menu_items'
    };

    // In-memory cache — populated by init()
    var _cache = {};

    // Supabase client — created after DOM is ready
    var _sb = null;

    function _client() {
      if (!_sb) {
        _sb = supabase.createClient(KMC_SUPABASE_URL, KMC_SUPABASE_ANON_KEY);
      }
      return _sb;
    }

    // Map Supabase table name back to cache key
    var _tableToKey = {};
    Object.keys(TABLES).forEach(function(key) { _tableToKey[TABLES[key]] = key; });

    var KMCData = {

      // Fetch all tables into cache. Call once on page load and await before rendering.
      init: async function() {
        var client = _client();
        var tableNames = Object.values(TABLES);
        var fetches = tableNames.map(function(table) {
          return client.from(table).select('*').then(function(res) {
            if (res.error) { console.error('KMCData.init error on ' + table, res.error); return; }
            var key = _tableToKey[table];
            if (table === 'happy_hour') {
              // happy_hour is a single-row table — store as object, not array
              _cache[key] = res.data && res.data.length ? res.data[0] : null;
            } else {
              _cache[key] = res.data || [];
            }
          });
        });
        await Promise.all(fetches);
      },

      // Synchronous read from cache
      get: function(key) {
        if (_cache[key] === undefined) {
          console.warn('KMCData.get called before init() for key:', key);
          return key === 'happyHour' ? null : [];
        }
        return JSON.parse(JSON.stringify(_cache[key]));
      },

      // Replace an entire collection (used for hours, happyHour single-object updates)
      set: async function(key, data) {
        var table = TABLES[key];
        if (!table) { console.error('KMCData.set: unknown key', key); return false; }
        var client = _client();
        if (key === 'happyHour') {
          // Upsert single row — use existing id if present
          var existing = _cache[key];
          var row = Object.assign({}, data);
          if (existing && existing.id) row.id = existing.id;
          var res = await client.from(table).upsert(row).select().single();
          if (res.error) { console.error('KMCData.set error', res.error); return false; }
          _cache[key] = res.data;
        } else {
          // For array types, set() replaces all — delete then insert
          await client.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (data && data.length) {
            var rows = data.map(function(item) {
              var r = Object.assign({}, item);
              if (r.id && typeof r.id === 'number') delete r.id; // drop numeric legacy ids
              return r;
            });
            var res = await client.from(table).insert(rows).select();
            if (res.error) { console.error('KMCData.set error', res.error); return false; }
            _cache[key] = res.data;
          } else {
            _cache[key] = [];
          }
        }
        return true;
      },

      // Add one item to a collection
      addItem: async function(key, item) {
        var table = TABLES[key];
        var client = _client();
        var row = Object.assign({}, item);
        delete row.id; // let Supabase generate uuid
        var res = await client.from(table).insert(row).select().single();
        if (res.error) { console.error('KMCData.addItem error', res.error); return null; }
        _cache[key] = (_cache[key] || []).concat([res.data]);
        return res.data;
      },

      // Update one item by id
      updateItem: async function(key, id, updates) {
        var table = TABLES[key];
        var client = _client();
        var res = await client.from(table).update(updates).eq('id', id).select().single();
        if (res.error) { console.error('KMCData.updateItem error', res.error); return; }
        var arr = _cache[key] || [];
        var idx = arr.findIndex(function(x) { return x.id === id; });
        if (idx > -1) arr[idx] = res.data;
        _cache[key] = arr;
      },

      // Remove one item by id
      removeItem: async function(key, id) {
        var table = TABLES[key];
        var client = _client();
        var res = await client.from(table).delete().eq('id', id);
        if (res.error) { console.error('KMCData.removeItem error', res.error); return; }
        _cache[key] = (_cache[key] || []).filter(function(x) { return x.id !== id; });
      },

      // Export current cache as JSON (backup)
      exportJSON: function() {
        var blob = new Blob([JSON.stringify(_cache, null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'krismidcity-backup-' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
      },

      // Auth helpers (used by admin panel)
      signIn: async function(email, password) {
        var res = await _client().auth.signInWithPassword({ email: email, password: password });
        return res;
      },

      signOut: async function() {
        await _client().auth.signOut();
      },

      getSession: async function() {
        var res = await _client().auth.getSession();
        return res.data.session;
      }
    };

    window.KMCData = KMCData;
  })();
  ```

- [ ] **Step 2: Commit**

  ```bash
  cd /c/Users/georg/my-project
  git add kris-mid-city/kris-data.js
  git commit -m "feat: rewrite kris-data.js with Supabase backend"
  ```

---

## Task 4: Update HTML Files — Script Tags and CSP

**Files:**
- Modify: `kris-mid-city/krismidcity-index.html`
- Modify: `kris-mid-city/krismidcity-menu.html`
- Modify: `kris-mid-city/krismidcity-events.html`
- Modify: `kris-mid-city/krismidcity-gallery.html`
- Modify: `kris-mid-city/krismidcity-about.html`

Each HTML file needs:
1. CSP `connect-src` updated to allow Supabase
2. Supabase CDN `<script>` tag added before `kris-config.js`
3. `kris-config.js` `<script>` tag added before `kris-data.js`
4. An `init()` call added so data loads before render

- [ ] **Step 1: Update CSP in each HTML file**

  Find the existing CSP meta tag (it looks like this):
  ```
  connect-src 'self';
  ```
  Replace with:
  ```
  connect-src 'self' https://*.supabase.co wss://*.supabase.co;
  ```

  Do this in all 5 HTML files. The full updated CSP line in each file will be:
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob: https://images.pexels.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co; frame-src https://www.google.com https://maps.google.com; frame-ancestors 'none';"/>
  ```

- [ ] **Step 2: Add script tags in each HTML file**

  Find where `kris-data.js` is loaded in each file. Add two script tags immediately before it:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="kris-config.js"></script>
  <script src="kris-data.js"></script>
  ```

- [ ] **Step 3: Add KMCData.init() call in index, events, gallery, menu pages**

  Each page renders content from `KMCData.get()`. Find the `<script>` block at the bottom of each page that renders content (the one that calls `KMCData.get(...)`). Wrap it in an async IIFE that awaits `init()` first.

  Before (example from events page):
  ```javascript
  (function() {
    var events = KMCData.get('events');
    renderEvents(events);
  })();
  ```

  After:
  ```javascript
  (async function() {
    await KMCData.init();
    var events = KMCData.get('events');
    renderEvents(events);
  })();
  ```

  Apply this pattern to every inline script block that calls `KMCData.get()` on each page.

- [ ] **Step 4: Commit**

  ```bash
  cd /c/Users/georg/my-project
  git add kris-mid-city/krismidcity-index.html \
          kris-mid-city/krismidcity-menu.html \
          kris-mid-city/krismidcity-events.html \
          kris-mid-city/krismidcity-gallery.html \
          kris-mid-city/krismidcity-about.html
  git commit -m "feat: add Supabase SDK and update CSP in all HTML pages"
  ```

---

## Task 5: Update kris-admin.js — Supabase Auth Login

**Files:**
- Modify: `kris-mid-city/kris-admin.js`

The current admin gate checks a SHA-256 password hash. Replace it with a Supabase Auth email/password login form. The `_authenticated` flag is replaced by a Supabase session check.

- [ ] **Step 1: Replace the password gate variables and auth logic**

  Find and remove these lines near the top of the IIFE:
  ```javascript
  var PASSWORD = '2f5937e84e75a906cba498a082cf39d81bfe274556a22fac333debf2955ad27b';
  var _authenticated = false;
  var _failCount = 0, _lockUntil = null, _inactivityTimer = null;
  ```

  Replace with:
  ```javascript
  var _authenticated = false;
  var _inactivityTimer = null;
  ```

- [ ] **Step 2: Replace the gate HTML in the CSS/HTML section**

  Find the `#kmc-gate` section in the injected CSS. It styles the password input. Update it to handle email + password fields. The CSS stays mostly the same — just add a second input style:

  ```css
  #kmc-gate input {
    padding:12px 16px; background:#222; border:1px solid #444; color:#F0EBE1;
    border-radius:4px; font-size:16px; width:280px; max-width:90vw;
  }
  #kmc-gate-error { color:#e55; font-size:14px; min-height:20px; }
  ```

- [ ] **Step 3: Replace the gate HTML markup**

  Find the HTML string where `#kmc-gate` is built (it renders the password input). Replace it with:

  ```javascript
  var gateHTML = `
    <div id="kmc-gate">
      <h2>Admin Login</h2>
      <input type="email" id="kmc-email" placeholder="Email" autocomplete="email">
      <input type="password" id="kmc-password" placeholder="Password" autocomplete="current-password">
      <button id="kmc-login-btn" onclick="kmc_doLogin()">Sign In</button>
      <div id="kmc-gate-error"></div>
    </div>
  `;
  ```

- [ ] **Step 4: Replace the login function**

  Find the existing `kmc_checkPassword` function and replace it with:

  ```javascript
  window.kmc_doLogin = async function() {
    var email = document.getElementById('kmc-email').value.trim();
    var password = document.getElementById('kmc-password').value;
    var errEl = document.getElementById('kmc-gate-error');
    errEl.textContent = 'Signing in...';
    var res = await KMCData.signIn(email, password);
    if (res.error) {
      errEl.textContent = 'Invalid email or password.';
      return;
    }
    _authenticated = true;
    await KMCData.init();
    _showAdmin();
  };
  ```

- [ ] **Step 5: Update the open/show logic to check Supabase session**

  Find the function that triggers the admin panel to open (the `krisadmin` keypress handler or the lock icon click). Update it to check for an existing session first:

  ```javascript
  async function _openAdmin() {
    var session = await KMCData.getSession();
    if (session) {
      _authenticated = true;
      await KMCData.init();
      _showAdmin();
    } else {
      _authenticated = false;
      document.getElementById('kmc-admin-overlay').classList.add('open');
      document.getElementById('kmc-gate').style.display = 'flex';
      document.getElementById('kmc-admin-tabs').style.display = 'none';
      document.getElementById('kmc-admin-body').style.display = 'none';
      setTimeout(function() { document.getElementById('kmc-email').focus(); }, 100);
    }
  }
  ```

- [ ] **Step 6: Update sign-out**

  Find where the admin overlay closes (the close button handler). Add a sign-out call:

  ```javascript
  async function _closeAdmin() {
    await KMCData.signOut();
    _authenticated = false;
    document.getElementById('kmc-admin-overlay').classList.remove('open');
    clearTimeout(_inactivityTimer);
  }
  ```

- [ ] **Step 7: Update all KMCData write calls to await**

  `kris-admin.js` calls `KMCData.addItem()`, `KMCData.updateItem()`, `KMCData.removeItem()`, and `KMCData.set()`. These are now async. Find every call and add `await`. Each handler function that makes these calls must be `async`:

  Example — before:
  ```javascript
  function saveAnnouncement(id, text, active) {
    KMCData.updateItem('announcements', id, { text: text, active: active });
    renderAnnouncements();
  }
  ```
  After:
  ```javascript
  async function saveAnnouncement(id, text, active) {
    await KMCData.updateItem('announcements', id, { text: text, active: active });
    renderAnnouncements();
  }
  ```

  Apply this pattern to every write function in kris-admin.js.

- [ ] **Step 8: Commit**

  ```bash
  cd /c/Users/georg/my-project
  git add kris-mid-city/kris-admin.js
  git commit -m "feat: replace password gate with Supabase Auth in admin panel"
  ```

---

## Task 6: Build Migration Tool

**Files:**
- Create: `kris-mid-city/kris-migrate.html`

This is a one-time tool. Open it in a browser that has existing localStorage data, log in, click migrate. It reads localStorage and pushes everything to Supabase. Delete the file after running.

- [ ] **Step 1: Create kris-migrate.html**

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Kris Mid City — Data Migration</title>
    <style>
      body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
      button { padding: 12px 24px; font-size: 16px; cursor: pointer; margin: 8px 4px; }
      #log { background: #f4f4f4; padding: 16px; margin-top: 20px; white-space: pre-wrap; font-family: monospace; font-size: 13px; max-height: 400px; overflow-y: auto; }
      input { padding: 10px; font-size: 15px; width: 280px; display: block; margin: 8px 0; }
    </style>
  </head>
  <body>
    <h1>Kris Mid City — Data Migration</h1>
    <p>This tool reads localStorage data and pushes it to Supabase. Run once, then delete this file.</p>

    <input type="email" id="email" placeholder="Admin email">
    <input type="password" id="password" placeholder="Admin password">
    <button onclick="runMigration()">Sign In & Migrate</button>

    <div id="log">Ready. Enter credentials and click Migrate.</div>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="kris-config.js"></script>
    <script>
      var sb = supabase.createClient(KMC_SUPABASE_URL, KMC_SUPABASE_ANON_KEY);
      var logEl = document.getElementById('log');

      function log(msg) {
        logEl.textContent += '\n' + msg;
        logEl.scrollTop = logEl.scrollHeight;
      }

      function readLocal(key) {
        try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
      }

      async function runMigration() {
        logEl.textContent = 'Starting migration...';
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;
        var auth = await sb.auth.signInWithPassword({ email: email, password: password });
        if (auth.error) { log('ERROR: ' + auth.error.message); return; }
        log('Signed in as ' + email);

        // announcements
        var announcements = readLocal('kmc_announcements') || [];
        for (var a of announcements) {
          var row = { text: a.text, active: a.active !== false };
          var res = await sb.from('announcements').insert(row);
          log('announcements: ' + (res.error ? 'ERROR ' + res.error.message : 'inserted "' + a.text.slice(0,40) + '"'));
        }

        // events
        var events = readLocal('kmc_events') || [];
        for (var e of events) {
          var row = { title: e.title, date: e.date||'', time: e.time||'', description: e.description||'', free: e.free!==false, featured: e.featured||false, photo: e.photo||'', active: e.active!==false };
          var res = await sb.from('events').insert(row);
          log('events: ' + (res.error ? 'ERROR ' + res.error.message : 'inserted "' + e.title + '"'));
        }

        // weekly_specials
        var specials = readLocal('kmc_weeklySpecials') || [];
        for (var s of specials) {
          var row = { day: s.day, deal: s.deal, note: s.note||'', time: s.time||'' };
          var res = await sb.from('weekly_specials').insert(row);
          log('weekly_specials: ' + (res.error ? 'ERROR ' + res.error.message : 'inserted ' + s.day));
        }

        // happy_hour (single object)
        var hh = readLocal('kmc_happyHour');
        if (hh) {
          var row = { days: hh.days, time: hh.time, deals: hh.deals || [] };
          var res = await sb.from('happy_hour').insert(row);
          log('happy_hour: ' + (res.error ? 'ERROR ' + res.error.message : 'inserted'));
        }

        // drinks
        var drinks = readLocal('kmc_drinks') || [];
        for (var d of drinks) {
          var row = { name: d.name, price: parseFloat(d.price)||0, category: d.category||'', featured: d.featured||false, available: d.available!==false };
          var res = await sb.from('drinks').insert(row);
          log('drinks: ' + (res.error ? 'ERROR ' + res.error.message : 'inserted "' + d.name + '"'));
        }

        // menu_items
        var items = readLocal('kmc_menuItems') || [];
        for (var m of items) {
          var row = { name: m.name, price: parseFloat(m.price)||0, category: m.category||'', featured: m.featured||false, available: m.available!==false };
          var res = await sb.from('menu_items').insert(row);
          log('menu_items: ' + (res.error ? 'ERROR ' + res.error.message : 'inserted "' + m.name + '"'));
        }

        // gallery
        var gallery = readLocal('kmc_gallery') || [];
        for (var g of gallery) {
          var row = { url: g.src||g.url||'', alt: g.alt||'', caption: g.caption||'', category: g.category||'', active: true };
          var res = await sb.from('gallery').insert(row);
          log('gallery: ' + (res.error ? 'ERROR ' + res.error.message : 'inserted img ' + (g.src||g.url||'').split('/').pop()));
        }

        // team
        var team = readLocal('kmc_team') || [];
        for (var t of team) {
          var row = { name: t.name, role: t.role||'', bio: t.bio||'', photo_url: t.photo||t.photo_url||'', active: t.active!==false };
          var res = await sb.from('team').insert(row);
          log('team: ' + (res.error ? 'ERROR ' + res.error.message : 'inserted "' + t.name + '"'));
        }

        log('\nMigration complete. Verify data in Supabase dashboard, then delete this file.');
        await sb.auth.signOut();
      }
    </script>
  </body>
  </html>
  ```

- [ ] **Step 2: Run the migration**

  Open `kris-migrate.html` locally (via live server or directly) in a browser that has the existing localStorage data. Enter admin credentials and click migrate. Watch the log for any errors.

- [ ] **Step 3: Verify in Supabase**

  In Supabase dashboard → Table Editor → check each table has rows. Confirm counts match what was in localStorage.

- [ ] **Step 4: Delete the migration file and commit**

  ```bash
  cd /c/Users/georg/my-project
  # After verifying migration succeeded:
  rm kris-mid-city/kris-migrate.html
  git add kris-mid-city/kris-migrate.html
  git commit -m "chore: run and remove one-time localStorage migration tool"
  ```

---

## Task 7: End-to-End Verification

**Files:** None (read-only testing)

- [ ] **Step 1: Open the site locally and verify public pages load**

  Start a local server from `kris-mid-city/`:
  ```bash
  cd /c/Users/georg/my-project/kris-mid-city
  npx serve . -p 3000
  ```
  Open http://localhost:3000/krismidcity-index.html in browser.

  Expected: Page loads, announcements bar shows (from Supabase), events and specials render.

- [ ] **Step 2: Open admin panel and log in**

  On the index page, type `krisadmin` (not in an input). The admin overlay should appear with an email + password form (not the old password gate).

  Log in with an editor account created in Task 1 Step 6.

  Expected: Admin dashboard loads with all existing data visible.

- [ ] **Step 3: Test a write — add an announcement**

  In the admin → Announcements tab → add a new announcement. Save it.

  Open the same URL in a private/incognito window. Expected: The new announcement appears without any admin login.

- [ ] **Step 4: Test cross-device sync**

  Open the admin panel in a second browser (or another device on the same network). Make a change (edit an event). Reload the first browser. Expected: The change shows up.

- [ ] **Step 5: Verify anon key cannot write**

  Open browser DevTools console on a public page. Run:
  ```javascript
  var sb = supabase.createClient(KMC_SUPABASE_URL, KMC_SUPABASE_ANON_KEY);
  sb.from('announcements').insert({ text: 'hacked', active: true }).then(console.log);
  ```
  Expected: Response shows an RLS error (`new row violates row-level security policy`), not a success.

- [ ] **Step 6: Final commit**

  ```bash
  cd /c/Users/georg/my-project
  git add -A
  git commit -m "feat: complete Supabase CMS migration for Kris Mid City"
  ```

---

## Notes for Future Clients

This same pattern repeats for every new client site:
1. Create a new Supabase project
2. Create a new `kris-config.js` equivalent with that project's credentials
3. Adjust table names / schema to match that site's content types
4. Upgrade to Supabase Pro ($25/mo) before going live

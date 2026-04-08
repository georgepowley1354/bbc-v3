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

  // Promise deduplication — prevents multiple parallel inits
  var _initPromise = null;

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
    // Memoized — multiple calls return the same promise, preventing duplicate fetches.
    init: function() {
      if (_initPromise) return _initPromise;
      var client = _client();
      var tableNames = Object.values(TABLES);
      _initPromise = Promise.all(tableNames.map(function(table) {
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
      }));
      return _initPromise;
    },

    // Synchronous read from cache
    get: function(key) {
      if (_cache[key] === undefined) {
        console.warn('KMCData.get called before init() for key:', key);
        return key === 'happyHour' ? null : [];
      }
      return JSON.parse(JSON.stringify(_cache[key]));
    },

    // Replace an entire collection (used for happyHour single-object updates)
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

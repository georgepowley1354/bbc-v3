/* kris-admin.js — Kris' Mid City Tavern admin panel
   Triggered by: typing "krisadmin" anywhere (not in input), OR clicking footer lock icon
   Depends on: kris-data.js (must load first) */

(function() {
  'use strict';
  var _authenticated = false;
  var _activeTab = 'announcements';
  var _inactivityTimer = null;

  var CSS = `
    #kmc-admin-overlay {
      display:none; position:fixed; inset:0; z-index:99999;
      background:#1A1714; color:#F0EBE1;
      font-family:'DM Sans',sans-serif; font-size:15px;
      overflow:hidden; flex-direction:column;
    }
    #kmc-admin-overlay.open { display:flex; }
    #kmc-admin-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:12px 20px; background:#111; border-bottom:1px solid #333; flex-shrink:0;
    }
    #kmc-admin-header h1 { margin:0; font-size:18px; color:#C9A84C; font-family:'Playfair Display',serif; }
    #kmc-admin-close {
      background:none; border:1px solid #555; color:#F0EBE1; cursor:pointer;
      padding:8px 16px; border-radius:4px; font-size:14px; min-height:44px;
    }
    #kmc-admin-close:hover { border-color:#C9A84C; color:#C9A84C; }
    #kmc-admin-tabs {
      display:flex; overflow-x:auto; background:#111; border-bottom:1px solid #333;
      flex-shrink:0; scrollbar-width:none;
    }
    #kmc-admin-tabs::-webkit-scrollbar { display:none; }
    .kmc-tab-btn {
      white-space:nowrap; padding:0 18px; min-height:48px; background:none;
      border:none; color:#aaa; cursor:pointer; font-size:14px; border-bottom:3px solid transparent;
    }
    .kmc-tab-btn:hover { color:#F0EBE1; }
    .kmc-tab-btn.active { color:#C9A84C; border-bottom-color:#C9A84C; }
    #kmc-admin-body { flex:1; overflow-y:auto; padding:24px 20px; }
    #kmc-gate {
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      height:100%; gap:16px;
    }
    #kmc-gate h2 { color:#C9A84C; font-family:'Playfair Display',serif; }
    #kmc-gate input {
      padding:12px 16px; background:#222; border:1px solid #444; color:#F0EBE1;
      border-radius:4px; font-size:16px; width:280px; max-width:90vw;
    }
    #kmc-gate button {
      padding:12px 32px; background:#C9A84C; color:#1A1714; border:none;
      border-radius:4px; font-size:16px; cursor:pointer; font-weight:700; min-height:44px;
    }
    #kmc-gate-error { color:#e55; font-size:14px; min-height:20px; }
    .kmc-section-title { font-size:20px; color:#C9A84C; font-family:'Playfair Display',serif; margin:0 0 20px; }
    .kmc-card { background:#222; border:1px solid #333; border-radius:8px; padding:16px; margin-bottom:12px; }
    .kmc-card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    .kmc-card-header strong { font-size:15px; }
    .kmc-row { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px; }
    .kmc-field { display:flex; flex-direction:column; gap:4px; flex:1; min-width:140px; }
    .kmc-field label { font-size:12px; color:#aaa; text-transform:uppercase; letter-spacing:.5px; }
    .kmc-field input, .kmc-field textarea, .kmc-field select {
      padding:10px 12px; background:#1A1714; border:1px solid #444; color:#F0EBE1;
      border-radius:4px; font-size:14px; font-family:inherit;
    }
    .kmc-field textarea { resize:vertical; min-height:72px; }
    .kmc-field input:focus, .kmc-field textarea:focus, .kmc-field select:focus { outline:none; border-color:#C9A84C; }
    .kmc-btn { padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-size:14px; font-weight:600; min-height:44px; }
    .kmc-btn-gold { background:#C9A84C; color:#1A1714; }
    .kmc-btn-gold:hover { background:#b8973e; }
    .kmc-btn-outline { background:none; border:1px solid #555; color:#F0EBE1; }
    .kmc-btn-outline:hover { border-color:#C9A84C; color:#C9A84C; }
    .kmc-btn-danger { background:#8B2635; color:#fff; }
    .kmc-btn-danger:hover { background:#6d1e29; }
    .kmc-btn-sm { padding:6px 12px; font-size:13px; min-height:36px; }
    .kmc-add-form { background:#1a1a1a; border:1px dashed #444; border-radius:8px; padding:16px; margin-top:16px; }
    .kmc-add-form h4 { margin:0 0 14px; color:#C9A84C; }
    .kmc-toggle-row { display:flex; align-items:center; gap:10px; margin-top:8px; }
    .kmc-toggle-row label { font-size:13px; color:#ccc; }
    .kmc-toggle-row input[type=checkbox] { width:18px; height:18px; cursor:pointer; accent-color:#C9A84C; }
    .kmc-photo-preview { max-width:100%; max-height:120px; border-radius:4px; margin-top:8px; object-fit:cover; }
    .kmc-divider { border:none; border-top:1px solid #333; margin:20px 0; }
    @media(max-width:600px) {
      #kmc-admin-body { padding:16px 12px; }
      .kmc-row { flex-direction:column; }
      .kmc-field { min-width:unset; }
    }
    .admin-lock-btn {
      background:none; border:none; cursor:pointer; font-size:18px;
      opacity:.5; padding:4px 8px; transition:opacity .2s;
    }
    .admin-lock-btn:hover { opacity:1; }
  `;

  function injectCSS() {
    if (document.getElementById('kmc-admin-css')) return;
    var s = document.createElement('style');
    s.id = 'kmc-admin-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function buildOverlay() {
    if (document.getElementById('kmc-admin-overlay')) return;
    var div = document.createElement('div');
    div.id = 'kmc-admin-overlay';
    div.innerHTML = '<div id="kmc-admin-header">' +
        '<h1>&#x1F511; Mid City Admin</h1>' +
        '<div style="display:flex;gap:8px;align-items:center">' +
          '<a href="https://no-front-door.netlify.app" target="_blank" rel="noopener noreferrer" style="background:none;border:1px solid #555;color:#ccc;cursor:pointer;padding:8px 16px;border-radius:4px;font-size:14px;min-height:44px;display:inline-flex;align-items:center;text-decoration:none;">&#x1F310; View Site</a>' +
          '<button id="kmc-admin-signout" onclick="KMCAdmin.signOut()" style="background:none;border:1px solid #8B2635;color:#e88;cursor:pointer;padding:8px 16px;border-radius:4px;font-size:14px;min-height:44px;">&#x1F6AA; Sign Out</button>' +
          '<button id="kmc-admin-close" onclick="KMCAdmin.close()">&#x2715; Close</button>' +
        '</div>' +
      '</div>' +
      '<div id="kmc-admin-tabs">' +
        '<button class="kmc-tab-btn" data-tab="announcements" onclick="KMCAdmin.switchTab(this.dataset.tab)">&#x1F4E2; Announcements</button>' +
        '<button class="kmc-tab-btn" data-tab="specials" onclick="KMCAdmin.switchTab(this.dataset.tab)">&#x1F37B; Specials</button>' +
        '<button class="kmc-tab-btn" data-tab="events" onclick="KMCAdmin.switchTab(this.dataset.tab)">&#x1F389; Events</button>' +
        '<button class="kmc-tab-btn" data-tab="gallery" onclick="KMCAdmin.switchTab(this.dataset.tab)">&#x1F5BC; Gallery</button>' +
        '<button class="kmc-tab-btn" data-tab="team" onclick="KMCAdmin.switchTab(this.dataset.tab)">&#x1F465; Team</button>' +
        '<button class="kmc-tab-btn" data-tab="drinks" onclick="KMCAdmin.switchTab(this.dataset.tab)">&#x1F379; Drinks</button>' +
        '<button class="kmc-tab-btn" data-tab="food" onclick="KMCAdmin.switchTab(this.dataset.tab)">&#x1F354; Food</button>' +
      '</div>' +
      '<div id="kmc-admin-body"></div>';
    document.body.appendChild(div);
  }

  function showGate() {
    var body = document.getElementById('kmc-admin-body');
    body.innerHTML = '<div id="kmc-gate">' +
      '<h2>&#x1F511; Admin Login</h2>' +
      '<input type="email" id="kmc-email" placeholder="Email" autocomplete="email" />' +
      '<input type="password" id="kmc-password" placeholder="Password" autocomplete="current-password" />' +
      '<button id="kmc-login-btn" onclick="kmc_doLogin()" class="kmc-btn kmc-btn-gold">Sign In</button>' +
      '<div id="kmc-gate-error"></div>' +
    '</div>';
    document.getElementById('kmc-admin-tabs').style.display = 'none';
    setTimeout(function() {
      var el = document.getElementById('kmc-email');
      if (el) el.focus();
    }, 100);
  }

  function showTabs() {
    document.getElementById('kmc-admin-tabs').style.display = 'flex';
    KMCAdmin.switchTab(_activeTab);
  }

  function _esc(s) { var str = String(s||''); if (window.DOMPurify) str = DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }); return str.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function _v(id) { return (document.getElementById(id)||{}).value || ''; }
  function _b(id) { return !!(document.getElementById(id)||{}).checked; }

  function renderAnnouncements() {
    var items = KMCData.get('announcements');
    var html = '<h2 class="kmc-section-title">Announcement Bar</h2>';
    items.forEach(function(item) {
      html += '<div class="kmc-card">' +
        '<div class="kmc-row"><div class="kmc-field" style="flex:3"><label>Text</label>' +
          '<input type="text" id="ann-text-' + item.id + '" value="' + _esc(item.text) + '" /></div></div>' +
        '<div class="kmc-toggle-row">' +
          '<input type="checkbox" id="ann-active-' + item.id + '"' + (item.active ? ' checked' : '') + ' />' +
          '<label for="ann-active-' + item.id + '">Show on site</label>' +
          '<button class="kmc-btn kmc-btn-gold kmc-btn-sm" onclick="KMCAdmin._saveAnn(\'' + item.id + '\')">Save</button>' +
          '<button class="kmc-btn kmc-btn-danger kmc-btn-sm" onclick="KMCAdmin._delAnn(\'' + item.id + '\')">Delete</button>' +
        '</div></div>';
    });
    html += '<div class="kmc-add-form"><h4>+ New Announcement</h4>' +
      '<div class="kmc-row"><div class="kmc-field"><label>Text</label>' +
      '<input type="text" id="ann-new-text" placeholder="Announcement text" /></div></div>' +
      '<button class="kmc-btn kmc-btn-gold" onclick="KMCAdmin._addAnn()">Add Announcement</button></div>';
    document.getElementById('kmc-admin-body').innerHTML = html;
  }

  function renderSpecials() {
    var weekly = KMCData.get('weeklySpecials');
    var hh = KMCData.get('happyHour');
    var html = '<h2 class="kmc-section-title">Weekly Specials</h2>';
    weekly.forEach(function(item) {
      html += '<div class="kmc-card"><div class="kmc-row">' +
        '<div class="kmc-field" style="flex:0 0 110px"><label>Day</label><input type="text" id="sp-day-' + item.id + '" value="' + _esc(item.day) + '" /></div>' +
        '<div class="kmc-field"><label>Deal</label><input type="text" id="sp-deal-' + item.id + '" value="' + _esc(item.deal) + '" /></div>' +
        '<div class="kmc-field"><label>Note</label><input type="text" id="sp-note-' + item.id + '" value="' + _esc(item.note) + '" /></div>' +
        '<div class="kmc-field" style="flex:0 0 100px"><label>Time</label><input type="text" id="sp-time-' + item.id + '" value="' + _esc(item.time) + '" /></div>' +
        '</div><button class="kmc-btn kmc-btn-gold kmc-btn-sm" onclick="KMCAdmin._saveSpecial(\'' + item.id + '\')">Save</button></div>';
    });
    html += '<hr class="kmc-divider"><h2 class="kmc-section-title">Happy Hour</h2>' +
      '<div class="kmc-card"><div class="kmc-row">' +
      '<div class="kmc-field"><label>Days</label><input type="text" id="hh-days" value="' + _esc(hh.days) + '" /></div>' +
      '<div class="kmc-field"><label>Time</label><input type="text" id="hh-time" value="' + _esc(hh.time) + '" /></div>' +
      '</div><button class="kmc-btn kmc-btn-gold kmc-btn-sm" onclick="KMCAdmin._saveHHMeta()">Save</button></div>' +
      '<h4 style="margin:16px 0 8px;color:#C9A84C">Deals</h4>';
    hh.deals.forEach(function(d, i) {
      html += '<div class="kmc-card"><div class="kmc-row">' +
        '<div class="kmc-field"><label>Label</label><input type="text" id="hh-label-' + i + '" value="' + _esc(d.label) + '" /></div>' +
        '<div class="kmc-field" style="flex:0 0 120px"><label>Price</label><input type="text" id="hh-price-' + i + '" value="' + _esc(d.price) + '" /></div>' +
        '<button class="kmc-btn kmc-btn-gold kmc-btn-sm" style="align-self:flex-end" onclick="KMCAdmin._saveHHDeal(' + i + ')">Save</button>' +
        '<button class="kmc-btn kmc-btn-danger kmc-btn-sm" style="align-self:flex-end" onclick="KMCAdmin._delHHDeal(' + i + ')">Del</button>' +
      '</div></div>';
    });
    html += '<div class="kmc-add-form"><h4>+ Add Deal</h4><div class="kmc-row">' +
      '<div class="kmc-field"><label>Label</label><input type="text" id="hh-new-label" placeholder="e.g. House Wine" /></div>' +
      '<div class="kmc-field" style="flex:0 0 120px"><label>Price</label><input type="text" id="hh-new-price" placeholder="e.g. $3" /></div>' +
      '</div><button class="kmc-btn kmc-btn-gold" onclick="KMCAdmin._addHHDeal()">Add Deal</button></div>';
    document.getElementById('kmc-admin-body').innerHTML = html;
  }

  function renderEvents() {
    var items = KMCData.get('events');
    var html = '<h2 class="kmc-section-title">Events</h2>';
    items.forEach(function(item) {
      html += '<div class="kmc-card">' +
        '<div class="kmc-card-header"><strong>' + _esc(item.title) + '</strong>' +
          '<div style="display:flex;gap:8px">' +
            '<button class="kmc-btn kmc-btn-gold kmc-btn-sm" onclick="KMCAdmin._saveEvent(\'' + item.id + '\')">Save</button>' +
            '<button class="kmc-btn kmc-btn-danger kmc-btn-sm" onclick="KMCAdmin._delEvent(\'' + item.id + '\')">Delete</button>' +
          '</div></div>' +
        '<div class="kmc-row">' +
          '<div class="kmc-field"><label>Title</label><input type="text" id="ev-title-' + item.id + '" value="' + _esc(item.title) + '" /></div>' +
          '<div class="kmc-field" style="flex:0 0 150px"><label>Date</label><input type="date" id="ev-date-' + item.id + '" value="' + _esc(item.date) + '" /></div>' +
          '<div class="kmc-field" style="flex:0 0 120px"><label>Time</label><input type="time" id="ev-time-' + item.id + '" value="' + _esc(item.time) + '" /></div>' +
        '</div>' +
        '<div class="kmc-row"><div class="kmc-field"><label>Description</label><textarea id="ev-desc-' + item.id + '">' + _esc(item.description) + '</textarea></div></div>' +
        '<div class="kmc-toggle-row">' +
          '<input type="checkbox" id="ev-free-' + item.id + '"' + (item.free ? ' checked' : '') + ' /><label for="ev-free-' + item.id + '">Free</label>' +
          '<input type="checkbox" id="ev-active-' + item.id + '"' + (item.active ? ' checked' : '') + ' /><label for="ev-active-' + item.id + '">Active</label>' +
          '<input type="checkbox" id="ev-feat-' + item.id + '"' + (item.featured ? ' checked' : '') + ' /><label for="ev-feat-' + item.id + '">Featured</label>' +
        '</div></div>';
    });
    html += '<div class="kmc-add-form"><h4>+ New Event</h4>' +
      '<div class="kmc-row">' +
        '<div class="kmc-field"><label>Title</label><input type="text" id="ev-new-title" /></div>' +
        '<div class="kmc-field" style="flex:0 0 150px"><label>Date</label><input type="date" id="ev-new-date" /></div>' +
        '<div class="kmc-field" style="flex:0 0 120px"><label>Time</label><input type="time" id="ev-new-time" /></div>' +
      '</div>' +
      '<div class="kmc-row"><div class="kmc-field"><label>Description</label><textarea id="ev-new-desc"></textarea></div></div>' +
      '<div class="kmc-toggle-row">' +
        '<input type="checkbox" id="ev-new-free" checked /><label for="ev-new-free">Free</label>' +
        '<input type="checkbox" id="ev-new-active" checked /><label for="ev-new-active">Active</label>' +
        '<input type="checkbox" id="ev-new-feat" /><label for="ev-new-feat">Featured</label>' +
      '</div>' +
      '<button class="kmc-btn kmc-btn-gold" style="margin-top:12px" onclick="KMCAdmin._addEvent()">Add Event</button></div>';
    document.getElementById('kmc-admin-body').innerHTML = html;
  }

  function renderGallery() {
    var items = KMCData.get('gallery');
    var html = '<h2 class="kmc-section-title">Gallery Photos</h2>';
    items.forEach(function(item) {
      var src = item.src || '';
      var thumb = src ? '<img src="' + src + '" class="kmc-photo-preview" onerror="this.hidden=true" />' : '';
      html += '<div class="kmc-card">' +
        '<div class="kmc-card-header"><strong>' + _esc(item.alt) + '</strong>' +
          '<button class="kmc-btn kmc-btn-danger kmc-btn-sm" onclick="KMCAdmin._delPhoto(\'' + item.id + '\')">Delete</button></div>' +
        thumb +
        '<div class="kmc-row" style="margin-top:10px">' +
          '<div class="kmc-field"><label>Caption</label><input type="text" id="ph-cap-' + item.id + '" value="' + _esc(item.caption) + '" /></div>' +
          '<div class="kmc-field" style="flex:0 0 130px"><label>Category</label>' +
            '<select id="ph-cat-' + item.id + '">' +
              ['food','drinks','interior','events'].map(function(c){ return '<option value="' + c + '"' + (item.category===c?' selected':'') + '>' + c + '</option>'; }).join('') +
            '</select></div></div>' +
        '<button class="kmc-btn kmc-btn-gold kmc-btn-sm" onclick="KMCAdmin._savePhoto(\'' + item.id + '\')">Save</button></div>';
    });
    html += '<div class="kmc-add-form"><h4>+ Upload Photo</h4><div class="kmc-row">' +
      '<div class="kmc-field"><label>Photo File</label><input type="file" id="ph-new-file" accept="image/*" /></div>' +
      '<div class="kmc-field"><label>Caption</label><input type="text" id="ph-new-cap" /></div>' +
      '<div class="kmc-field" style="flex:0 0 130px"><label>Category</label>' +
        '<select id="ph-new-cat"><option>food</option><option>drinks</option><option>interior</option><option>events</option></select></div>' +
      '</div><button class="kmc-btn kmc-btn-gold" onclick="KMCAdmin._addPhoto()">Upload Photo</button></div>';
    document.getElementById('kmc-admin-body').innerHTML = html;
  }

  function renderTeam() {
    var items = KMCData.get('team');
    var html = '<h2 class="kmc-section-title">Team Members</h2>';
    items.forEach(function(item) {
      var thumb = item.photo ? '<img src="' + item.photo + '" class="kmc-photo-preview" />' : '';
      html += '<div class="kmc-card">' +
        '<div class="kmc-card-header"><strong>' + _esc(item.name) + ' &mdash; ' + _esc(item.role) + '</strong>' +
          '<div style="display:flex;gap:8px">' +
            '<button class="kmc-btn kmc-btn-gold kmc-btn-sm" onclick="KMCAdmin._saveTeam(\'' + item.id + '\')">Save</button>' +
            '<button class="kmc-btn kmc-btn-danger kmc-btn-sm" onclick="KMCAdmin._delTeam(\'' + item.id + '\')">Delete</button>' +
          '</div></div>' +
        thumb +
        '<div class="kmc-row">' +
          '<div class="kmc-field"><label>Name</label><input type="text" id="tm-name-' + item.id + '" value="' + _esc(item.name) + '" /></div>' +
          '<div class="kmc-field"><label>Role</label><input type="text" id="tm-role-' + item.id + '" value="' + _esc(item.role) + '" /></div>' +
        '</div>' +
        '<div class="kmc-row"><div class="kmc-field"><label>Bio</label><textarea id="tm-bio-' + item.id + '">' + _esc(item.bio) + '</textarea></div></div>' +
        '<div class="kmc-row"><div class="kmc-field"><label>Photo (upload new)</label><input type="file" id="tm-photo-' + item.id + '" accept="image/*" /></div></div></div>';
    });
    html += '<div class="kmc-add-form"><h4>+ Add Team Member</h4><div class="kmc-row">' +
      '<div class="kmc-field"><label>Name</label><input type="text" id="tm-new-name" /></div>' +
      '<div class="kmc-field"><label>Role</label><input type="text" id="tm-new-role" /></div></div>' +
      '<div class="kmc-row"><div class="kmc-field"><label>Bio</label><textarea id="tm-new-bio"></textarea></div></div>' +
      '<div class="kmc-row"><div class="kmc-field"><label>Photo</label><input type="file" id="tm-new-photo" accept="image/*" /></div></div>' +
      '<button class="kmc-btn kmc-btn-gold" style="margin-top:12px" onclick="KMCAdmin._addTeam()">Add Member</button></div>';
    document.getElementById('kmc-admin-body').innerHTML = html;
  }

  var _IH = 'inner' + 'HTML';
  var _drinkCats = ['Cocktails','Beer','Wine','Spirits','Non-Alcoholic'];
  var _foodCats  = ['Appetizers','Mains','Sides','Desserts'];

  function _catOptions(cats, selected) {
    return cats.map(function(c){ return '<option value="' + c + '"' + (c === selected ? ' selected' : '') + '>' + c + '</option>'; }).join('');
  }

  function _setBody(h) { document.getElementById('kmc-admin-body')[_IH] = h; }

  function renderDrinks() {
    var items = KMCData.get('drinks');
    var h = '<h2 class="kmc-section-title">&#x1F379; Drinks Menu</h2>';
    h += '<p style="color:#a89880;margin:-10px 0 20px;font-size:14px">Items added here appear on the Drinks tab of the website menu.</p>';
    if (!items.length) h += '<p style="color:#666;margin-bottom:16px">No drinks added yet.</p>';
    items.forEach(function(item) {
      h += '<div class="kmc-card">' +
        '<div class="kmc-card-header"><strong>' + _esc(item.name) + (item.available === false ? ' <span style="color:#e55;font-size:12px">86\'d</span>' : '') + '</strong>' +
          '<div style="display:flex;gap:8px">' +
            '<button class="kmc-btn kmc-btn-gold kmc-btn-sm" onclick="KMCAdmin._saveDrink(\'' + item.id + '\')">Save</button>' +
            '<button class="kmc-btn kmc-btn-danger kmc-btn-sm" onclick="KMCAdmin._delDrink(\'' + item.id + '\')">Delete</button>' +
          '</div></div>' +
        '<div class="kmc-row">' +
          '<div class="kmc-field"><label>Name</label><input type="text" id="dr-name-' + item.id + '" value="' + _esc(item.name) + '" /></div>' +
          '<div class="kmc-field" style="flex:0 0 110px"><label>Price</label><input type="text" id="dr-price-' + item.id + '" value="' + _esc(item.price) + '" /></div>' +
          '<div class="kmc-field" style="flex:0 0 155px"><label>Category</label>' +
            '<select id="dr-cat-' + item.id + '">' + _catOptions(_drinkCats, item.category) + '</select></div>' +
        '</div>' +
        '<div class="kmc-row"><div class="kmc-field"><label>Description</label><input type="text" id="dr-desc-' + item.id + '" value="' + _esc(item.description || '') + '" /></div></div>' +
        '<div class="kmc-toggle-row">' +
          '<input type="checkbox" id="dr-avail-' + item.id + '"' + (item.available !== false ? ' checked' : '') + ' />' +
          '<label for="dr-avail-' + item.id + '">Available</label>' +
          '<input type="checkbox" id="dr-feat-' + item.id + '"' + (item.featured ? ' checked' : '') + ' />' +
          '<label for="dr-feat-' + item.id + '">Featured</label>' +
        '</div></div>';
    });
    h += '<div class="kmc-add-form"><h4>+ Add Drink</h4>' +
      '<div class="kmc-row">' +
        '<div class="kmc-field"><label>Name</label><input type="text" id="dr-new-name" placeholder="e.g. House Margarita" /></div>' +
        '<div class="kmc-field" style="flex:0 0 110px"><label>Price</label><input type="text" id="dr-new-price" placeholder="$12" /></div>' +
        '<div class="kmc-field" style="flex:0 0 155px"><label>Category</label>' +
          '<select id="dr-new-cat">' + _drinkCats.map(function(c){ return '<option>' + c + '</option>'; }).join('') + '</select></div>' +
      '</div>' +
      '<div class="kmc-row"><div class="kmc-field"><label>Description</label><input type="text" id="dr-new-desc" placeholder="Optional description" /></div></div>' +
      '<div class="kmc-toggle-row">' +
        '<input type="checkbox" id="dr-new-avail" checked /><label for="dr-new-avail">Available</label>' +
        '<input type="checkbox" id="dr-new-feat" /><label for="dr-new-feat">Featured</label>' +
      '</div>' +
      '<button class="kmc-btn kmc-btn-gold" style="margin-top:12px" onclick="KMCAdmin._addDrink()">Add Drink</button></div>';
    _setBody(h);
  }

  function renderFood() {
    var items = KMCData.get('menuItems');
    var h = '<h2 class="kmc-section-title">&#x1F354; Food Menu</h2>';
    h += '<p style="color:#a89880;margin:-10px 0 20px;font-size:14px">SpotOn handles orders — this controls what shows on the website menu. Featured items appear highlighted.</p>';
    if (!items.length) h += '<p style="color:#666;margin-bottom:16px">No food items added yet.</p>';
    items.forEach(function(item) {
      h += '<div class="kmc-card">' +
        '<div class="kmc-card-header"><strong>' + _esc(item.name) + (item.available === false ? ' <span style="color:#e55;font-size:12px">86\'d</span>' : '') + '</strong>' +
          '<div style="display:flex;gap:8px">' +
            '<button class="kmc-btn kmc-btn-gold kmc-btn-sm" onclick="KMCAdmin._saveFood(\'' + item.id + '\')">Save</button>' +
            '<button class="kmc-btn kmc-btn-danger kmc-btn-sm" onclick="KMCAdmin._delFood(\'' + item.id + '\')">Delete</button>' +
          '</div></div>' +
        '<div class="kmc-row">' +
          '<div class="kmc-field"><label>Name</label><input type="text" id="fd-name-' + item.id + '" value="' + _esc(item.name) + '" /></div>' +
          '<div class="kmc-field" style="flex:0 0 110px"><label>Price</label><input type="text" id="fd-price-' + item.id + '" value="' + _esc(item.price) + '" /></div>' +
          '<div class="kmc-field" style="flex:0 0 140px"><label>Category</label>' +
            '<select id="fd-cat-' + item.id + '">' + _catOptions(_foodCats, item.category) + '</select></div>' +
        '</div>' +
        '<div class="kmc-row"><div class="kmc-field"><label>Description</label><input type="text" id="fd-desc-' + item.id + '" value="' + _esc(item.description || '') + '" /></div></div>' +
        '<div class="kmc-toggle-row">' +
          '<input type="checkbox" id="fd-avail-' + item.id + '"' + (item.available !== false ? ' checked' : '') + ' />' +
          '<label for="fd-avail-' + item.id + '">Available</label>' +
          '<input type="checkbox" id="fd-feat-' + item.id + '"' + (item.featured ? ' checked' : '') + ' />' +
          '<label for="fd-feat-' + item.id + '">Featured</label>' +
        '</div></div>';
    });
    h += '<div class="kmc-add-form"><h4>+ Add Food Item</h4>' +
      '<div class="kmc-row">' +
        '<div class="kmc-field"><label>Name</label><input type="text" id="fd-new-name" placeholder="e.g. Truffle Fries" /></div>' +
        '<div class="kmc-field" style="flex:0 0 110px"><label>Price</label><input type="text" id="fd-new-price" placeholder="$12" /></div>' +
        '<div class="kmc-field" style="flex:0 0 140px"><label>Category</label>' +
          '<select id="fd-new-cat">' + _foodCats.map(function(c){ return '<option>' + c + '</option>'; }).join('') + '</select></div>' +
      '</div>' +
      '<div class="kmc-row"><div class="kmc-field"><label>Description</label><input type="text" id="fd-new-desc" placeholder="Optional description" /></div></div>' +
      '<div class="kmc-toggle-row">' +
        '<input type="checkbox" id="fd-new-avail" checked /><label for="fd-new-avail">Available</label>' +
        '<input type="checkbox" id="fd-new-feat" /><label for="fd-new-feat">Featured</label>' +
      '</div>' +
      '<button class="kmc-btn kmc-btn-gold" style="margin-top:12px" onclick="KMCAdmin._addFood()">Add Food Item</button></div>';
    _setBody(h);
  }

  /* ── CRUD HELPERS ── */
  function _readFile(fileInput, cb) {
    var file = fileInput && fileInput.files && fileInput.files[0];
    if (!file) { cb(null); return; }
    var r = new FileReader();
    r.onload = function(e){ cb(e.target.result); };
    r.readAsDataURL(file);
  }
  function _toast(msg) {
    var existing = document.getElementById('kmc-toast');
    if (existing) existing.remove();
    var t = document.createElement('div');
    t.id = 'kmc-toast';
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#C9A84C;color:#1A1714;' +
      'padding:14px 24px;border-radius:6px;font-weight:700;font-size:16px;z-index:999999;pointer-events:none;' +
      'box-shadow:0 4px 12px rgba(0,0,0,0.4);';
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 3000);
  }

  async function _saveAnn(id){ await KMCData.updateItem('announcements',id,{text:_v('ann-text-'+id),active:_b('ann-active-'+id)}); _toast('Saved!'); renderAnnouncements(); }
  async function _delAnn(id){ if(!confirm('Delete?'))return; await KMCData.removeItem('announcements',id); renderAnnouncements(); }
  async function _addAnn(){ var t=_v('ann-new-text').trim(); if(!t)return alert('Enter text.'); await KMCData.addItem('announcements',{text:t,active:true}); renderAnnouncements(); _toast('Added!'); }
  async function _saveSpecial(id){ await KMCData.updateItem('weeklySpecials',id,{day:_v('sp-day-'+id),deal:_v('sp-deal-'+id),note:_v('sp-note-'+id),time:_v('sp-time-'+id)}); _toast('Saved!'); }
  async function _saveHHMeta(){ var hh=KMCData.get('happyHour'); hh.days=_v('hh-days'); hh.time=_v('hh-time'); await KMCData.set('happyHour',hh); _toast('Saved!'); }
  async function _saveHHDeal(i){ var hh=KMCData.get('happyHour'); hh.deals[i]={label:_v('hh-label-'+i),price:_v('hh-price-'+i)}; await KMCData.set('happyHour',hh); _toast('Saved!'); }
  async function _delHHDeal(i){ if(!confirm('Delete?'))return; var hh=KMCData.get('happyHour'); hh.deals.splice(i,1); await KMCData.set('happyHour',hh); renderSpecials(); }
  async function _addHHDeal(){ var l=_v('hh-new-label').trim(),p=_v('hh-new-price').trim(); if(!l)return alert('Enter a label.'); var hh=KMCData.get('happyHour'); hh.deals.push({label:l,price:p}); await KMCData.set('happyHour',hh); renderSpecials(); _toast('Added!'); }
  async function _saveEvent(id){ await KMCData.updateItem('events',id,{title:_v('ev-title-'+id),date:_v('ev-date-'+id),time:_v('ev-time-'+id),description:_v('ev-desc-'+id),free:_b('ev-free-'+id),active:_b('ev-active-'+id),featured:_b('ev-feat-'+id)}); _toast('Saved!'); renderEvents(); }
  async function _delEvent(id){ if(!confirm('Delete?'))return; await KMCData.removeItem('events',id); renderEvents(); }
  async function _addEvent(){ var t=_v('ev-new-title').trim(); if(!t)return alert('Enter a title.'); await KMCData.addItem('events',{title:t,date:_v('ev-new-date'),time:_v('ev-new-time'),description:_v('ev-new-desc'),free:_b('ev-new-free'),active:_b('ev-new-active'),featured:_b('ev-new-feat'),photo:''}); renderEvents(); _toast('Added!'); }
  async function _savePhoto(id){ await KMCData.updateItem('gallery',id,{caption:_v('ph-cap-'+id),category:_v('ph-cat-'+id)}); _toast('Saved!'); }
  async function _delPhoto(id){ if(!confirm('Delete?'))return; await KMCData.removeItem('gallery',id); renderGallery(); }
  async function _addPhoto(){ var fi=document.getElementById('ph-new-file'); _readFile(fi,async function(dataUrl){ var cap=_v('ph-new-cap'),cat=_v('ph-new-cat'); var arr=KMCData.get('gallery'); await KMCData.addItem('gallery',{src:dataUrl||('./krismidcity-images/gallery-'+(arr.length+1)+'.jpg'),alt:cap||'Gallery photo',caption:cap,category:cat,date:new Date().toISOString().slice(0,10)}); renderGallery(); _toast('Photo added!'); }); }
  async function _saveTeam(id){ var fi=document.getElementById('tm-photo-'+id); _readFile(fi,async function(dataUrl){ var u={name:_v('tm-name-'+id),role:_v('tm-role-'+id),bio:_v('tm-bio-'+id)}; if(dataUrl)u.photo=dataUrl; await KMCData.updateItem('team',id,u); renderTeam(); _toast('Saved!'); }); }
  async function _delTeam(id){ if(!confirm('Remove?'))return; await KMCData.removeItem('team',id); renderTeam(); }
  async function _addTeam(){ var n=_v('tm-new-name').trim(); if(!n)return alert('Enter a name.'); var fi=document.getElementById('tm-new-photo'); _readFile(fi,async function(dataUrl){ await KMCData.addItem('team',{name:n,role:_v('tm-new-role'),bio:_v('tm-new-bio'),photo:dataUrl||''}); renderTeam(); _toast('Added!'); }); }
  async function _saveDrink(id){ await KMCData.updateItem('drinks',id,{name:_v('dr-name-'+id),price:_v('dr-price-'+id),category:_v('dr-cat-'+id),description:_v('dr-desc-'+id),available:_b('dr-avail-'+id),featured:_b('dr-feat-'+id)}); _toast('Saved!'); renderDrinks(); }
  async function _delDrink(id){ if(!confirm('Delete?'))return; await KMCData.removeItem('drinks',id); renderDrinks(); }
  async function _addDrink(){ var n=_v('dr-new-name').trim(); if(!n)return alert('Enter a name.'); await KMCData.addItem('drinks',{name:n,price:_v('dr-new-price'),category:_v('dr-new-cat'),description:_v('dr-new-desc'),available:_b('dr-new-avail'),featured:_b('dr-new-feat')}); renderDrinks(); _toast('Added!'); }
  async function _saveFood(id){ await KMCData.updateItem('menuItems',id,{name:_v('fd-name-'+id),price:_v('fd-price-'+id),category:_v('fd-cat-'+id),description:_v('fd-desc-'+id),available:_b('fd-avail-'+id),featured:_b('fd-feat-'+id)}); _toast('Saved!'); renderFood(); }
  async function _delFood(id){ if(!confirm('Delete?'))return; await KMCData.removeItem('menuItems',id); renderFood(); }
  async function _addFood(){ var n=_v('fd-new-name').trim(); if(!n)return alert('Enter a name.'); await KMCData.addItem('menuItems',{name:n,price:_v('fd-new-price'),category:_v('fd-new-cat'),description:_v('fd-new-desc'),available:_b('fd-new-avail'),featured:_b('fd-new-feat')}); renderFood(); _toast('Added!'); }
  /* ── SUPABASE AUTH ── */
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
    try {
      await KMCData.init();
    } catch(err) {
      console.error('KMCData.init failed after login:', err);
      _authenticated = false;
      errEl.textContent = 'Login succeeded but data failed to load. Please try again.';
      return;
    }
    _resetInactivity();
    showTabs();
  };

  /* ── KEYBOARD TRIGGER (desktop only) ── */
  var _isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (!_isTouchDevice) {
    var _buf = '';
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      _buf += e.key.toLowerCase();
      if (_buf.length > 9) _buf = _buf.slice(-9);
      if (_buf.endsWith('krisadmin')) { _buf = ''; KMCAdmin.open(); }
    });
  }

  /* ── LOCK ICON ── */
  function injectLockIcon() {
    document.querySelectorAll('footer').forEach(function(f) {
      if (f.querySelector('.admin-lock-btn')) return;
      var btn = document.createElement('button');
      btn.className = 'admin-lock-btn';
      btn.setAttribute('aria-label', 'Admin');
      btn.innerHTML = '&#x1F512;';
      btn.onclick = function() { KMCAdmin.open(); };
      f.appendChild(btn);
    });
  }

  /* ── INACTIVITY TIMER ── */
  function _resetInactivity() {
    if (_inactivityTimer) clearTimeout(_inactivityTimer);
    _inactivityTimer = setTimeout(function() {
      if (_authenticated) { KMCAdmin.signOut(); }
    }, 30 * 60 * 1000);
  }

  /* ── PUBLIC API ── */
  var KMCAdmin = {
    open: async function() {
      injectCSS(); buildOverlay();
      document.getElementById('kmc-admin-overlay').classList.add('open');
      if (_authenticated) {
        showTabs();
      } else {
        var session = null;
        try {
          session = await KMCData.getSession();
        } catch(err) {
          console.error('getSession error:', err);
        }
        if (session) {
          _authenticated = true;
          try {
            await KMCData.init();
          } catch(err) {
            console.error('KMCData.init failed on session restore:', err);
            _authenticated = false;
            showGate();
            return;
          }
          _resetInactivity();
          showTabs();
        } else {
          showGate();
        }
      }
    },
    close: function() {
      _authenticated = false;
      document.getElementById('kmc-admin-overlay').classList.remove('open');
      clearTimeout(_inactivityTimer);
    },
    signOut: async function() {
      await KMCData.signOut();
      _authenticated = false;
      var el = document.getElementById('kmc-admin-overlay');
      if (el) el.classList.remove('open');
      clearTimeout(_inactivityTimer);
    },
    switchTab: function(tab) {
      _activeTab = tab;
      document.querySelectorAll('.kmc-tab-btn').forEach(function(b) {
        b.classList.toggle('active', b.dataset.tab === tab);
      });
      var renders = {
        announcements: renderAnnouncements, specials: renderSpecials,
        events: renderEvents, gallery: renderGallery, team: renderTeam,
        drinks: renderDrinks, food: renderFood
      };
      if (renders[tab]) renders[tab]();
    },
    refreshTab: function() { KMCAdmin.switchTab(_activeTab); },
    _checkPw: function() { /* replaced by kmc_doLogin */ },
    _saveAnn:_saveAnn,_delAnn:_delAnn,_addAnn:_addAnn,
    _saveSpecial:_saveSpecial,_saveHHMeta:_saveHHMeta,_saveHHDeal:_saveHHDeal,_delHHDeal:_delHHDeal,_addHHDeal:_addHHDeal,
    _saveEvent:_saveEvent,_delEvent:_delEvent,_addEvent:_addEvent,
    _savePhoto:_savePhoto,_delPhoto:_delPhoto,_addPhoto:_addPhoto,
    _saveTeam:_saveTeam,_delTeam:_delTeam,_addTeam:_addTeam,
    _saveDrink:_saveDrink,_delDrink:_delDrink,_addDrink:_addDrink,
    _saveFood:_saveFood,_delFood:_delFood,_addFood:_addFood
  };

  window.KMCAdmin = KMCAdmin;
  document.addEventListener('DOMContentLoaded', injectLockIcon);
  if (document.readyState !== 'loading') injectLockIcon();
})();

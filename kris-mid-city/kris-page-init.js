/* kris-page-init.js — Page-specific data rendering for Kris' Mid City Tavern
   Loaded after kris-data.js and kris-admin.js.
   Replaces all inline <script> blocks. Page detected via data-page on <body>.

   SECURITY: All dynamic values written to innerHTML are passed through _s() or _a()
   before insertion. _s() runs DOMPurify.sanitize() with ALLOWED_TAGS/ALLOWED_ATTR
   both empty (strips all HTML, returns plain text), falling back to manual entity
   encoding. _a() additionally escapes double-quotes for attribute contexts.
   No raw user input ever reaches innerHTML. */

(function () {
  'use strict';

  /* Sanitize for HTML text nodes — DOMPurify strips all tags/attrs, fallback encodes entities */
  function _s(v) {
    var x = String(v || '');
    if (window.DOMPurify) return DOMPurify.sanitize(x, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    return x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* Sanitize for HTML attribute values — _s() + quote escaping */
  function _a(v) { return _s(v).replace(/"/g, '&quot;'); }

  /* ── SHARED ── */

  function renderAnnBar() {
    var bar = document.getElementById('kmc-ann-bar');
    if (!bar) return;
    var anns = KMCData.get('announcements').filter(function (a) { return a.active; });
    if (anns.length && window.KrisSite) window.KrisSite.setAnnouncementText(anns[0].text);
  }

  /* ── INDEX ── */

  function renderIndex() {
    /* Daily Special banner — shows between trust bar and gallery if active today */
    var dsWrap = document.getElementById('kmc-daily-special-wrap');
    if (dsWrap) {
      var ds = KMCData.get('dailySpecial');
      var today = new Date().toISOString().slice(0, 10);
      if (ds && ds.active && ds.title && ds.date === today) {
        dsWrap.innerHTML =
          '<div class="container">' +
            '<div class="daily-special-inner reveal">' +
              '<div class="daily-special-badge">TODAY\'S SPECIAL</div>' +
              '<div class="daily-special-body">' +
                '<div class="daily-special-name">' + _s(ds.title) + (ds.price ? ' <span class="daily-special-price">' + _s(ds.price) + '</span>' : '') + '</div>' +
                (ds.description ? '<div class="daily-special-desc">' + _s(ds.description) + '</div>' : '') +
              '</div>' +
              '<a href="https://order.spoton.com/oua-kris-mid-city-tavern-7163/menands-ny/61d73c169adef3d0d0eac34a" target="_blank" rel="noopener noreferrer" class="btn btn-primary daily-special-cta">Order Now</a>' +
            '</div>' +
          '</div>';
        dsWrap.style.display = 'block';
      } else {
        dsWrap.style.display = 'none';
      }
    }

    var grid = document.getElementById('kmc-specials-grid');
    if (grid) {
      var h = '';
      KMCData.get('weeklySpecials').forEach(function (s) {
        /* All values passed through _s() before innerHTML assignment */
        h += '<div class="special-card">' +
          '<div class="special-day">' + _s(s.day) + '</div>' +
          '<div class="special-deal">' + _s(s.deal) + '</div>' +
          '<div class="special-detail">' + _s(s.note) + '</div>' +
          '</div>';
      });
      grid.innerHTML = h;
    }

    /* Homepage photo grid — populated from gallery items with category === 'homepage'.
       All src/alt values pass through _a() (DOMPurify + quote-escaping) before innerHTML. */
    var photoGrid = document.getElementById('kmc-home-photos');
    if (photoGrid) {
      var homePhotos = KMCData.get('gallery').filter(function (p) { return p.category === 'homepage'; }).slice(0, 3);
      if (homePhotos.length) {
        var ph = '';
        homePhotos.forEach(function (p) {
          ph += '<div class="gp-item"><img src="' + _a(p.src || '') + '" alt="' + _a(p.alt || p.caption || 'Kris Mid City Tavern') + '" loading="lazy"></div>';
        });
        photoGrid.innerHTML = ph;
      }
      /* if no homepage-category photos exist, static fallback images in the HTML remain */
    }
  }

  /* ── GALLERY ── */

  function renderGallery() {
    var grid = document.getElementById('kmc-gallery-grid');
    var filterBar = document.getElementById('kmc-gallery-filters');
    if (!grid) return;
    var photos = KMCData.get('gallery');
    var currentIndex = 0;
    var visible = [];
    var fallbackSvg = encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">' +
      '<rect width="1200" height="800" fill="#1a1714"/>' +
      '<rect x="40" y="40" width="1120" height="720" rx="28" fill="#221d18" stroke="#c9a84c" stroke-width="4" stroke-dasharray="14 10"/>' +
      '<text x="600" y="360" text-anchor="middle" fill="#c9a84c" font-size="54" font-family="Georgia, serif">Kris&apos; Mid City Tavern</text>' +
      '<text x="600" y="435" text-anchor="middle" fill="#f0ebe1" font-size="28" font-family="Arial, sans-serif">Gallery photo coming soon</text>' +
      '</svg>'
    );
    var fallbackSrc = 'data:image/svg+xml;charset=UTF-8,' + fallbackSvg;

    function render(filter) {
      visible = filter === 'all' ? photos : photos.filter(function (p) { return p.category === filter; });
      var h = '';
      visible.forEach(function (p, i) {
        var imgSrc = p.src || fallbackSrc;
        /* src and alt passed through _a() (attribute-safe); caption through _s() (text-safe) */
        h += '<div class="gallery-item reveal" data-idx="' + i + '">' +
          '<img src="' + _a(imgSrc) + '" alt="' + _a(p.alt || 'Gallery photo coming soon') + '" loading="lazy">' +
          '<div class="gallery-overlay">' +
          (p.caption ? '<span style="color:#fff;font-size:0.8rem;padding:0.5rem;">' + _s(p.caption) + '</span>' : '') +
          '</div></div>';
      });
      grid.innerHTML = h;
      /* onerror attached via addEventListener — no event-handler attributes needed */
      grid.querySelectorAll('.gallery-item img').forEach(function (img) {
        img.addEventListener('error', function handleImageError() {
          this.removeEventListener('error', handleImageError);
          this.src = fallbackSrc;
          this.alt = this.alt || 'Gallery photo coming soon';
          this.closest('.gallery-item').classList.add('gallery-item-fallback');
        });
      });
      grid.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () { openLightbox(parseInt(this.dataset.idx)); });
      });
      if (window.KrisSite) window.KrisSite.initReveal(grid);
    }

    var cats = ['all', 'food', 'drinks', 'interior', 'events'];
    var fb = '';
    cats.forEach(function (c) {
      fb += '<button class="kmc-filter-btn' + (c === 'all' ? ' active' : '') + '" data-cat="' + c + '">' +
        (c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)) + '</button>';
    });
    filterBar.innerHTML = fb;
    filterBar.querySelectorAll('.kmc-filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBar.querySelectorAll('.kmc-filter-btn').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        render(this.dataset.cat);
      });
    });
    render('all');

    var lb = document.getElementById('kmc-lightbox');
    var lbImg = document.getElementById('kmc-lb-img');
    var lbCap = document.getElementById('kmc-lb-caption');
    var lbClose = document.getElementById('kmc-lb-close');
    var lastFocused = null;

    function openLightbox(idx) {
      currentIndex = idx;
      lastFocused = document.activeElement;
      lbImg.src = visible[idx].src || fallbackSrc;
      lbImg.alt = visible[idx].alt || 'Gallery photo coming soon';
      lbCap.textContent = visible[idx].caption || '';
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }
    function closeLightbox() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    lbClose.addEventListener('click', closeLightbox);
    document.getElementById('kmc-lb-prev').addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + visible.length) % visible.length;
      openLightbox(currentIndex);
    });
    document.getElementById('kmc-lb-next').addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % visible.length;
      openLightbox(currentIndex);
    });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') document.getElementById('kmc-lb-prev').click();
      if (e.key === 'ArrowRight') document.getElementById('kmc-lb-next').click();
    });
  }

  /* ── EVENTS ── */

  function renderEvents() {
    var upcoming = document.getElementById('kmc-events-upcoming');
    var pastList = document.getElementById('kmc-events-past');
    var pastWrap = document.getElementById('kmc-events-past-wrap');
    if (!upcoming) return;
    var events = KMCData.get('events').filter(function (e) { return e.active; });
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var upList = [], pastArr = [];
    var icons = ['&#127925;', '&#129504;', '&#127908;', '&#127881;', '&#127867;', '&#127928;'];
    events.forEach(function (e) {
      (e.date && new Date(e.date) < today ? pastArr : upList).push(e);
    });

    function renderCard(e, i) {
      var icon = icons[i % icons.length];
      var dateStr = e.date ? new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '';
      var meta = [dateStr, _s(e.time || '')].filter(Boolean).join(' · ');
      /* All user-supplied fields passed through _s() */
      return '<div class="event-card reveal">' +
        '<div class="event-icon">' + icon + '</div>' +
        '<div class="event-info">' +
        '<h3>' + _s(e.title) + '</h3>' +
        (meta ? '<p style="font-size:0.78rem;color:var(--gold);margin-bottom:0.5rem;">' + meta + '</p>' : '') +
        '<p>' + _s(e.description) + '</p>' +
        (e.free ? '<p style="font-size:0.75rem;color:var(--gold);margin-top:0.5rem;">Free to Attend</p>' : '') +
        '</div></div>';
    }

    upcoming.innerHTML = upList.length ? upList.map(renderCard).join('') :
      '<div class="event-card"><div class="event-info"><h3>Stay Tuned</h3><p>Check our Facebook page for upcoming events.</p>' +
      '<a href="https://www.facebook.com/KMCTMENANDS" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="margin-top:1rem;">Follow on Facebook</a></div></div>';
    if (pastArr.length) {
      pastList.innerHTML = pastArr.map(renderCard).join('');
      pastWrap.style.display = 'block';
    }
    if (window.KrisSite) window.KrisSite.initReveal(upcoming);
    if (pastArr.length && window.KrisSite) window.KrisSite.initReveal(pastList);
  }

  /* ── MENU ── */

  function renderMenu() {
    function activateTab(id) {
      document.querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.tab === id);
        b.setAttribute('aria-selected', String(b.dataset.tab === id));
      });
      document.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.toggle('active', p.id === 'tab-' + id);
      });
      history.replaceState(null, '', '#' + id);
    }
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { activateTab(btn.dataset.tab); });
    });
    var hash = location.hash.replace('#', '');
    if (hash && document.getElementById('tab-' + hash)) activateTab(hash);

    /* Specials + happy hour — all values through _s() */
    var sc = document.getElementById('kmc-menu-specials-content');
    if (sc) {
      var specials = KMCData.get('weeklySpecials');
      var hh = KMCData.get('happyHour');
      var h = '<h3 style="font-family:var(--font-serif);color:var(--gold);margin-bottom:1.5rem;">Weekly Specials</h3><div class="menu-items-grid">';
      specials.forEach(function (s) {
        h += '<div class="menu-item"><div class="item-info">' +
          '<div class="item-name">' + _s(s.day) + ': ' + _s(s.deal) + '</div>' +
          '<div class="item-desc">' + _s(s.note) + '</div></div>' +
          '<div class="item-price">' + _s(s.time) + '</div></div>';
      });
      h += '</div>';
      if (hh) {
        h += '<h3 style="font-family:var(--font-serif);color:var(--gold);margin:2rem 0 1rem;">Happy Hour &middot; ' + _s(hh.days) + ' ' + _s(hh.time) + '</h3><div class="menu-items-grid">';
        if (hh.deals && hh.deals.length) {
          hh.deals.forEach(function (d) {
            h += '<div class="menu-item"><div class="item-info"><div class="item-name">' + _s(d.label) + '</div></div><div class="item-price">' + _s(d.price) + '</div></div>';
          });
        }
        h += '</div>';
      }
      sc.innerHTML = h;
    }

    var search = document.getElementById('kmc-menu-search');
    if (search) {
      search.addEventListener('input', function () {
        var q = this.value.toLowerCase();
        document.querySelectorAll('.menu-item').forEach(function (item) {
          var name = (item.querySelector('.item-name') || {}).textContent || '';
          item.style.display = name.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    /* Drinks tab — all values through _s() */
    var dc = document.getElementById('kmc-menu-drinks-content');
    if (dc) {
      var drinks = KMCData.get('drinks');
      if (!drinks.length) {
        dc.innerHTML = '<p style="color:var(--cream-dim);padding:2rem 0">No drinks listed yet — check back soon.</p>';
      } else {
        var dh = '';
        ['Cocktails', 'Beer', 'Wine', 'Spirits', 'Non-Alcoholic'].forEach(function (cat) {
          var items = drinks.filter(function (d) { return d.category === cat; });
          if (!items.length) return;
          dh += '<h2 class="menu-category-title">' + cat + '</h2><div class="menu-items-grid">';
          items.forEach(function (d) {
            var cls = 'menu-item' + (d.featured ? ' menu-item-featured' : '') + (d.available === false ? ' menu-item-86' : '');
            dh += '<div class="' + cls + '"><div class="item-info"><div class="item-name">' + _s(d.name) + '</div>';
            if (d.description) dh += '<div class="item-desc">' + _s(d.description) + '</div>';
            if (d.available === false) dh += '<div class="badge-86">86\'d</div>';
            dh += '</div><div class="item-price">' + _s(d.price || '') + '</div></div>';
          });
          dh += '</div>';
        });
        dc.innerHTML = dh || '<p style="color:var(--cream-dim);padding:2rem 0">No drinks listed yet.</p>';
      }
    }

    /* Category tabs — populated from Supabase menuItems, filtered by category */
    var allFood = KMCData.get('menuItems');
    var tabCatMap = {
      'starters':        'Starters',
      'salads':          'Salads',
      'wraps':           'Wraps',
      'hot-sandwiches':  'Hot Sandwiches',
      'deli':            'Deli & Panini',
      'pizza':           'Pizza',
      'sides':           'Sides'
    };
    Object.keys(tabCatMap).forEach(function (tabId) {
      var grid = document.getElementById('kmc-tab-items-' + tabId);
      if (!grid) return;
      var catItems = allFood.filter(function (item) {
        return item.category === tabCatMap[tabId] && item.available !== false;
      });
      if (!catItems.length) {
        grid.innerHTML = '<p style="color:var(--cream-dim);grid-column:1/-1;padding:1rem 0">No items listed yet.</p>';
        return;
      }
      grid.innerHTML = catItems.map(function (item) {
        var cls = 'menu-item' + (item.featured ? ' menu-item-featured' : '');
        var html = '<div class="' + cls + '"><div class="item-info"><div class="item-name">' + _s(item.name) + '</div>';
        if (item.description) html += '<div class="item-desc">' + _s(item.description) + '</div>';
        html += '</div><div class="item-price">' + _s(item.price || '') + '</div></div>';
        return html;
      }).join('');
    });

    /* Featured tab — items marked featured:true across all categories */
    var fc = document.getElementById('kmc-menu-food-content');
    if (fc) {
      var featItems = allFood.filter(function (item) { return item.featured && item.available !== false; });
      if (!featItems.length) {
        fc.innerHTML = '<p style="color:var(--cream-dim);padding:2rem 0">No featured items yet.</p>';
      } else {
        fc.innerHTML = '<div class="menu-items-grid">' + featItems.map(function (item) {
          return '<div class="menu-item menu-item-featured"><div class="item-info"><div class="item-name">' + _s(item.name) + '</div>' +
            (item.description ? '<div class="item-desc">' + _s(item.description) + '</div>' : '') +
            '</div><div class="item-price">' + _s(item.price || '') + '</div></div>';
        }).join('') + '</div>';
      }
    }
  }

  /* ── ABOUT ── */

  function renderAbout() {
    var teamList = document.getElementById('kmc-team-list');
    if (teamList) {
      var th = '';
      /* Photo src and name passed through _a() for attribute safety; bio/role through _s() */
      KMCData.get('team').forEach(function (m) {
        th += '<div class="reveal" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:2rem;text-align:center;">';
        if (m.photo) {
          th += '<img src="' + _a(m.photo) + '" alt="' + _a(m.name) + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin:0 auto 1rem;" />';
        } else {
          th += '<div style="width:80px;height:80px;border-radius:50%;background:var(--gold-dim);margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:2rem;">&#128100;</div>';
        }
        th += '<h3 style="font-family:var(--font-serif);font-size:1.2rem;color:var(--cream);">' + _s(m.name) + '</h3>';
        th += '<p style="font-size:0.75rem;color:var(--gold);letter-spacing:0.1em;text-transform:uppercase;margin:0.25rem 0 0.75rem;">' + _s(m.role) + '</p>';
        if (m.bio) th += '<p style="font-size:0.85rem;color:var(--cream-dim);line-height:1.7;">' + _s(m.bio) + '</p>';
        th += '</div>';
      });
      teamList.innerHTML = th;
      if (window.KrisSite) window.KrisSite.initReveal(teamList);
    }

    /* Contact form rate limiting — attached via addEventListener, no onsubmit attribute */
    var form = document.querySelector('form[name="contact"]');
    if (form) {
      form.addEventListener('submit', function (e) {
        var RATE_KEY = 'kmc_contact_last';
        var last = parseInt(localStorage.getItem(RATE_KEY) || '0', 10);
        if (Date.now() - last < 60000) {
          var secs = Math.ceil((60000 - (Date.now() - last)) / 1000);
          alert('Please wait ' + secs + ' seconds before sending another message.');
          e.preventDefault(); return;
        }
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var message = document.getElementById('message').value.trim();
        if (!name || name.length < 2) { alert('Please enter your name (at least 2 characters).'); e.preventDefault(); return; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); e.preventDefault(); return; }
        if (!message || message.length < 10) { alert('Please enter a message (at least 10 characters).'); e.preventDefault(); return; }
        localStorage.setItem(RATE_KEY, Date.now().toString());
      });
    }
  }

  /* ── ENTRY POINT ── */

  var page = document.body && document.body.dataset.page;
  if (!page || !window.KMCData) return;

  (async function () {
    try {
      await KMCData.init();
      if (page === 'index') renderIndex();
      else if (page === 'gallery') renderGallery();
      else if (page === 'events') renderEvents();
      else if (page === 'menu') renderMenu();
      else if (page === 'about') renderAbout();
      renderAnnBar();
    } catch (err) {
      console.error('KMCData render error:', err);
    }
  })();
})();

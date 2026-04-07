# Firebase Firestore Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace localStorage with Firebase Firestore so paintings, events, and hero image sync instantly across all of Tim's devices.

**Architecture:** Single HTML file unchanged structurally. Firebase loads via CDN script tags. Three Firestore documents replace all localStorage reads/writes. Anonymous Auth gates write access — Tim's login experience is identical to today.

**Tech Stack:** Firebase 9.x compat SDK (app, firestore, auth) via gstatic.com CDN. No build step. No npm.

**Prerequisites:** Jorge must create a Firebase project and provide the config object before Task 3. Steps:
1. Go to console.firebase.google.com → New Project → name it "doberts-canvas"
2. Add a Web app → copy the firebaseConfig object
3. Enable Firestore (Build → Firestore Database → Create database → Start in **production mode**)
4. Enable Anonymous Auth (Build → Authentication → Sign-in method → Anonymous → Enable)
5. In Firestore → Rules tab, paste and publish these rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**File modified:** `doberts-canvas/index.html` (the only file)

---

### Task 1: Update Content Security Policy for Firebase

The current CSP blocks Firebase CDN scripts and API calls. Must update before Firebase will work.

**Files:**
- Modify: `doberts-canvas/index.html:20`

- [ ] **Step 1: Read current CSP**

Open `doberts-canvas/index.html` line 20. The current CSP is:
```
default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-src https://www.google.com https://maps.google.com; frame-ancestors 'none';
```

- [ ] **Step 2: Replace the CSP meta tag**

Find and replace the entire Content-Security-Policy meta tag content on line 20:

Old:
```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-src https://www.google.com https://maps.google.com; frame-ancestors 'none';"/>
```

New:
```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://firestore.googleapis.com https://firebase.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com; frame-src https://www.google.com https://maps.google.com; frame-ancestors 'none';"/>
```

Key changes:
- `script-src` adds `https://www.gstatic.com` (Firebase SDK CDN)
- `connect-src` adds four Firebase API domains
- `img-src` adds `https:` (allows loading painting images from any https URL)

- [ ] **Step 3: Verify in browser**

Open `doberts-canvas/index.html` in Chrome. Open DevTools Console. There should be no CSP errors on load. The existing DOMPurify script from cdnjs should still load without errors.

- [ ] **Step 4: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "security: update CSP to allow Firebase SDK and API domains"
```

---

### Task 2: Add Firebase SDK Script Tags

Load Firebase app, Firestore, and Auth via CDN. No npm, no build step.

**Files:**
- Modify: `doberts-canvas/index.html` — after line 22 (after the DOMPurify script tag)

- [ ] **Step 1: Add Firebase SDK scripts after DOMPurify**

Find this line (line 22):
```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>
```

Add three lines immediately after it:
```html
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
```

- [ ] **Step 2: Verify SDK loads**

Open `doberts-canvas/index.html` in browser. Open DevTools Console. Run:
```js
typeof firebase
```
Expected output: `"object"`

Run:
```js
typeof firebase.firestore
```
Expected output: `"function"`

- [ ] **Step 3: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "deps: add Firebase 9.23 compat SDK (app, firestore, auth)"
```

---

### Task 3: Initialize Firebase App

Add the config block and initialize `db` and `auth` globals. **Requires Jorge's firebaseConfig object.**

**Files:**
- Modify: `doberts-canvas/index.html` — add a new `<script>` block after the three Firebase SDK script tags

- [ ] **Step 1: Add Firebase init script**

After the three Firebase SDK script tags from Task 2, add:
```html
  <script>
    // Firebase config — from Firebase Console > Project Settings > Your Apps
    const _fbApp = firebase.initializeApp({
      apiKey: "PASTE_API_KEY_HERE",
      authDomain: "PASTE_AUTH_DOMAIN_HERE",
      projectId: "PASTE_PROJECT_ID_HERE",
      storageBucket: "PASTE_STORAGE_BUCKET_HERE",
      messagingSenderId: "PASTE_MESSAGING_SENDER_ID_HERE",
      appId: "PASTE_APP_ID_HERE"
    });
    const db = firebase.firestore();
    const auth = firebase.auth();
  </script>
```

- [ ] **Step 2: Replace placeholders with Jorge's actual config values**

Jorge pastes the real firebaseConfig values (apiKey, authDomain, projectId, etc.) into the block above.

- [ ] **Step 3: Verify connection**

Open browser, open DevTools Console. Run:
```js
db.collection('test').doc('ping').set({ ts: Date.now() }).then(() => console.log('Firestore write OK')).catch(e => console.error('Firestore error:', e))
```

Expected: `Firestore error: Missing or insufficient permissions.`

This is correct — unauthenticated writes are blocked by the security rules. The connection itself works (no network errors, no CSP errors).

- [ ] **Step 4: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "feat: initialize Firebase app, Firestore, and Auth"
```

---

### Task 4: Add Anonymous Auth to Admin Login and Logout

When Tim enters the correct password, sign him in anonymously to Firebase so his writes are permitted.

**Files:**
- Modify: `doberts-canvas/index.html` — GS module `adminLogin` function (~line 1397) and `adminLogout` function (~line 1408)

- [ ] **Step 1: Update adminLogin to sign in anonymously on success**

Find this block (around line 1397):
```js
      if(hash===PW){
        loggedIn=true; _failCount=0; _lockUntil=null; localStorage.removeItem('_adminLock');
        _resetInactivity();
        _showMain(); switchTab('add'); checkStorage();
```

Replace with:
```js
      if(hash===PW){
        loggedIn=true; _failCount=0; _lockUntil=null; localStorage.removeItem('_adminLock');
        _resetInactivity();
        auth.signInAnonymously().catch(e=>console.warn('Firebase auth error:',e));
        _showMain(); switchTab('add'); checkStorage();
```

- [ ] **Step 2: Update adminLogout to sign out of Firebase**

Find this block (around line 1408):
```js
    function adminLogout(){
      loggedIn=false; editId=null;
      if(_inactivityTimer){ clearTimeout(_inactivityTimer); _inactivityTimer=null; }
      closeAdmin();
    }
```

Replace with:
```js
    function adminLogout(){
      loggedIn=false; editId=null;
      if(_inactivityTimer){ clearTimeout(_inactivityTimer); _inactivityTimer=null; }
      auth.signOut().catch(e=>console.warn('Firebase signOut error:',e));
      closeAdmin();
    }
```

- [ ] **Step 3: Verify auth in browser**

Open browser. Open DevTools Console. Open the admin panel (type `timadmin` on the page or click the lock icon). Enter password `doberts2026`. After logging in, run in console:
```js
auth.currentUser
```
Expected: A user object with `isAnonymous: true`. Not null.

After clicking the logout button (or closing admin), run:
```js
auth.currentUser
```
Expected: `null`

- [ ] **Step 4: Verify Firebase write now works when logged in**

While logged in as admin, run in console:
```js
db.collection('test').doc('ping').set({ ts: Date.now() }).then(() => console.log('Write OK')).catch(e => console.error(e))
```
Expected: `Write OK`

- [ ] **Step 5: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "feat: sign in to Firebase anonymously on admin login"
```

---

### Task 5: Replace GS load() and save() with Firestore

Swap the paintings storage from localStorage to Firestore. The `paintings` array shape does not change.

**Files:**
- Modify: `doberts-canvas/index.html` — GS module `load()` (~line 1230), `save()` (~line 1241), `checkStorage()` (~line 1245), and `init()` (~line 1601)

- [ ] **Step 1: Replace load() with async Firestore version**

Find:
```js
    function load(){
      try{ const s=localStorage.getItem(KEY); paintings=s?JSON.parse(s):null; }
      catch(e){ paintings=null; }
      if(!localStorage.getItem(INIT_FLAG)){
        paintings=DEFAULT_PAINTINGS.map(function(p){return Object.assign({},p);});
        localStorage.setItem(INIT_FLAG,'true');
        try{ localStorage.setItem(KEY,JSON.stringify(paintings)); } catch(e){}
      } else if(!paintings) {
        paintings=[];
      }
    }
```

Replace with:
```js
    async function load(){
      try{
        const snap=await db.collection('paintings').doc('data').get();
        if(snap.exists){
          paintings=snap.data().list||[];
        } else {
          paintings=DEFAULT_PAINTINGS.map(function(p){return Object.assign({},p);});
          await db.collection('paintings').doc('data').set({list:paintings});
        }
      } catch(e){
        console.warn('Firestore load error, falling back to localStorage:',e);
        try{ const s=localStorage.getItem(KEY); paintings=s?JSON.parse(s):[]; }
        catch(e2){ paintings=[]; }
      }
    }
```

- [ ] **Step 2: Replace save() with async Firestore version**

Find:
```js
    function save(){
      try{ localStorage.setItem(KEY,JSON.stringify(paintings)); checkStorage(); }
      catch(e){ if(e.name==='QuotaExceededError') alert('Storage full. Export a backup and remove paintings with large uploaded images, then re-add via URL.'); }
    }
```

Replace with:
```js
    async function save(){
      try{
        await db.collection('paintings').doc('data').set({list:paintings});
        try{ localStorage.setItem(KEY,JSON.stringify(paintings)); } catch(e){}
      } catch(e){
        alert('Cloud sync error saving paintings. Check your connection and try again.');
        console.error('Firestore save error:',e);
      }
    }
```

- [ ] **Step 3: Update checkStorage() to reflect cloud storage**

Find:
```js
    function checkStorage(){
      try{
        const b=new Blob([localStorage.getItem(KEY)||'']).size;
        const pct=Math.min((b/(5*1024*1024))*100,100);
        const bar=document.getElementById('storage-bar-fill');
        const lbl=document.getElementById('storage-label');
        if(bar){bar.style.width=pct+'%'; bar.className='storage-bar-fill'+(pct>75?' warn':'');}
        if(lbl) lbl.textContent=Math.round(b/1024)+' KB used of ~5 MB';
        if(b>4*1024*1024) console.warn('Gallery storage high:',Math.round(b/1024)+'KB');
      }catch(e){}
    }
```

Replace with:
```js
    function checkStorage(){
      const bar=document.getElementById('storage-bar-fill');
      const lbl=document.getElementById('storage-label');
      if(bar){bar.style.width='0%';}
      if(lbl) lbl.textContent='Cloud storage active — '+paintings.length+' paintings synced';
    }
```

- [ ] **Step 4: Make init() async and await load()**

Find:
```js
    function init(){
      load(); renderGallery();
```

Replace with:
```js
    async function init(){
      await load(); renderGallery();
```

- [ ] **Step 5: Verify in browser**

Open browser. Open DevTools Network tab — filter by "firestore". Reload the page. You should see a Firestore GET request to `/paintings/data`.

Open DevTools Console. Run:
```js
GS
```
The gallery should have loaded paintings. If Firestore was empty before, it just seeded from DEFAULT_PAINTINGS.

Check the Firebase Console → Firestore → Data. You should see a `paintings` collection with a `data` document containing a `list` array of painting objects.

- [ ] **Step 6: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "feat: replace GS localStorage with Firestore for paintings"
```

---

### Task 6: Replace ES load() and save() with Firestore

Swap events storage from localStorage to Firestore.

**Files:**
- Modify: `doberts-canvas/index.html` — ES module `load()` (~line 1697), `save()` (~line 1698), and `init()` (~line 1807)

- [ ] **Step 1: Replace ES load() with async Firestore version**

Find:
```js
    function load(){ try{ const s=localStorage.getItem(KEY); events=s?JSON.parse(s):SAMPLE.map(e=>({...e})); } catch(e){ events=SAMPLE.map(e=>({...e})); } }
```

Replace with:
```js
    async function load(){
      try{
        const snap=await db.collection('events').doc('data').get();
        if(snap.exists){
          events=snap.data().list||[];
        } else {
          events=SAMPLE.map(e=>({...e}));
          await db.collection('events').doc('data').set({list:events});
        }
      } catch(e){
        console.warn('Firestore events load error, falling back to localStorage:',e);
        try{ const s=localStorage.getItem(KEY); events=s?JSON.parse(s):SAMPLE.map(ev=>({...ev})); }
        catch(e2){ events=SAMPLE.map(ev=>({...ev})); }
      }
    }
```

- [ ] **Step 2: Replace ES save() with async Firestore version**

Find:
```js
    function save(){ try{ localStorage.setItem(KEY,JSON.stringify(events)); } catch(e){ alert('Storage error saving events.'); } }
```

Replace with:
```js
    async function save(){
      try{
        await db.collection('events').doc('data').set({list:events});
        try{ localStorage.setItem(KEY,JSON.stringify(events)); } catch(e){}
      } catch(e){
        alert('Cloud sync error saving events. Check your connection and try again.');
        console.error('Firestore events save error:',e);
      }
    }
```

- [ ] **Step 3: Make ES init() async and await load()**

Find:
```js
    function init(){
      load(); renderPublic();
```

Replace with:
```js
    async function init(){
      await load(); renderPublic();
```

- [ ] **Step 4: Verify in browser**

Reload the page. Check DevTools Network → filter "firestore" — you should see GET requests for both `/paintings/data` and `/events/data`.

Check Firebase Console → Firestore → Data. An `events` collection should now exist with a `data` document.

Open admin panel → Events tab. Existing events should display. Add a test event, save. Verify it appears in Firebase Console immediately.

- [ ] **Step 5: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "feat: replace ES localStorage with Firestore for events"
```

---

### Task 7: Replace heroImage localStorage with Firestore

The hero image selection (set from admin panel) must also sync across devices.

**Files:**
- Modify: `doberts-canvas/index.html` — hero IIFE (~line 1046) and `setHeroPainting()` function (~line 1052)

- [ ] **Step 1: Replace the hero image load IIFE**

Find:
```js
  // Hero background
  (function(){
    var stored = localStorage.getItem('heroImage');
    var heroEl = document.getElementById('hero-bg');
    if(heroEl && stored && /^[a-zA-Z0-9/_\-. ]+$/.test(stored)) heroEl.style.backgroundImage = "url('" + stored + "')";
  })();
```

Replace with:
```js
  // Hero background
  (function(){
    var heroEl = document.getElementById('hero-bg');
    db.collection('settings').doc('site').get().then(function(snap){
      if(snap.exists && snap.data().heroImage){
        var src = snap.data().heroImage;
        if(heroEl && /^[a-zA-Z0-9/_\-. ]+$/.test(src)) heroEl.style.backgroundImage = "url('" + src + "')";
      }
    }).catch(function(){
      var stored = localStorage.getItem('heroImage');
      if(heroEl && stored && /^[a-zA-Z0-9/_\-. ]+$/.test(stored)) heroEl.style.backgroundImage = "url('" + stored + "')";
    });
  })();
```

- [ ] **Step 2: Replace setHeroPainting() to write to Firestore**

Find:
```js
  function setHeroPainting(btn, src) {
    localStorage.setItem('heroImage', src);
    var heroEl = document.getElementById('hero-bg');
    if(heroEl) heroEl.style.backgroundImage = "url('" + src + "')";
    var orig = btn.textContent;
    btn.textContent = '✓ Set';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--charcoal)';
    setTimeout(function(){ btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1500);
  }
```

Replace with:
```js
  function setHeroPainting(btn, src) {
    var heroEl = document.getElementById('hero-bg');
    if(heroEl) heroEl.style.backgroundImage = "url('" + src + "')";
    db.collection('settings').doc('site').set({heroImage: src}, {merge: true}).catch(function(e){
      console.warn('Failed to save hero image to Firestore:', e);
    });
    localStorage.setItem('heroImage', src);
    var orig = btn.textContent;
    btn.textContent = '✓ Set';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--charcoal)';
    setTimeout(function(){ btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1500);
  }
```

- [ ] **Step 3: Verify in browser**

Open admin panel. In "All Paintings" tab, click the "Hero" button on any painting. The hero image should update immediately.

Check Firebase Console → Firestore → `settings/site` document. It should contain `{ "heroImage": "doberts-images/IMG_XXXX.JPG" }`.

Reload the page on a different browser (or incognito window). The hero image should match what Tim set.

- [ ] **Step 4: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "feat: sync hero image selection via Firestore"
```

---

### Task 8: Update INIT Block to Await Both Modules

`GS.init()` and `ES.init()` are now async. The init block at the bottom must handle this.

**Files:**
- Modify: `doberts-canvas/index.html` — lines 1817-1819

- [ ] **Step 1: Update the INIT block**

Find:
```js
  // ── INIT ──────────────────────────────────────────────────
  GS.init();
  ES.init();
```

Replace with:
```js
  // ── INIT ──────────────────────────────────────────────────
  Promise.all([GS.init(), ES.init()]).catch(function(e){
    console.error('Init error:', e);
  });
```

- [ ] **Step 2: Verify no console errors on load**

Reload the page. DevTools Console should show no errors. The gallery grid should populate within ~1 second (Firestore first-load latency).

- [ ] **Step 3: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "fix: await async GS.init() and ES.init() on page load"
```

---

### Task 9: Add Migration Button to Backup Tab

Give Tim (or Jorge) a one-time button to push existing localStorage data up to Firestore. After it runs, the button disappears permanently.

**Files:**
- Modify: `doberts-canvas/index.html` — backup tab HTML (~line 635) and GS module return object (~line 1625)

- [ ] **Step 1: Add migration box to backup tab HTML**

Find:
```html
        <div class="backup-box" style="margin-bottom:0;">
          <h4>Import Backup</h4>
```

Replace with:
```html
        <div class="backup-box" id="migrate-box" style="margin-bottom:0;display:none;">
          <h4>Migrate to Cloud</h4>
          <p>One-time migration: pushes all data from this device's browser storage up to Firestore. Run this once from the device that has your most recent data, then this button will disappear.</p>
          <button class="admin-btn" onclick="GS.migrateToCloud()">Migrate to Cloud Now</button>
        </div>
        <div class="backup-box" style="margin-bottom:0;">
          <h4>Import Backup</h4>
```

- [ ] **Step 2: Add migrateToCloud() function to GS module**

Find the `// ─ Backup ──` section (around line 1566). After the `importJSON` function and before the `// ─ Keyboard shortcut` comment, add:

```js
    function migrateToCloud(){
      if(!confirm('Migrate all data from this device to Firestore cloud storage? Run this once from your most up-to-date device.')) return;
      var migratePaintings = db.collection('paintings').doc('data').set({list:paintings});
      var ls_events;
      try{ ls_events=JSON.parse(localStorage.getItem('doberts_events_v1'))||[]; }catch(e){ ls_events=[]; }
      var migrateEvents = db.collection('events').doc('data').set({list:ls_events});
      var ls_hero = localStorage.getItem('heroImage');
      var migrateSettings = ls_hero
        ? db.collection('settings').doc('site').set({heroImage:ls_hero},{merge:true})
        : Promise.resolve();
      Promise.all([migratePaintings, migrateEvents, migrateSettings])
        .then(function(){
          localStorage.setItem('doberts_migrated_v1','true');
          document.getElementById('migrate-box').style.display='none';
          alert('Migration complete! Your data is now in Firestore and will sync across all devices.');
        })
        .catch(function(e){
          alert('Migration error: '+e.message+'. Make sure you are logged in as admin.');
          console.error('Migration error:',e);
        });
    }
```

- [ ] **Step 3: Expose migrateToCloud in GS return object**

Find:
```js
    return{init,openAdmin,closeAdmin,adminLogin,adminLogout,switchTab,cancelEdit,
      savePainting,startEdit,deletePainting,previewUrl,
      setFilter,setSort,toggleSold,openLightbox,closeLightbox,prevLightbox,nextLightbox,
      dragStart,dragOver,dragLeave,drop,deleteSeries,exportJSON,
      handleImportFile:e=>importJSON(e.target.files[0]),
      renderAdminList,renderSeriesManager};
```

Replace with:
```js
    return{init,openAdmin,closeAdmin,adminLogin,adminLogout,switchTab,cancelEdit,
      savePainting,startEdit,deletePainting,previewUrl,
      setFilter,setSort,toggleSold,openLightbox,closeLightbox,prevLightbox,nextLightbox,
      dragStart,dragOver,dragLeave,drop,deleteSeries,exportJSON,migrateToCloud,
      handleImportFile:e=>importJSON(e.target.files[0]),
      renderAdminList,renderSeriesManager};
```

- [ ] **Step 4: Show migration button when localStorage has data and not yet migrated**

Find `function switchTab(tab){` (around line 1413). After `if(tab==='backup') checkStorage();` add:

```js
      if(tab==='backup'){
        var migBox=document.getElementById('migrate-box');
        if(migBox){
          var alreadyMigrated=localStorage.getItem('doberts_migrated_v1');
          var hasLocalData=localStorage.getItem('doberts_gallery_v2')||localStorage.getItem('doberts_events_v1');
          migBox.style.display=(hasLocalData&&!alreadyMigrated)?'block':'none';
        }
      }
```

- [ ] **Step 5: Verify migration button behavior**

Open admin panel → Backup tab.
- If the browser has localStorage data from before the Firebase migration AND has not been migrated: button is visible.
- If already migrated (flag set): button is hidden.
- Click "Migrate to Cloud Now" → confirm → wait → "Migration complete!" alert → button disappears.
- Check Firebase Console: `paintings/data`, `events/data`, and `settings/site` documents all updated.

- [ ] **Step 6: Commit**

```bash
git add doberts-canvas/index.html
git commit -m "feat: add one-time Migrate to Cloud button in admin Backup tab"
```

---

### Task 10: End-to-End Verification and Deploy

Verify the full flow across two devices, then deploy to Netlify.

**Files:** None — verification and deploy only.

- [ ] **Step 1: Full single-device smoke test**

Open `doberts-canvas/index.html` in browser. Check:
- [ ] Gallery loads with paintings (no blank grid, no console errors)
- [ ] Events section shows upcoming events
- [ ] Hero image loads
- [ ] Admin login works (password `doberts2026`)
- [ ] Add a test painting in admin → gallery updates immediately
- [ ] Delete the test painting → gallery updates immediately
- [ ] Add a test event → events section updates immediately
- [ ] Delete the test event
- [ ] Set a hero image via the Hero button → hero updates immediately

- [ ] **Step 2: Cross-device test**

Deploy to Netlify (see Step 3). On Tim's iPad:
- Open the live site
- Log into admin
- Add a painting with title "Cross Device Test"
- On your desktop browser, reload the live site — the painting should appear

Delete "Cross Device Test" from admin on desktop. Reload on iPad — it should be gone.

- [ ] **Step 3: Deploy to Netlify**

```bash
# If using Netlify CLI:
netlify deploy --prod --dir doberts-canvas

# Or use the Netlify MCP deploy tool if available
```

Or drag-drop the `doberts-canvas/` folder to the Netlify dashboard for dobertscanvas.netlify.app.

- [ ] **Step 4: Run migration on live site**

On the device that has Tim's most current data (his iPad or your machine with the imported JSON):
1. Open https://www.dobertscanvas.com
2. Log into admin
3. Go to Backup tab
4. Click "Migrate to Cloud Now"
5. Confirm → wait for success message

- [ ] **Step 5: Verify live site on fresh device**

Open the live site in an incognito window or fresh browser. The gallery and events should match what was migrated. No login required to view.

- [ ] **Step 6: Final commit**

```bash
git add doberts-canvas/index.html
git commit -m "feat: Firebase Firestore sync complete — paintings, events, and hero image now cloud-synced"
```

---

## Key localStorage Keys Reference

For the migration function:
- Paintings: `doberts_gallery_v2`
- Events: `doberts_events_v1`
- Hero image: `heroImage`
- Init flag: `doberts_init_v2`
- Migration flag (new): `doberts_migrated_v1`

## Firestore Document Structure

```
paintings/data   →  { list: [{ id, title, series, medium, size, price, available, featured, img, dateAdded }, ...] }
events/data      →  { list: [{ id, title, date, time, venue, address, description, link, free, price, featured, img, dateAdded }, ...] }
settings/site    →  { heroImage: "doberts-images/IMG_XXXX.JPG" }
```

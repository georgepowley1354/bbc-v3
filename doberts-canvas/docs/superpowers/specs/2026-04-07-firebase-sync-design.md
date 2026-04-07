# Dobert's Canvas — Firebase Firestore Sync

**Date:** 2026-04-07  
**Status:** Approved  
**Goal:** Replace localStorage with Firebase Firestore so Tim's paintings, events, and hero image changes sync instantly across all devices.

---

## Problem

The site stores all data (paintings, events, hero image) in browser localStorage. Each device has its own isolated copy. Tim editing on his iPad does not update the live site or any other device.

---

## Architecture

Single HTML file on Netlify stays unchanged structurally. Firebase loads via CDN script tags — no build step, no npm.

Three Firestore documents replace localStorage:

```
/paintings/data    → { list: [...painting objects...] }
/events/data       → { list: [...event objects...] }
/settings/site     → { heroImage: "doberts-images/IMG_2791.JPG" }
```

Arrays stored as single documents (not one doc per item) — matches the current localStorage shape exactly, keeps reads to one fetch per collection.

---

## Auth & Security

- **Firebase Anonymous Auth** — when Tim enters the correct admin password, the site calls `signInAnonymously()` in the background. He gets a valid Firebase token without any visible login change.
- **Firestore Security Rules:**
  - `read: true` — public gallery always readable
  - `write: if request.auth != null` — only authenticated sessions can write
- Firebase API key lives in the HTML. This is expected and safe — security is enforced by rules, not by hiding the key.
- Tim's session stays active until he closes the tab.

---

## Code Changes

### Firebase setup (added to `<head>`)
```html
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-auth-compat.js"></script>
<script>
  const app = firebase.initializeApp({ /* config from Firebase console */ });
  const db = firebase.firestore();
  const auth = firebase.auth();
</script>
```

### GS module (paintings)
- `load()` → `db.collection('paintings').doc('data').get()` then `snap.data().list`
- `save()` → `db.collection('paintings').doc('data').set({ list: paintings })`

### ES module (events)
- `load()` → `db.collection('events').doc('data').get()` then `snap.data().list`
- `save()` → `db.collection('events').doc('data').set({ list: events })`

### Hero image
- `setHeroPainting()` → `db.collection('settings').doc('site').set({ heroImage: src }, { merge: true })`
- On page load → read `settings/site` and apply heroImage

### Admin login
- On successful password check → `auth.signInAnonymously()`
- On admin close/logout → `auth.signOut()`

### Migration button
- Added to the Backup tab in the admin panel
- Reads current localStorage data and writes it to Firestore
- Shows once; disappears after successful migration (sets a `migrated` flag in localStorage)

---

## Data Model

### Painting object (unchanged from current)
```json
{
  "id": "abc123",
  "title": "Morning Tide",
  "series": "Scenic",
  "price": "",
  "sold": false,
  "featured": false,
  "img": "doberts-images/IMG_2791.JPG",
  "dateAdded": 1712345678000
}
```

### Event object (unchanged from current)
```json
{
  "id": "evt456",
  "name": "Spring Art Walk",
  "date": "2026-05-10",
  "venue": "Clifton Park Center",
  "description": "...",
  "img": "",
  "dateAdded": 1712345678000
}
```

---

## Migration Plan

1. You set up Firebase project (console.firebase.google.com)
   - Create project
   - Enable Firestore (production mode)
   - Enable Anonymous Auth
   - Copy config object
2. Hand config to Claude — added to `<head>` of `index.html`
3. Deploy updated HTML to Netlify
4. Tim (or you) logs into admin panel on any device with the current data → clicks "Migrate to Cloud"
5. Firestore is now the source of truth — migration button disappears

---

## Firestore Security Rules

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

---

## Scope

**In:** paintings, events, hero image  
**Out:** about text, testimonials, contact info, social links, nav — all stay hardcoded, updated manually when needed

---

## Success Criteria

- Tim edits a painting on his iPad → visible on the live site within 2 seconds
- Tim adds/deletes an event on his iPad → visible on the live site within 2 seconds
- Tim sets a hero image → updates on all devices within 2 seconds
- No change to the public-facing UI
- No change to Tim's admin panel workflow

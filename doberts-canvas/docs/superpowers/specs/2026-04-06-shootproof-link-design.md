# Design Spec: ShootProof "See More Works" Link

**Date:** 2026-04-06  
**Project:** Dobert's Canvas  
**File:** `doberts-canvas/doberts-canvas-v5.html`

---

## Problem

The on-site gallery uses localStorage to store paintings. This means Tim's uploaded paintings only appear on the device and browser he added them from — visitors on any other browser see an empty gallery. Tim already has a professional portfolio at `https://dobertscanvas.shootproof.com/` that solves this problem entirely.

## Solution

Add a "See More Works →" button below the gallery filter tabs that links visitors to the ShootProof gallery. No database, no backend, no sync required. Tim manages his portfolio on ShootProof; the site just drives traffic there.

---

## Design

### Placement
Centered on its own line, below the gallery filter tab row (below "Current Works"). Small top margin to give breathing room from the filters above.

### Button
- **Label:** `See More Works →`
- **Style:** `btn-light` — matches the existing "Inquire About a Piece" and "Fine Art Prints Available" buttons at the bottom of the gallery section for visual consistency
- **Link:** `https://dobertscanvas.shootproof.com/`
- **Behavior:** Opens in a new tab (`target="_blank" rel="noopener noreferrer"`)

### HTML
```html
<div style="text-align:center;margin-top:1.5rem;">
  <a href="https://dobertscanvas.shootproof.com/" class="btn-light" target="_blank" rel="noopener noreferrer">See More Works &rarr;</a>
</div>
```

This div is inserted immediately after the `.gallery-filter` div (the filter tabs container) and before the gallery grid.

---

## Scope

- One `<div>` with one `<a>` tag added to `doberts-canvas-v5.html`
- No changes to existing filter tabs, gallery grid, admin panel, or bottom CTA buttons
- No new CSS required — `btn-light` already defined

---

## Out of Scope

- Removing or replacing the existing localStorage gallery system (future decision)
- Embedding the ShootProof gallery inline via iframe
- Adding a nav link (can be revisited later)

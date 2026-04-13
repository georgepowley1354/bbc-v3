---
phase: 05-contact-page
audited: 2026-04-12
baseline: abstract 6-pillar standards (no UI-SPEC.md)
screenshots: captured (http://localhost:4000/contact)
---

# Phase 05 — UI Review

**Audited:** 2026-04-12
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md)
**Screenshots:** Captured at http://localhost:4000/contact (desktop 1440x900, mobile 375x812, full-page)

**Note on screenshot rendering:** All `whileInView` form fields start in `opacity: 0 / y: 32` (Framer Motion `initial="hidden"`) and only become visible after scroll triggers in a live browser. Static Playwright screenshots capture the pre-hydration state, leaving form fields below the fold invisible in captures. The hero strip and first two form rows are visible. All audit findings below are grounded in both code review and screenshot evidence.

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | CTAs and field labels are specific; error copy uses two conflicting messages for the same failure state |
| 2. Visuals | 3/4 | Strong two-section hierarchy; form fields lack visible focus ring on the stagger container, and the textarea border style diverges from inputs |
| 3. Color | 4/4 | Clean token usage throughout; no hardcoded hex values; red-600 for errors is the only non-token and is appropriate |
| 4. Typography | 4/4 | Two fonts, four sizes, consistent label treatment — matches editorial system |
| 5. Spacing | 3/4 | Scale is coherent; arbitrary `[11px]`, `[0.15em]`, `[0.2em]`, `[140px]` values used consistently but bypass the token system |
| 6. Experience Design | 3/4 | Excellent state coverage for a form; `whileInView` on the stagger container causes a flash-of-invisible-content on fast connections before JS hydrates |

**Overall: 20/24**

---

## Top 3 Priority Fixes

1. **Duplicate/conflicting error copy** — Users with JS errors see two different messages for the same failure: the `aria-live` announcer says "Submission failed. Please try again or email us directly." while the visible error paragraph says "Something went wrong. Please try again or email us directly at hello@verdantdesign.com". Screen reader users get a shorter message with no email; sighted users get the full one. Align both to the same string. Fix: in `ContactForm.tsx` line 119, change the `aria-live` error string to match line 386 exactly: `'Something went wrong. Please try again or email us directly at hello@verdantdesign.com'`.

2. **whileInView on the stagger container causes pre-hydration blank form** — The outer `MotionDiv` at line 122 uses `whileInView="visible"` with `initial="hidden"` (opacity 0). On slow connections or before JS hydrates, the entire form is invisible. This was confirmed in screenshots — only the hero renders above the fold, and the form section appears empty. Fix: change the stagger container from `whileInView` to `animate="visible"` (matching the success panel pattern on line 99), so the form is visible immediately on paint. Per-field `fadeUp` children can remain `whileInView` for the scroll entrance effect.

3. **Textarea border style diverges from input style** — All text/email/tel/select inputs use `border-b border-stone-dark` (bottom border only, giving a minimal underline aesthetic). The `description` textarea at line 332 uses `border border-stone-dark` (full box border). This breaks the visual system consistency. Fix: change the textarea to `border-b border-stone-dark py-3 px-0` to match the underline pattern, or document a deliberate intent to differentiate the textarea. Current behavior appears unintentional based on the plan's stated design system.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**Strengths:**
- Submit CTA is "Send Inquiry" — specific to the action, not generic "Submit"
- Success panel copy ("We'll be in touch within 48 hours.", "Marcus reviews every inquiry personally") is personal and luxury-appropriate
- Field labels are descriptive: "Full Name", "Email Address", "Project Description" — not generic single words
- Validation errors are specific: "Please enter a valid email address." not "Invalid input"
- Required field indicators use `*` with visible labels — UAT confirmed all 4 errors fire correctly

**Issues:**
- `ContactForm.tsx:119` aria-live error: `'Submission failed. Please try again or email us directly.'`
- `ContactForm.tsx:386` visible error: `'Something went wrong. Please try again or email us directly at hello@verdantdesign.com'`
- These are the same failure state with different wording and different amounts of information. Screen reader users miss the email fallback. Sighted users see inconsistent framing ("Something went wrong" vs "Submission failed").
- `ContactForm.tsx:390` — The button shows "Sending..." during submission. This is appropriate but there is no spinner or visual indicator beyond the text change. For a luxury brand context, a subtle loading indicator would elevate the submitting experience.

---

### Pillar 2: Visuals (3/4)

**Strengths:**
- Clear two-zone layout: dark `bg-forest-deep` hero + warm `bg-stone-warm` form section. Strong visual hierarchy, verified in screenshots.
- Hero eyebrow + headline pattern (`START YOUR PROJECT` / `Let's Build Something Lasting`) matches the editorial pattern established in other pages (about, process).
- Custom SVG chevrons on all three selects (`projectType`, `budgetRange`, `timeline`) replace browser-native dropdown chrome — consistent with the no-plugin Tailwind approach.
- `max-w-3xl` form container keeps the inquiry form at a readable width — not cluttered.
- Success panel uses the gold rule + eyebrow + display headline pattern matching the rest of the design system.

**Issues:**
- Textarea (`description` field, line 332) uses a full box border (`border border-stone-dark`) while all other fields use a bottom-border underline (`border-b border-stone-dark`). This creates a visual inconsistency — the textarea looks like a different design system from the rest of the form.
- The stagger container starts `hidden` (opacity 0) and only becomes visible after `whileInView` fires. In the full-page screenshot, the form area below the first two rows is an empty beige void — visually broken before animation runs. This is a flash-of-invisible-content issue rather than a pure animation concern.
- The `SectionHeader` component renders without animation (it's a pure Server Component with no Framer Motion). The hero content is immediately visible and static, while the form below fades in. This contrast is acceptable, but worth noting.
- No visible focus indicator beyond `focus:border-sage` on the input's bottom border — the focus treatment is subtle. It works with the design system but may be too low-contrast for WCAG AA without a complementary ring.

---

### Pillar 3: Color (4/4)

**Strengths:**
- Zero hardcoded hex values in `ContactForm.tsx` or `page.tsx`.
- All color usage references design tokens: `bg-forest-deep`, `bg-stone-warm`, `bg-gold`, `text-gold`, `text-text-primary`, `text-text-secondary`, `text-text-muted`, `border-stone-dark`, `focus:border-sage`.
- `text-red-600` is the only non-token color, used exclusively for inline validation errors and the submission error state. This is appropriate — red-600 is a semantically correct error color and matches WCAG contrast expectations on white/light backgrounds.
- Color usage follows the page's 60/30/10 principle: stone-warm (neutral base) dominates, forest-deep (dark) anchors the hero, sage/gold (accent) used only on functional elements (CTA button, eyebrow labels, focus borders, gold rule).
- The `bg-gold` on the 12px decorative rule in the success panel is the only decorative accent — appropriate restraint.

**Token audit (contact scope):**
- `bg-forest-deep`: 1 use (hero section)
- `bg-stone-warm`: 1 use (form section)
- `text-gold` / `bg-gold`: 2 uses (eyebrow label, decorative rule — both in success panel)
- `focus:border-sage`: 5 uses (one per interactive input/select/textarea)
- `text-red-600`: 5 uses (4 field errors + 1 submission error — all semantic)

---

### Pillar 4: Typography (4/4)

**Strengths:**
- Two font families: `font-display` (Cormorant Garamond, for the success panel h3 headline) and `font-sans` (DM Sans, for all labels, inputs, body copy, errors).
- Four sizes in use: `text-[11px]` (labels), `text-sm` (error messages), `text-base` (input values, body), `text-lg` (success panel body) — plus `text-4xl md:text-5xl` for the success panel display headline.
- Label treatment is perfectly consistent across all 7 fields: `font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block`. No deviations found.
- `text-[11px]` with `tracking-[0.15em]` matches the eyebrow label pattern used in `SectionHeader.tsx` (line 22) — the form labels are visually harmonious with the broader page system.
- No rogue font weights or sizes introduced.

**Minor observation:**
- The success panel eyebrow uses `tracking-[0.2em]` (line 103) while all field labels use `tracking-[0.15em]` (lines 155, 181, 213, etc.). This 0.05em difference is intentional by design (eyebrow text vs. field label), but it's an arbitrary value rather than a named token. Consistent and not a score-reducing issue at this scale.

---

### Pillar 5: Spacing (3/4)

**Strengths:**
- Primary rhythm uses Tailwind scale: `space-y-8` between field groups, `gap-6 md:gap-8` on grid rows, `py-3` on all inputs, `pt-4` on submit area, `mb-2` on all labels, `mb-4` on error messages.
- Page-level spacing uses semantic tokens: `pt-32`, `pb-section-sm md:pb-section`, `py-section` — consistent with other pages.
- Container padding follows the project pattern: `px-6 md:px-12 lg:px-20` (hero) and `px-6 md:px-12` (form section).

**Issues:**
- Six arbitrary values in use: `text-[11px]`, `tracking-[0.15em]`, `tracking-[0.2em]`, `min-h-[140px]` (textarea), and the two tracking variants. These are not Tailwind scale values.
  - `text-[11px]`: Used 7 times for label text — consistent but not in the default scale. Would benefit from a custom token `text-label` or similar.
  - `tracking-[0.15em]` and `tracking-[0.2em]`: Used for labels and eyebrow. The 0.15em value appears 7 times (field labels) and 0.2em appears twice (success panel eyebrow and SectionHeader eyebrow). Not a spacing concern per se, but arbitrary values.
  - `min-h-[140px]`: The textarea minimum height is arbitrary. Acceptable for a one-off component but could be a named token.
- These are stable, repeated arbitrary values (not random), so the score reflects "minor issues" rather than "notable gaps".

---

### Pillar 6: Experience Design (3/4)

**Strengths:**
- Full `FormStatus` state machine: `idle | submitting | success | error` — all four states are handled.
- Submit button disabled during `status === 'submitting'` — prevents double submissions.
- Button text changes to "Sending..." during submission — clear inline feedback.
- Per-field validation errors with `aria-describedby` linkage and `role="alert"` — WCAG 2.1 AA compliant.
- Form values preserved on error — user does not lose their work on network failure.
- `aria-live="polite"` announcer for screen readers covers both submitting and error states.
- Honeypot field (`bot-field`) correctly hidden from sighted users and screen readers (`aria-hidden="true"`, `tabIndex={-1}`).
- `useReducedMotion()` applied to all Framer Motion elements — full WCAG 2.3.3 compliance.
- Email format validation fires correctly (UAT test 4 passed).

**Issues:**
- `whileInView` on the stagger container (line 122–126) means the entire form starts at `opacity: 0` and `y: 32`. On page load, before JS hydrates and before the IntersectionObserver fires, the form section is invisible. In a fast browser this is imperceptible, but on slower connections or when the page is captured statically, the form is blank. The success panel correctly uses `animate="visible"` (not `whileInView`). The same pattern should apply to the form's outer stagger container. Individual field `fadeUp` wrappers can retain `whileInView`.
- No loading/skeleton state is shown during the initial page load — this is acceptable for a form that has no data-fetching requirement.
- No confirmation for destructive actions (clearing the form) — not applicable since there is no clear/reset button.
- The "Sending..." text-only indicator during submission has no visual spinner or progress cue. For a luxury brand positioning, a subtle animated indicator would better match the premium feel. Low priority but noted.

---

## Registry Safety

No `components.json` found — shadcn not initialized. Registry audit skipped.

---

## Files Audited

- `src/components/contact/ContactForm.tsx` (384 lines — primary audit target)
- `src/app/contact/page.tsx` (33 lines)
- `src/components/ui/Button.tsx` (60 lines — supporting component)
- `src/components/ui/SectionHeader.tsx` (48 lines — supporting component)
- `src/constants/animation.ts` (30 lines — animation tokens)
- `.planning/phases/05-contact-page/05-01-SUMMARY.md`
- `.planning/phases/05-contact-page/05-01-PLAN.md`
- `.planning/phases/05-contact-page/05-VERIFICATION.md`
- `.planning/phases/05-contact-page/05-UAT.md`
- Screenshots: `.planning/ui-reviews/05-verdant-20260412-214138/` (desktop full-page)
- Screenshots: `.planning/ui-reviews/05-verdant-20260412-214203/` (tall viewport)

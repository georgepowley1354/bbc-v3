---
phase: 05-contact-page
reviewed: 2026-04-12T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - src/types/index.ts
  - public/netlify-form-detect.html
  - src/components/contact/ContactForm.tsx
  - src/app/contact/page.tsx
findings:
  critical: 0
  warning: 5
  info: 4
  total: 9
status: issues_found
---

# Phase 05: Code Review Report

**Reviewed:** 2026-04-12
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Four files were reviewed covering the full contact page stack: the shared type definitions, the Netlify bot-detection mirror, the client-side form component, and the server-component page shell.

Overall the implementation is clean and well-structured. The Server/Client component split is correct, reduced-motion support is present on every animated element, and the Netlify Forms integration follows the documented pattern correctly. No critical security vulnerabilities were found.

Five warnings and four informational items were identified. The most impactful issues are: the honeypot field being submitted with a hardcoded empty string rather than left uncontrolled (giving Netlify false honeypot-pass signals), a missing `hidden` state on the `stagger` variant that will cause child `fadeUp` variants to not animate from their initial state, and a missing `aria-live` region for form-level status changes that leaves screen readers uninformed about submission outcomes.

---

## Findings Table

| ID | Severity | File | Line(s) | Summary |
|----|----------|------|---------|---------|
| WR-01 | Warning | ContactForm.tsx | 67 | Honeypot value hardcoded to empty string — bypasses Netlify's detection signal |
| WR-02 | Warning | ContactForm.tsx | 111–113 | `stagger` variant missing `hidden` state — child `fadeUp` animations may not fire |
| WR-03 | Warning | ContactForm.tsx | 109–383 | No `aria-live` region for form status — screen readers miss success/error transitions |
| WR-04 | Warning | ContactForm.tsx | 49–50 | Email validated only for presence, not format — invalid addresses will submit |
| WR-05 | Warning | ContactForm.tsx | 376 | `Button` spread props via `[key: string]: unknown` — `disabled` may not be typed as `boolean` |
| IN-01 | Info | types/index.ts | 5 | `Project.category` union diverges from `ContactFormValues.projectType` union |
| IN-02 | Info | netlify-form-detect.html | 15 | Honeypot `<input>` in detection HTML lacks `type="hidden"` — visible to some crawlers |
| IN-03 | Info | ContactForm.tsx | 129 | Inline no-op `onChange` handler on honeypot input is unnecessary |
| IN-04 | Info | ContactForm.tsx | 372–374 | Hardcoded support email in error message — should match a single source of truth |

---

## Warnings

### WR-01: Honeypot submitted as hardcoded empty string

**File:** `src/components/contact/ContactForm.tsx:67`

**Issue:** The `bot-field` value is hardcoded to `''` in the `encode()` call at submission time. Netlify's honeypot mechanism works by checking whether this field was filled in by a bot during the natural form interaction. By explicitly controlling its value in the POST body to an empty string, the form always looks like it passed the honeypot check even if a bot did fill it in, because the submitted value always overrides whatever a bot wrote into the DOM field. The correct pattern is to let the field be controlled by state — if a bot writes to it, the state will carry that value to the POST and Netlify will reject the submission.

**Fix:** Remove the hardcoded `'bot-field': ''` from the `encode()` call and instead include it from the form state. This requires adding `botField` to state (initialised as `''`) and wiring the honeypot input to it:

```tsx
// In emptyForm
const emptyForm = {
  ...
  botField: '',
}

// In ContactFormValues (or a local-only extension)
const [honeypot, setHoneypot] = useState('')

// Honeypot input
<input
  name="bot-field"
  className="hidden"
  aria-hidden="true"
  tabIndex={-1}
  autoComplete="off"
  value={honeypot}
  onChange={(e) => setHoneypot(e.target.value)}
/>

// In encode()
body: encode({
  'form-name': 'contact',
  'bot-field': honeypot,   // carries real value — bots reveal themselves
  ...
})
```

---

### WR-02: `stagger` variant missing `hidden` initial state

**File:** `src/components/contact/ContactForm.tsx:111–113`

**Issue:** The outer `MotionDiv` wrapper uses the `stagger` variant. Looking at `src/constants/animation.ts:22–24`, `stagger` only defines a `visible` state — it has no `hidden` state. Framer Motion propagates `initial` down to children, but the parent needs its own `hidden` definition for the `initial="hidden"` prop on the wrapper to be meaningful. Without it, the parent element has no `hidden` state to transition from, and depending on Framer Motion version behaviour, child `fadeUp` variants that rely on inheriting the parent's state may start in `visible` or behave inconsistently on first mount.

**Fix:** Add a `hidden` passthrough to the `stagger` constant so its own state is defined:

```ts
// src/constants/animation.ts
export const stagger = {
  hidden: {},   // transparent passthrough — children handle their own transforms
  visible: { transition: { staggerChildren: 0.12 } },
}
```

This is a one-line addition that makes the parent's state machine complete without changing any visual behaviour.

---

### WR-03: No `aria-live` region for status transitions

**File:** `src/components/contact/ContactForm.tsx:109–383`

**Issue:** When `status` transitions to `'success'`, the form is replaced by a success message rendered in the same `MotionDiv`. When `status` transitions to `'error'`, an inline error paragraph appears above the submit button. Neither change is announced to screen readers because there is no `aria-live` region wrapping the status-driven output. A keyboard-only or screen reader user who submits the form will receive no feedback.

**Fix:** Add a visually hidden `aria-live` region near the top of the component that reflects the current status:

```tsx
{/* Screen reader status announcer */}
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {status === 'success' && 'Your inquiry has been sent. We will respond within 48 hours.'}
  {status === 'error' && 'Submission failed. Please try again or email us directly.'}
  {status === 'submitting' && 'Sending your inquiry…'}
</div>
```

Place this before the conditional return for the success state and before the `<form>` element so it persists across the conditional render.

---

### WR-04: Email field validates presence only, not format

**File:** `src/components/contact/ContactForm.tsx:49–50`

**Issue:** The validation block checks `!values.email.trim()` (presence), but `type="email"` validation is bypassed by `noValidate` on the form element (line 119). This means a submission like `"not-an-email"` will pass client validation and be POSTed to Netlify. Netlify itself does not validate email format on Forms submissions, so the lead will land in the inbox with a broken reply-to address.

**Fix:** Add a basic format check alongside the presence check:

```ts
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!values.email.trim()) {
  errors.email = 'Email address is required.'
} else if (!emailPattern.test(values.email.trim())) {
  errors.email = 'Please enter a valid email address.'
}
```

---

### WR-05: `Button` receives `disabled` through an untyped spread

**File:** `src/components/contact/ContactForm.tsx:376`

**Issue:** `Button.tsx` declares its extra props as `[key: string]: unknown`. When `ContactForm` passes `disabled={status === 'submitting'}`, that prop travels through the spread `{...(rest as Record<string, unknown>)}` at line 53 of Button.tsx. TypeScript accepts this because of the index signature, but there is no enforcement that `disabled` is a `boolean`. More importantly, the `<button>` element receives `disabled` through an untyped spread that casts to `Record<string, unknown>`, which bypasses the native `ButtonHTMLAttributes` type-check. A future refactor of Button could silently drop or rename the prop without a compile error.

**Fix:** Extend the `ButtonProps` interface in `Button.tsx` to explicitly include `disabled`:

```tsx
interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  [key: string]: unknown
}
```

Adding `disabled` and `type` as explicit props gives TypeScript visibility over the two most common passthrough cases for form buttons.

---

## Info

### IN-01: `Project.category` and `ProjectType` unions are not aligned

**File:** `src/types/index.ts:5` and `35–41`

**Issue:** `Project.category` uses `'Hardscape' | 'Softscape' | 'Pool' | 'Kitchen' | 'Full Property'` while `ProjectType` (used by the contact form) uses `'Hardscape' | 'Softscape' | 'Pool & Water' | 'Outdoor Kitchen' | 'Full Property Design' | 'Maintenance Plan'`. The values differ in labelling (`'Pool'` vs `'Pool & Water'`, `'Kitchen'` vs `'Outdoor Kitchen'`, `'Full Property'` vs `'Full Property Design'`) and `ProjectType` has an extra member (`'Maintenance Plan'`). If any future code tries to map a selected project type back to a project category (e.g., for filtering the portfolio from the contact page), it will silently fail to match. Consider aligning the two unions or adding an explicit mapping constant.

---

### IN-02: Netlify detection form honeypot lacks `type="hidden"` on the bot field

**File:** `public/netlify-form-detect.html:15`

**Issue:** The honeypot `<input name="bot-field" />` in the detection HTML has no explicit `type` attribute. It defaults to `type="text"`, making it a visible text field in the (hidden) form. The form itself is hidden via the `hidden` attribute on `<form>`, so end users never see it, but some aggressive content indexers and accessibility scanners will flag an unlabelled visible text input inside a hidden form. Using `type="text"` also means some bots can auto-detect it as an obvious trap more easily than a truly hidden field.

**Fix:** This is a minor consistency issue. The field in the React component correctly uses `className="hidden"` and `aria-hidden="true"`, so the two are already asymmetric. You can either leave it as-is (Netlify does not require a specific type on the honeypot) or add `type="text" style="display:none"` to more closely mirror what Netlify recommends in its own docs.

---

### IN-03: No-op `onChange` handler on honeypot input is unnecessary

**File:** `src/components/contact/ContactForm.tsx:129`

**Issue:** The honeypot `<input>` has `onChange={() => {/* ignored */}}`. This is likely present to suppress React's controlled-but-no-onChange warning, but the field has no `value` prop, so it is already uncontrolled and does not generate that warning. The handler is dead code.

**Fix:** Remove the `onChange` prop from the honeypot input. Once WR-01 is addressed (adding a `value={honeypot}` prop), replace this with a real handler.

---

### IN-04: Support email hardcoded in error message

**File:** `src/components/contact/ContactForm.tsx:373`

**Issue:** The error state paragraph contains the literal string `hello@verdantdesign.com`. This is the only place in the reviewed files where a contact email appears. If the email address changes, it is easy to miss this inline string. It is also not linked (`<a href="mailto:...">`) so users on mobile cannot tap to open their mail client directly.

**Fix:** Extract the email to a project-level constant and wrap it in a `mailto:` link:

```tsx
// src/constants/site.ts (or similar)
export const CONTACT_EMAIL = 'hello@verdantdesign.com'

// In ContactForm.tsx
import { CONTACT_EMAIL } from '@/constants/site'

<p className="font-sans text-sm text-red-600 mb-4" role="alert">
  Something went wrong. Please try again or email us at{' '}
  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
    {CONTACT_EMAIL}
  </a>.
</p>
```

---

_Reviewed: 2026-04-12_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_

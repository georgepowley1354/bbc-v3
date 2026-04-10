# BBC v3 — Social Features Design Spec
**Date:** 2026-04-10
**Branch:** feature/social-features
**Scope:** Four additions to bbc-v3 — Calendly CTA, Newsletter, Meet the Team, AI Chatbot

---

## Overview

Four features added to the existing BBC v3 static site (Netlify-hosted, vanilla HTML/CSS/JS). No design changes to existing sections. No third-party services except the Anthropic API. Everything owned and controlled by BBC.

---

## Feature 1: "Book a Free Call" CTA

### What
A second CTA button added to the existing hero actions row alongside "Get a Free Quote".

### Details
- Button text: **"Book a Free Call"**
- Style: secondary/ghost (outline), not primary — "Get a Free Quote" remains the primary action
- Target: `#contact` for now, with `data-calendly="true"` attribute to make future Calendly URL swap trivial (one attribute change)
- Placement: hero actions `div.hero-actions`, after the existing primary button

### No new section needed. One new button element only.

---

## Feature 2: Newsletter Signup

### What
Email capture form added as a 4th column in the footer.

### Details
- Fields: email only (name is overkill for a newsletter)
- Heading: "Stay in the loop"
- Subtext: *"Tips for Capital Region business owners. No spam."*
- Submit label: "Subscribe"
- Backend: Netlify Forms — `data-netlify="true"`, `name="newsletter"`, honeypot field for spam
- Success state: inline message replaces the form ("You're in. We'll be in touch.")
- Submissions land in Netlify dashboard under form name `newsletter`
- Placement: new 4th column in `footer-inner` div, after `footer-social`

### No new files. HTML + small CSS addition to existing `styles.css`.

---

## Feature 3: Meet the Team

### What
New section inserted between Why Us (currently 02) and How It Works (currently 03). Existing section numbers shift: Process → 04, Work → 05, Testimonials → 06, Pricing → 07, FAQ → 08, Contact → 09.

### Layout
- Section label: "03 — The team"
- Heading: "Real people. Local builders."
- Subhead: *"We're not a remote agency or an AI content farm. We're two people in the Capital Region who care about making small businesses look their best online."*
- Two cards side by side on desktop, stacked on mobile
- Card anatomy:
  - Avatar: CSS-only placeholder square with centered initial letter "?" (no image files)
  - Name: "Coming Soon"
  - Role: "Coming Soon"
  - Bio: "More about this person coming soon."
  - No social links
- Card styles inherit from existing `price-card` pattern (dark bg, border, consistent with design system)
- Reveal animations consistent with other sections (`reveal` class)

### Files changed: `index.html` (new section), `styles.css` (team card styles)

---

## Feature 4: AI Chatbot

### Architecture

```
Browser (chatbot.js)
  → POST /api/chat (fetch with ReadableStream)
    → netlify/functions/chat.js
      → Anthropic API (claude-haiku-4-5, streaming)
        → tokens stream back to browser
          → chatbot.js renders word by word
```

### Widget UI (`bbc-v3/chatbot.js` + `bbc-v3/chatbot.css`)

**States:**
1. **Closed** — fixed bottom-right bubble, BBC accent color, chat icon
2. **Open** — panel slides up (300ms ease), 380px wide, full height up to 520px
3. **Typing** — animated dot indicator while waiting for first token
4. **Streaming** — text appears word by word as tokens arrive
5. **Lead nudge** — after 4+ exchanges or when pricing/getting-started is mentioned, bot offers to connect them with the team

**Panel anatomy:**
- Header: "BBC Assistant" + close button
- Message thread: scrollable, BBC messages left-aligned (dark bubble), user messages right-aligned (accent bubble)
- Input: text field + send button (Enter key or click)
- Lead capture: appears as an inline card in the chat thread — name + email fields, "Connect me" button — submits to Netlify Form `chatbot-leads`

**Styles:** Separate `chatbot.css` to keep `styles.css` clean. Uses existing CSS variables (`--c-bg`, `--c-accent`, `--c-text`, etc.) for full design system consistency.

### Netlify Function (`netlify/functions/chat.js`)

- Runtime: Node.js
- Trigger: POST `/api/chat`
- Input: `{ messages: [{role, content}] }` — full conversation history
- Output: Server-Sent Events stream of text tokens
- Auth: `ANTHROPIC_API_KEY` from Netlify environment variable
- Model: `claude-haiku-4-5` (fast, cheap, good enough for a chat widget)
- Max tokens: 400 (keeps responses concise)
- Temperature: 0.7

**System prompt (hardcoded in function):**
```
You are the BBC Assistant for Big Bad Coding, a hand-coded web design shop 
in the Capital Region of New York. You help visitors understand what BBC offers 
and connect them with the team.

WHAT YOU KNOW:
Services: Custom hand-coded websites (no page builders), local SEO, Google 
Business Profile setup.

Pricing:
- Starter: $799 — single-page site, mobile-first, contact form, 30-day support
- Standard: $1,499 — up to 5 pages, SEO foundation, 60-day support (most popular)
- Premium: $2,499 — everything in Standard + full SEO audit, Analytics setup, 
  3 months priority support, monthly performance report

Process: 3 steps — Discovery call → Design mockups → Launch. Most sites live 
in 2–4 weeks. Fixed-price quotes, no surprise invoices.

Key differentiators: Hand-coded (faster than WordPress/Wix), client owns 
everything outright, no monthly fees, local Capital Region team.

BEHAVIOR:
- Be direct and conversational. Match the no-BS tone of the site.
- Answer questions freely about services, pricing, and process.
- Do NOT quote custom prices or make promises outside the listed tiers.
- Do NOT pretend to be human if directly asked — say you're an AI assistant.
- After 4 exchanges or when someone asks about getting started/pricing, 
  offer to connect them: "Want someone from the team to reach out directly?"
- Keep responses under 3 sentences when possible. Be helpful, not verbose.
```

### Security
- API key: stored as `ANTHROPIC_API_KEY` Netlify env var only — never in code or repo
- Rate limiting: Netlify function default limits apply (26/second on free tier)
- Input sanitization: strip HTML tags from user input before sending to API
- Max message history sent: last 10 messages only (prevents prompt stuffing)

### Local Development
- `netlify dev` runs functions locally at `http://localhost:8888`
- `.env` file at project root: `ANTHROPIC_API_KEY=sk-ant-api03-...`
- `.env` added to `.gitignore`

### Files
```
bbc-v3/
  chatbot.js          ← widget UI, streaming fetch, lead capture form
  chatbot.css         ← all chatbot styles
  index.html          ← add <script> and <link> tags, chatbot HTML skeleton
netlify/
  functions/
    chat.js           ← serverless Claude proxy
.env                  ← ANTHROPIC_API_KEY (gitignored)
```

---

## Page Structure After All Changes

```
01 — Hero          (+ Book a Free Call secondary CTA)
02 — Services
03 — Why Us
04 — The team      (NEW)
05 — How it works  (renumbered)
06 — Work          (renumbered)
07 — Testimonials  (renumbered)
08 — Pricing       (renumbered)
09 — FAQ           (renumbered)
10 — Contact
Footer             (+ Newsletter column)
[Chatbot widget]   (floating, fixed position)
```

---

## Out of Scope
- Real team photos or bios (placeholder only)
- Calendly account setup (link placeholder only)
- Blog
- Any design changes to existing sections
- Mobile nav section number updates (labels are visual only, not navigation targets)

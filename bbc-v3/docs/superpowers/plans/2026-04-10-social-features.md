# BBC v3 Social Features — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four features to bbc-v3: "Book a Free Call" hero CTA, footer newsletter signup, "Meet the Team" section, and a Claude-powered AI chat widget — all on the existing static Netlify site.

**Architecture:** A `netlify.toml` at the project root configures the publish dir (`bbc-v3/`) and functions dir (`netlify/functions/`). The chat widget in `chatbot.js` POSTs conversation history to a Netlify Function which proxies to the Anthropic API using native `fetch` (no npm deps). Lead capture and newsletter use Netlify Forms.

**Tech Stack:** Vanilla HTML/CSS/JS, Netlify Functions (Node 18), Anthropic API (`claude-haiku-4-5-20251001`), Netlify Forms

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `netlify.toml` | **Create** at project root | Publish dir, functions dir config |
| `.env` | **Create** at project root | Local API key (gitignored) |
| `.gitignore` | **Modify** | Add `.env` entry |
| `netlify/functions/chat.js` | **Create** | Claude API proxy — receives messages array, returns reply JSON |
| `bbc-v3/chatbot.js` | **Create** | Chat widget UI, typewriter animation, lead capture form |
| `bbc-v3/chatbot.css` | **Create** | All chat widget styles using existing CSS vars |
| `bbc-v3/index.html` | **Modify** | Book a Call CTA, newsletter form, team section, chatbot HTML, link/script tags, renumber section labels |
| `bbc-v3/styles.css` | **Modify** | Team card styles, newsletter form styles, 4-col footer grid |

---

## Task 1: Project Setup

**Files:**
- Create: `netlify.toml` (project root)
- Create: `.env` (project root)
- Create: `netlify/functions/` directory
- Modify: `.gitignore` (project root)

- [ ] **Step 1: Create `netlify.toml` at project root (`C:/Users/georg/my-project/netlify.toml`)**

```toml
[build]
  publish = "bbc-v3"
  functions = "netlify/functions"

[dev]
  port = 8888
  targetPort = 8080
```

- [ ] **Step 2: Create the functions directory**

Run from `C:/Users/georg/my-project/`:

```bash
mkdir -p netlify/functions
```

- [ ] **Step 3: Create `.env` with the API key (`C:/Users/georg/my-project/.env`)**

```
ANTHROPIC_API_KEY=sk-ant-api03-H...
```

Replace `sk-ant-api03-H...` with the full key from console.anthropic.com.

- [ ] **Step 4: Add `.env` to `.gitignore`**

Open `C:/Users/georg/my-project/.gitignore` and add:

```
.env
```

- [ ] **Step 5: Verify Netlify CLI is available**

```bash
netlify --version
```

Expected: `netlify-cli/x.x.x ...`

If missing: `npm install -g netlify-cli`

- [ ] **Step 6: Commit**

```bash
git add netlify.toml netlify/ .gitignore
git commit -m "feat(bbc-v3): add netlify.toml and functions scaffold"
```

---

## Task 2: "Book a Free Call" CTA

**Files:**
- Modify: `bbc-v3/index.html` lines ~254-262 (hero-actions div)

- [ ] **Step 1: Locate the hero actions div in `bbc-v3/index.html`**

Find this block (~line 254):

```html
        <!-- CTAs -->
        <div class="hero-actions">
          <a href="#contact" class="btn-primary">
            Get a Free Quote
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
            </svg>
          </a>
          <a href="#work" class="btn-secondary">See our work</a>
        </div>
```

- [ ] **Step 2: Replace with two CTAs**

```html
        <!-- CTAs -->
        <div class="hero-actions">
          <a href="#contact" class="btn-primary">
            Get a Free Quote
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
            </svg>
          </a>
          <a href="#contact" class="btn-secondary" data-calendly="true">Book a Free Call</a>
        </div>
```

The `data-calendly="true"` marks this for a one-line future swap: change `href` to the Calendly URL and add `target="_blank" rel="noopener"`.

- [ ] **Step 3: Verify in browser**

Open `bbc-v3/index.html` directly. Hero should show two buttons: "Get a Free Quote" (orange) and "Book a Free Call" (outline). Both scroll to `#contact`.

- [ ] **Step 4: Commit**

```bash
git add bbc-v3/index.html
git commit -m "feat(bbc-v3): add Book a Free Call CTA to hero"
```

---

## Task 3: Newsletter Signup (Footer)

**Files:**
- Modify: `bbc-v3/index.html` — footer-inner div
- Modify: `bbc-v3/styles.css` — footer section
- Modify: `bbc-v3/script.js` — inline success handler

- [ ] **Step 1: Add newsletter column to footer in `bbc-v3/index.html`**

Find the closing tag of `footer-social` div (~line 1211). Insert the newsletter column immediately after it, before the closing `</div>` of `footer-inner`:

```html
      <!-- Newsletter -->
      <div class="footer-newsletter">
        <div class="footer-newsletter-title">Stay in the loop</div>
        <p class="footer-newsletter-sub">Tips for Capital Region business owners. No spam.</p>
        <form
          class="newsletter-form"
          name="newsletter"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          novalidate
          aria-label="Newsletter signup"
        >
          <input type="hidden" name="form-name" value="newsletter" />
          <p class="visually-hidden" aria-hidden="true">
            <label>Don't fill this: <input name="bot-field" /></label>
          </p>
          <div class="newsletter-row">
            <label class="visually-hidden" for="newsletter-email">Email address</label>
            <input
              class="newsletter-input"
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              autocomplete="email"
            />
            <button class="newsletter-btn" type="submit">Subscribe</button>
          </div>
          <p class="newsletter-success" id="newsletter-success" hidden aria-live="polite">
            You're in. We'll be in touch.
          </p>
        </form>
      </div>
```

- [ ] **Step 2: Add newsletter submit handler to `bbc-v3/script.js`**

Append at the bottom of `bbc-v3/script.js`:

```javascript
/* ───────────────────────────────────────────────────────
 * Newsletter form — show success inline, no page reload
 * ─────────────────────────────────────────────────────── */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('[name="email"]').value;
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'newsletter', email }).toString()
    });
    newsletterForm.querySelector('.newsletter-row').hidden = true;
    document.getElementById('newsletter-success').hidden = false;
  });
}
```

- [ ] **Step 3: Update footer grid to 4 columns in `bbc-v3/styles.css`**

Find (~line 1819):

```css
@media (min-width: 768px) {
  .footer-inner { grid-template-columns: 1fr 1fr 1fr; align-items: start; }
}
```

Replace with:

```css
@media (min-width: 768px) {
  .footer-inner { grid-template-columns: 1fr 1fr 1fr 1fr; align-items: start; }
}
```

- [ ] **Step 4: Add newsletter CSS to `bbc-v3/styles.css`**

Append after the `.footer-social` block:

```css
/* ── Newsletter ─────────────────────────────────────── */
.footer-newsletter-title {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--c-text-3);
  margin-bottom: var(--sp-5);
}

.footer-newsletter-sub {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  margin-bottom: var(--sp-4);
  line-height: var(--lh-relaxed);
}

.newsletter-row {
  display: flex;
  gap: var(--sp-2);
}

.newsletter-input {
  flex: 1;
  background: var(--c-surface);
  border: var(--border);
  color: var(--c-text);
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  min-width: 0;
  transition: border-color var(--t-fast);
}
.newsletter-input:focus {
  outline: none;
  border-color: var(--c-accent);
}
.newsletter-input::placeholder { color: var(--c-text-3); }

.newsletter-btn {
  background: var(--c-accent);
  color: #fff;
  border: none;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--t-fast);
  white-space: nowrap;
}
.newsletter-btn:hover { background: var(--c-accent-hover); }

.newsletter-success {
  font-size: var(--fs-sm);
  color: var(--c-accent);
  margin-top: var(--sp-3);
}
```

- [ ] **Step 5: Verify in browser**

Open `bbc-v3/index.html`. Footer should have 4 columns on desktop: Brand | Navigate | Find us | Stay in the loop. On narrow window, columns stack.

- [ ] **Step 6: Commit**

```bash
git add bbc-v3/index.html bbc-v3/styles.css bbc-v3/script.js
git commit -m "feat(bbc-v3): add newsletter signup to footer"
```

---

## Task 4: Meet the Team Section

**Files:**
- Modify: `bbc-v3/index.html` — insert section, renumber labels
- Modify: `bbc-v3/styles.css` — team card styles

- [ ] **Step 1: Renumber existing section labels in `bbc-v3/index.html`**

Use editor find-and-replace (exact match) for these strings:

| Find | Replace |
|------|---------|
| `03 — The process` | `04 — The process` |
| `04 — Work` | `05 — Work` |
| `05 — Social proof` | `06 — Social proof` |
| `06 — Pricing` | `07 — Pricing` |
| `07 — FAQ` | `08 — FAQ` |
| `08 — Contact` | `09 — Contact` |

- [ ] **Step 2: Insert Meet the Team section in `bbc-v3/index.html`**

Find the closing `</section>` of the Why Us / `#about` section (~line 412). Insert immediately after it, before the `HOW IT WORKS` comment:

```html

  <!-- ══════════════════════════════════════
       MEET THE TEAM
  ══════════════════════════════════════ -->
  <section id="team" aria-labelledby="team-heading">
    <div class="container">

      <div class="team-header reveal">
        <div class="section-label">03 — The team</div>
        <h2 class="section-heading" id="team-heading">Real people.<br><em>Local builders.</em></h2>
        <p class="team-sub">We're not a remote agency or an AI content farm. We're two people in the Capital Region who care about making small businesses look their best online.</p>
      </div>

      <div class="team-grid">

        <div class="team-card reveal reveal-d1">
          <div class="team-avatar" aria-hidden="true">?</div>
          <div class="team-info">
            <div class="team-name">Coming Soon</div>
            <div class="team-role">Coming Soon</div>
            <p class="team-bio">More about this person coming soon.</p>
          </div>
        </div>

        <div class="team-card reveal reveal-d2">
          <div class="team-avatar" aria-hidden="true">?</div>
          <div class="team-info">
            <div class="team-name">Coming Soon</div>
            <div class="team-role">Coming Soon</div>
            <p class="team-bio">More about this person coming soon.</p>
          </div>
        </div>

      </div>

    </div>
  </section>

```

- [ ] **Step 3: Add team card styles to `bbc-v3/styles.css`**

Find the end of the Why Us styles block (search for `.why-item--wide`). Append after that block:

```css
/* ══════════════════════════════════════
   MEET THE TEAM
   ══════════════════════════════════════ */

.team-header {
  max-width: 54ch;
  margin-bottom: var(--sp-16);
}

.team-sub {
  font-size: var(--fs-lg);
  color: var(--c-text-2);
  margin-top: var(--sp-6);
  line-height: var(--lh-relaxed);
}

.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-8);
}

@media (min-width: 640px) {
  .team-grid { grid-template-columns: 1fr 1fr; }
}

.team-card {
  background: var(--c-surface);
  border: var(--border);
  padding: var(--sp-10) var(--sp-8);
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
}

.team-avatar {
  width: 80px;
  height: 80px;
  background: var(--c-surface-2);
  border: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: var(--fs-3xl);
  color: var(--c-text-3);
}

.team-name {
  font-family: var(--font-display);
  font-size: var(--fs-2xl);
  letter-spacing: 0.04em;
  color: var(--c-text);
  margin-bottom: var(--sp-1);
}

.team-role {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-accent);
  margin-bottom: var(--sp-4);
}

.team-bio {
  font-size: var(--fs-base);
  color: var(--c-text-2);
  line-height: var(--lh-relaxed);
}
```

- [ ] **Step 4: Verify in browser**

Open `bbc-v3/index.html`. Scroll through the page and confirm:
- Section labels read 01 → 02 → 03 (team) → 04 → 05 → 06 → 07 → 08 → 09 in order
- Two team cards appear side by side on desktop, stacked on mobile
- Cards match the overall dark/bordered card aesthetic

- [ ] **Step 5: Commit**

```bash
git add bbc-v3/index.html bbc-v3/styles.css
git commit -m "feat(bbc-v3): add Meet the Team section with placeholder cards"
```

---

## Task 5: Netlify Function — Claude API Proxy

**Files:**
- Create: `netlify/functions/chat.js`

- [ ] **Step 1: Create `C:/Users/georg/my-project/netlify/functions/chat.js`**

```javascript
'use strict';

const SYSTEM_PROMPT = `You are the BBC Assistant for Big Bad Coding, a hand-coded web design shop in the Capital Region of New York. You help visitors understand what BBC offers and connect them with the team.

WHAT YOU KNOW:
Services: Custom hand-coded websites (no page builders), local SEO, Google Business Profile setup.

Pricing:
- Starter: $799 — single-page site, mobile-first, contact form, 30-day post-launch support
- Standard: $1,499 — up to 5 pages, SEO foundation, 60-day support (most popular)
- Premium: $2,499 — everything in Standard plus full SEO audit, Google Analytics setup, 3 months priority support, monthly performance report

Process: 3 steps — Discovery call, then design mockups (client sees designs before any code is written), then launch. Most sites go live in 2-4 weeks. Fixed-price quotes, no surprise invoices.

Key differentiators: Hand-coded (loads faster than WordPress/Wix/Squarespace), client owns all files outright, no monthly fees, local Capital Region team, real people not a ticket queue.

BEHAVIOR:
- Be direct and conversational. Match the no-BS tone of the site.
- Answer questions freely about services, pricing, and process.
- Do NOT quote custom prices or make promises outside the listed tiers.
- Do NOT pretend to be human if directly asked — say you are an AI assistant for BBC.
- Keep responses under 3 sentences when possible. Be helpful, not verbose.
- If someone seems ready to move forward, let them know the contact form or a free call is the next step.`;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: 'Server configuration error' };
  }

  let messages;
  try {
    ({ messages } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: 'Invalid JSON body' };
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return { statusCode: 400, body: 'messages array is required' };
  }

  // Sanitize: strip HTML, cap length, enforce valid roles, limit history to 10
  const sanitized = messages
    .slice(-10)
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').replace(/<[^>]*>/g, '').trim().slice(0, 2000)
    }))
    .filter((m) => m.content.length > 0);

  if (sanitized.length === 0) {
    return { statusCode: 400, body: 'No valid messages after sanitization' };
  }

  let apiResponse;
  try {
    apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: sanitized
      })
    });
  } catch (err) {
    return { statusCode: 502, body: 'Failed to reach AI service' };
  }

  if (!apiResponse.ok) {
    return { statusCode: 502, body: 'AI service returned an error' };
  }

  const data = await apiResponse.json();
  const reply = data && data.content && data.content[0] && data.content[0].text;

  if (!reply) {
    return { statusCode: 502, body: 'Unexpected AI response format' };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reply })
  };
};
```

- [ ] **Step 2: Start netlify dev and test the function**

From `C:/Users/georg/my-project/`, run:

```bash
netlify dev
```

Wait for: `Server listening on port 8888`

- [ ] **Step 3: Test with curl in a second terminal**

```bash
curl -X POST http://localhost:8888/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d "{\"messages\":[{\"role\":\"user\",\"content\":\"What does a Standard website cost?\"}]}"
```

Expected: `{"reply":"The Standard website is $1,499..."}` — any reply with actual content confirms the function and API key are working.

If you get a 500 error, open `.env` and verify the full API key is present with no extra spaces.

- [ ] **Step 4: Commit**

```bash
git add netlify/functions/chat.js
git commit -m "feat(bbc-v3): add Netlify Function proxy for Claude API"
```

---

## Task 6: Chatbot CSS

**Files:**
- Create: `bbc-v3/chatbot.css`

- [ ] **Step 1: Create `C:/Users/georg/my-project/bbc-v3/chatbot.css`**

```css
/*
 * BBC CHATBOT WIDGET STYLES
 * Uses design tokens from bbc-tokens.css (loaded via styles.css)
 */

/* Widget container */
#bbc-chat-widget {
  position: fixed;
  bottom: var(--sp-6);
  right: var(--sp-6);
  z-index: calc(var(--z-modal) + 5);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--sp-3);
}

/* Bubble trigger */
#bbc-chat-bubble {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--c-accent);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: background var(--t-fast), transform var(--t-fast);
  flex-shrink: 0;
}
#bbc-chat-bubble:hover { background: var(--c-accent-hover); transform: scale(1.06); }
#bbc-chat-bubble:active { transform: scale(0.97); }

#bbc-chat-bubble svg {
  width: 24px;
  height: 24px;
  color: #fff;
}

#bbc-chat-bubble .bbc-bubble-icon-open  { display: block; }
#bbc-chat-bubble .bbc-bubble-icon-close { display: none;  }
#bbc-chat-bubble[aria-expanded="true"] .bbc-bubble-icon-open  { display: none;  }
#bbc-chat-bubble[aria-expanded="true"] .bbc-bubble-icon-close { display: block; }

/* Panel */
#bbc-chat-panel {
  width: 360px;
  max-width: calc(100vw - var(--sp-12));
  height: 500px;
  max-height: calc(100vh - 120px);
  background: var(--c-surface);
  border: var(--border);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px) scale(0.97);
  pointer-events: none;
  transition: opacity var(--t-slow) var(--ease-out),
              transform var(--t-slow) var(--ease-out);
}
#bbc-chat-panel.is-open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* Panel header */
.bbc-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: var(--border);
  background: var(--c-surface-2);
  flex-shrink: 0;
}

.bbc-chat-header-info {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.bbc-chat-avatar {
  width: 36px;
  height: 36px;
  background: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: var(--fs-xl);
  color: #fff;
  flex-shrink: 0;
}

.bbc-chat-title {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--c-text);
  letter-spacing: 0.04em;
}

.bbc-chat-status {
  font-size: var(--fs-xs);
  color: var(--c-accent);
}

#bbc-chat-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-text-2);
  padding: var(--sp-1);
  line-height: 1;
  display: flex;
  align-items: center;
  transition: color var(--t-fast);
}
#bbc-chat-close:hover { color: var(--c-text); }

/* Message thread */
#bbc-chat-thread {
  flex: 1;
  overflow-y: auto;
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  scroll-behavior: smooth;
}
#bbc-chat-thread::-webkit-scrollbar { width: 4px; }
#bbc-chat-thread::-webkit-scrollbar-track { background: transparent; }
#bbc-chat-thread::-webkit-scrollbar-thumb { background: var(--c-border); }

/* Message bubbles */
.bbc-msg {
  max-width: 85%;
  font-size: var(--fs-sm);
  line-height: var(--lh-relaxed);
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--radius-sm);
  word-break: break-word;
}
.bbc-msg--assistant {
  background: var(--c-bg);
  border: var(--border);
  color: var(--c-text);
  align-self: flex-start;
}
.bbc-msg--user {
  background: var(--c-accent);
  color: #fff;
  align-self: flex-end;
  border: none;
}

/* Typing indicator */
.bbc-typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--sp-3) var(--sp-4);
  background: var(--c-bg);
  border: var(--border);
  align-self: flex-start;
  border-radius: var(--radius-sm);
}
.bbc-typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-text-3);
  animation: bbc-dot-bounce 1.2s infinite ease-in-out;
}
.bbc-typing span:nth-child(2) { animation-delay: 0.2s; }
.bbc-typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bbc-dot-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30%            { transform: translateY(-5px); opacity: 1; }
}

/* Lead capture card */
.bbc-lead-card {
  background: var(--c-surface-2);
  border: 1px solid var(--c-accent-border);
  padding: var(--sp-4) var(--sp-5);
  align-self: stretch;
}

.bbc-lead-text {
  font-size: var(--fs-sm);
  color: var(--c-text);
  margin-bottom: var(--sp-3);
  line-height: var(--lh-normal);
}

.bbc-lead-form {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.bbc-lead-input {
  background: var(--c-surface);
  border: var(--border);
  color: var(--c-text);
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  transition: border-color var(--t-fast);
}
.bbc-lead-input:focus {
  outline: none;
  border-color: var(--c-accent);
}
.bbc-lead-input::placeholder { color: var(--c-text-3); }

.bbc-lead-btn {
  background: var(--c-accent);
  color: #fff;
  border: none;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--t-fast);
  align-self: flex-start;
}
.bbc-lead-btn:hover { background: var(--c-accent-hover); }

.bbc-lead-thanks {
  font-size: var(--fs-sm);
  color: var(--c-accent);
  padding: var(--sp-2) 0;
}

/* Input row */
.bbc-chat-input-row {
  display: flex;
  gap: var(--sp-2);
  padding: var(--sp-4) var(--sp-5);
  border-top: var(--border);
  background: var(--c-surface-2);
  flex-shrink: 0;
}

#bbc-chat-input {
  flex: 1;
  background: var(--c-surface);
  border: var(--border);
  color: var(--c-text);
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  transition: border-color var(--t-fast);
  min-width: 0;
}
#bbc-chat-input:focus {
  outline: none;
  border-color: var(--c-accent);
}
#bbc-chat-input::placeholder { color: var(--c-text-3); }

#bbc-chat-send {
  background: var(--c-accent);
  border: none;
  cursor: pointer;
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--t-fast);
  flex-shrink: 0;
}
#bbc-chat-send:hover  { background: var(--c-accent-hover); }
#bbc-chat-send:disabled { opacity: 0.5; cursor: not-allowed; }

#bbc-chat-send svg {
  width: 18px;
  height: 18px;
  color: #fff;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  #bbc-chat-panel { transition: none; }
  .bbc-typing span { animation: none; opacity: 0.6; }
}
```

- [ ] **Step 2: Commit**

```bash
git add bbc-v3/chatbot.css
git commit -m "feat(bbc-v3): add chatbot widget CSS"
```

---

## Task 7: Chatbot JavaScript

**Files:**
- Create: `bbc-v3/chatbot.js`

- [ ] **Step 1: Create `C:/Users/georg/my-project/bbc-v3/chatbot.js`**

```javascript
/**
 * BBC CHATBOT WIDGET
 * Powered by Claude via Netlify Function proxy.
 * Lead capture via Netlify Forms.
 * All DOM manipulation uses safe textContent / createElement — no innerHTML.
 */

'use strict';

(function () {

  /* ── State ──────────────────────────────────────────── */
  var isTyping  = false;
  var messages  = [];   // [{ role: 'user'|'assistant', content: string }]
  var exchanges = 0;
  var nudgeDone = false;

  /* ── DOM refs ───────────────────────────────────────── */
  var widget, bubble, panel, thread, chatInput, sendBtn;

  /* ── Init ───────────────────────────────────────────── */
  function init() {
    widget = document.getElementById('bbc-chat-widget');
    if (!widget) return;

    bubble    = document.getElementById('bbc-chat-bubble');
    panel     = document.getElementById('bbc-chat-panel');
    thread    = document.getElementById('bbc-chat-thread');
    chatInput = document.getElementById('bbc-chat-input');
    sendBtn   = document.getElementById('bbc-chat-send');

    bubble.addEventListener('click', togglePanel);
    document.getElementById('bbc-chat-close').addEventListener('click', closePanel);
    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
    });

    appendMessage('assistant', "Hey! I'm the BBC Assistant. Ask me anything about our services, pricing, or how it all works.");
  }

  /* ── Panel toggle ───────────────────────────────────── */
  function togglePanel() {
    if (panel.classList.contains('is-open')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  function openPanel() {
    panel.classList.add('is-open');
    bubble.setAttribute('aria-expanded', 'true');
    chatInput.focus();
  }

  function closePanel() {
    panel.classList.remove('is-open');
    bubble.setAttribute('aria-expanded', 'false');
  }

  /* ── Send ───────────────────────────────────────────── */
  function handleSend() {
    var text = chatInput.value.trim();
    if (!text || isTyping) return;

    chatInput.value = '';
    sendBtn.disabled = true;

    appendMessage('user', text);
    messages.push({ role: 'user', content: text });
    exchanges++;

    showTypingIndicator();

    fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages })
    })
    .then(function (res) {
      if (!res.ok) throw new Error('API error ' + res.status);
      return res.json();
    })
    .then(function (data) {
      hideTypingIndicator();
      messages.push({ role: 'assistant', content: data.reply });
      return typeMessage(data.reply);
    })
    .then(function () {
      var shouldNudge = !nudgeDone && (
        exchanges >= 4 ||
        /pric|cost|how much|get start|sign up|hire|book/i.test(text)
      );
      if (shouldNudge) {
        nudgeDone = true;
        setTimeout(showLeadNudge, 800);
      }
    })
    .catch(function () {
      hideTypingIndicator();
      appendMessage('assistant', "Sorry, I'm having trouble connecting right now. Reach us at hello@bigbadcoding.com.");
    })
    .finally(function () {
      sendBtn.disabled = false;
      chatInput.focus();
    });
  }

  /* ── Append message bubble (safe — textContent only) ── */
  function appendMessage(role, content) {
    var div = document.createElement('div');
    div.className = 'bbc-msg bbc-msg--' + role;
    div.textContent = content;
    thread.appendChild(div);
    scrollThread();
    return div;
  }

  /* ── Typewriter effect ──────────────────────────────── */
  function typeMessage(text) {
    return new Promise(function (resolve) {
      isTyping = true;
      var div = document.createElement('div');
      div.className = 'bbc-msg bbc-msg--assistant';
      div.textContent = '';
      thread.appendChild(div);

      var words = text.split(' ');
      var i = 0;

      function addNextWord() {
        if (i >= words.length) {
          isTyping = false;
          resolve(div);
          return;
        }
        div.textContent += (i === 0 ? '' : ' ') + words[i];
        i++;
        scrollThread();
        setTimeout(addNextWord, 35 + Math.floor(Math.random() * 25));
      }

      addNextWord();
    });
  }

  /* ── Typing indicator (3 dots) ──────────────────────── */
  function showTypingIndicator() {
    isTyping = true;
    var dots = document.createElement('div');
    dots.id = 'bbc-typing-indicator';
    dots.className = 'bbc-msg bbc-msg--assistant bbc-typing';
    dots.setAttribute('aria-label', 'Assistant is typing');
    for (var i = 0; i < 3; i++) {
      dots.appendChild(document.createElement('span'));
    }
    thread.appendChild(dots);
    scrollThread();
  }

  function hideTypingIndicator() {
    var el = document.getElementById('bbc-typing-indicator');
    if (el) el.remove();
    isTyping = false;
  }

  /* ── Lead capture card (safe DOM construction) ──────── */
  function showLeadNudge() {
    var card = document.createElement('div');
    card.className = 'bbc-lead-card';

    var prompt = document.createElement('p');
    prompt.className = 'bbc-lead-text';
    prompt.textContent = 'Want someone from the team to reach out directly?';
    card.appendChild(prompt);

    var form = document.createElement('form');
    form.className = 'bbc-lead-form';

    var nameInput = document.createElement('input');
    nameInput.className = 'bbc-lead-input';
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'Your name';
    nameInput.required = true;
    nameInput.autocomplete = 'name';
    form.appendChild(nameInput);

    var emailInput = document.createElement('input');
    emailInput.className = 'bbc-lead-input';
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'your@email.com';
    emailInput.required = true;
    emailInput.autocomplete = 'email';
    form.appendChild(emailInput);

    var submitBtn = document.createElement('button');
    submitBtn.className = 'bbc-lead-btn';
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Connect me \u2192';
    form.appendChild(submitBtn);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name  = nameInput.value.trim();
      var email = emailInput.value.trim();
      if (!name || !email) return;

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'chatbot-leads',
          name: name,
          email: email
        }).toString()
      }).catch(function () {
        // Silent fail — soft data, not critical
      });

      var thanks = document.createElement('p');
      thanks.className = 'bbc-lead-thanks';
      thanks.textContent = "Got it! We'll reach out soon.";
      card.textContent = '';
      card.appendChild(thanks);
      scrollThread();
    });

    card.appendChild(form);
    thread.appendChild(card);
    scrollThread();
  }

  /* ── Helpers ────────────────────────────────────────── */
  function scrollThread() {
    thread.scrollTop = thread.scrollHeight;
  }

  /* ── Bootstrap ──────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
```

- [ ] **Step 2: Commit**

```bash
git add bbc-v3/chatbot.js
git commit -m "feat(bbc-v3): add chatbot widget JavaScript"
```

---

## Task 8: Wire Chatbot into index.html

**Files:**
- Modify: `bbc-v3/index.html` — stylesheet link, hidden Netlify form, widget HTML, script tag

- [ ] **Step 1: Add `chatbot.css` link in `<head>` of `bbc-v3/index.html`**

Find:

```html
  <link rel="stylesheet" href="styles.css">
```

Add immediately after:

```html
  <link rel="stylesheet" href="chatbot.css">
```

- [ ] **Step 2: Add hidden Netlify form for chatbot-leads detection**

Netlify Forms requires the form to exist in the HTML at deploy time. Add this just before `</main>` (~line 1146):

```html
  <!-- Netlify Forms detection — chatbot lead capture (hidden, JS submits via fetch) -->
  <form name="chatbot-leads" data-netlify="true" hidden aria-hidden="true">
    <input type="hidden" name="form-name" value="chatbot-leads" />
    <input type="text" name="name" />
    <input type="email" name="email" />
  </form>
```

- [ ] **Step 3: Add chatbot widget HTML just before `</body>`**

```html
<!-- ─── Chatbot Widget ─────────────────────────────────── -->
<div id="bbc-chat-widget" aria-label="BBC Assistant" role="complementary">

  <button
    id="bbc-chat-bubble"
    aria-expanded="false"
    aria-controls="bbc-chat-panel"
    aria-label="Open BBC Assistant chat"
  >
    <svg class="bbc-bubble-icon-open" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"/>
    </svg>
    <svg class="bbc-bubble-icon-close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
    </svg>
  </button>

  <div id="bbc-chat-panel" role="dialog" aria-label="BBC Assistant chat" aria-modal="false">

    <div class="bbc-chat-header">
      <div class="bbc-chat-header-info">
        <div class="bbc-chat-avatar" aria-hidden="true">B</div>
        <div>
          <div class="bbc-chat-title">BBC Assistant</div>
          <div class="bbc-chat-status">Online</div>
        </div>
      </div>
      <button id="bbc-chat-close" aria-label="Close chat">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" style="width:18px;height:18px">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div id="bbc-chat-thread" role="log" aria-label="Chat messages" aria-live="polite"></div>

    <div class="bbc-chat-input-row">
      <input
        id="bbc-chat-input"
        type="text"
        placeholder="Ask me anything..."
        autocomplete="off"
        aria-label="Chat message"
        maxlength="500"
      />
      <button id="bbc-chat-send" aria-label="Send message">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
        </svg>
      </button>
    </div>

  </div>
</div>

<script src="chatbot.js"></script>
```

- [ ] **Step 4: Verify CSP allows same-origin fetch**

Open `bbc-v3/_headers`. Confirm `connect-src` includes `'self'`:

```
connect-src 'self' https://www.google-analytics.com https://analytics.google.com
```

`'self'` covers `/.netlify/functions/chat`. No changes needed.

- [ ] **Step 5: Full chatbot test via `netlify dev`**

With `netlify dev` running at `http://localhost:8888`:

1. Open the site — orange chat bubble appears bottom-right
2. Click bubble — panel slides open, welcome message appears
3. Type "What does a Standard site cost?" — 3-dot indicator, then typewriter reply
4. Type 4 more messages — lead nudge card appears in thread
5. Fill name + email, click "Connect me" — card changes to "Got it! We'll reach out soon."
6. Press Escape — panel closes

All 6 steps should pass before committing.

- [ ] **Step 6: Commit**

```bash
git add bbc-v3/index.html
git commit -m "feat(bbc-v3): wire chatbot widget into index.html with Netlify Forms detection"
```

---

## Task 9: Final Verification

- [ ] **Step 1: Static file check (no server)**

Open `bbc-v3/index.html` directly in a browser. Verify:
- Two hero CTAs: "Get a Free Quote" (orange) and "Book a Free Call" (outline)
- Footer has 4 columns on desktop, stacks on mobile
- Section labels run: 01 Services, 02 Why Us, 03 The team, 04 The process, 05 Work, 06 Social proof, 07 Pricing, 08 FAQ, 09 Contact
- Two "Coming Soon" team cards visible between Why Us and How It Works
- Chat bubble visible bottom-right (panel does not open since no server — that's fine)

- [ ] **Step 2: Mobile layout check**

Resize browser window to 375px wide. Confirm:
- Team cards stack vertically
- Footer columns stack vertically
- Chat bubble is still visible and not clipped

- [ ] **Step 3: Newsletter test via `netlify dev`**

1. Open `http://localhost:8888`
2. Scroll to footer, enter email, click Subscribe
3. Row hides, success message appears

- [ ] **Step 4: Final commit**

```bash
git status  # confirm only expected files changed
git add -A
git commit -m "feat(bbc-v3): social features complete — CTA, newsletter, team, chatbot"
```

---

## Deployment Checklist (Do Before Going Live)

1. **Add API key to Netlify**: Dashboard > Site settings > Environment variables > add `ANTHROPIC_API_KEY`
2. **Verify publish dir**: Netlify deploy settings should point to `bbc-v3/` (matches `netlify.toml`)
3. **Swap Calendly link when ready**: Find `data-calendly="true"` in the hero, update `href` and add `target="_blank" rel="noopener"`
4. **Update team cards**: Replace "Coming Soon" with real names/roles/bios; add photo `<img>` inside `.team-avatar` when ready

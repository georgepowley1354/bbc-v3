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
    emailInput.inputMode = 'email';
    form.appendChild(emailInput);

    var error = document.createElement('p');
    error.className = 'bbc-lead-error';
    error.hidden = true;
    error.setAttribute('aria-live', 'polite');
    form.appendChild(error);

    var submitBtn = document.createElement('button');
    submitBtn.className = 'bbc-lead-btn';
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Connect me \u2192';
    form.appendChild(submitBtn);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name  = nameInput.value.trim();
      var email = emailInput.value.trim();
      var isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      error.hidden = true;
      error.textContent = '';
      nameInput.removeAttribute('aria-invalid');
      emailInput.removeAttribute('aria-invalid');

      if (!name || name.length < 2) {
        nameInput.setAttribute('aria-invalid', 'true');
        error.textContent = 'Please enter your name so we know who to reach out to.';
        error.hidden = false;
        nameInput.focus();
        return;
      }

      if (!isValidEmail) {
        emailInput.setAttribute('aria-invalid', 'true');
        error.textContent = 'Please enter a valid email address.';
        error.hidden = false;
        emailInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'chatbot-leads',
          name: name,
          email: email
        }).toString()
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Lead capture failed');

        var thanks = document.createElement('p');
        thanks.className = 'bbc-lead-thanks';
        thanks.textContent = "Got it! We'll reach out soon.";
        card.textContent = '';
        card.appendChild(thanks);
        scrollThread();
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Connect me \u2192';
        emailInput.setAttribute('aria-invalid', 'true');
        error.textContent = 'That did not go through. Email us at hello@bigbadcoding.com and we will get back to you.';
        error.hidden = false;
      });
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

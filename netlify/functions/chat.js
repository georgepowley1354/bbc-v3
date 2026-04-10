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

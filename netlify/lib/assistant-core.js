'use strict';

const { getClientConfig } = require('./assistant-clients');

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    },
    body: JSON.stringify(body)
  };
}

function sanitizeMessages(messages) {
  return (Array.isArray(messages) ? messages : [])
    .slice(-10)
    .map((message) => ({
      role: message && message.role === 'assistant' ? 'assistant' : 'user',
      content: String((message && message.content) || '')
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, 2000)
    }))
    .filter((message) => message.content.length > 0);
}

function buildSystemPrompt(config) {
  return [
    `You are ${config.assistantName} for ${config.businessName}.`,
    'You help visitors understand what the business offers and guide qualified leads to the next step.',
    `Tone: ${config.tone}`,
    '',
    'WHAT YOU KNOW',
    `Services: ${config.services.join('; ')}`,
    `Pricing: ${config.pricing.join(' | ')}`,
    `Process: ${config.process.join(' | ')}`,
    `Key differentiators: ${config.differentiators.join('; ')}`,
    `Allowed topics: ${config.allowedTopics.join(', ')}`,
    `Escalate to a human for: ${config.handoffTopics.join(', ')}`,
    '',
    'BEHAVIOR',
    '- Keep answers concise and practical.',
    '- Stay within the approved business information above.',
    '- Do not invent pricing, promises, or capabilities.',
    '- If asked for something outside approved information, offer the contact CTA instead of guessing.',
    '- If asked whether you are human, clearly say you are an AI assistant.',
    `- When someone sounds ready to move forward, suggest "${config.cta.label}" and mention ${config.contactEmail}.`
  ].join('\n');
}

function buildSuggestedActions(config, lastUserMessage) {
  const text = (lastUserMessage || '').toLowerCase();
  const actions = [];

  if (/price|cost|quote|hire|start|book|call|contact/.test(text)) {
    actions.push({
      type: 'cta',
      label: config.cta.label,
      url: config.cta.url
    });
  }

  if (/custom|complex|seo|strategy|support|timeline/.test(text)) {
    actions.push({
      type: 'handoff',
      label: 'Talk to the team',
      email: config.contactEmail
    });
  }

  return actions;
}

function fallbackReply(config, messages) {
  const lastUserMessage = messages.length ? messages[messages.length - 1].content.toLowerCase() : '';

  if (/price|cost|how much/.test(lastUserMessage)) {
    return `We offer three tiers: Starter at $799, Standard at $1,499, and Premium at $2,499. If you want help picking the right fit, use ${config.cta.label.toLowerCase()} or email ${config.contactEmail}.`;
  }

  if (/how long|timeline|how fast|weeks/.test(lastUserMessage)) {
    return 'Most projects are done in 2 to 4 weeks. We start with discovery, then design mockups, then launch once everything is approved.';
  }

  if (/own|ownership|code|files/.test(lastUserMessage)) {
    return 'Yes. Clients own the code, files, and site assets when the project is done. No lock-in and no required monthly fee.';
  }

  if (/seo|google|ranking|search/.test(lastUserMessage)) {
    return 'SEO is built into the process from the start, and we also help with local search and Google Business Profile setup. If you want deeper strategy, the best next step is a quote request or call.';
  }

  return `We build hand-coded websites, local SEO, and Google Business Profile setup for Capital Region businesses. If you want to talk through your project, use ${config.cta.label.toLowerCase()} or email ${config.contactEmail}.`;
}

async function callOpenAI(config, messages) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: config.model.openai,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: buildSystemPrompt(config)
            }
          ]
        },
        ...messages.map((message) => ({
          role: message.role,
          content: [
            {
              type: 'input_text',
              text: message.content
            }
          ]
        }))
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI error ${response.status}`);
  }

  const data = await response.json();
  const reply = typeof data.output_text === 'string' ? data.output_text.trim() : '';

  if (!reply) {
    throw new Error('OpenAI returned no reply text');
  }

  return {
    provider: 'openai',
    reply
  };
}

async function callAnthropic(config, messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: config.model.anthropic,
      max_tokens: 400,
      system: buildSystemPrompt(config),
      messages
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic error ${response.status}`);
  }

  const data = await response.json();
  const reply = data && data.content && data.content[0] && data.content[0].text;

  if (!reply) {
    throw new Error('Anthropic returned no reply text');
  }

  return {
    provider: 'anthropic',
    reply: String(reply).trim()
  };
}

async function generateAssistantReply(config, messages) {
  if (process.env.OPENAI_API_KEY) {
    try {
      return await callOpenAI(config, messages);
    } catch (error) {
      console.error('OpenAI assistant fallback:', error.message);
    }
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return await callAnthropic(config, messages);
    } catch (error) {
      console.error('Anthropic assistant fallback:', error.message);
    }
  }

  return {
    provider: 'fallback',
    reply: fallbackReply(config, messages)
  };
}

async function handleAssistantEvent(event, options) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const siteId = body.siteId || (options && options.defaultSiteId) || 'bigbadcoding';
  const config = getClientConfig(siteId);

  if (!config) {
    return jsonResponse(404, { error: `Unknown siteId: ${siteId}` });
  }

  const messages = sanitizeMessages(body.messages);
  if (!messages.length) {
    return jsonResponse(400, { error: 'messages array is required' });
  }

  try {
    const result = await generateAssistantReply(config, messages);
    const lastUserMessage = messages[messages.length - 1].role === 'user'
      ? messages[messages.length - 1].content
      : '';

    return jsonResponse(200, {
      siteId,
      provider: result.provider,
      reply: result.reply,
      suggestedActions: buildSuggestedActions(config, lastUserMessage)
    });
  } catch (error) {
    console.error('Assistant error:', error.message);
    return jsonResponse(502, {
      error: 'Assistant service returned an error'
    });
  }
}

module.exports = {
  handleAssistantEvent
};

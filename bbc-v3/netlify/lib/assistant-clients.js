'use strict';

const clients = {
  bigbadcoding: {
    siteId: 'bigbadcoding',
    businessName: 'Big Bad Coding',
    assistantName: 'BBC Assistant',
    tone: 'Direct, helpful, local, and no-BS.',
    contactEmail: 'hello@bigbadcoding.com',
    cta: {
      label: 'Get a Free Quote',
      url: '#contact'
    },
    model: {
      openai: 'gpt-5-mini',
      anthropic: 'claude-haiku-4-5-20251001'
    },
    services: [
      'Custom hand-coded websites',
      'Local SEO',
      'Google Business Profile setup',
      'Optional site management'
    ],
    pricing: [
      '$799 Starter: single-page site, mobile-first, contact form, 30-day post-launch support',
      '$1,499 Standard: up to 5 pages, SEO foundation, 60-day support',
      '$2,499 Premium: everything in Standard plus full SEO audit, analytics setup, 3 months priority support, monthly performance report'
    ],
    process: [
      'Discovery call to understand the business and goals',
      'Design mockups before any code is written',
      'Launch with full ownership handoff'
    ],
    differentiators: [
      'Hand-coded sites instead of page builders',
      'Clients own the code and files outright',
      'No monthly fees required',
      'Local Capital Region team',
      'Most sites launch in 2 to 4 weeks'
    ],
    allowedTopics: [
      'services',
      'pricing',
      'timeline',
      'ownership',
      'seo',
      'local business websites',
      'how the process works'
    ],
    handoffTopics: [
      'custom pricing',
      'complex SEO strategy',
      'support questions',
      'project scoping',
      'book a call'
    ]
  }
};

function getClientConfig(siteId) {
  return clients[siteId] || null;
}

module.exports = {
  getClientConfig,
  clients
};

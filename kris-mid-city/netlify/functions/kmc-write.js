/* kmc-write.js — Server-side write proxy for Kris' Mid City Tavern
   Verifies Supabase JWT, then executes writes using the service role key.
   The service key never reaches the browser. */

'use strict';

const { createClient } = require('@supabase/supabase-js');

const ALLOWED_TABLES = new Set([
  'announcements', 'happy_hour', 'weekly_specials', 'events',
  'gallery', 'team', 'drinks', 'menu_items', 'daily_specials'
]);

const TABLE_FIELDS = {
  announcements: ['text', 'active'],
  happy_hour: ['days', 'time', 'deals'],
  weekly_specials: ['day', 'deal', 'note', 'time'],
  events: ['title', 'date', 'time', 'description', 'free', 'active', 'featured', 'photo'],
  gallery: ['src', 'alt', 'caption', 'category', 'date'],
  team: ['name', 'role', 'bio', 'photo'],
  drinks: ['name', 'price', 'category', 'description', 'available', 'featured'],
  menu_items: ['name', 'price', 'category', 'description', 'available', 'featured'],
  daily_specials: ['active', 'title', 'description', 'price', 'date']
};

function normalizeString(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function isEmbeddedImage(value) {
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(normalizeString(value));
}

function normalizeBoolean(value, fallback) {
  if (typeof value === 'boolean') return value;
  if (value === undefined) return fallback;
  return !!value;
}

function normalizeDeals(value) {
  if (!Array.isArray(value)) return [];
  return value.map((deal) => ({
    label: normalizeString(deal && deal.label),
    price: normalizeString(deal && deal.price)
  })).filter((deal) => deal.label || deal.price);
}

function sanitizePayload(table, payload, operation) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const clean = {};
  TABLE_FIELDS[table].forEach((field) => {
    if (!(field in payload)) return;
    if (field === 'deals') clean[field] = normalizeDeals(payload[field]);
    else if (field === 'active' || field === 'free' || field === 'featured' || field === 'available') {
      clean[field] = normalizeBoolean(payload[field], true);
    } else if ((field === 'src' || field === 'photo') && isEmbeddedImage(payload[field])) {
      return;
    } else {
      clean[field] = normalizeString(payload[field]);
    }
  });
  if (operation === 'upsert' && payload.id) clean.id = String(payload.id);
  return Object.keys(clean).length ? clean : null;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // Extract JWT
  const authHeader = event.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Missing auth token' }) };
  }

  const supabaseUrl = process.env.KMC_SUPABASE_URL;
  const serviceKey = process.env.KMC_SUPABASE_SERVICE_KEY || process.env.KMC_SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error('kmc-write: missing environment variables');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfigured' }) };
  }

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  // Verify the JWT belongs to a real Supabase session
  const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  // Parse body
  let body;
  try { body = JSON.parse(event.body); } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { operation, table, id, data } = body;

  if (!ALLOWED_TABLES.has(table)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid table' }) };
  }

  if (!['add', 'update', 'remove', 'upsert'].includes(operation)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid operation' }) };
  }

  if (operation === 'upsert' && table !== 'happy_hour' && table !== 'daily_specials') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Upsert is only allowed for single-row tables' }) };
  }

  const cleanData = operation === 'remove' ? null : sanitizePayload(table, data, operation);
  if (operation !== 'remove' && !cleanData) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No valid fields provided' }) };
  }

  // Execute write
  let res;
  try {
    if (operation === 'add') {
      res = await adminClient.from(table).insert(cleanData).select().single();
    } else if (operation === 'update') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required for update' }) };
      res = await adminClient.from(table).update(cleanData).eq('id', id).select().single();
    } else if (operation === 'remove') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required for remove' }) };
      res = await adminClient.from(table).delete().eq('id', id);
    } else if (operation === 'upsert') {
      res = await adminClient.from(table).upsert(cleanData).select().single();
    }
  } catch (err) {
    console.error('kmc-write execution error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }

  if (res.error) {
    console.error('kmc-write Supabase error:', res.error);
    return { statusCode: 500, body: JSON.stringify({ error: res.error.message }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: res.data || null })
  };
};

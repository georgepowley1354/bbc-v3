/* kmc-write.js — Server-side write proxy for Kris' Mid City Tavern
   Verifies Supabase JWT, then executes writes using the service role key.
   The service key never reaches the browser. */

'use strict';

const { createClient } = require('@supabase/supabase-js');

const ALLOWED_TABLES = new Set([
  'announcements', 'happy_hour', 'weekly_specials', 'events',
  'gallery', 'team', 'drinks', 'menu_items', 'reviews'
]);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Extract JWT
  const authHeader = event.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Missing auth token' }) };
  }

  const supabaseUrl = process.env.KMC_SUPABASE_URL;
  const serviceKey = process.env.KMC_SUPABASE_SERVICE_KEY;
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

  // Execute write
  let res;
  try {
    if (operation === 'add') {
      const row = Object.assign({}, data);
      delete row.id;
      res = await adminClient.from(table).insert(row).select().single();
    } else if (operation === 'update') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required for update' }) };
      res = await adminClient.from(table).update(data).eq('id', id).select().single();
    } else if (operation === 'remove') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required for remove' }) };
      res = await adminClient.from(table).delete().eq('id', id);
    } else if (operation === 'upsert') {
      res = await adminClient.from(table).upsert(data).select().single();
    } else {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid operation' }) };
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

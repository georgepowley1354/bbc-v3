'use strict';

const CACHE_NAME = 'bbc-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/chatbot.css',
  '/chatbot.js',
  '/bbc-tokens.css',
  '/offline.html',
  '/manifest.json',
  '/images/wsb-screenshot.webp',
  '/images/doberts-screenshot.webp',
  '/images/kris-screenshot.webp',
];

const CORE_ASSET_PATHS = new Set([
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/chatbot.css',
  '/chatbot.js',
  '/bbc-tokens.css',
  '/manifest.json'
]);

/* ── Install: cache all static assets ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* ── Activate: remove old caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ── Fetch: network-first for HTML and core assets, cache-first for media ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET and non-http requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isHtmlRequest = request.headers.get('Accept')?.includes('text/html');
  const isCoreAsset = isSameOrigin && CORE_ASSET_PATHS.has(url.pathname);

  // Network-first strategy for HTML pages and versionless core assets
  if (isHtmlRequest || isCoreAsset) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && isSameOrigin) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) =>
            cached || caches.match('/offline.html')
          )
        )
    );
    return;
  }

  // Cache-first strategy for all other assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        // Only cache successful same-origin responses
        if (
          response.ok &&
          isSameOrigin
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Return offline page as last resort for navigation
        if (request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});

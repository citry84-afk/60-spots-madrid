const STATIC_CACHE = 'static-v2';
const MEDIA_CACHE = 'media-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (![STATIC_CACHE, MEDIA_CACHE].includes(k)) return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// Runtime strategy: cache-first for images/videos, SWR for others
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET
  if (req.method !== 'GET') return;

  const isMedia = /\.(?:png|jpg|jpeg|gif|webp|mp4|webm|mov)$/i.test(url.pathname);

  if (isMedia) {
    event.respondWith(
      caches.open(MEDIA_CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
          const fresh = await fetch(req, { mode: 'cors' });
          // Only cache if it's not a partial response (206)
          if (fresh.status !== 206) {
            cache.put(req, fresh.clone());
          }
          return fresh;
        } catch (e) {
          return cached || fetch(req);
        }
      })
    );
    return;
  }

  // SWR for other requests
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// Receive list of URLs to pre-cache (nearest 25 spots media)
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'CACHE_URLS' && Array.isArray(data.urls)) {
    event.waitUntil(
      caches.open(MEDIA_CACHE).then((cache) => Promise.all(
        data.urls.map((u) => cache.match(u).then((m) => m || fetch(u, { mode: 'cors' }).then((r) => cache.put(u, r.clone())).catch(() => null)))
      ))
    );
  }
});

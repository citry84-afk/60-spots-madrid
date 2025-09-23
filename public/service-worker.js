const STATIC_CACHE = 'static-v4';
const MEDIA_CACHE = 'media-v3';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll([
        '/',
        '/manifest.json'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (![STATIC_CACHE, MEDIA_CACHE].includes(k)) {
            return caches.delete(k);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  
  // Only handle GET requests
  if (req.method !== 'GET') return;
  
  const url = new URL(req.url);
  const isMedia = /\.(?:png|jpg|jpeg|gif|webp|mp4|webm|mov)$/i.test(url.pathname);
  
  if (isMedia) {
    // For media files, use cache-first strategy
    event.respondWith(
      caches.open(MEDIA_CACHE).then((cache) => {
        return cache.match(req).then((cached) => {
          if (cached) {
            return cached;
          }
          
          return fetch(req).then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              cache.put(req, response.clone());
            }
            return response;
          }).catch(() => {
            // Return a fallback or the original request
            return fetch(req);
          });
        });
      })
    );
  } else {
    // For other requests, use network-first strategy
    event.respondWith(
      fetch(req).then((response) => {
        // Only cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(req, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // If network fails, try cache
        return caches.match(req);
      })
    );
  }
});

// Allow clients to forcefully clear all caches (used when stale ads/images persist)
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data && data.type === 'NUKE_CACHES') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(async () => {
        await self.registration.unregister().catch(() => {});
        const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
        clients.forEach((client) => client.navigate(client.url));
      })
    );
  }
});
const CACHE_NAME = 'extensao-cache-v4';
const LOCAL_URLS_TO_CACHE = [
  './',
  './index.html',
  './main.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

const EXTERNAL_URLS_TO_CACHE = [
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/vue@3/dist/vue.global.prod.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(LOCAL_URLS_TO_CACHE);

      await Promise.all(
        EXTERNAL_URLS_TO_CACHE.map(async (url) => {
          const response = await fetch(url, { mode: 'no-cors' });
          await cache.put(url, response);
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : undefined)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

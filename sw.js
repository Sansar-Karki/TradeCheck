// TradeCheck Service Worker (GitHub Pages friendly)
const CACHE = "tradecheck-v2";

// Derive the base path from the SW scope (works for user-pages and project-pages)
const SCOPE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const url = (p) => `${SCOPE_PATH}${p.startsWith("/") ? p : "/" + p}`;

const PRECACHE = [
  url("/"),
  url("/index.html"),
  url("/manifest.json"),
  url("/manifest.webmanifest"),
  url("/assets/css/styles.css"),
  url("/assets/js/main.js"),
  url("/assets/js/app.js"),
  url("/assets/js/pwa.js"),
  url("/icons/icon-128.png"),
  url("/icons/icon-512.png")
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(PRECACHE);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k === CACHE ? null : caches.delete(k))));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if(req.method !== "GET") return;

  const u = new URL(req.url);

  // Only handle same-origin requests (avoid caching CDNs)
  if(u.origin !== self.location.origin) return;

  // Cache-first for app shell assets; network-first for everything else if you prefer
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true });
    if(cached) return cached;

    try{
      const fresh = await fetch(req);
      // Cache successful, basic responses
      if(fresh && fresh.ok && fresh.type === "basic"){
        cache.put(req, fresh.clone());
      }
      return fresh;
    }catch(err){
      // If offline and no cache hit, try serving index for navigation
      if(req.mode === "navigate"){
        const shell = await cache.match(url("/index.html"));
        if(shell) return shell;
      }
      throw err;
    }
  })());
});

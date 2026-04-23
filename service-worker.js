const CACHE_NAME = "pharma-pos-v1";

const FILES = [
  "/",
  "/index.html",
  "/admin-login.html",
  "/staff-login.html",
  "/admin-dashboard.html",
  "/staff-dashboard.html",
  "/app.js",
  "/auth.js",
  "/storage.js",
  "/inventory.js",
  "/sales.js",
  "/style.css",
  "/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

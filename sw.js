const CACHE = "pitchcaller-v1.8";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/yellowtail-latin.woff2",
  "icons/sl-logo.png",
  "icons/favicon-32.png",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "clips/changeup.mp3",
  "clips/curveball.mp3",
  "clips/fastball.mp3",
  "clips/high-inside.mp3",
  "clips/high-middle.mp3",
  "clips/high-outside.mp3",
  "clips/low-inside.mp3",
  "clips/low-middle.mp3",
  "clips/low-outside.mp3",
  "clips/middle-inside.mp3",
  "clips/middle-middle.mp3",
  "clips/middle-outside.mp3",
  "clips/splitfinger.mp3"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match("index.html")))
  );
});

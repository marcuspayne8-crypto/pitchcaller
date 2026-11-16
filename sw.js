const CACHE = "pitchcaller-v1.9";
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
  "clips/splitfinger.mp3",
  "clips/voices/narrator/changeup.mp3",
  "clips/voices/narrator/curveball.mp3",
  "clips/voices/narrator/fastball.mp3",
  "clips/voices/narrator/high-inside.mp3",
  "clips/voices/narrator/high-middle.mp3",
  "clips/voices/narrator/high-outside.mp3",
  "clips/voices/narrator/low-inside.mp3",
  "clips/voices/narrator/low-middle.mp3",
  "clips/voices/narrator/low-outside.mp3",
  "clips/voices/narrator/middle-inside.mp3",
  "clips/voices/narrator/middle-middle.mp3",
  "clips/voices/narrator/middle-outside.mp3",
  "clips/voices/narrator/splitfinger.mp3",
  "clips/voices/announcer/changeup.mp3",
  "clips/voices/announcer/curveball.mp3",
  "clips/voices/announcer/fastball.mp3",
  "clips/voices/announcer/high-inside.mp3",
  "clips/voices/announcer/high-middle.mp3",
  "clips/voices/announcer/high-outside.mp3",
  "clips/voices/announcer/low-inside.mp3",
  "clips/voices/announcer/low-middle.mp3",
  "clips/voices/announcer/low-outside.mp3",
  "clips/voices/announcer/middle-inside.mp3",
  "clips/voices/announcer/middle-middle.mp3",
  "clips/voices/announcer/middle-outside.mp3",
  "clips/voices/announcer/splitfinger.mp3",
  "clips/voices/calm/changeup.mp3",
  "clips/voices/calm/curveball.mp3",
  "clips/voices/calm/fastball.mp3",
  "clips/voices/calm/high-inside.mp3",
  "clips/voices/calm/high-middle.mp3",
  "clips/voices/calm/high-outside.mp3",
  "clips/voices/calm/low-inside.mp3",
  "clips/voices/calm/low-middle.mp3",
  "clips/voices/calm/low-outside.mp3",
  "clips/voices/calm/middle-inside.mp3",
  "clips/voices/calm/middle-middle.mp3",
  "clips/voices/calm/middle-outside.mp3",
  "clips/voices/calm/splitfinger.mp3",
  "clips/voices/cowboy/changeup.mp3",
  "clips/voices/cowboy/curveball.mp3",
  "clips/voices/cowboy/fastball.mp3",
  "clips/voices/cowboy/high-inside.mp3",
  "clips/voices/cowboy/high-middle.mp3",
  "clips/voices/cowboy/high-outside.mp3",
  "clips/voices/cowboy/low-inside.mp3",
  "clips/voices/cowboy/low-middle.mp3",
  "clips/voices/cowboy/low-outside.mp3",
  "clips/voices/cowboy/middle-inside.mp3",
  "clips/voices/cowboy/middle-middle.mp3",
  "clips/voices/cowboy/middle-outside.mp3",
  "clips/voices/cowboy/splitfinger.mp3"
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

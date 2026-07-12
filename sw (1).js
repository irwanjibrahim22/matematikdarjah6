// Service Worker untuk app Math Tahun 6 — membolehkan penggunaan offline
// Tukar nombor versi (v1 -> v2 -> v3) setiap kali anda update app,
// supaya telefon pengguna muat turun versi terbaru.
const CACHE_NAME = "math-t6-v1";

// Senarai fail yang disimpan untuk kegunaan offline
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Pasang: simpan semua fail ke cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Aktif: buang cache lama bila versi bertukar
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Ambil: cuba cache dulu, kalau tiada baru ambil dari internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

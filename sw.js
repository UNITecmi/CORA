// Service worker de CORA: guarda la app y los audios para usarla sin internet.
// Al agregar audios nuevos, súbelos a la carpeta audio/nah/, anótalos en AUDIOS
// y cambia la versión (CACHE) para que los teléfonos descarguen la actualización.
const CACHE = "cora-v29";
const AUDIOS = [
  // "audio/nah/duele-cabeza.mp3",
];
const BASE = ["./", "index.html", "manifest.json", "icon.svg", "icon-192.png", "icon-512.png", "icon-maskable.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([...BASE, ...AUDIOS])).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).pathname.endsWith("config.js")) {
    e.respondWith(fetch(e.request).then(res => { const c2 = res.clone(); caches.open(CACHE).then(c => c.put(e.request, c2)); return res; })
      .catch(() => caches.match(e.request).then(h => h || new Response("", {headers: {"Content-Type": "text/javascript"}}))));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match("index.html")))
  );
});

const CACHE_NAME = "drive-english-cache-v45";
const APP_FILES = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.all(APP_FILES.map((file) => cache.add(file).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;

    if (request.mode === "navigate" || request.destination === "document") {
      return (
        (await caches.match("./index.html")) ||
        (await caches.match("./")) ||
        new Response("<!doctype html><title>路上英语</title><p>页面暂时没有加载成功，请联网后刷新。</p>", {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        })
      );
    }

    return new Response("", { status: 204 });
  }
}

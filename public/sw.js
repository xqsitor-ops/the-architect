// Service worker — handles push notifications + offline shell.
const CACHE = 'architect-editorial-v1';
const SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/app.css',
  '/app.js',
  '/icon.svg',
  '/assets/architect-ee72-hero.jpg',
  '/assets/architect-ee72-table.jpg',
  '/assets/architect-ee72-proportion.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => null));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).pathname.startsWith('/api/')) return;
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).catch(() => caches.match('/index.html')))
  );
});

self.addEventListener('push', (e) => {
  let data = { title: 'The Architect', body: '', url: '/' };
  try { data = { ...data, ...e.data.json() }; } catch (_) {}
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.svg',
      badge: '/icon.svg',
      vibrate: [80, 40, 80],
      data: { url: data.url },
      tag: data.tag || 'architect',
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((wins) => {
      for (const w of wins) {
        if (w.url.includes(self.location.origin) && 'focus' in w) {
          w.navigate(url);
          return w.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});

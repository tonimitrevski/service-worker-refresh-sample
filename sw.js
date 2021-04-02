// update version in every change in service worker
const v = "0";
addEventListener('install', e => {
  console.log('install event');
  return e.waitUntil(
      caches.open(v).then(cache => cache.addAll(['/']))
  )
});

addEventListener('fetch', e => {
  console.log('fetch', e.request);
  e.respondWith(
    caches.match(e.request).then(cachedResponse =>
      cachedResponse || fetch(e.request)
    )
  );
});

addEventListener('activate', e => {
  console.log('active event');
  e.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key != v) return caches.delete(key);
    }));
  }));
});

addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    skipWaiting();
  }
});

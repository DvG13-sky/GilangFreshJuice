// Service Worker - Gilang Fresh Juice
const CACHE_NAME = 'gilang-jus-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// Push Notification Handler
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};

  const title = data.title || 'Gilang Fresh Juice';
  const options = {
    body: data.body || 'Anda memiliki notifikasi baru',
    icon: data.icon || '/icons/icon-192x192.png',
    badge: data.badge || '/icons/icon-72x72.png',
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction ?? false,
    data: data.data || {},
    vibrate: data.tag === 'stock_out' ? [200, 100, 200] : [100],
    timestamp: Date.now(),
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-sales') {
    event.waitUntil(syncPending('pending_sales'));
  }
  if (event.tag === 'sync-expenses') {
    event.waitUntil(syncPending('pending_expenses'));
  }
});

async function syncPending(storeName: string) {
  try {
    const db = await openDB('jus-manager-db', 1);
    const pending = await db.getAll(storeName);

    for (const item of pending) {
      try {
        const response = await fetch('/api/' + storeName.replace('pending_', ''), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data),
        });
        if (response.ok) {
          await db.delete(storeName, item.localId);
        }
      } catch (e) {
        console.error('Sync failed:', e);
      }
    }
  } catch (e) {
    console.error('Background sync error:', e);
  }
}

// Skip Waiting Message
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

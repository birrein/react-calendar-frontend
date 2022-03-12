/* eslint-disable no-undef */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

registerRoute(
  new RegExp(
    'http://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
  ),
  new CacheFirst()
);

registerRoute(
  new RegExp(
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
  ),
  new CacheFirst()
);

registerRoute(
  new RegExp('http://localhost:4000/api/auth/renew'),
  new NetworkFirst()
);

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkFirst()
);

// Offline sync

const bgSyncPlugin = new BackgroundSyncPlugin('offline-events', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'PUT'
);

registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'DELETE'
);
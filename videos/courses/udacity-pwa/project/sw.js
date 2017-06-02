var dataCacheName = 'weatherPWA-data-v2';
var cacheName = 'weatherPWA-v2';

var dataUrl= 'https://publicdata-weather.firebaseio.com/';


var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/localForage.min.js',
  '/styles/ud811.css',
  '/images/wind.png',
  '/images/thunderstorm.png',
  '/images/snow.png',
  '/images/sleet.png',
  '/images/scattered-showers.png',
  '/images/rain.png',
  '/images/partly-cloudy.png',
  '/images/ic_refresh_white_24px.svg',
  '/images/ic_add_white_24px.svg',
  '/images/fog.png',
  '/images/cloudy_s_sunny.png',
  '/images/cloudy.png',
  '/images/cloudy-scattered-showers.png',
  '/images/clear.png',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  if (e.request.url.startsWith(dataUrl)) {
    e.respondWith(
      fetch(e.request)
        .then(function(response) {
          return caches.open(dataCacheName).then(function(cache) {
            cache.put(e.request.url, response.clone());
            console.log('[ServiceWorker] Fetched&Cached Data');
            return response;
          });
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});

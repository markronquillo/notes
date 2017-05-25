Introduction to Progressive Web Apps
-------------------------------------

# Lesson 1: Progressive Web Apps

Best of webs and best of the apps


Service Workers are Network Progressive enhancement
It sits between the browser and the server acting like a client side proxy


Web App Manifest file
- gives the ability to control how apps is displayed to the user.
- 

App Shell - typically the content of your app/site that doesn't change much often.


webpagetest

Load the App Shell, then make an ajax request to get the initial data.


Storage:

1. LocalStorage
- Pros: available almost everywhere
- Cons: it is synchronous, means it is blocking, Not Transactional

2. Cache Storage
- Pros: Easy to use, Async, Fast
- Cons: Not Transactional -- means you can overwrite something , not available in most areas.

3. IndexedDB
- Pros: Fast, Complex Data, Async, Transactional
- Cons: hard to setup

localForage, lovefield


Lesson 1: Final Task

1. Choose a storage engine
2. Save the selected cities of the user,
3. During onload, check if there are cities saved then fetch current data for those cities to dispay
4. Bonus: button to delete selected cities.


# Service Workers

A Service Worker is a javascript file that is run by the browser in background separate from your webpage and handles events that is triggered by the browser or your app.

Ability to intercept fetch events.

### How does service worker work?

Web Page Register SW -> installing -> activated -> (loop)

(loop) -> idle -> fetch 
				-> push/message
				-> terminated

### Registering a service worker

```javascript
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/service-worker.js')
		.then(function(registration) {
			console.log('Service Worker Registered', registration);
		});
}
```

### Service Worker Scope

www.example.com/sw.js 			-- all will have service worker
www.example.com/folder/sw.js 	-- only under /folder will have service worker


### Service Worker Events & Debugging

work in incognito.

### Cache App Shell

We can cache the App shell or resources that doesn't change much during the installation of `service-worker.js`. Remember to include `cacheName` in service-worker.js.

```javascript
var cacheName = 'weatherPWA-v3';
var filesToCache = [...];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(filesToCache);
		});
	)
});
```

Remember that `cache.addAll()` is atomic, if any of the files to cache is unreachable, no files will be cached.


There will come a time when we need to update the App Shell files. The proper place to do this is in `activate` event.

```javascript
self.addEventListenr('activate', function(e) {
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList,map(function(key) {
				if (key !== cacheName && key !== dataCacheName) {
					return caches.delete(key);
				}
			}
			}));
		})
	);
})
```

Given this approach, whenever we update the cacheName, all the cached files will be invalidated.

### Handling The Fetch Event

Get the App Shell from the Cache

self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetc', e.request.url);
	e.respondWith(
		cache.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	)
});


### Quiz: Update Your Project - Cache

```javascript
var cacheName = 'weatherPWA-v1';
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
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
```

### Caching Strategies

Service workers allows you to decide how you cache your files.

- Cache First, then Network.

- Network First, Then cache

  This approach is for scenarios where the network fails to get the data and instead of displaying no data, we display the cached data, which is probably stale.

- Cache Only
  Saving Battery

- Network Only

- Cache and Network Race

- Cache then Network
  We first load the cache and make a network request at the same time,
  After the network request is done, we update the cache and the displayed data.


### Intercept The Request and Cache

We first get the cached data then make a request for the new data.

```javascript
// sw.js
onfetch = function(e) {
  var url = e.request.url;
  if (url === 'app.html') {
    e.respondWith(
      caches.match(e.request)
    );
  }

  if (url == 'content.json') {
    // go to the network for updates
    // then cache response adn return
    e.respondWith(
      fetch(...).then(function(r) {
        cache.put(url, r.clone())
        return r;
      });
    )
  }
}

// app.js
app.getForecast = function(key, label) {
  var url = baseURL + key + '.json';
  if ('caches' in window) {
    caches.match(url).then(function(response) {
      if (response)  {
        response.json().then(function(json) {
          if (app.hasRequestPending) {
            console.log('updated from cache');
            json.key = key;
            json.label = label;
            app.updateForecastCard(json);
          }
        });
      }
    })
  }

  app.hasRequestPending = true;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        var response = JSON.parse(request.response);
        response.key = key;
        response.label = label;
        app.hasRequestPending = false;
        app.updateForecastCard(response);
      }
    }
  }
}
```

Separate App Shell to Cache Data.

Update Your Project: Caching Strategies

1. in getForecast, set to get the cache version first then make a network request
2. in the service worker, cache the data in a different name.

sw-precache

# Web App Manifest

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "start_url": "/index.html",
  "icons": [...],
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2",
  "display": "standalone",
  "orientation": "portrait"
}
```

name and short_name is required

short_name - use in the homescreen

start_url - url when launched in the homescreen, you can add querystring to do some analytics

icons: [{
  "src": "/icons/icon-128.png",
  "sizes": "128x128",
  "type": "image/png"
}]

Web App Manifest Icon Sizes: at least provide icons in these sizes.

- 48x48, 96x96, 128x128, 144x144, 192x192, 256x256, 384x384, 512x512

background_color: splash screen
theme_color: app color, bar

__Web Manifest Validator__

<link rel="manifest" href="manifest.json">

### Web App Install Banners

Prompting your user to add your webapp to their homescreen.

Requirements:
1. Service Worker
2. Web App Manifest File
3. Engaged User

`onbeforeinstallprompt`

You can add analytics to the banner.

### Add To Home Screen Elements for Safari

<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">





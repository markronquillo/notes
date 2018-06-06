## Service Workers

Checking for browser support

```javascript
	// 1. Check if browser supports
	if ('serviceWorker' in navigator) {
		// 2. Wait for page load
		window.addEventListener('load', function() {
			// 3. Register service worker		
			navigator.serviceWorker.register('sw.js')
				.then(function(registration) {
					console.log('Registered')		
				}, function(err) {
					console.log('Service registration failed', err)
				})
				.catch(function(err) {
					console.log(err)
				})
		})
	} else {
		console.log('service worker is not supported')
	}
```


## Using Service Worker to Send Push Notifications

- Requesting permission to show notifications
- Tracking and saving user tokens
- Using Cloud Functions to send notifications


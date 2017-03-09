
__Promise.all__, accepts a list of promises and triggers `then` if all of them are resolved, if at least one is rejected, this will call the catch.

```
	Promise.all([loadImage('image1'), loadImage('image2')])
	.then(function(images) {
		// you will receive all images
	}).
	catch(function(err) {
		console.log(err);
	});
```


__Promise.race__, accepts a list of promises and triggers the first one who resolved. This is useful in case of there are multiple place that we can fetch the same resource and we just want to get the first that will trigger resolve.




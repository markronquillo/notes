## Callback hell

```javascript
setTimeout(function() {
	console.log(callback);
}, 1000);
```

## Exercise 1:

1. This exercise calls for you to write some async flow-control code. To start off with, you'll use callbacks only,

2. Expected behavior 
	- Request all 3 files at the same time (in parallel)
	- Render them ASAP (don't just blindly wait for all to finish loading)
	- BUT, render them in proper (obvious) order: 'file1', 'file2', 'file3'.
	- After all 3 are done, output 'Complete!'.

## Callback Hell problem: Inversion of Control

_Inversion of Control_ (at least in this course) means that we have parts of our program that we pass (most probably through callbacks) and gives the control to other program or functions to invoke/execute it.

```javascript
// line 1
setTimeout(function() {
	// line 3	
	// line 4
}, 1000);
// line 2
```

```javascript
trackCheckout(
	purchaseInfo, 
	function finish() {
		chargeCreditCard(purchaseInfo);
		showThankYouPage();
	}
);
```

When we pass callbacks we trust it to be called;
1. not too early.
2. not too late
3. not too many times
4. not too few times
5. no lost context
6. no swallowed errors
... 


## Callbacks Problem: Not Reasonable

The only way to handle temporal dependency in callbacks is nesting.

It is hard to reason about multiple nested callbacks, on how it will work.

## Non Fixes for callback problems:

```
// error-first style
function trySomething(cb) {
	setTimeout(function() {
		var num = Math.random();
		if (num > 0.5) cb(null, num);
		else cb('Too low!');
	}, 1000);
}

trySomething(function(err, num) {
	if (err) {
		console.log(err);
	} 
	else {
	console.log('Number: ' + num);
	}
});
```
 




	
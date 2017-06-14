# Promises

## Native Promises

Promises -> Future Values -> 'Completion Events'

## Promise API

```
function finish() {
	chargeCreditCard(purchaseInfo);
	showThankYouPage();
}

function error(err) {
	logStatsError(err);
	finish();
}

var listener = trackCheckout(purchaseInfo);

listener.on('completion', finish);
listener.on('error', error);
```

Promises uninvert the inversion of control, what if instead of giving the other program the control to run our function, we ask for an event of completion or error and we subscribe to it and immediately unsubscribe after we run our function ourselves.


```javascript
function trackCheckout(info) {
	return new Promise(
		function(resolve, reject) {
			// attempt to track the checkout

			// if successful, call resolve()
			// otherwise, call reject(error)
		}
	);
}

function finish() {
	chargeCreditCard(purchaseInfo);
	showThankYouPage();
}
function error(err) {
	logStatsError(err);
	finish();
}
var promise = trackCheckout(purchaseInfo);
promise.then(finish, error);
```

Still callbacks?

The fundamental function of promise is to instill trust.

Promise Trust:

1. only resolved once
2. either scucess or error
3. messages passed/kept
4. exceptions become errors
5. immutable once resolved.


## Flow Control

doFirstThing
	doSecondThing
	doThirdThing
	doComplete
ifErrorHandle

Chaining Promises - on a promise, rreturn a new promise to keep the chain.

```javascript
doFirstThing()
	.then(function() { 
	})
	.then(function() {
	})
	.then(complete, error);
```

## Exercise 3

Use Promises instead of thunks.

Solution: just make sure you return the next promise to be handled and in order.

## Exercise 3 Questions:

Functions should do one thing as much as possible.

```javascript
p1
.then(output)
.then(function() {
	return p2;
})
.then(output)
.then(function() {
	return p3;
})

---

.then(resolve, reject);
```

`resolve` function inside the Promise object, when invoked, tells the promise to resolve your self, the resolve procedure now looks for any then handler and passes its argument to that.

Remember that `resolve` is not the function you pass in the `then` handler but it triggers

## Exercise 4: Get our flow control in arbitrary length

The problem here is that, in contrast to the previous exercises, we can have an arbitrary list of items/tasks to do.

The goto solution for this kind of arbitrary scenarios is list or array.

Solution: Use map and reduce.

## Abstractions

Promise.all()
Promise.race()

## Sequences and Gates

sequence = automatically
chained promises


## Exercise 5 and 6

Exercise 5: is like 3 but using ASQ
Exercise 6: is like 4 but using ASQ

```javascript
// ex5
function getFile(file) {
	return ASQ(function(done) {
		fakeAjax(file, done);
	});
}

getFile("file1")
	.val(output)
	.seq( getFile("file2") )
	.val(output)
	.seq( getFile("file3") )
	.val(output)
	.val(function() {
		output('Complete');
	})
```

```javascript
// ex6
function getFile(file) {
	return ASQ(function(done) {
		fakeAjax(file, done);
	});
}

ASQ()
.seq(
	...(["file1", "file2", "file3"]
		.map(getFile)
		.map(function(sq) {
			return sq.val(output);
		})
	)
)
.val(function() {
	output('Complete');
});
```

_davidwalsh.name/asyncquence-part-1_

 



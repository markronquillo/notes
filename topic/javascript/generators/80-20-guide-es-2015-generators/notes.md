## Getting Started with Generators

Generators

```javascript

function* myGenerator() {
	yield 1;
	yield 2;
	yield 3;
	return 4;
}

const imp = myGenerator();
imp.next(); // { value: 1, done: false }
imp.next(); // { value: 2, done: false }
imp.next(); // { value: 3, done: false }
imp.next(); // { value: 4, done: true }

```


## Asynchronous Coroutines

The calling function would then execute the asynchronous function and resume the generator function when the asynchronous function was done. The pattern is an instance of an old programming concept known as **coroutine**.

A **coroutine** is a function that can suspend its executing and defer to another function.

coroutine has two functions involved, the generator function and the function that calls next. When your generator function yields an asynchronous operation, the calling function needs to handle the asynchronous operation and resume the generator when the asynchronous operation completes.

```javascript
// using co
const co = require('co')

const superagent = require('superagent');

co(function*() {
	const html = (yield superagent.get('http://www.google.com')).text;
	html; // HTML for Google's home page
})
```

##### Promises and Thunks

A thunk is an asynchronous function that takes a single parameter which is a callback.

A promise is an object that has `.then()` function that takes two functions as parameters, onFulfilled and onRejected. You can think of promises as an object wrapper around a single asynchornous operation, Once you call `.then()`, the async operations starts. Once the async operation completes, the promise then calls either onFulfilled or onRejected.









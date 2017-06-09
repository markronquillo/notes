## Generator Example

Promises solves Inversion of Control
Generators solves non local non sequential reasonability

Run to completion semantic.

Syntactic form 

```javascript
function* gen() {
	console.log('Hello');
	yield;
	console.log('World');
}

var it = gen();
it.next();
it.next();
```

Calling a generator produces an iterator.


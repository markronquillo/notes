## Synchronous and Asynchronous Thunks

A thunk is a function that holds values or states that returns a value when you invoke it.

```javascript
// Synchronous Thunk
function add(x, y) {
	return x + y;
}

var thunk = function() {
	return add(10, 15);
};

thunk();
```

Thunk became a container that wraps a state.

Asynchronous thunk, is a function that doesn't need any arguments passed to it to do its job except a callback to get its value.

```javascript
function addAsync(x, y, cb) {
	setTimeout(function() {
		cb(x + y);
	}, 1000);
}
var thunk = function(cb) {
	addAsync(10, 15, cb);
}
thunk(function(sum) {
	sum; 	
});
```

Time is the most complex state in your program.

A Promise is a time independent wrapper around a value.

```javascript
function makeThunk(fn) {
	var args = [].slice.call(arguments, 1);
	return function(cb) {
		args.push(cb);
		fn.apply(null, args);
	}
}
```


```javascript
var get10 = makeThunk(getData, 10); 
var get30 = makeThunk(getData, 30); 

get10(function(num1) {
	var x = 1 + num1;	
	get30(function(num2) {
		var y = 1 + num2;

		var getAnswer = makeThunk(getData, "Meaning of life: " + (x + y));

		getAnswer(function(answer) {
			console.log(answer);
		})
	});
});
```

The idea with thunks is that you can think of it as a box where you can get the value by just passing a callback. 


## Exercise

`getFile` needs to produce a thunk, should it be lazy or active?

There are two scenarios that you have to watch out

1. When the data is already available in the thunk
2. and when it is not during our thunk invocation.

The solution is that we need to test if the asynchronous function is already finished and store the data in a variable to be consumed by the invocation of the thunk later. If we invoked the thunk too early, we can save the callback inside the function and just use it directly instead of storing the response, that is intended for later use.

```javascript
// definition
function getFile(file) {
	var text, fn;

	fakeAjax(file, function(response) {
		if (fn) fn(response);
		else text = response;
	});

	return function(cb) {
		if (text) cb(text);
		else fn = cb;
	}
}

// usage
var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");
th1(function(response) {
	output(response);
	th2(function(response) {
		output(response);
		th3(function(response) {
			output(response);
		});
	});
});
```

## Thunks and Closure

A Thunk is just using closure to maintain state.

By using the closure, we eliminate time as a factor of state.

 
 


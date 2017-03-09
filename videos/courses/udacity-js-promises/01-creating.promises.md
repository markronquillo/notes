Creating Promises
-----------------

#### Callbacks vs Thens



Runs on main thread


Promise, in a way, is a try catch wrapper around code that will finish in unpredictable time.

var promise = new Promise(function(resolve[, reject]) {
	var value = doSomething();
	if (thingWorked)	{
		resolve(value)
		} else if (somethingWentWrong) {
		reject();
	}

}).then(function(value){
	return nextThing(value)
}).catch(rejectFunction)

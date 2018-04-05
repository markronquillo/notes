const async = function(callback) {
	setTimeout(() => callback(new Error('Oops!')), 10);
}

const generatorFunction = function*() {
	try {
		yield async;
	} catch (error) {
		console.log('error!!!');
		console.log(error);
	}
}

// we create a new generator function
const generator = generatorFunction();

// get the next value
const res = generator.next();

// the next value is a function that will
// eventually throw an error
res.value(function(error, res) {
	// we pass the error to the generator
	// using throw
	generator.throw(error);
});

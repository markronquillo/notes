const async = function(callback) {
	setTimeout(() => callback(null, 'Hello Async'), 10);
};

const generatorFunction = function*() {
	const v = yield async;
	console.log(v);	
}

const generator = generatorFunction();

// we get the next value
const res = generator.next();

// the next value is a function,
// we pass a callback to it
res.value(function(error, res) {
	if (error) {
		console.log('ERROR!');
	}
	// we pass the result value to the generator *** 
	generator.next(res);
});

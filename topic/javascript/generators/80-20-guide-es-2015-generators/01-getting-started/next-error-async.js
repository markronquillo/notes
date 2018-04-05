const generatorFunction = function*() {
	throw new Error('oops!');
}

const generator = generatorFunction();

setTimeout(() => {
	try {
		generator.next();
	} catch (err) {
		console.log(err.stack)
	}
}, 0)

const generatorFunction = function*() {
	throw new Error('oops!');
}

const generator = generatorFunction();

generator.next();

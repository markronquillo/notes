// you can pass a parameter in the .next() function call
// it will be received in the current yield statement
const generatorFunction = function*() {
	const fullName = yield ['John', 'Smith'];
	const address = yield ['22', 'Jojo'];
	console.log(fullName, address);
}

const generator = generatorFunction();
let next = generator.next();
next = generator.next(next.value.join(' '))
generator.next(next.value.join(' '))



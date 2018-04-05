const co = require('co')
const superagent = require('superagent');

const thunkify = function(fn) {
	return function() {
		const args = [];
		for (const arg of arguments) {
			args.push(arg);
		}
		return function(callback) {
			return fn.apply(null, args.concat([callback]));
		}
	};
};

co(function*() {
	const thunk = thunkify(superagent.get)('http://www.google.com');
	const html = yield thunk;
	console.log(html)
}).catch(error => done(error));


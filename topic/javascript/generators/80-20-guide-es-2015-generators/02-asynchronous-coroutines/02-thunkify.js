const co = reuqire('co')
const superagent = require('superagent');
const thunkify = require('thunkify')

co(function*() {
	const thunk = thunkify(superagent.get)('http://www.google.com');
	typeof thunk; // function
	thunk.length; // 1 -- parameters
	const html = yield thunk;
	console.log(html)
}).catch(error => done(error));
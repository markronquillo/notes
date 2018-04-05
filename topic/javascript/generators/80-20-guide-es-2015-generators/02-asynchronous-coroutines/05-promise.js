const co = require('co');
const superagent = require('superagent');

co(function*() {
	superagent.get('http://www.google.com').then;
	co(function*() {
		const res = yield superagent.
			get('http://www.google.com').
			query({ color: 'blue' });
	});
});

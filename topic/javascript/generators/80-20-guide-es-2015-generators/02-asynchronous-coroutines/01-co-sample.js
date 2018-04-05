const co = require('co')
const superagent = require('superagent')

co(function*() {
	const html = (yield superagent.get('http://www.google.com')).text;
	console.log(html);
});

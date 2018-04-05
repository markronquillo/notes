const superagent = require('superagent');

const fo = function(generatorFunction) {
	const generator = generatorFunction();

	// initial call for generator.next();
	next();

	// this handles possible errors,
	// the actual call of next()
	// and handling async 
	function next(v, isError) {
		const res = isError ? generator.throw(v) : generator.next(v);
		if (res.done) {
			return;
		}
		handleAsync(res.value);
	}

	function handleAsync(async) {
		if (async && async.then) {
			handlePromise(async);
		} else if (typeof async === 'function') {
			handleThunk(async);
		} else {
			next(new Error(`Invalid yield ${async}`), true);
		}
	}

	function handlePromise(async) {
		async.then(next, (error) => next(error, true));
	}

	function handleThunk(async) {
		async((error, v) => {
			error ? next(error, true) : next(v);
		});
	}
};

fo(function*() {
	const html = (yield superagent.get('http://www.google.com')).text;
	console.log(html);
});

fo(function*() {
	try { 
		const res = yield superagent.get('http://doesnot.exist.baddomain');
	} catch (error) {

	}

	const res = yield superagent.get('http://www.google.com');
	console.log(res);
});

fo(function*() {
	const url = 'http://doesnot.exist.baddomain';
	const NUM_RETRIES = 3;
	let res;
	for (let i = 0; i < 3; i++) {
		try {
			res = yield superagent.get(url);
			break;
		} catch (error) { }
	}
});


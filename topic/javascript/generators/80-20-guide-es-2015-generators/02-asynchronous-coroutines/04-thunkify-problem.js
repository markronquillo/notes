class Test {
	async(callback) {
		return callback(null, this)
	}
}

co(function*() {
	const test = new Test();
	const res = yield thunkify(test.async)();

	// res refers to global object rather than the `test` variable
	assert.ok(res !== test);
	done();
});

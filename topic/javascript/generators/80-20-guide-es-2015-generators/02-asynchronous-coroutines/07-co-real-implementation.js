const fo = function(input) {
	// helper functions
	const isGenerator = (v) => typeof v.next === 'function';
	const isGeneratorFunction = (v) => v.constructor && v.constructor.name === 'GeneratorFunction';

	// we set the generator instance*
	let generator;
	if (isGenerator(input)) generator = input;
	if (isGeneratorFunction(input)) generator = input();
	if (!generator) throw `Invalid paramter fo() ${input}`;

	return new Promise((resolve, reject) => {
		next();

		function next(v, isError) {
			let res;
			try {
				res = isError ? generator.throw(v) : generator.next(v);
			} catch (error) {
				return reject(error);
			}
			if (res.done) {
				return resolve(res.value)
			}
			toPromise(res.value).then(next, (error) => next(error, true));
		}

		function toPromise(v) {
			if (isGeneratorFunction(v) || isGenerator(v)) return fo(v);
			if (v.then) return v;
			if (typeof v === 'function') {
				return new Promise((resolve, reject) => {
					v((error, res) => error ? reject(error) : resolve(res));
				});
			}
			if (Array.isArray(v)) return Promise.all(v.map(toPromise));
			return Promise.reject(new Error(`Invalid yield ${v}`));
		}
	})
}
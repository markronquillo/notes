const User = require('../models/user');


exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;


	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

	// See if as user with the given email exists
	User.findOne({ email: email }, function(err, existingUser) {
		if (err) { return next(err); }

		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' }); // unprocessable entity
		}

		// if a user with email does exist, reutrn an error
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err) {
			if (err) { return next(err); }
			res.json(user);
		});

	});
}
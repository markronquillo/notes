const User = require('../models/user');
const config = require('../config.js');
const jwt = require('jwt-simple');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	
	// sub = subject; iat = issued at 
	return jwt.encode({ sub: user.id,  iat: timestamp }, config.secret);
}

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
			
			res.json({token: tokenForUser(user)});
		});

	});
}


exports.signin = function(req, res, next) {
	// user has already had their email and password auth'd
	req.send({ token: tokenForUser(req.user)});
}
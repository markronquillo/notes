const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true},
	password: String
});

// on save hook, encrypt passowrd
userSchema.pre('save', function(next) {
	// get access to the user model
	const user = this;

	// generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) { return next(err); }

		// hash (encrypt) our password using salt
		bcrypt.hash(user.password, salt, null, function(error, hash) {
			if (err) { return next(err); }

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) { return callback(err); }

		callback(null, isMatch);
	});
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
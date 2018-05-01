const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = () => {
	return new User({
		googleId: '',
		displayName: '',
	}).save();
}

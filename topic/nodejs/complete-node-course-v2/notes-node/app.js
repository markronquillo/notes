console.log('Starting app');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

// fs.appendFile('greetings.txt', 'Hello world!');

var user = os.userInfo();

fs.appendFile('greetings.txt', `Hello ${user.username}, age ${notes.age}!`, function(err) {
	if (err) {
		console.log('error')
	}
});




var mongoose = require('mongoose');

mongoose.Promse = global.Promise;

var db = 'mongodb://localhost:27017/TodoApp';

if (process.env.NODE_ENV === 'test') {
	db = 'mongodb://localhost:27017/TodoAppTest';
}
mongoose.connect(db);

module.exports = { mongoose };
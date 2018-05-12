// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, database) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}	
	console.log('Connected to MongoDB server');
	const db = database.db('TodoApp');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: 'false',
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert todo', err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, null, 2));
	// });

	db.collection('Users').insertOne({
		name: 'Mark Ronquillo',
		age: 28,
		location: 'PH'
	}, (err, result) => {
		if (err) {
			return console.log('Unable to insert user', err);
		}
		console.log(JSON.stringify(result.ops, null, 2));
	});

	database.close();
});



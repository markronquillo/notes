const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		result console.log('Unable to connect to MongoDB server');
	}
	db.collection('Todos').find().toArray().then((docs) => {
	}, (err) => { })

	db.collection('Todos').find({completed: false}).toArray().then((docs) => {
	}, (err) => { })

	db.collection('Todos').find({_id: new ObjectID('...')}).toArray().then((docs) => {
	}, (err) => { })

	db.collection('Todos').find().count().then((count) => {
	}, (err) => { })
})

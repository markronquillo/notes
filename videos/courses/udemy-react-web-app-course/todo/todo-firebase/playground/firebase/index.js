import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyD79I650j6QgayYNCfhXOLHkuSdDC2rVQM",
  authDomain: "mark-todo-app-7f01e.firebaseapp.com",
  databaseURL: "https://mark-todo-app-7f01e.firebaseio.com",
  projectId: "mark-todo-app-7f01e",
  storageBucket: "mark-todo-app-7f01e.appspot.com",
  messagingSenderId: "1076631053463"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref()

firebaseRef.set({
	app: {
		name: 'Todo App',
		version: '1.0.0'
	},
	isRunning: true,
	user: {
		name: 'Andrew',
		age: 26
	}
}).then(() => {
	console.log('success');
}, (err) => {
	console.log('failed');
});

// // set data 
// firebaseRef.child('user').set({name: 'Mark'})

// // update data
// firebaseRef.child('app').update({ name: 'Sample' })

// // remove data
// firebaseRef.child('app/version').remove()

// // fetch data
// firebaseRef.once('value').then((snapshot) => console.log(snapshot), 
// 	(err) => console.log(err));

// firebaseRef.child('app').once('value').then((snapshot) => {});

// // attach on change event
// firebaseRef.on('value', (snapshot) => {
// 	console.log(snapshot.val());
// });

// -- Watch Data
// firebaseRef.child('user').on('value', (snapshot) => {
// 	console.log(snapshot.val());
// });

// firebaseRef.child('user').update({ name: 'Mark' });

// -- Working with Arrays
var notesRef = firebaseRef.child('notes');
notesRef.on('child_added', (snapshot) => {
	console.log('Snapshot added: ', snapshot.key, snapshot.val());
});
notesRef.on('child_changed', (snapshot) => {
	console.log('Snapshot changed: ', snapshot.key, snapshot.val());
});
notesRef.on('child_removed', (snapshot) => {
	console.log('Snapshot removed: ', snapshot.key, snapshot.val());
});
var newNoteRef = notesRef.push({
	text: 'Walk the dog'
})



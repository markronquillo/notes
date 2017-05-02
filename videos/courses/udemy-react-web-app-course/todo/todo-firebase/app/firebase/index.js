import firebase from 'firebase';

try {
	var config = {
	  apiKey: "AIzaSyD79I650j6QgayYNCfhXOLHkuSdDC2rVQM",
	  authDomain: "mark-todo-app-7f01e.firebaseapp.com",
	  databaseURL: "https://mark-todo-app-7f01e.firebaseio.com",
	  projectId: "mark-todo-app-7f01e",
	  storageBucket: "mark-todo-app-7f01e.appspot.com",
	  messagingSenderId: "1076631053463"
	};
	firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref()
export default firebase;


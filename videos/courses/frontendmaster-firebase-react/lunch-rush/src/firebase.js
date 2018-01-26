import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC2r8H1TRfVIbBG1ED7noZKKSfhAQ2DNBg",
  authDomain: "dropoff-dashboard.firebaseapp.com",
  databaseURL: "https://dropoff-dashboard.firebaseio.com",
  // projectId: "dropoff-dashboard",
  storageBucket: "dropoff-dashboard.appspot.com",
  messagingSenderId: "34105714732"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

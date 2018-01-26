import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBboA_Y5RSKzwL6H2AAdSnEjH7Gqytu0DA",
    authDomain: "firstflight-d88ff.firebaseapp.com",
    databaseURL: "https://firstflight-d88ff.firebaseio.com",
    projectId: "firstflight-d88ff",
    storageBucket: "firstflight-d88ff.appspot.com",
    messagingSenderId: "630389047803"
};
firebase.initializeApp(config);


export default firebase;
export const database = firebase.database();

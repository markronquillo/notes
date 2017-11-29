import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase'
import { Header } from './components/common/Header'
import LoginForm from './components/LoginForm'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  state = { loggedIn: false }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBCkjkkIIGME-TwngnAGwzjLl3HNyE2FS0",
      authDomain: "fir-auth-757ef.firebaseapp.com",
      databaseURL: "https://fir-auth-757ef.firebaseio.com",
      projectId: "fir-auth-757ef",
      storageBucket: "fir-auth-757ef.appspot.com",
      messagingSenderId: "120351516933"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

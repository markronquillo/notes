import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'

import LoginForm from './components/LoginForm'
import reducers from './reducers'
import { Header } from './components/common/Header'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

class App extends Component<{}> {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyDPAO3FOIsw2ahMqNEE5AjvvNWnQQH3oE4",
      authDomain: "react-native-app-e4d35.firebaseapp.com",
      databaseURL: "https://react-native-app-e4d35.firebaseio.com",
      projectId: "react-native-app-e4d35",
      storageBucket: "react-native-app-e4d35.appspot.com",
      messagingSenderId: "33809257460"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <View>
          <Header headerText="Login" />
          <LoginForm />
        </View>
      </Provider>
    );
  }
}

export default App;


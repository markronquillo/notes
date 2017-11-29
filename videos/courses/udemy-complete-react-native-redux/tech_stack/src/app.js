import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { Header } from './components/common'
import LibraryList from './components/LibraryList'

const store = createStore(reducers)

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1}}>
          <Header headerText="Tech Stack" />
          <LibraryList />
        </View>
      </Provider>
    );
  }
}

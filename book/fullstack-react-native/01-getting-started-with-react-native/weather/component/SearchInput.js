import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default class SearchINput extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder="Search any city"
          placeholderTExtColor="white"
          clearButtonMode="always"
          style={styles.textInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: "white"
  }
});

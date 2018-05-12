import React from "react";
import {
  List,
  ListItem,
  Text,
  Icon,
  Button,
  Container,
  Content
} from "native-base";
import {
  Image,
  Dimensions,
  View,
  Share,
  ActivityIndicator,
  StyleSheet
} from "react-native";

var { height, width } = Dimensions.get("window");
export default class Gallery extends React.Component {
  _share(image) {
    Share.share({ message: image.src, title: "Image from:" + image.user.name });
  }

  render() {
    return <View />;
  }
}

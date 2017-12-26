import React, { Component } from "react";
import { Actions, Router, Scene } from "react-native-mobx";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

export default class Order extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ae522e"
        }}
      />
    );
  }
}

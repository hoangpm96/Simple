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

export default class AboutUs extends Component {
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#ae522e",
          padding: 15
        }}
      >
        <Image
          style={{
            width: width - 30,
            height: 220,
            resizeMode: "cover"
          }}
          source={require("./img/about-us/about-us.jpg")}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            paddingTop: 10,
              fontWeight: 'bold'
          }}
        >
          Coffeehouse and coffee shop are related terms for an establishment
          which primarily serves prepared coffee and other hot beverages.
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            paddingTop: 10,
              paddingBottom: 20,
              fontWeight: 'bold'
          }}
        >
          A coffeehouse may share some of the same characteristics of a bar or
          restaurant, but it is different from a cafeteria. As the name
          suggests, coffeehouses focus on providing coffee and tea as well as
          light snacks. Many coffee houses in the Middle East, and in West Asian
          immigrant districts in the Western world, offer shisha (nargile in
          Turkish and Greek), flavored tobacco smoked through a hookah. Espresso
          bars are a type of coffeehouse that specialize in serving espresso and
          espresso-based drinks.
        </Text>
      </ScrollView>
    );
  }
}

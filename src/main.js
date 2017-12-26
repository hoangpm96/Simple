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
  ScrollView,
    ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

export default class Main extends Component {
  render() {
    return (
      <ImageBackground
          source={require("./img/main-background.jpg")}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 280,
            height: 280,
            borderRadius: 140,
            //backgroundColor: "#ffdb95",
              borderWidth: 1,
              borderColor: '#8A180C',
              backgroundColor: 'rgba(255,255,255, 0.3)'
          }}
        >
          <Image
            source={require("./img/logo-app.png")}
            style={{
              width: 280,
              height: 280,
              resizeMode: "contain"
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            Actions.register();
          }}
          style={{
            width: 300,
            height: 50,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 120,
              backgroundColor: "#ae522e",

          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.login();
          }}
          style={{
            width: 300,
            height: 50,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
            backgroundColor: "rgba(255, 255, 255, 1)"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#ae522e",
              fontWeight: "bold"
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

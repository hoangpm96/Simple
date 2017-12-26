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

export default class InfoEvent extends Component {
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#ae522e",
            padding: 10
        }}
      >
          <Text style={{
              color: '#fff',
              fontSize:  20,
              fontWeight: 'bold'
          }}>
              {this.props.item.title}
          </Text>
          <Text style={{
              color: '#fff',
              fontSize:  13,
              paddingTop: 20
          }}>
              {this.props.item.time}
          </Text>
          <Text style={{
              color: '#fff',
              fontSize:  17,
              paddingTop: 20
          }}>
              {this.props.item.description}
          </Text>
      </ScrollView>
    );
  }
}

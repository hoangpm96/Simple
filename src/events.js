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
let data = [
  {
    day: "27",
    month: "MAR",
    title: "The Sunday Set",
    description:
      "Every month on a Sunday from 2pm-4pm we'll be showcasing some incredible Jazz talent in association with Birmingham Jazz!",
    time: "03/27/2015 12:00 AM"
  },
  {
    day: "01",
    month: "APR",
    title: "Tiramissu free!",
    description:
      "Promotion! Order coffee from 9 am to 11 am and get tiramissu free!",
    time: "04/01/2015 12:00 AM"
  },
  {
    day: "07",
    month: "APR",
    title: "Afternoon Play",
    description:
      "A great chance to meet new people and play many different board games ranging from old school games to modern games like Carcasonne &amp; 7 Wonders!!!! Fun times all round, meeting from 2pm!",
    time: "04/07/2015 12:00 AM"
  },
  {
    day: "10",
    month: "APR",
    title: "Come In and Try!",
    description: "Buy one Coffee and get one FREE!",
    time: "04/10/2015 12:00 AM"
  }
];
export default class Event extends Component {
  render() {
    return (
      <FlatList
          style={{
              flex:1,
              backgroundColor: "#ae522e",
          }}
          keyExtractor={(item, index) => index}
          data={data}
          renderItem={({ item, index }) => this.renderItems(item, index)}
      />
    );
  }
    renderItems(item, index){
      return(
        <TouchableOpacity
            onPress={()=>{
                Actions.infoEvent({item: item})
            }}
            style={{
            width: width,
            height: 100,
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomColor: "rgba(0, 0, 0, 0.15)",
            borderBottomWidth: 1.5,
            borderStyle: "solid",
            marginTop: 1
        }}>
            <View style={{
                width: 85,
                height: 100,
                backgroundColor: '#793a20',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: "#ffdb95",
                    fontSize: 18,
                    fontWeight: 'bold'
                }}>
                    {item.month}
                </Text>
                <Text style={{
                    color: "#fff",
                    fontSize: 40,
                    paddingTop: 5,
                    fontWeight: 'bold'

                }}>
                    {item.day}
                </Text>
            </View>
            <View style={{
                paddingLeft: 15,
                width: width - 100
            }}>
                <Text style={{
                    fontSize: 18,
                    color: '#fff',
                    fontWeight: 'bold'
                }}>
                    {item.title}
                </Text>
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{
                    fontSize: 15,
                    color: '#fff',
                    paddingTop: 5,
                }}>
                    {item.description}
                </Text>
                <Text style={{
                    fontSize: 13,
                    color: '#fff',
                    textAlign: 'right',
                    paddingTop: 5
                }}>
                    {item.time}
                </Text>
            </View>
        </TouchableOpacity>
      );
    };
}

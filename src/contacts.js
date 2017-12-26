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

export default class Contacts extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 4,
            backgroundColor: "#be745a",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("./img/getimage.png")}
            style={{
              width: 130,
              height: 130,
              borderRadius: 65,
              resizeMode: "cover"
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              paddingTop: 10
            }}
          >
            Coffee House
          </Text>
        </View>

        <View
          style={{
            flex: 7,
            backgroundColor: "#ae522e",
            paddingLeft: 15
          }}
        >
          <View
            style={{
              width: width,
              height: 60,
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Icon name="phone" color="#fff" size={30} style={{
                width: 30, height: 30
            }} />
            <View
              style={{
                marginLeft: 15,
                height: 60,
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff"
                }}
              >
                (+84) 979392930
              </Text>
            </View>
          </View>

          <View
            style={{
              width: width,
              height: 60,
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Icon name="envelope" color="#fff" size={30} style={{
                width: 30, height: 30
            }} />
            <View
              style={{
                marginLeft: 15,
                  borderTopColor: "#fff",
                  borderTopWidth: 1,
                height: 60,
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff"
                }}
              >
                newbie@gmail.com
              </Text>
            </View>
          </View>
            <View
            style={{
              width: width,
              height: 60,
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Icon name="globe" color="#fff" size={30} style={{
                width: 30, height: 30
            }} />
            <View
              style={{
                marginLeft: 15,
                  borderTopColor: "#fff",
                  borderTopWidth: 1,
                height: 60,
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff"
                }}
              >
                newbie.com
              </Text>
            </View>
          </View>
            <View
            style={{
              width: width,
              height: 60,
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Icon name="map-marker" color="#fff" size={30} style={{
                width: 30, height: 30
            }} />
            <View
              style={{
                marginLeft: 15,
                borderTopColor: "#fff",
                borderTopWidth: 1,
                height: 60,
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff"
                }}
              >
                Coffee House address
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

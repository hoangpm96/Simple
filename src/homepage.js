/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Actions, Router, Scene } from "react-native-mobx";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");

@autobind
@observer
export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.Global = this.props.Global;
        this.Global.isFooter = true;

    }
  render() {
    return (
      <ImageBackground
        source={require("./img/background.png")}
        style={styles.container}
      >
        <View
          style={{
            width: width,
            height: 100,
            position: "absolute",
            top: 0,
            backgroundColor: "rgba(154, 95, 74, 0.6)",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
              marginBottom: 18
            }}
            source={require("./img/coffee-cup.png")}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              marginLeft: 10,
                fontWeight: 'bold',
                fontFamily: 'Baskerville'
            }}
          >
            Coffee House
          </Text>
        </View>
        <View
          style={{
            width: width,
            height: 120,
            flexDirection: "row",
            marginTop: 250
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.menu()}
            style={{
              width: width / 3 - 3,
              height: 120,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,.5)",
              marginLeft: 0,
              borderColor: "#fff",
              borderWidth: 0.5
            }}
          >
            <Image
              source={require("./img/menu.png")}
              style={{
                width: 60,
                height: 70,
                resizeMode: "contain",
                opacity: 1,
                zIndex: 1
              }}
            />
            <Text
              style={{
                paddingTop: 8,
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              Menu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>{
                  Actions.aboutUs();
              }}
            style={{
              width: width / 3 - 3,
              height: 120,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,.5)",
              marginLeft: 4.5,
              borderColor: "#fff",
              borderWidth: 0.5
            }}
          >
            <Image
              source={require("./img/about-us.png")}
              style={{
                width: 60,
                height: 70,
                resizeMode: "contain",
                opacity: 1,
                zIndex: 1
              }}
            />
            <Text
              style={{
                paddingTop: 8,
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              About Us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 3 - 3,
              height: 120,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,.5)",
              marginLeft: 4.5,
              borderColor: "#fff",
              borderWidth: 0.5
            }}
          >
            <Image
              source={require("./img/facebook.png")}
              style={{
                width: 60,
                height: 70,
                resizeMode: "contain",
                opacity: 1,
                zIndex: 1
              }}
            />
            <Text
              style={{
                paddingTop: 8,
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              Facebook
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: width,
            height: 120,
            flexDirection: "row",
            marginTop: 3
          }}
        >
          <TouchableOpacity
              onPress={()=>{
                  Actions.event();
              }}
            style={{
              width: width / 3 - 3,
              height: 120,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,.5)",
              marginLeft: 0,
              borderColor: "#fff",
              borderWidth: 0.5
            }}
          >
            <Image
              source={require("./img/event.png")}
              style={{
                width: 60,
                height: 70,
                resizeMode: "contain",
                opacity: 1,
                zIndex: 1
              }}
            />
            <Text
              style={{
                paddingTop: 8,
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 3 - 3,
              height: 120,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,.5)",
              marginLeft: 4.5,
              borderColor: "#fff",
              borderWidth: 0.5
            }}
          >
            <Image
              source={require("./img/coffee.png")}
              style={{
                width: 60,
                height: 70,
                resizeMode: "contain",
                opacity: 1,
                zIndex: 1
              }}
            />
            <Text
              style={{
                paddingTop: 8,
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              Coffees
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>{
                  Actions.contacts();
              }}
            style={{
              width: width / 3 - 3,
              height: 120,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,.5)",
              marginLeft: 4.5,
              borderColor: "#fff",
              borderWidth: 0.5
            }}
          >
            <Image
              source={require("./img/contact.png")}
              style={{
                width: 60,
                height: 70,
                resizeMode: "contain",
                opacity: 1,
                zIndex: 1
              }}
            />
            <Text
              style={{
                paddingTop: 8,
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              Contacts
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: "center"

    //backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

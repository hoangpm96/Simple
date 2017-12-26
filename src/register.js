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
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

export default class Rigister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: ""
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ae522e",
          paddingLeft: 15,
          alignItems: "center",
            paddingTop: 20
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: "#ffdb95"
          }}
        >
          <Image
            source={require("./img/logo-app.png")}
            style={{
              width: 150,
              height: 150,
              resizeMode: "contain"
            }}
          />
        </View>
        <View
          style={{
            width: width - 40,
            height: 50,
            borderRadius: 5,
            borderColor: "#8A180C",
            borderWidth: 3,
            backgroundColor: "rgba(0,0,0,.1)",
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "rgba(0,0,0,.1)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon name="user-o" color="#ffdb95" size={20} />
          </View>

          <TextInput
            placeholder="Username..."
            placeholderTextColor="#fff"
            selectionColor="#fff"
            underlineColorAndroid="transparent"
            style={{
              fontStyle: this.state.userName === "" ? "italic" : "normal",
              fontSize: 18,
              color: "#fff",
              paddingLeft: 15
            }}
            onChangeText={username => {
              this.setState({ userName: username.toLowerCase() });
            }}
            value={this.state.userName}
          />
        </View>

        <View
          style={{
            width: width - 40,
            height: 50,
            borderRadius: 5,
            borderColor: "#8A180C",
            borderWidth: 3,
            backgroundColor: "rgba(0,0,0,.1)",
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "rgba(0,0,0,.1)",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5
            }}
          >
            <Icon name="key" color="#ffdb95" size={20} />
          </View>

          <TextInput
            secureTextEntry={true}
            placeholder="Password..."
            placeholderTextColor="#fff"
            selectionColor="#fff"
            underlineColorAndroid="transparent"
            style={{
              fontStyle: this.state.password === "" ? "italic" : "normal",
              fontSize: 18,
              color: "#fff",
              paddingLeft: 15
            }}
            onChangeText={password => {
              this.setState({ password: password.toLowerCase() });
            }}
            value={this.state.password}
          />
        </View>
        <View
          style={{
            width: width - 40,
            height: 50,
            borderRadius: 5,
            borderColor: "#8A180C",
            borderWidth: 3,
            backgroundColor: "rgba(0,0,0,.1)",
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "rgba(0,0,0,.1)",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5
            }}
          >
            <Icon name="unlock-alt" color="#ffdb95" size={20} />
          </View>

          <TextInput
            secureTextEntry={true}
            placeholder="Confirm password..."
            placeholderTextColor="#fff"
            selectionColor="#fff"
            underlineColorAndroid="transparent"
            style={{
              fontStyle:
                this.state.confirmPassword === "" ? "italic" : "normal",
              fontSize: 18,
              color: "#fff",
              paddingLeft: 15
            }}
            onChangeText={confirmPassword => {
              this.setState({ confirmPassword: confirmPassword.toLowerCase() });
            }}
            value={this.state.confirmPassword}
          />
        </View>

          <TouchableOpacity
              onPress={()=>{
                  Actions.login();
              }}
              style={{
              width: 190,
              height: 50,
              borderRadius: 5,
              borderColor: "#fff",
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 25,
          }}>
              <Text style={{
                  fontSize: 20,
                  color: "#ffdb95"
              }}>
                  Register
              </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

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
  TextInput,
  ImageBackground,
  Switch
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modalbox";
const { width, height } = Dimensions.get("window");

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      userName: "Newbie Team",
      password: "Newbie Team",
      email: "newbieteam@gmail.com",
      isEmail: false,
      isPush: false
    };
  }
  render() {
    return (
      <ImageBackground
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#ae522e"
        }}
        source={require("./img/background.png")}
      >
        <TouchableOpacity
          onPress={() => {
            Actions.pop();
            this.Global.isFooter = true;
          }}
          style={{
            position: "absolute",
            left: 15,
            top: 15,
            backgroundColor: "transparent"
          }}
        >
          <Icon name="chevron-left" size={20} color="#e1e1e1" />
        </TouchableOpacity>

        <Image
          source={require("./img/newbie.jpg")}
          style={{
            width: 200,
            height: 200,
            resizeMode: "cover",
            borderRadius: 100,
            borderWidth: 5,
            borderColor: "#ae522e",
            marginTop: 40
          }}
        />
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              width: 150,
              height: 45,
              borderRadius: 30,
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ae522e"
            }}
          >
            <Text
              style={{
                fontSize:15,
                color: "#ffdb95"
              }}
            >
              Edit Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            //disabled={true}
            style={{
              width: 150,
              height: 45,
              borderRadius: 30,
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ae522e",
              marginLeft: 10
            }}
          >
            <Text

              style={{
                fontSize: 15,
                color: "#ffdb95",

              }}
            >
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width - 20,
            height: 260,
            backgroundColor: "rgba(0,0,0,0.6)",
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 15
          }}
        >
          <View
            style={{
              width: 280,
              height: 50,
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                width: 80
              }}
            >
              Name
            </Text>
            <TextInput
              placeholder="Name..."
              placeholderTextColor="#fff"
              selectionColor="#fff"
              underlineColorAndroid="transparent"
              style={{
                fontStyle: this.state.userName === "" ? "italic" : "normal",
                fontSize: 15,
                color: "#fff",
                paddingLeft: 15,
                width: 210
              }}
              onChangeText={username => {
                this.setState({ userName: username });
              }}
              value={this.state.userName}
            />
          </View>

          <View
            style={{
              width: 280,
              height: 50,
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                width: 80
              }}
            >
              Password
            </Text>
            <TextInput
                editable={false}
              secureTextEntry={true}
              placeholder="Password..."
              placeholderTextColor="#fff"
              selectionColor="#fff"
              underlineColorAndroid="transparent"
              style={{
                fontStyle: this.state.password === "" ? "italic" : "normal",
                fontSize: 15,
                color: "#fff",
                paddingLeft: 15,
                width: 210
              }}
              onChangeText={password => {
                this.setState({ password: password });
              }}
              value={this.state.password}
            />
          </View>

          <View
            style={{
              width: 280,
              height: 50,
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                width: 80
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="Email..."
              placeholderTextColor="#fff"
              selectionColor="#fff"
              underlineColorAndroid="transparent"
              style={{
                fontStyle: this.state.email === "" ? "italic" : "normal",
                fontSize: 15,
                color: "#fff",
                paddingLeft: 15,
                width: 210
              }}
              onChangeText={email => {
                this.setState({ email: email });
              }}
              value={this.state.email}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              alignItems: "center",
                paddingBottom: 5,
                marginRight: 125
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18
              }}
            >
              Notification:
            </Text>
            <Switch
              onValueChange={value => {
                this.setState({
                  isPush: value
                });
              }}
              value={this.state.isPush}
              style={{
               marginLeft: 10
              }}
            />

          </View>

          <TouchableOpacity
            style={{
              width: 120,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#fff",
              borderWidth: 1,
              marginTop: 5
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 15
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width - 20,
            height: 75,
            marginTop: 5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              width: (width - 20 - 5) / 2,
              height: 75,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon name="star-o" color="#fff" size={45} />
            <Text
              style={{
                color: "#fff",
                fontSize: 15,
                paddingTop: 5
              }}
            >
              Rate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: (width - 20 - 5) / 2,
              height: 75,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              marginLeft: 10,
              alignItems: "center"
            }}
          >
            <Icon name="sign-out" color="#fff" size={45} />
            <Text
              style={{
                color: "#fff",
                fontSize: 15,
                paddingTop: 5
              }}
            >
              Sign out
            </Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    );
  }
}

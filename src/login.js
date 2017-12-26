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

import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";

@autobind
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      userName: "",
      pass: "",
      isChecked: false
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ae522e",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 50
        }}
      >
        <View
          style={{
            width: 230,
            height: 230,
            borderRadius: 115,
            backgroundColor: "#ffdb95"
          }}
        >
          <Image
            source={require("./img/logo-app.png")}
            style={{
              width: 230,
              height: 230,
              resizeMode: "contain"
            }}
          />
        </View>

        <TextInput
          placeholder="Username..."
          placeholderTextColor="#fff"
          selectionColor="#fff"
          underlineColorAndroid="transparent"
          style={{
            width: width - 50,
            height: 50,
            borderRadius: 25,
            borderColor: "#fff",
            borderWidth: 1,
            backgroundColor: "rgba(0,0,0,.1)",
            paddingLeft: 20,
            fontStyle: this.state.userName === "" ? "italic" : "normal",
            fontSize: 18,
            color: "#fff",
            marginTop: 30
          }}
          onChangeText={username => {
            this.setState({ userName: username.toLowerCase() });
          }}
          value={this.state.userName}
        />

        <TextInput
          placeholder="Password..."
          placeholderTextColor="#fff"
          selectionColor="#fff"
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          style={{
            width: width - 50,
            height: 50,
            borderRadius: 25,
            borderColor: "#fff",
            borderWidth: 1,
            backgroundColor: "rgba(0,0,0,.1)",
            paddingLeft: 20,
            fontStyle: this.state.pass === "" ? "italic" : "normal",
            fontSize: 18,
            color: "#fff",
            marginTop: 15
          }}
          onChangeText={pass => {
            this.setState({ pass: pass.toLowerCase() });
          }}
          value={this.state.pass}
        />
        <View
          style={{
            alignItems: "flex-end",
            width: width - 50,
            marginTop: 5,
            paddingRight: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#ffdb95",
                textAlign: "right",
                fontStyle: "italic",
                textDecorationLine: "underline",
                textDecorationColor: "#ffdb95"
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/*<View*/}
          {/*style={{*/}
            {/*alignItems: "center",*/}
            {/*width: width - 50,*/}
            {/*marginTop: 5,*/}
            {/*paddingLeft: 5,*/}
            {/*flexDirection: "row"*/}
          {/*}}*/}
        {/*>*/}
          {/*<TouchableOpacity*/}
            {/*onPress={() => {*/}
              {/*let isCheck = this.state.isChecked;*/}
              {/*this.setState({*/}
                {/*isChecked: !isCheck*/}
              {/*});*/}
            {/*}}*/}
            {/*style={{*/}
              {/*marginTop: 5,*/}
              {/*width: 25,*/}
              {/*height: 25,*/}
              {/*borderRadius: 5,*/}
              {/*borderColor: "#ebebeb",*/}
              {/*borderWidth: 1,*/}
              {/*justifyContent: "center",*/}
              {/*alignItems: "center"*/}
            {/*}}*/}
          {/*>*/}
            {/*{this.state.isChecked &&*/}
              {/*<Icon name="check" color="#ffdb95" size={20} />}*/}
          {/*</TouchableOpacity>*/}
          {/*<Text*/}
            {/*style={{*/}
              {/*color: "#ffdb95",*/}
              {/*fontSize: 18,*/}
              {/*paddingLeft: 8*/}
            {/*}}*/}
          {/*>*/}
            {/*Remember me*/}
          {/*</Text>*/}
        {/*</View>*/}

        <TouchableOpacity
          onPress={() => {
              this.Global.isFooter = true;
              Actions.homePage();
          }}
          style={{
            width: 200,
            height: 50,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#fff",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#ffdb95"
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
          <View style={{
              width: width - 20,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
          }}>
              <View style={{
                  width: 80,
                  height: 1,
                  backgroundColor: '#ebebeb'
              }}/>
              <Text style={{
                  color: '#ffdb95',
                  fontSize: 16,
                  paddingLeft: 5,
                  paddingRight: 5
              }}>
                  OR CONNECT WITH
              </Text>
              <View style={{
                  width: 80,
                  height: 1,
                  backgroundColor: '#ebebeb'
              }}/>
          </View>

          <View style={{
              flexDirection: 'row',
              top: 15
          }}>
              <TouchableOpacity style={{
                  width: 160,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#3B5998',
                  flexDirection: 'row',
                  borderRadius: 25
              }}>
                  <Icon
                    name="facebook"
                    color="#fff"
                    size={20}
                  />
                  <Text style={{
                      color: '#fff',
                      paddingLeft: 5,
                      fontSize: 17
                  }}>
                      Facebook
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                  width: 160,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FF0000',
                  flexDirection: 'row',
                  borderRadius: 25,
                  marginLeft: 10
              }}>
                  <Icon
                      name="google-plus"
                      color="#fff"
                      size={20}
                  />
                  <Text style={{
                      color: '#fff',
                      paddingLeft: 5,
                      fontSize: 17
                  }}>
                      Google
                  </Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }
}

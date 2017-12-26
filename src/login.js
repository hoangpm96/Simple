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
  TextInput,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";

import Global from "./models/global";
@autobind
@observer

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    background = require('./img/background.png');
    logo = require('./img/logo.png');
    // Global.isFooter.set(false);
    this.state = {
        userName: "",
        pass: "",
        isChecked: false
    };
  }
  render() {
    return (
      <ImageBackground source={background} style={styles.waperContainer} >
          <View style={styles.waperLogo}>
              <Image source={logo} style={styles.logoStyle} />
          </View>
          <View style={styles.containerName}>
              <Text style={styles.textName}>LOGIN</Text>
          </View>

          <View style={styles.containerForm}>
              <View style={styles.containerUserName}>
                  <Icon name="user-o" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                  <TextInput placeholder={'User Name'} style={styles.styleUserName}
                      onChangeText={username => {
                          this.setState({ userName: username.toLowerCase() });
                      }}
                      placeholderTextColor={'#DDDDDD'}
                      value={this.state.userName}
                  />
              </View>
              <View style={styles.containerPassword}>
                  <Icon name="key" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
                  <TextInput style={styles.stylePassword}
                      placeholder={'Password'}
                      placeholderTextColor={'#DDDDDD'}
                      secureTextEntry={true}
                      onChangeText={pass => {
                          this.setState({ pass: pass.toLowerCase() });
                      }}
                      value={this.state.pass}
                  />
              </View>
              <View style={styles.containerLink}>
                  <TouchableOpacity
                      onPress={() => {
                          // this.Global.isFooter = false;
                          Actions.registerInfo();
                      }}
                  >
                      <Text style={styles.textForgot}>
                          Register
          </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {
                          // this.Global.isFooter = false;
                          Actions.forgot();
                      }}
                  >
                      <Text style={styles.textForgot}>
                          Forgot Password?
                      </Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={styles.containerButton}>
              {/* Button Login */}
              <TouchableOpacity
                      onPress={() => {
                          this.Global.isFooter = true;
                          Actions.love();
                          this.Global.pressStatus = "love";
                      }}
                  >
                      <View style={styles.waperLogin}>
                          <Text style={styles.textLogin}>LOGIN</Text>
                      </View>
              </TouchableOpacity>
              {/* Connect FB/G */}
              <View style={styles.waperConnect}>
              <Icon name="facebook-square" color='#ffffff' size={height/20} style={{marginRight: 7, backgroundColor: 'transparent'}}/>
              <Icon name="google" color='#ffffff' size={height/20} style={{marginLeft: 7, backgroundColor: 'transparent'}}/> 
              </View>
          </View>
      </ImageBackground>
  );
  }
}
const styles = StyleSheet.create({
  waperContainer: {
      flexDirection: 'column',
      alignContent: 'space-around',
      flex: 1,
  },
  waperLogo: {
      height: height / 2.57,
  },
  logoStyle: {
      marginTop: height / 12, //56
      width: height / 3.26, //205
      height: height / 3.26, //205
      alignSelf: 'center',
  },
  containerName: {
      height: height / 12,
      alignSelf: 'center',
      // backgroundColor: 'blue'
  },
  textName: {
      fontSize: 28,  //42
      fontWeight: 'bold',
      fontFamily: 'System',
      color: '#ffff',
      backgroundColor: 'transparent'
  },
  containerForm: {
      marginTop: (height+4000) / 203,//23
      height: (height+4000) / 35.9, //130
      alignItems: 'center',
      justifyContent: 'center',
  },
  containerUserName: {
      width: width - (width / 8.33), //330
      height: (height/10-(height-370)/12.78),//48, //48
      borderRadius: height / 28,
      backgroundColor: 'rgba(202,148,157,1)',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 4,
      flexDirection: 'row'
  },
  styleUserName: {
      marginLeft: 10,
      borderColor: 'transparent',
      fontSize: 14,
      color: '#ffffff',
      width: width - (width / 8.33) - 70,
  },
  containerPassword: {
      width: width - (width / 8.40), //330
      height: (height/10-(height-370)/12.78), //48
      borderRadius: height / 28,
      backgroundColor: 'rgba(202,148,157,1)',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // marginBottom: 3,
      flexDirection: 'row'
  },
  stylePassword: {
      marginLeft: 10,
      marginRight: 20,
      borderColor: 'transparent',
      fontSize: 14,
      color: '#ffffff',
      width: width - (width / 8.33) - 70,
  },
  containerLink: {
      width: width - (width / 8.33),
      height: height / 36.35,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: 'red'
  },
  textForgot: {
      backgroundColor: 'transparent',
      fontSize: 16,
      color: '#ffffff',
      fontStyle: 'italic'
  },
  containerButton: {
      height: height / 3.421,//195
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'green'
  },
  waperLogin: {
      width: width - (width / 8.40), //330
      height: (height/10-(height-370)/12.78), //48,
      marginTop: 10,
      backgroundColor: '#F15F66',
      shadowColor: '#ED969B',
      shadowOffset: { width: 1, height: 1.3, },
      shadowOpacity: 84,
      shadowRadius: 1,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: height / 20,

  },
  textLogin: {
      fontSize: 18,
      fontFamily: 'System',
      fontWeight: 'bold',
      color: '#ffff',
      backgroundColor: 'transparent'
  },
  waperConnect: {
      flexDirection: 'row',
      height: height/20,
  }


})
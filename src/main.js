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
import Global from "./models/global";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";

@autobind
@observer
export default class Main extends Component {
  constructor(props) {
    super(props);
    background=require('./img/background.png');
    logo=require('./img/logo.png');
    // Global.isFooter=false;
    this.Global = this.props.Global;
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
          <Image source={logo} style={styles.logoStyle}/>
      </View>
      <View style={styles.containerName}>
            <View style={styles.waperName}>
                <Text style={styles.textName}>Simple</Text>
            </View>
            <View style={styles.waperSlogan}>
                <Text style={styles.textSlogan}>Gần nhau hơn - abcxyz</Text>
            </View>
      </View>
        <View style={styles.containerButton}>
        <TouchableOpacity
                    onPress={() => {
                      this.Global.isFooter = false;
                      Actions.login();
                  }}
          >
                          <View style={styles.waperLogin}>
                <Text style={styles.textLogin}>LOGIN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
                    onPress={() => {
                      this.Global.isFooter = false;
                      Actions.registerInfo();
                  }}
          >
            <View style={styles.waperRegister}>
                <Text style={styles.textRegister}>REGISTER</Text>
            </View>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles= StyleSheet.create({
  waperContainer: {
      flexDirection: 'column',
      alignContent: 'space-around',
      flex: 1,
  },
  waperLogo: {
      height: height/2.6, //269,
  },
  logoStyle: {
      marginTop: height/10, //66
      width: height/3.25, //205
      height: height/3.25, //205
      alignSelf: 'center',
  },
  containerName: {
      height: height/5, //133.4
      alignSelf: 'center',
  },
  waperName: {
      height: height/7.33, //91
      alignItems: 'center',
      justifyContent: 'flex-start',
  },
  textName: {
      fontSize: (height+4000)/83, //56
      fontFamily: 'Noteworthy',
      color: '#ffff',
      backgroundColor: 'transparent'
  },
  waperSlogan: {
      height: (height+4000)/146, //32
      alignItems: 'center',
      justifyContent: 'center'
  },
  textSlogan: {
      fontSize: height/27.9, //24
      fontFamily: 'System',
      fontWeight: 'bold',
      color: '#ffff',
      backgroundColor: 'transparent',
  },
  containerButton: {
      height: height/2.8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  waperLogin:{
      width: width - (width/8.33), //330
      height: (height/10-(height-370)/12.78),//height/14, //48
      backgroundColor: '#F15F66',
      shadowColor: '#ED969B',
      shadowOffset: {width: 1, height: 1.3,  },
      shadowOpacity: 84,
      shadowRadius: 1,
      borderRadius: height/28,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 3,

  },
  textLogin: {
      fontSize: (height+2000)/148, //18
      fontFamily: 'System',
      fontWeight: 'bold',
      color: '#ffff',
      backgroundColor: 'transparent'
  },
  waperRegister:{
      width: width - (width/8.33),
      height: (height/10-(height-370)/12.78),//height/14,
      backgroundColor: '#FFA8AC',
      shadowColor: '#ED969B',
      shadowOffset: {width: 1, height: 1.3,  },
      shadowOpacity: 84,
      shadowRadius: 1,
      borderRadius: height/28,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4

  },
  textRegister: {
      fontSize: (height+2000)/148,
      fontFamily: 'System',
      fontWeight: 'bold',
      color: '#ffff',
      backgroundColor: 'transparent'
  }


})
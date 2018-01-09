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
          <Image source={logo} style={styles.logoStyle}/>
                <Text style={styles.textName}>Simple</Text>
                <Text style={styles.textSlogan}>Dating is simple</Text>
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
  logoStyle: {
      marginTop: height<812?(height < 736 ? ( height < 667 ? 57 : 67): 74):80,
      width: height<812?(height < 736 ? ( height < 667 ? 205 : 205): 230):250,
      height: height<812?(height < 736 ? ( height < 667 ? 205 : 205): 230):250,
      alignSelf: 'center',
  },
  textName: {
      fontSize: height < 736 ? 56 : 60,
      marginTop: -25,
      fontFamily: 'Noteworthy',
      color: '#ffff',
      backgroundColor: 'transparent',
      alignSelf: 'center'
  },
  textSlogan: {
      fontSize: height < 736 ? (height < 568 ? 20 : 24) : 28,
      fontFamily: 'System',
      fontWeight: 'bold',
      color: '#ffff',
      alignSelf: 'center',
      backgroundColor: 'transparent',
  },
  containerButton: {
      marginTop: 20,
      height: height<812?(height < 736 ? ( height < 667 ? 160 : 240): 300):320,
      justifyContent: 'center',
      alignItems: 'center',
  },
  waperLogin:{
      width: width < 414 ? width - 40 : width - 50,
      height: height < 667 ? 40 : 45,
      backgroundColor: '#F15F66',
      shadowColor: '#ED969B',
      shadowOffset: {width: 1, height: 1.3,  },
      shadowOpacity: 84,
      shadowRadius: 1,
      borderRadius: height < 667 ? 20 : 22.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 3,

  },
  textLogin: {
      fontSize: 18,
      fontFamily: 'System',
      fontWeight: 'bold',
      color: '#ffff',
      backgroundColor: 'transparent'
  },
  waperRegister:{
      width: width < 414 ? width - 40 : width - 50,
      height: height < 667 ? 40 : 45,
      backgroundColor: '#FFA8AC',
      shadowColor: '#ED969B',
      shadowOffset: {width: 1, height: 1.3,  },
      shadowOpacity: 84,
      shadowRadius: 1,
      borderRadius: height < 667 ? 20 : 22.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4

  },
  textRegister: {
      fontSize: 18,
      fontFamily: 'System',
      fontWeight: 'bold',
      color: '#ffff',
      backgroundColor: 'transparent'
  }


})
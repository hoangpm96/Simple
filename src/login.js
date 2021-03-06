import React, { Component } from "react";
import { Actions, Router, Scene } from "react-native-mobx";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get("window");

import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
import firebase from "firebase";
import Global from "./models/global";
import { async } from "@firebase/util";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";

@autobind
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    background = require("./img/background.png");
    logo = require("./img/logo.png");
    this.state = {
      email: "",
      pass: "",
      isChecked: false, 
      animating: false
    };
  }
  updateUserInfo = async (email) => {
    // test
    //
    this.setState({ animating: true });
    try {
      await firebase
        .database()
        .ref("users")
        .orderByChild("email")
        .equalTo(email)
        .once("value", snapshot => {
          if (snapshot.val()) {
            let value = Object.values(snapshot.val());
            let keys = Object.keys(snapshot.val());
            this.Global.currentUserId = keys[0];
            this.Global.currentUsername = value[0].username;
            this.Global.currentUserGender = value[0].gender;
            this.Global.currentUserDistrict = value[0].district;
            this.Global.currentUserCity = value[0].city;
            this.Global.currentUserAvatar = value[0].avatarUrl;
            
            let email = value[0].email;
            this.Global.currentUser = snapshot.val()
             FCM.getFCMToken().then(token => {
               this.Global.token = token;
                firebase.database()
                      .ref("users")
                      .child(this.Global.currentUserId )
                      .child("token").set(token)
              //  debugger;
               // store fcm token in your server
             });
          
            
            Actions.love();
          } else {
            this.showError("Please enter the correct email!");
            return;
          }
        }).catch((error)=>{
          this.setState({ animating: false });
        Alert.alert(this.Global.APP_NAME, "Please enter the correct email!");
        });
    } catch (error) {
      this.showError(error);
    }
  };
  login = async (email, password) => {
    email = email.toLowerCase();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      this.Global.isFooter = true;
      this.Global.firstLogin = false;

      this.updateUserInfo(email.toLowerCase());
      
      })


      

      .catch((error) => {
        this.setState({ animating: false });
        // this.showError(error);
        const { code, message } = error;
        Alert.alert(this.Global.APP_NAME, message);
        return;
      });;
    } catch (error) {
      this.showError(error);
    }
  };

  showError = errMessage => {
    this.setState({ animating: false });
    Alert.alert(
      this.Global.APP_NAME,
      errMessage,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };
  render() {
    return (

      <ImageBackground source={background} style={styles.waperContainer}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
          <Image source={logo} style={styles.logoStyle} />
          <Text style={styles.textName}>LOGIN</Text>
          <View style={styles.containerForm}>
            <View style={styles.containerUserName}>
              <Icon
                name="envelope"
                color="#DDDDDD"
                size={24}
                style={{ marginLeft: 20 }}
              />
              <TextInput
                placeholder={"Email"}
                style={styles.styleUserName}
                onChangeText={email => {
                  this.setState({ email: email });
                }}
                placeholderTextColor={"#DDDDDD"}
                value={this.state.userName}
              />
            </View>
            <View style={styles.containerPassword}>
              <Icon
                name="key"
                color="#DDDDDD"
                size={24}
                style={{ marginLeft: 19 }}
              />
              <TextInput
                style={styles.stylePassword}
                placeholder={"Password"}
                placeholderTextColor={"#DDDDDD"}
                secureTextEntry={true}
                onChangeText={pass => {
                  this.setState({ pass: pass });
                }}
                value={this.state.pass}
              />
            </View>
            {/* TODO: Update UI  */}
            <ActivityIndicator
              animating={this.state.animating}
              color="#fff"
              size="large"
              style={styles.activityIndicator}
            />
            <View style={styles.containerLink}>
              <TouchableOpacity
                onPress={() => {
                  // this.Global.isFooter = false;
                  Actions.registerInfo();
                }}
              >
                <Text style={styles.textForgot}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Actions.forgot();
                }}
              >
                <Text style={styles.textForgot}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerButton}>
            {/* Button Login */}
            <TouchableOpacity
              onPress={() => {
                if (this.state.email === "" || this.state.pass === "") {
                  Alert.alert(
                    this.Global.APP_NAME,
                    "User Name or Password blank",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                  );
                }
                else {
                  this.login(this.state.email,this.state.pass)
                  // this.findEmail(this.state.userName, this.state.pass);
                }
              }}
            >
              <View style={styles.waperLogin}>
                <Text style={styles.textLogin}>LOGIN</Text>
              </View>
            </TouchableOpacity>
            {/* Connect FB/G */}
            <View style={styles.waperConnect}>
              <Icon
                name="facebook-square"
                color="#ffffff"
                size={height < 736 ? (height < 667 ? 32 : 35) : 40}
                style={{ marginRight: 7, backgroundColor: "transparent" }}
              />
              <Icon
                name="google"
                color="#ffffff"
                size={height < 736 ? (height < 667 ? 32 : 35) : 40}
                style={{ marginLeft: 7, backgroundColor: "transparent" }}
              />
            </View>
          </View>
          {
            this.state.animating ?
              <View style={styles.waiting}>

              </View>
              : null
          }
        </KeyboardAwareScrollView>

      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width
  },
  waperContainer: {
    alignContent: "space-around",
    flex: 1
  },

  logoStyle: {
    marginTop: height < 812 ? (height < 667 ? 45 : 55) : 60,
    width:
      height < 812 ? (height < 736 ? (height < 667 ? 180 : 205) : 230) : 250,
    height:
      height < 812 ? (height < 736 ? (height < 667 ? 180 : 205) : 230) : 250,
    alignSelf: "center"
  },
  textName: {
    fontSize: 28,
    height: 40,
    fontWeight: "bold",
    fontFamily: "System",
    color: "#ffff",
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  containerForm: {
    marginTop: height < 736 ? (height < 667 ? 30 : 40) : 50,
    alignItems: "center",
    justifyContent: "center"
  },
  containerUserName: {
    width: width < 414 ? width - 40 : width - 50,
    height: height < 667 ? 40 : 45,
    borderRadius: height < 667 ? 20 : 22.5,
    backgroundColor: "rgba(202,148,157,1)",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 4,
    flexDirection: "row"
  },
  styleUserName: {
    marginLeft: 10,
    borderColor: "transparent",
    fontSize: 14,
    color: "#ffffff",
    width: width < 414 ? width - 110 : width - 120
  },
  containerPassword: {
    width: width < 414 ? width - 40 : width - 50,
    height: height < 667 ? 40 : 45,
    borderRadius: height < 667 ? 20 : 22.5,
    backgroundColor: "rgba(202,148,157,1)",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  stylePassword: {
    marginLeft: 10,
    marginRight: 20,
    borderColor: "transparent",
    fontSize: 14,
    color: "#ffffff",
    width: width < 414 ? width - 110 : width - 120
  },
  containerLink: {
    width: width < 414 ? width - 40 : width - 50,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textForgot: {
    backgroundColor: "transparent",
    fontSize: 16,
    color: "#ffffff",
    fontStyle: "italic"
  },
  containerButton: {
    height:
      height < 812 ? (height < 736 ? (height < 667 ? 170 : 200) : 220) : 250,
    justifyContent: "center",
    alignItems: "center"
  },
  waperLogin: {
    width: width < 414 ? width - 40 : width - 50,
    height: height < 667 ? 40 : 45,
    marginTop: 10,
    backgroundColor: "#F15F66",
    shadowColor: "#ED969B",
    shadowOffset: { width: 1, height: 1.3 },
    shadowOpacity: 84,
    shadowRadius: 1,
    borderRadius: height < 667 ? 20 : 22.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height < 667 ? 25 : 40
  },
  textLogin: {
    fontSize: 18,
    fontFamily: "System",
    fontWeight: "bold",
    color: "#ffff",
    backgroundColor: "transparent"
  },
  waperConnect: {
    flexDirection: "row",
    height: 40
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: width/2-40

  },
  waiting: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.5)"
  }
});

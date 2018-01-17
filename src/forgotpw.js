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
    ImageBackground,
    ActivityIndicator,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { observer } from "mobx-react/native";
import { autobind } from "core-decorators";

import firebase from "firebase";
import { async } from "@firebase/util";
const { width, height } = Dimensions.get("window");
import Global from "./models/global";

@autobind
@observer
export default class Forgot extends Component {
    constructor(props) {
        super(props);
        background = require('./img/background.png');
        logo = require('./img/logo.png');
        this.Global = this.props.Global;
        this.state = {
            Email: "",
            displayErrror: false,
            errorText: null,
            animating: false
        };
    }

    verifyResetPassword = async (email) => {
        try {
            this.setState({
                animating: true
            })
            await firebase
            .database()
            .ref("users")
            .orderByChild("email")
            .equalTo(email)
            .once("value", snapshot => {
              if (snapshot.val() !== null) {
                // ton tai email thi send
                firebase.auth().sendPasswordResetEmail(email).then(() => {
                    // Email sent.
                    this.setState({
                        displayErrror: false
                    })
                    Alert.alert(
                        this.Global.APP_NAME,
                        "Email had been sent",
                      );
                      this.setState({
                        animating: false
                    })
                      Actions.login();
                  }).catch((error) => {
                    // An error happened.

                    this.setState({
                        displayErrror: true,
                        animating: false,
                        errorText: error
                    })
                  });
              } else {
                this.setState({
                    animating: false
                })
                Alert.alert(this.Global.APP_NAME, "Email doesn't exist!");
                return;
              }
            });
        }
        catch (error) {
            this.setState({
                animating: false
            })
            Alert.alert(
                this.Global.APP_NAME,
                error,
              );
          }


    } 

    render() {
        return (
            <ImageBackground source={background} style={styles.waperContainer} >
                    <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
                    <Image source={logo} style={styles.logoStyle} />
                    <Text style={styles.textName}>FORGOT PASSWORD</Text>
                    <View style={styles.containerUserName}>
                        <Icon name="envelope" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <TextInput placeholder={'Enter your email'} style={styles.styleUserName}
                            onChangeText={email => {
                                this.setState({ Email: email});
                            }}
                            placeholderTextColor={'#DDDDDD'}
                            value={this.state.Email}
                        />
                    </View>
                    {
                        this.state.displayErrror ? 
                        <Text style={styles.styleError}>
                        {this.state.errorText}
                    </Text>
                    : null
                    }
                    <TouchableOpacity
                        onPress={() => {
                            if(this.state.Email === "")
                            {
                                Alert.alert(
                                    this.Global.APP_NAME,
                                    "Please enter your email.",
                                  );
                            }
                            else {
                            this.verifyResetPassword(this.state.Email)
                            }
                        }}
                    >
                        <View style={styles.waperLogin}>
                            <Text style={styles.textLogin}>RESET PASSWORD</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.Global.isFooter = false;
                            Actions.login();
                        }}
                    >
                        <View style={styles.waperRegister}>
                            <Text style={styles.textRegister}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                    <ActivityIndicator
              animating={this.state.animating}
              color="#fff"
              size="large"
              style={styles.activityIndicator}
            />
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
        width: width
      },
    waperContainer: {
        flexDirection: 'column',
        alignContent: 'space-around',
        flex: 1,
    },

    logoStyle: {
        marginTop: height < 812 ? (height < 736 ? ( height < 667 ? 50 : 80) : 70) : 80,

        width: height < 736 ? (height < 667 ? 180 : 205) : 230,
        height: height < 736 ? (height < 667 ? 180 : 205) : 230,
        alignSelf: 'center',
    },

    textName: {
        fontSize: 28, //42
        fontWeight: 'bold',
        fontFamily: 'System',
        color: '#ffff',
        backgroundColor: 'transparent',
        alignSelf: 'center',
    },
    containerUserName: {
        marginTop: height < 812 ? (height < 736 ? ( height < 667 ? 40 : 60) : 90) : 100,

        width: width < 414 ? width - 40 : width - 50,
        height: height < 667 ? 40 : 45,
        borderRadius: height < 667 ? 20 : 22.5,
        backgroundColor: 'rgba(202,148,157,1)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 3,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    styleUserName: {
        marginLeft: 10,
        borderColor: 'transparent',
        fontSize: 14,
        color: '#ffffff',
        width: width < 414 ? width - 110 : width - 120,
    },
    styleError: {
        alignSelf: 'flex-start',
        marginLeft: 18,
        color: '#E0D704',
        backgroundColor: 'transparent'

    },
    waperLogin: {
        marginTop: height < 812 ? (height < 736 ? ( height < 667 ? 30 : 60) : 55) : 70,
        width: width < 414 ? width - 40 : width - 50,
        height: height < 667 ? 40 : 45,
        backgroundColor: '#F15F66',
        shadowColor: '#ED969B',
        shadowOffset: { width: 1, height: 1.3, },
        shadowOpacity: 84,
        shadowRadius: 1,
        borderRadius: height < 667 ? 20 : 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
        alignSelf: 'center'

    },
    textLogin: {
        fontSize: 18,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: '#ffff',
        backgroundColor: 'transparent'
    },
    waperRegister: {
        width: width < 414 ? width - 40 : width - 50,
        height: height < 667 ? 40 : 45,
        backgroundColor: '#FFA8AC',
        shadowColor: '#ED969B',
        shadowOffset: { width: 1, height: 1.3, },
        shadowOpacity: 84,
        shadowRadius: 1,
        borderRadius: height < 667 ? 20 : 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        alignSelf: 'center'

    },
    textRegister: {
        fontSize: 18,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: '#ffff',
        backgroundColor: 'transparent',
    },
    activityIndicator: {
        position: 'absolute',
        top: height/2,
    left: width/2-20,
    
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


})
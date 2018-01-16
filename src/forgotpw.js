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

// import firebase from "firebase";
// import { async } from "@firebase/util";
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
            email: "",
            displayErrror: false,
            errorText: null,
        };
    }
    check_email = (email) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
        if (email.match(mailformat)) {
          return true;
        }
        else {
          return false;
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
                                this.setState({ email: email});
                            }}
                            placeholderTextColor={'#DDDDDD'}
                            value={this.state.email}
                        />
                    </View>
                    <TouchableOpacity
                                      onPress={() => {
                                        if (this.state.email === "") {
                                          Alert.alert(
                                            this.Global.APP_NAME,
                                            "Email is not blank",
                                            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                                            { cancelable: false }
                                          );
                                        }
                                        else {
                                          if(this.check_email(this.state.email)) {
                                            Alert.alert(
                                                this.Global.APP_NAME,
                                                "Email sent!",
                                                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                                                { cancelable: false }
                                              );
                                            Actions.login();
                                          }
                                          else
                                          {
                                            Alert.alert(
                                              this.Global.APP_NAME,
                                              "You have entered an invalid email address!",
                                              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                                              { cancelable: false }
                                            );
                                          }
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
})
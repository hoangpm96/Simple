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
        this.state = {
            userName: "",
            pass: "",
            isChecked: false
        };
    }
    render() {
        return (
            <ImageBackground source={background} style={styles.waperContainer} >
                <Image source={logo} style={styles.logoStyle} />
                <Text style={styles.textName}>LOGIN</Text>
                <View style={styles.containerForm}>
                    <View style={styles.containerUserName}>
                        <Icon name="user-o" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <TextInput placeholder={'User Name'} style={styles.styleUserName}
                            onChangeText={username => {
                                this.setState({ userName: username});
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
                                this.setState({ pass: pass});
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
                            this.Global.firstLogin = true;
                        }}
                    >
                        <View style={styles.waperLogin}>
                            <Text style={styles.textLogin}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Connect FB/G */}
                    <View style={styles.waperConnect}>
                        <Icon name="facebook-square" color='#ffffff' size={height < 667 ? 30 : 40} style={{ marginRight: 7, backgroundColor: 'transparent' }} />
                        <Icon name="google" color='#ffffff' size={height < 736 ? (height < 667 ? 32 : 35) : 40} style={{ marginLeft: 7, backgroundColor: 'transparent' }} />
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

    logoStyle: {
        marginTop: height < 812 ? (height < 667 ? 45 : 55) : 60,
        width: height < 812 ? (height < 736 ? (height < 667 ? 180 : 205) : 230) : 250,
        height: height < 812 ? (height < 736 ? (height < 667 ? 180 : 205) : 230) : 250,
        alignSelf: 'center',
    },
    textName: {
        fontSize: 28,
        height: 40,
        fontWeight: 'bold',
        fontFamily: 'System',
        color: '#ffff',
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    containerForm: {
        marginTop: height < 736 ? (height < 667 ? 30 : 40) : 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerUserName: {
        width: width < 414 ? width - 40 : width - 50,
        height: height < 667 ? 40 : 45,
        borderRadius: height < 667 ? 20 : 22.5,
        backgroundColor: 'rgba(202,148,157,1)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4,
        flexDirection: 'row',
    },
    styleUserName: {
        marginLeft: 10,
        borderColor: 'transparent',
        fontSize: 14,
        color: '#ffffff',
        width: width < 414 ? width - 110 : width - 120,
    },
    containerPassword: {
        width: width < 414 ? width - 40 : width - 50,
        height: height < 667 ? 40 : 45,
        borderRadius: height < 667 ? 20 : 22.5,
        backgroundColor: 'rgba(202,148,157,1)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    stylePassword: {
        marginLeft: 10,
        marginRight: 20,
        borderColor: 'transparent',
        fontSize: 14,
        color: '#ffffff',
        width: width < 414 ? width - 110 : width - 120,
    },
    containerLink: {
        width: width < 414 ? width - 40 : width - 50,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textForgot: {
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#ffffff',
        fontStyle: 'italic'
    },
    containerButton: {
        height: height < 812 ? (height < 736 ? (height < 667 ? 170 : 200) : 220) : 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    waperLogin: {
        width: width < 414 ? width - 40 : width - 50,
        height: height < 667 ? 40 : 45,
        marginTop: 10,
        backgroundColor: '#F15F66',
        shadowColor: '#ED969B',
        shadowOffset: { width: 1, height: 1.3, },
        shadowOpacity: 84,
        shadowRadius: 1,
        borderRadius: height < 667 ? 20 : 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height < 667 ? 25 : 40,

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
        height: 40
    }


})
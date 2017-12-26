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
    ImageBackground,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { observer } from "mobx-react/native";
import { autobind } from "core-decorators";
const { width, height } = Dimensions.get("window");

@autobind
@observer
export default class Forgot extends Component {
    constructor(props) {
        super(props);
        background = require('./img/background.png');
        logo = require('./img/logo.png');
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
                    <Image source={logo} style={styles.logoStyle} />
                </View>
                <View style={styles.containerName}>
                    <Text style={styles.textName}>FORGOT PASSWORD</Text>
                </View>

                <View style={styles.containerForm}>
                    <View style={styles.containerUserName}>
                        <Icon name="envelope" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <TextInput placeholder={'Enter your email'} style={styles.styleUserName}
                            onChangeText={username => {
                                this.setState({ userName: username.toLowerCase() });
                            }}
                            placeholderTextColor={'#DDDDDD'}
                            value={this.state.userName}
                        />
                    </View>
                    <Text style={styles.styleError}>
                    User name was not registered
                    </Text>
                </View>
                <View style={styles.containerButton}>
                <TouchableOpacity
                            onPress={() => {
                              this.Global.isFooter = false;
                              Alert.alert(
                                'Success',
                                'Your new password was sent',
                                [
                                  {text: 'LOGIN', onPress: () => Actions.login()},
                                ],
                                { cancelable: false }
                              )
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
        height: (height+5000) / 21.8,
    },
    logoStyle: {
        marginTop: (height+5000) / 101.2, //56
        width: (height+5000)/25-21.68, //205
        height: (height+5000)/25-21.68, //205
        alignSelf: 'center',
    },
    containerName: {
        height: height / 12,
        alignSelf: 'center',
        // backgroundColor: 'blue'
    },
    textName: {
        fontSize: 28, //42
        fontWeight: 'bold',
        fontFamily: 'System',
        color: '#ffff',
        backgroundColor: 'transparent'
    },
    containerForm: {
        height: height / 4.8, //130
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue'
    },
    containerUserName: {
        width: width - (width / 8.33), //330
        height: (height/10-(height-370)/12.78), //48
        borderRadius: height / 28,
        backgroundColor: 'rgba(202,148,157,1)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 3,
        flexDirection: 'row'
    },
    styleUserName: {
        marginLeft: 10,
        borderColor: 'transparent',
        fontSize: 14,
        color: '#ffffff',
        width: width - (width / 8.33) - 70,
    },
    styleError: { 
        alignSelf: 'flex-start', 
        marginLeft: 18, 
        color: '#E0D704',
        backgroundColor: 'transparent'
         
    },
    containerButton: {
        height: height / 3.421,//195
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
        fontSize: 18,
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
        marginTop: 4,
        marginBottom: height/16

    },
    textRegister: {
        fontSize: 18,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: '#ffff',
        backgroundColor: 'transparent',
    }


})
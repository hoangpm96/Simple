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

        };
    }
    render() {
        return (
            <ImageBackground source={background} style={styles.waperContainer} >
                    <Image source={logo} style={styles.logoStyle} />
                    <Text style={styles.textName}>FORGOT PASSWORD</Text>
                    <View style={styles.containerUserName}>
                        <Icon name="envelope" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <TextInput placeholder={'Enter your email'} style={styles.styleUserName}
                            onChangeText={username => {
                                this.setState({ userName: username});
                            }}
                            placeholderTextColor={'#DDDDDD'}
                            value={this.state.userName}
                        />
                    </View>
                    <Text style={styles.styleError}>
                        User name was not registered
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.Global.isFooter = false;
                            Alert.alert(
                                'Success',
                                'Your new password was sent',
                                [
                                    { text: 'LOGIN', onPress: () => Actions.login() },
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
        marginTop: height < 812 ? (height < 736 ? ( height < 667 ? 50 : 60) : 70) : 80,
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
        marginTop: height < 812 ? (height < 736 ? ( height < 667 ? 40 : 80) : 90) : 100,
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
        marginTop: height < 812 ? (height < 736 ? ( height < 667 ? 30 : 40) : 55) : 70,
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
    }


})
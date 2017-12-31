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
    Alert,
    Slider,
    Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TagInput from 'react-native-tag-input';
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");

const inputProps = {
    keyboardType: 'default',
    placeholder: 'hobby',
    placeholderTextColor: 'white',
    color: 'white',
    autoFocus: true,
    style: {
        fontSize: 14,
        marginVertical: Platform.OS == 'ios' ? 10 : -2,
    },
};
@autobind
@observer
export default class RegisterInfo extends Component {
    constructor(props) {
        super(props);
        background = require('./img/background.png');
        logo = require('./img/logo.png');
        this.Global = this.props.Global;
        this.state = {
            age: 18,
            tags: [],
            text: "",
            isMale: true,
        };
    }
    onChangeTags = (tags) => {
        this.setState({ tags });
    }

    onChangeText = (text) => {
        this.setState({ text });

        const lastTyped = text.charAt(text.length - 1);
        const parseWhen = [',', ' ', ';', '\n'];

        if (parseWhen.indexOf(lastTyped) > -1) {
            this.setState({
                tags: [...this.state.tags, this.state.text],
                text: "",
            });
        }
    }

    labelExtractor = (tag) => tag;

    render() {
        return (
            <ImageBackground source={background} style={styles.waperContainer} >
                    <Image source={logo} style={styles.logoStyle} />
                <Text style={styles.textName}>REGISTER</Text>
                <View style={styles.containerInfo}>
                    {/* You are? */}
                    <View style={styles.containerYouAre}>
                        <Text style={styles.textQA}>You are?</Text>
                        <View style={styles.containerButton01}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ isMale: true });
                                }}
                            >
                                <View style={[styles.waperLogin, this.state.isMale ? { backgroundColor: '#F15F66' } : { backgroundColor: '#FFA8AC' }, { marginRight: 5 }]}>
                                    <Text style={styles.textButton}>MALE</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ isMale: false });
                                }}
                            >
                                <View style={[styles.waperRegister, , !this.state.isMale ? { backgroundColor: '#F15F66' } : { backgroundColor: '#FFA8AC' }, { marginLeft: 5 }]}>
                                    <Text style={styles.textButton}>FEMALE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* How old are you? */}
                    <View style={styles.containerAge}>
                        <View style={styles.containerTextAge}>
                            <Text style={styles.textQA}>How old are you?</Text>
                            <Text style={styles.textQA}>I'm {this.state.age} years old</Text>
                        </View>
                        <Slider
                            style={{ width: width - (width / 8.33) }}
                            step={1}
                            minimumTrackTintColor='#F15F66'
                            maximumTrackTintColor='#FFA8AC'
                            minimumValue={16}
                            maximumValue={40}
                            value={this.state.age}
                            onValueChange={val => this.setState({ age: val })}
                        />
                    </View>
                    {/* What are your hobbies? */}
                    <View style={styles.containerHobby}>
                        <Text style={[styles.textQA, { flex: 1 }]}>What are your hobbies?</Text>
                        <View style={{ marginTop: height / 160, alignItems: 'flex-start', backgroundColor: 'rgba(202,148,157,1)', borderRadius: height / 40, flex: 6 }}>
                            <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'transparent' }}>
                                <TagInput
                                    value={this.state.tags}
                                    onChange={this.onChangeTags}
                                    labelExtractor={this.labelExtractor}
                                    text={this.state.text}
                                    onChangeText={this.onChangeText}
                                    tagColor="#FFA8AC"
                                    tagTextColor="#ffffff"
                                    inputProps={inputProps}
                                    maxHeight={height / 5.8}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {/* Button */}
                <View style={styles.containerButton}>
                    <TouchableOpacity
                        onPress={() => {
                            this.Global.isFooter = false;
                            Actions.login();
                        }}
                    >
                        <View style={[styles.waperRegister, { marginRight: 5 }]}>
                            <Text style={styles.textButton}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.Global.isFooter = false;
                            Actions.register();
                        }}
                    >
                        <View style={[styles.waperLogin, { marginLeft: 5 }]}>
                            <Text style={styles.textButton}>NEXT</Text>
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

    logoStyle: {
        marginTop: height < 812 ? (height < 667 ? 20 : 45) : 50,
        width: height < 736 ? (height < 667 ? 180 : 205) : 230,
        height: height < 736 ? (height < 667 ? 180 : 205) : 230,
        alignSelf: 'center',
    },

    textName: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'System',
        color: '#ffff',
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    containerInfo: {
        flex: 6,
        marginTop: height < 667 ? 5 : 10,
    },
    containerYouAre: {
        flex: 1,
        alignSelf: 'center'
    },
    textQA: {
        fontSize: 16,
        color: '#ffffff',
        backgroundColor: 'transparent',
        marginBottom: height < 736 ? 5 : 12,
    },
    containerAge: {
        flex: 1,
        marginTop: height < 667 ? 14 : 0,
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    containerTextAge: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width < 414 ? width - 40 : width - 50,
    },
    containerHobby: {
        flex: 2,
        width: width < 414 ? width - 40 : width - 50,
        alignSelf: 'center',
    },
    containerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: height < 812 ? (height < 736 ? (height < 667 ? 60 : 70) : 80) : 90,
        // marginBottom: height < 812 ? 5 : 10,
    },
    containerButton01: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    waperLogin: {
        width: width < 414 ? width / 2 - 25 : width / 2 - 30,
        height: height < 667 ? 40 : 45,
        backgroundColor: '#F15F66',
        shadowColor: '#ED969B',
        shadowOffset: { width: 1, height: 1.3, },
        shadowOpacity: 84,
        shadowRadius: 1,
        borderRadius: height < 667 ? 20 : 22.5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textButton: {
        fontSize: 18,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: '#ffff',
        backgroundColor: 'transparent'
    },
    waperRegister: {
        width: width < 414 ? width / 2 - 25 : width / 2 - 30,
        height: height < 667 ? 40 : 45,
        backgroundColor: '#FFA8AC',
        shadowColor: '#ED969B',
        shadowOffset: { width: 1, height: 1.3, },
        shadowOpacity: 84,
        shadowRadius: 1,
        borderRadius: height < 667 ? 20 : 22.5,
        alignItems: 'center',
        justifyContent: 'center',

    },

})
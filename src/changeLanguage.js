

import React, { Component } from "react";
import { Actions, Router, Scene } from "react-native-mobx";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    ListView,
    Image,
    RefreshControl,
    Animated,
    Button,
    Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
import TagInput from 'react-native-tag-input';
import Expand from 'react-native-simple-expand';
const { width, height } = Dimensions.get("window");
const data = require('./data/api.json');
const inputProps = {
    keyboardType: 'default',
    placeholder: 'hobby',
    placeholderTextColor: 'white',
    color: 'white',
    autoFocus: true,
    style: {
        fontSize: 15,
        marginVertical: Platform.OS == 'ios' ? 0 : -2,
        marginTop: 10
    },
};
@autobind
@observer
export default class ChangeLanguage extends Component {

    constructor(props) {
        super(props);
        this.Global = this.props.Global;
        this.state = {
        };
    }
    render() {
        const animatedValue = this.state.animatedValue;
        return (
            <ImageBackground
                source={require("./img/background01.png")}
                style={styles.background}
            >
                <Animated.View>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerTextContain}>
                            <Text style={styles.headerText}>
                                LANGUAGE
                  </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={
                            {
                                justifyContent: 'center',
                                position: 'absolute',
                                top: 40,
                                left: 10
                            }
                        }
                        onPress={() => {
                            this.Global.isFooter = true;
                            Actions.pop();
                            this.Global.pressStatus = "profile";
                        }}
                    >
                        <Icon name="chevron-left" color='#ffffff' size={22} style={{ marginLeft: 15, marginBottom: 5 }} />
                    </TouchableOpacity>
                </Animated.View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            this.Global.isFooter = true;
                            Actions.pop();
                            this.Global.pressStatus = "profile";
                        }}
                    >
                        <View style={styles.containerLanguage}>
                            <Image
                                source={require("./img/Vietnam-icon.png")}
                                style={styles.flag}
                            />
                            <View style={styles.containerLg}>
                                <Text style={styles.language}>
                                    Vietnamese
              </Text>
                                <Icon name="chevron-right" color='#ffffff' size={16} style={{ marginRight: 15, backgroundColor: 'transparent' }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.Global.isFooter = true;
                            Actions.pop();
                            this.Global.pressStatus = "profile";
                        }}
                    >
                        <View style={styles.containerLanguage}>
                            <Image
                                source={require("./img/US-language.png")}
                                style={styles.flag}
                            />
                            <View style={styles.containerLg}>
                                <Text style={styles.language}>
                                    United States
                                  </Text>
                                <Icon name="chevron-right" color='#ffffff' size={16} style={{ marginRight: 15, backgroundColor: 'transparent' }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#F15F66'
    },
    headerContainer: {
        width: width,
        height: (height + 1000) / 21.37,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#F15F66',
        flexDirection: "row"
    },
    headerTextContain: {
        alignItems: "center",
        marginTop: (height + 1000) / 58,
        alignSelf: 'center'
    },
    headerText: {
        color: "#ffffff",
        fontSize: 28,
        fontWeight: 'bold'
    },
    containerLanguage: {
        width: width - 40,
        height: 50,
        // backgroundColor: 'green',
        marginTop: 10,
        flexDirection: 'row'
    },
    flag: {
        width: 30,
        height: 30,
        alignSelf: 'center'
    },
    language: {
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 30
    },
    containerLg: {
        flexDirection: 'row',
        width: width - 70,
        height: 30,
        // backgroundColor: 'blue', 
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff'
    }
});

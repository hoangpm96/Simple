import React, { Component } from "react";
import { Actions, Router, Scene } from "react-native-mobx";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground,
    Switch,
    Button,
    Picker,
    TouchableHighlight,
    Alert,
    ActionSheetIOS,
    Platform,
    NativeModules
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SimplePicker from 'react-native-simple-picker';
import TagInput from 'react-native-tag-input';
import Modal from "react-native-modalbox";
import firebase from "firebase";
const { width, height } = Dimensions.get("window");
const inputProps = {
    keyboardType: 'default',
    placeholder: ' ',
    placeholderTextColor: 'white',
    color: 'white',
    editable: false,
    autoFocus: true,
    style: {
        fontSize: 15,
        marginVertical: Platform.OS == 'ios' ? 0 : -2,
        marginTop: 10
    },

};

export default class LoverProfile extends Component {
    constructor(props) {
        super(props);
        this.Global = this.props.Global;
        this.state = {
            Name: "",
            Age: "",
            Height: "",
            Weight: "",
            Address: "",
            Quote: "",
            Gender: '',
            Weight: '',
            Height: '',
            City: "",
            District: "",
            lover: 0,
            loved: 0,
            tags: [],
            text: "",
            Avatar: null,
            animating: false
        };
    }
    componentWillMount() {
        this.getInforUser(this.Global.loverId);
      }
    
      getInforUser = async (userId) => {
        try {
            this.setState({
                animating: true
            })
            await firebase
            .database()
            .ref("users")
            .orderByKey()
            .equalTo(userId)
            .once("value", snapshot => {
              if (snapshot.val()) {
                let value = Object.values(snapshot.val());
                this.setState({
                    Name: value[0].name,
                    Age: (value[0].age).toString(),
                    Height: (value[0].height).toString(),
                    Weight: (value[0].weight).toString(),
                    City: value[0].city,
                    District: value[0].district,
                    Quote: value[0].quote,
                    Avatar: value[0].avatarUrl,
                    lover: value[0].lover,
                    loved: value[0].loved,
                    Gender: value[0].gender,
                })
                let array = []
                for (var tag in value[0].tags) {
                        array.push(tag),
                    this.setState({tags:  array});
                }
                this.setState({
                    animating: false
                })
              } else {
                Alert.alert(this.Global.APP_NAME, "User had been delete.");
                return;
              }
            });
//cap nhat lover/loved

            await firebase
            .database()
            .ref("wishlist")
            .orderbyKey()
            .equalTo(userId)
            .once("value", snapshot => {
                debugger
                if (snapshot.val()){
                    let abc = snapshot.val();
                    debugger
                }
                else {
                    debugger
                    let abc = 0;
                }
            })
        }
        catch(error) {
            this.setState({
                animating: false
            })
        }
    }
    onChangeTags = (tags) => {
    }
    onChangeText = (text) => {
    }
    labelExtractor = (tag) => tag;
    render() {
        return (
            <View style={styles.background}>
                <View style={styles.containerInfo}>
                    <Image style={styles.avatar} 
                    source={this.state.Avatar ? {uri: this.state.Avatar}: require("./img/avatar-non.png") }
                    />
                    <Text style={styles.textName}>{this.state.Name}</Text>
                    <View style={styles.containerlover}>
                        <Text style={[styles.lover, { textAlign: 'right', marginRight: 5, marginTop: 5 }]}>{this.state.lover} lover</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginTop: 5 }}>|</Text>
                        <Text style={[styles.lover, { textAlign: 'left', marginLeft: 5, marginTop: 5 }]}>{this.state.loved} loved</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            this.Global.isFooter = true;
                            Actions.pop();
                            this.Global.pressStatus = "love";
                            this.Global.loverId = "";
                        }}
                    >
                        <Icon name="chevron-left" color='#ffffff' size={22} style={{ marginLeft: 15, marginBottom: 5 }} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.containerEdit}>
                    <View style={styles.viewQuote}>
                        <Text 
                        style={styles.inputQuote}>{this.state.Quote}</Text>
                    </View>
                    <View style={styles.viewGenderAge}>
                        <Text style={styles.text}>Gender:</Text>
                            <Text style={styles.changeElement}>
                                {this.state.Gender === 'male' ? "Male" : "Female"}</Text>
                        <Text style={styles.text}>Age: </Text>
                        <Text style={styles.changeElement}>
                                {this.state.Age}</Text>
                    </View>
                    <View style={styles.viewGenderAge}>
                        <Text style={styles.text}>Weight:</Text>
                        <Text style={styles.changeElement}>
                                {this.state.Weight === "Select Weight" ? "Null" : this.state.Weight}</Text>
                        <Text style={styles.text}>Height: </Text>
                        <Text style={styles.changeElement}>
                                {this.state.Height === "Select Height" ? "Null" : this.state.Height}</Text>
                    </View>
                    <Text style={[styles.text, { marginTop: 10, marginLeft: 10 }]}>Hobbies: </Text>

                    <View style={{ marginTop: 10, width: width - 20, marginLeft: 10, alignItems: 'center', backgroundColor: 'rgba(202,148,157,1)', borderRadius: height / 40, height: 150 }}>
                        <View style={{ marginLeft: 10, marginBottom: 10, marginRight: 10, flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'transparent' }}>
                        <TagInput
                                value={this.state.tags}
                                onChange={this.onChangeTags}
                                labelExtractor={this.labelExtractor}
                                text={this.state.text}
                                onChangeText={this.onChangeText}
                                tagColor="#FFA8AC"
                                tagTextColor="#ffffff"
                                inputProps={inputProps}
                                maxHeight={145}
                            />
                        </View>
                    </View>

                    <Text style={[styles.text, { marginLeft: 10, marginTop: 10 }]}>Address:</Text>
                    <View style={styles.containerAddress}>
                        <Icon name="angle-down" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <Text style={{ fontSize: 14, color: '#DDDDDD', marginTop: 2, marginLeft: 10 }}>{this.state.City}</Text>
                    </View>
                    <View style={[styles.containerAddress, { marginTop: 5, marginBottom: 50 }]}>
                        <Icon name="angle-down" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <Text style={{ fontSize: 14, color: '#DDDDDD', marginTop: 2, marginLeft: 10 }}>{this.state.District}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#CC6666',
    },
    containerInfo: {
        height: height < 812 ? (height < 736 ? (height < 667 ? 240 : 286) : 318) : 342,
        width: width,
        backgroundColor: '#F15F66',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center'
    },
    avatar: {
        width: height < 812 ? (height < 736 ? (height < 667 ? 166 : 200) : 220) : 220,
        height: height < 812 ? (height < 736 ? (height < 667 ? 166 : 200) : 220) : 220,
        resizeMode: "cover",
        borderRadius: height < 812 ? (height < 736 ? (height < 667 ? 83 : 100) : 110) : 110,
        borderWidth: 3,
        borderColor: '#ffffff',
        marginTop: height < 812 ? (height < 736 ? (height < 667 ? 25 : 35) : 45) : 65,
    },
    viewAvatar: {
        width: height < 812 ? (height < 736 ? (height < 667 ? 166 : 200) : 220) : 220,
        height: height < 812 ? (height < 736 ? (height < 667 ? 166 : 200) : 220) : 220,
        borderRadius: height < 812 ? (height < 736 ? (height < 667 ? 83 : 100) : 110) : 110,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: height < 812 ? (height < 736 ? (height < 667 ? 25 : 35) : 45) : 65,
        left: height < 812 ? (height < 736 ? (height < 667 ? 77 : 87) : 97) : 78,
        justifyContent: 'center'
    },
    textName: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 3,
        marginBottom: height < 812 ? (height < 736 ? 0 : 2) : 4,
    },
    containerlover: {
        alignItems: 'center',
        height: 20,
        flexDirection: 'row',
    },
    lover: {
        height: 20,
        width: 80,
        fontSize: 14,
        fontWeight: 'bold', color: '#ffffff'
    },
    inputEmail: {
        color: '#ffffff',
        fontSize: 16,
        marginTop: 2,
        width: width - 100,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffff'
    },
    viewQuote: {
        marginTop: 15,
        width: width - 20,
        height: 57,
        backgroundColor: 'rgba(202,148,157,1)',
        alignSelf: 'center'
    },
    inputQuote: {
        color: '#ffffff',
        fontSize: 16,
        width: width - 30,
        height: 55,
        backgroundColor: 'transparent',
        marginTop: 10,
        marginLeft: 15
        // margin: 5,
    },
    viewGenderAge: {
        width: width - 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    changeElement: {
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: '#ffffff',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff'
    },
    containterAdd: {
        position: 'absolute',
        left: height < 812 ? (height < 736 ? (height < 667 ? -19.5 : -21) : -22 ) : - 24,
        bottom: height < 812 ? 15: 25,
        width: height < 812 ? (height < 736 ? (height < 667 ? 39 : 42 ) : 44 ) : 48,
        height: height < 812 ? (height < 736 ? (height < 667 ? 39 : 42 ) : 44 ) : 48,
        borderRadius: height < 812 ? (height < 736 ? (height < 667 ? 19.5 : 21 ) : 22 ) : 24,
        backgroundColor: '#F15F66',
        borderWidth: 1,
        borderColor: 'rgba(226,39,44,0.2)',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerAddress: {
        width: width - 20,
        height: height < 667 ? 40 : 45,
        borderRadius: height < 667 ? 20 : 22.5,
        backgroundColor: 'rgba(202,148,157,1)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10
    },
    backButton: {
        justifyContent: 'center',
        position: 'absolute',
        top: height < 812 ? 30 : 50,
        left: 10
    },
    containerEdit: {
        alignSelf: 'center',
        width: width,
    },
    containerEmail: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    }

})
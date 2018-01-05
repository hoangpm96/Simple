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
    NativeModules,
    ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SimplePicker from 'react-native-simple-picker';
import TagInput from 'react-native-tag-input';
import Modal from "react-native-modalbox";
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from "firebase";
import { async } from "@firebase/util";
import Global from "./models/global";
import { each } from "@firebase/database/dist/esm/src/core/util/util";

const { width, height } = Dimensions.get("window");
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
// const DESTRUCTIVE_INDEX = 4
const options = ['Cancel', 'Male', 'Female'];
const citys = [];
const districts = [];
const ages = [];
const heights = [];
var weights = [];
const MAX_HEIGHT = 250
const MIN_HEIGHT = 100
const MAX_AGE = 160
const MIN_AGE = 40
const MAX_WEIGHT = 120
const MIN_WEIGHT = 30
const addressData = require('./data/address.json');

// const storage = firebase.storage();
const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

    uploadImage = (uri, id, mime = 'images/') =>   {
        return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.uri.replace('file://', '') : uri.uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        const imageRef = firebase.storage().ref('images').child(`${sessionId}.jpg`);

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url, id) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export default class EditProfile extends Component {
    componentWillMount() {

        this.getInforUser(this.Global.currentUserId);
        this.createSelect();
    }
    createSelect() {
        for (i = MIN_HEIGHT; i <= MAX_HEIGHT; i++ ){
            heights.push(i.toString());
        }
        for (i = MIN_AGE; i <= MAX_AGE; i++ ){
            ages.push(i.toString());
        }
        for (i = MIN_WEIGHT; i <= MAX_WEIGHT; i++ ){
            weights.push(i.toString());
        }
        for (var city of addressData) {
            citys.push(city.name)
        }
        debugger
        console.log(citys)
        this.setState({
            animating: false
        })
    }
    getDistrict(cityName) {
    const city = addressData.find(m => m.name == cityName );
    districts = [];
    for (district in city.districts){
        districts.push(city.districts[district]);
    }
    }
    // getHobbies = async (userID)  
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
            .on("value", snapshot => {
              if (snapshot.val()) {
                let value = Object.values(snapshot.val());
                debugger
                this.setState({
                    userName: value[0].username,
                    Name: value[0].name,
                    selectedAge: (value[0].age).toString(),
                    selectedHeight: (value[0].height).toString(),
                    selectedWeight: (value[0].weight).toString(),
                    selectedCity: value[0].city,
                    selectedDistrict: value[0].district,
                    Email: value[0].email,
                    Quote: value[0].quote,
                    Avatar: value[0].avatarUrl,
                })
                this.state.selectedHeight === null ? this.setState({
                    selectedHeight: 'Select Height'
                }) : null
                this.state.selectedWeight === null ? this.setState({
                    selectedWeight: 'Select Weight'
                }) : null
                debugger
                let array = []
                for (var tag in value[0].tags) {
                        array.push(tag),
                    this.setState({tags:  array});
                    console.log(this.state.tags)
                }
                // let keys = Object.keys(snapshot.val());
                // this.Global.currentUserId = keys[0];
                // let email = value[0].email;
                //verify password
                // this.login(email, password);
                this.setState({
                    animating: false
                })
              } else {
                Alert.alert(this.Global.APP_NAME, "User had been delete.");
                return;
              }
              debugger
              console.log(snapshot.val());
            });
        }
        catch(error) {
            this.setState({
                animating: false
            })
        }
    }
    uploadInfoUser = async () => {
        var imgUrl = this.state.avatarSource ? await uploadImage(this.state.avatarSource, this.Global.currentUserId, 'images/'): null;
        try {
            // this.state.avatarSource ? 
            this.setState(
                {
                    animating: true
                }
            )
            await firebase.database().ref('users').child(this.Global.currentUserId).update({
                'avatarUrl': imgUrl ? imgUrl : this.state.Avatar,
                'age': this.state.selectedAge,
                'name': this.state.Name,
                'height': this.state.selectedHeight,
                'weight': this.state.selectedWeight,
                'city': this.state.selectedCity,
                'district': this.state.selectedDistrict,
                'email': this.state.Email,
                'quote': this.state.Quote,
            })
            await firebase
                .database()
                .ref("users").child(this.Global.currentUserId).child('tags').remove();

            for ( let tag of this.state.tags  ) {
                await firebase
                .database()
                .ref("users").child(this.Global.currentUserId).child('tags').child(tag).set(true);
              }
              this.setState(
                {
                    animating: false
                }
            )
            this.Global.isFooter = true;
            Actions.profile();
        }
        catch (error) {
            this.setState({
                animating: false
            })
            Alert.alert(this.Global.APP_NAME, error);
        }
    }

    constructor(props) {
        super(props);
        this.Global = this.props.Global;
        this.onActionsPress = this.onActionsPress.bind(this);
        this.state = {
            userName: "",
            Name: "",
            Age: "",
            Height: "",
            Weight: "",
            Address: "",
            Email: "",
            Quote: "A woman gives and forgives, a man gets and forgets",
            isPush: false,
            selected: 1,
            selectedAge: '21',
            selectedWeight: '45',
            selectedHeight: '150',
            selectedCity: "",
            selectedDistrict: "",
            tags: [],
            text: "",
            Avatar: null,
            avatarSource: null,
            animating: false
        };
    }
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
            }
        });
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
    onActionsPress() {
        ActionSheetIOS.showActionSheetWithOptions({
            tintColor: '#F15F66',
            options: ['Cancel', 'Male', 'Female'],
            cancelButtonIndex: 0,
        },
            (buttonIndex) => {
                if (buttonIndex !== 0) {
                    this.setState({
                        selected: buttonIndex
                    })
                }
            });
    }
    render() {
        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.background}
            scrollEnabled={false}
          >
                <View style={styles.containerInfo}>
                    {/* <Image style={styles.avatar} source={require("./img/hoangphan.jpg")} /> */}
                    <Image style={styles.avatar} source={this.state.Avatar ? {uri: this.state.Avatar}: (this.state.avatarSource ? this.state.avatarSource : require("./img/avatar-non.png")) } />
                    {/* {this.state.image ? this.renderImage(this.state.image) : <Image style={styles.avatar} source={require("./img/hoangphan.jpg")} />} */}
                    <TouchableOpacity style={styles.viewAvatar}
                        // Edit Avatar
                        // onPress={() => { Alert.alert('1') }}
                        onPress={this.selectPhotoTapped.bind(this)}
                    >
                        <Icon name="camera" color='#F15F66' size={50} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Name..."
                        placeholderTextColor="#fff"
                        selectionColor="#fff"
                        style={styles.textName}
                        keyboardType='default'
                        autoCapitalize='words'
                        textAlignVertical='center'
                        keyboardAppearance='light'
                        maxLength={60}
                        maxHeight={150}
                        textAlign='center'
                        onChangeText={userName => {
                            this.setState({ Name: userName });
                        }}
                        value={this.state.Name}
                    />
                    <View style={styles.containerlover}>
                        <Text style={[styles.lover, { textAlign: 'right', marginRight: 5, marginTop: 5 }]}>13 lover</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginTop: 5 }}>|</Text>
                        <Text style={[styles.lover, { textAlign: 'left', marginLeft: 5, marginTop: 5 }]}>13 loved</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            this.Global.isFooter = true;
                            Actions.pop();
                            this.Global.pressStatus = "profile";
                        }}
                    >
                        <Icon name="chevron-left" color='#ffffff' size={22} style={{ marginLeft: 15, marginBottom: 5 }} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.containerEdit}>
                    <View style={styles.containerEmail}>
                        <Text style={[styles.text, { marginTop: 2, width: 80 }]}>Email: </Text>
                        <TextInput
                            placeholder="Email..."
                            placeholderTextColor="#fff"
                            selectionColor="#fff"
                            style={styles.inputEmail}
                            keyboardType='default'
                            autoCapitalize='words'
                            textAlignVertical='center'
                            keyboardAppearance='light'
                            maxLength={60}
                            maxHeight={width - 90}
                            textAlign='left'
                            onChangeText={Email => {
                                this.setState({ Email: Email });
                            }}
                            value={this.state.Email}
                        />
                    </View>
                    <View style={styles.viewQuote}>
                        <TextInput
                            placeholder="Quote..."
                            placeholderTextColor="#fff"
                            selectionColor="#fff"
                            style={styles.inputQuote}
                            keyboardType='default'
                            textAlignVertical='top'
                            keyboardAppearance='light'
                            maxLength={60}
                            maxHeight={width - 100}
                            textAlign='left'
                            multiline={true}
                            onChangeText={Quote => {
                                this.setState({ Quote: Quote });
                            }}
                            value={this.state.Quote}
                        />
                    </View>
                    <View style={styles.viewGenderAge}>
                        <Text style={styles.text}>Gender:</Text>
                        <TouchableOpacity
                            onPress={
                                this.onActionsPress
                            }

                        >
                            <Text style={styles.changeElement}>
                                {options[this.state.selected]}</Text>

                        </TouchableOpacity>
                        <Text style={styles.text}>Age: </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.picker.show();
                            }
                            }
                        >
                            <Text style={styles.changeElement}>
                                {this.state.selectedAge}</Text>

                        </TouchableOpacity>
                        <SimplePicker
                            ref={'picker'}
                            options={ages}
                            itemStyle={{
                                fontSize: 25,
                                color: '#F15F66',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                            buttonStyle={{
                                fontSize: 18,
                                color: '#F15F66',
                                fontWeight: 'bold'
                            }}
                            confirmText='Select'
                            onSubmit={(option) => {
                                this.setState({
                                    selectedAge: option,
                                });
                            }}
                        />
                    </View>
                    <View style={styles.viewGenderAge}>
                        <Text style={styles.text}>Weight:</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.pickerWeight.show();
                            }
                            }
                        >
                            <Text style={styles.changeElement}>{this.state.selectedWeight}</Text>

                        </TouchableOpacity>
                        <SimplePicker
                            ref={'pickerWeight'}
                            options={weights}
                            itemStyle={{
                                fontSize: 25,
                                color: '#F15F66',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                            buttonStyle={{
                                fontSize: 18,
                                color: '#F15F66',
                                fontWeight: 'bold'
                            }}
                            confirmText='Select'
                            onSubmit={(option) => {
                                this.setState({
                                    selectedWeight: option,
                                });
                            }}
                        />
                        <Text style={styles.text}>Height: </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.pickerHeight.show();
                            }
                            }
                        >
                            <Text style={styles.changeElement}>{this.state.selectedHeight}</Text>

                        </TouchableOpacity>
                        <SimplePicker
                            ref={'pickerHeight'}
                            options={heights}
                            itemStyle={{
                                fontSize: 25,
                                color: '#F15F66',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                            buttonStyle={{
                                fontSize: 18,
                                color: '#F15F66',
                                fontWeight: 'bold'
                            }}
                            confirmText='Select'
                            onSubmit={(option) => {
                                this.setState({
                                    selectedHeight: option,
                                });
                            }}
                        />
                    </View>
                    <Text style={[styles.text, { marginTop: 10, marginLeft: 10 }]}>What are your hobbies?</Text>

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
                    <TouchableOpacity
                        onPress={() => {
                            this.refs.pickerCity.show();
                            //code cai district
                            
                        }
                        }
                        style={styles.containerAddress}
                    >
                        <Icon name="angle-down" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <Text style={{ fontSize: 14, color: '#DDDDDD', marginTop: 2, marginLeft: 10 }}>{this.state.selectedCity}</Text>

                    </TouchableOpacity>
                    <SimplePicker
                        ref={'pickerCity'}
                        options={citys}
                        itemStyle={{
                            fontSize: 25,
                            color: '#F15F66',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                        buttonStyle={{
                            fontSize: 18,
                            color: '#F15F66',
                            fontWeight: 'bold'
                        }}
                        confirmText='Select'
                        onSubmit={(option) => {
                            this.setState({
                                selectedCity: option,
                                selectedDistrict: 'Select District'
                            });
                            this.getDistrict(option)
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            this.refs.pickerDistrict.show();
                        }
                        }
                        style={[styles.containerAddress, { marginTop: 5, marginBottom: 50 }]}
                    >
                        <Icon name="angle-down" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <Text style={{ fontSize: 14, color: '#DDDDDD', marginTop: 2, marginLeft: 10 }}>{this.state.selectedDistrict}</Text>

                    </TouchableOpacity>
                    <SimplePicker
                        ref={'pickerDistrict'}
                        options={districts}
                        itemStyle={{
                            fontSize: 25,
                            color: '#F15F66',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                        buttonStyle={{
                            fontSize: 18,
                            color: '#F15F66',
                            fontWeight: 'bold'
                        }}
                        confirmText='Select'
                        onSubmit={(option) => {
                            this.setState({
                                selectedDistrict: option,
                            });
                        }}
                    />
                </ScrollView>
                <TouchableOpacity
                    onPress={() => {
                        // this.getInforUser(this.Global.currentUserId);
                        // console.log(this.Global.currentUserId);
                        // debugger

                        this.uploadInfoUser();
                    }}
                >
                    <View style={styles.containterAdd}>
                        <Icon name="check" color='#ffffff' size={23} />
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
        marginTop: height < 812 ? 2 : 5,
        width: 150,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffff'
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
        margin: 5,
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
        textDecorationLine: 'underline',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff'
    },
    containterAdd: {
        position: 'absolute',
        left: height < 812 ? (height < 736 ? (height < 667 ? -19.5 : -21) : -22) : - 24,
        bottom: height < 812 ? 15 : 25,
        width: height < 812 ? (height < 736 ? (height < 667 ? 39 : 42) : 44) : 48,
        height: height < 812 ? (height < 736 ? (height < 667 ? 39 : 42) : 44) : 48,
        borderRadius: height < 812 ? (height < 736 ? (height < 667 ? 19.5 : 21) : 22) : 24,
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
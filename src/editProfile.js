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
import ImagePicker from 'react-native-image-picker';

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
const citys = ['Ha Noi', 'Quang Ngai', 'Quang Nam', 'Hai Phong', 'Can Tho', 'Da Nang', 'Lao Cai', 'Lang Son', 'Kien Giang', 'Tien Giang', 'Ho Chi Minh City', 'Long An', 'Dong Nai', 'Vung Tau', 'Hue', 'Phu Yen', 'Gia Lai', 'Daklak', 'Lam Dong', 'Quang Binh', 'Quang Tri', 'Binh Dinh', 'Binh Thuan', 'Tay Ninh', 'Binh Duong'];
const dictricts = ['Dictrict 1', 'Dictrict 2', 'Dictrict 3', 'Dictrict 4', 'Dictrict 5', 'Dictrict 6', 'Dictrict 7', 'Dictrict 8', 'Dictrict 9', 'Dictrict 10', 'Dictrict 11', 'Dictrict 12', 'Thu Duc Dictrict', 'Tan Binh Dictrict', 'Binh Tan Dictrict', 'Tan Phu Dictrict', 'Phu Nhuan Dictrict', 'Binh Thanh Dictrict', 'Binh Chanh Dictrict', 'Nha Be Dictrict', 'Can Gio Dictrict', 'Cu Chi Dictrict'];
const ages = ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'];
const heights = ['140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151', '152', '153', '154', '155', '156', '157', '158', '159', '160', '161', '162', '163', '190'];
const weights = ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64'];

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.Global = this.props.Global;
        this.onActionsPress = this.onActionsPress.bind(this);
        this.state = {
            userName: "Hoang Phan",
            Name: "Minh Hoang",
            Age: "21",
            Height: "180",
            Weight: "65",
            Address: "Quang Ngai",
            Email: "hoangpm.qn96@gmail.com",
            Quote: "A woman gives and forgives, a man gets and forgets",
            isPush: false,
            selected: 1,
            selectedAge: 21,
            selectedWeight: 45,
            selectedHeight: 150,
            selectedCity: "Ho Chi Minh City",
            selectedDictrict: "Dictrict 1",
            tags: ["dog", "guitar", "dance", "swimming", "readbook"],
            text: "",
            // image: null,
            avatarSource: null,
            videoSource: null
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
      
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
              this.setState({
                avatarSource: source
              });
            }
          });
        }
      
        selectVideoTapped() {
          const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium'
          };
      
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled video picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              this.setState({
                videoSource: response.uri
              });
            }
          });
        }
    // pickSingle(cropit, circular = false) {
    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 300,
    //         cropping: cropit,
    //         cropperCircleOverlay: circular,
    //         compressImageMaxWidth: 640,
    //         compressImageMaxHeight: 480,
    //         compressImageQuality: 0.5,
    //         compressVideoPreset: 'MediumQuality',
    //         includeExif: true,
    //     }).then(image => {
    //         this.setState({
    //             image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
    //             images: null
    //         });
    //     }).catch(e => {
    //         Alert.alert(e.message ? e.message : e);
    //     });
    // }
    // renderImage(image) {
    //     return <Image style={styles.avatar} source={image} />
    // }
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
            <View style={styles.background}>
                <View style={styles.containerInfo}>
                    {/* <Image style={styles.avatar} source={require("./img/hoangphan.jpg")} /> */}
                    <Image style={styles.avatar} source={this.state.avatarSource ? this.state.avatarSource : require("./img/hoangphan.jpg")}/>
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
                            this.setState({ userName: userName });
                        }}
                        value={this.state.userName}
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
                                selectedDictrict: 'Select Dictrict'
                            });
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
                        <Text style={{ fontSize: 14, color: '#DDDDDD', marginTop: 2, marginLeft: 10 }}>{this.state.selectedDictrict}</Text>

                    </TouchableOpacity>
                    <SimplePicker
                        ref={'pickerDistrict'}
                        options={dictricts}
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
                                selectedDictrict: option,
                            });
                        }}
                    />
                </ScrollView>
                <TouchableOpacity
                    onPress={() => {
                        this.Global.isFooter = true;
                        this.Global.pressStatus = "profile";
                        Actions.profile();
                    }}
                >
                    <View style={styles.containterAdd}>
                        <Icon name="check" color='#ffffff' size={23} />
                    </View>
                </TouchableOpacity>
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
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
// import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet';
import SimplePicker from 'react-native-simple-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import TagInput from 'react-native-tag-input';
import Modal from "react-native-modalbox";
// var ImagePicker = NativeModules.ImageCropPicker;
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
            image: null,
        };
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
    // onActionsPress() {
    //     ActionSheetIOS.showActionSheetWithOptions({
    //         tintColor: '#F15F66',
    //         options: ['Cancel', 'Male', 'Female'],
    //         cancelButtonIndex: 0,
    //     },
    //         (buttonIndex) => {
    //             if (buttonIndex !== 0) {
    //                 this.setState({
    //                     selected: buttonIndex
    //                 })
    //             }
    //         });
    // }
    render() {
        return (
            <ImageBackground
                source={require("./img/background01.png")}
                style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.containerInfo}>
                        <View style={[styles.viewAvatar, { marginTop: 40, }]}>
                        <Image style={styles.avatar} source={require("./img/hoangphan.jpg")} />
                            {/* {this.state.image ? this.renderImage(this.state.image) : <Image style={styles.avatar} source={require("./img/hoangphan.jpg")} />} */}
                            <TouchableOpacity style={[styles.viewAvatar, {
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                justifyContent: 'center'
                            }]}
                                // Edit Avatar
                                onPress={() => {Alert.alert(1)}}
                            >
                                <Icon name="camera" color='#F15F66' size={50} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                        </View>
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
                            <View style={styles.lover}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ffffff' }}>13 lover</Text>
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>|</Text>
                            <View style={styles.loved}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ffffff' }}>13 loved</Text>
                            </View>
                        </View>
                        <TouchableOpacity

                            style={
                                {
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: 25,
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

                    </View>
                    <View style={{ flex: 6, alignItems: 'center' }}>
                        <ScrollView style={{ marginTop: 20, width: width, alignContent: 'center' }}>
                            <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', backgroundColor: 'transparent', width: 60 }}>Email: </Text>
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
                                    maxHeight={width - 100}
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
                            <View style={styles.viewSex}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textYouAre}>Gender:</Text>
                                    <TouchableOpacity
                                        onPress={
                                            this.onActionsPress
                                        }
                                        style={styles.viewMale}
                                    >
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#ffffff',
                                            // marginLeft: 10,
                                            backgroundColor: 'transparent'
                                        }
                                        }>{options[this.state.selected]}</Text>

                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textYouAre}>Age: </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.refs.picker.show();
                                        }
                                        }
                                        style={styles.viewMale}
                                    >
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#ffffff',
                                            backgroundColor: 'transparent'
                                        }
                                        }>{this.state.selectedAge}</Text>

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

                            </View>
                            <View style={styles.viewSex}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textYouAre}>Weight:</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.refs.pickerWeight.show();
                                        }
                                        }
                                        style={styles.viewMale}
                                    >
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#ffffff',
                                            backgroundColor: 'transparent'
                                        }
                                        }>{this.state.selectedWeight}</Text>

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
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textYouAre}>Height: </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.refs.pickerHeight.show();
                                        }
                                        }
                                        style={styles.viewMale}
                                    >
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#ffffff',
                                            backgroundColor: 'transparent'
                                        }
                                        }>{this.state.selectedHeight}</Text>

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

                            </View>
                            <View style={styles.containerHobby}>
                                <Text style={[styles.textYouAre, { marginTop: 10 }]}>What are your hobbies?</Text>
                                <View style={{ marginTop: 20, alignItems: 'flex-start', backgroundColor: 'rgba(202,148,157,1)', borderRadius: height / 40, height: 150 }}>
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
                            </View>
                            <View style={styles.containerAddress}>
                                <Text style={[styles.textYouAre, { marginBottom: 4 }]}>Address:</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.refs.pickerCity.show();
                                    }
                                    }
                                    style={[styles.containerCity, { marginTop: 5 }]}
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
                                    style={[styles.containerCity, { marginTop: 5 }]}
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
                            </View>
                        </ScrollView>
                    </View>

                </View>
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
    container: {
        flex: 1,
        // backgroundColor: 'red',
        width: width
    },
    containerInfo: {
        flex: 4,
        backgroundColor: '#F15F66',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center'

    },
    containerDelete: {
        flex: 6,
        width: width,
        alignItems: 'center',
    },
    containerSignOut: {
        flex: 1.5,
        // backgroundColor: 'yellow',
        // width: width,
        alignItems: 'center',
        justifyContent: 'center',

    },
    avatar: {
        width: 170,
        height: 170,
        resizeMode: "cover",
        borderRadius: 85,
        borderWidth: 3,
        borderColor: '#ffffff',
        // marginTop: 40,
        // alignSelf: 'center'
    },
    viewAvatar: {
        width: 170,
        height: 170,
        // resizeMode: "cover",
        borderRadius: 85,
        // borderWidth: 3,
        // borderColor: '#ffffff',
        // marginTop: 40,
        // alignSelf: 'center'
    },
    textName: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
        width: 150,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffff'
    },
    containerlover: {
        marginTop: 3,
        alignItems: 'center',
        height: 20,
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lover: {
        alignItems: 'flex-end',
        marginRight: 5,
        height: 20,
        width: 80,
    },
    loved: {
        alignItems: 'flex-start',
        marginLeft: 5,
        height: 20,
        width: 80,
    },
    inputEmail: {
        color: '#ffffff',
        fontSize: 16,
        // fontWeight: 'bold',
        marginTop: 2,
        width: width - 100,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffff'
    },
    viewQuote: {
        marginTop: 25,
        width: width - 40,
        height: 57,
        backgroundColor: 'rgba(202,148,157,1)',
        alignSelf: 'center'
    },
    inputQuote: {
        color: '#ffffff',
        fontSize: 16,
        width: width - 50,
        height: 55,
        margin: 5,
    },
    viewSex: {
        width: width - 40,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 10,
        alignSelf: 'center'
    }
    ,
    textYouAre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
    },
    viewMale: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff'
    },
    containerHobby: {
        width: width - 40,
        alignSelf: 'center'
    },
    containterAdd: {
        position: 'absolute',
        left: -(height + 719) / 66,
        bottom: 20,
        width: (height + 719) / 33,
        height: (height + 719) / 33,
        borderRadius: ((height + 719) / 33) / 2,
        backgroundColor: '#F15F66',
        borderWidth: 1,
        borderColor: 'rgba(226,39,44,0.2)',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerAddress: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: width - 40,
        alignSelf: 'center',
        marginBottom: 70
    },
    containerCity: {
        width: width - (width / 8.33), //330
        height: (height / 10 - (height - 370) / 12.78), //48
        borderRadius: height / 28,
        backgroundColor: 'rgba(202,148,157,1)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },

})
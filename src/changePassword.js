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
  TouchableHighlight,
  ActivityIndicator,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modalbox";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
import firebase from "firebase";
const { width, height } = Dimensions.get("window");
@autobind
@observer
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      Name: "Minh Hoang",
      lover: 0,
      loved: 0,
      Avatar: "",
      Email: "",
      oldPass: "123456",
      pass: "1234567",
      confirmPass: "1234567",
      animating: false
    };
  }
  componentWillMount() {
    this.getInforUser(this.Global.currentUserId);
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
      .on("value", snapshot => {
        if (snapshot.val()) {
          let value = Object.values(snapshot.val());
          this.setState({
              Name: value[0].name,
              Avatar: value[0].avatarUrl,
              lover: value[0].lover,
              loved: value[0].loved,
              Email: value[0].email,
          })
          this.setState({
              animating: false
          })
        } else {
          Alert.alert(this.Global.APP_NAME, "User had been delete.");
          return;
        }
      });
  }
  catch(error) {
    console.log(error)
      this.setState({
          animating: false
      })
  }
}
  verifyCurrentPassword(currentPassword, newPassword) {
    this.setState({
      animating: true
  })
    try {
      firebase.auth().currentUser
      .reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(this.state.Email, currentPassword))
      .then( () => {
        firebase.auth().currentUser.updatePassword(newPassword).then(() => {
          // Update successful.
          this.setState({
            animating: false
        })
          this.Global.isFooter = true;
          Actions.pop()
          this.Global.pressStatus = "profile";
  
        }).catch((error) => {
          this.setState({
            animating: false
        })
          const { code, message } = error;
        Alert.alert(this.Global.APP_NAME, message);
      });
      })
      .catch((error) =>
      {
        this.setState({
          animating: false
      })
        const { code, message } = error;
        Alert.alert(this.Global.APP_NAME, message);
        
      });
    }
    catch (error){
      Alert.alert(this.Global.APP_NAME, error);
      this.setState({
        animating: false
    })
    }
  }
  showError = errMessage => {
    this.setState({ animating: false });
    Alert.alert(
      this.Global.APP_NAME,
      errMessage,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };
  render() {
    return (
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.background}
      scrollEnabled={false}
    >
      
        <View style={styles.containerInfo}>
        <Image style={styles.avatar} source={this.state.Avatar ? {uri: this.state.Avatar}: require("./img/avatar-non.png") } />
          <Text style={styles.textName}>{this.state.Name}</Text>
          <View style={styles.containerlover}>
            <Text style={[styles.lover, { textAlign: 'right', marginRight: 5 }]}>{this.state.lover} lover</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>|</Text>
            <Text style={[styles.lover, { textAlign: 'left', marginLeft: 5 }]}>{this.state.loved} loved</Text>
          </View>

        </View>


        <View style={[styles.containerForm, {
          marginTop: height < 812 ? (height < 736 ? (height < 667 ? 35 : 40) : 55) : 75,
        }]}>
          <Icon name="envelope" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
          <Text style={styles.styleUserName} >{this.state.Email}</Text>
        </View>
        <View style={styles.containerForm}>
          <Icon name="unlock-alt" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
          <TextInput style={[styles.stylePassword, { marginLeft: 18 }]}
            placeholder={'Old Password'}
            placeholderTextColor={'#DDDDDD'}
            secureTextEntry={true}
            onChangeText={oldPass => {
              this.setState({ oldPass: oldPass });
            }}
            value={this.state.oldPass}
            autoFocus={true}
          />
        </View>
        <View style={styles.containerForm}>
          <Icon name="key" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
          <TextInput style={styles.stylePassword}
            placeholder={'Password'}
            placeholderTextColor={'#DDDDDD'}
            secureTextEntry={true}
            onChangeText={pass => {
              this.setState({ pass: pass });
            }}
            value={this.state.pass}
          />
        </View>
        <View style={styles.containerForm}>
          <Icon name="key" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
          <TextInput style={styles.stylePassword}
            placeholder={'Confirm Password'}
            placeholderTextColor={'#DDDDDD'}
            secureTextEntry={true}
            onChangeText={confirmPass => {
              this.setState({ confirmPass: confirmPass });
            }}
            value={this.state.confirmPass}
          />
        </View>
        <TouchableOpacity
          style={styles.waperLogin}
          onPress={() => {
            if (this.state.oldPass === "" || this.state.pass === "" || this.state.confirmPass ==="")
            {
              Alert.alert(this.Global.APP_NAME, "Please fill all input")
            }
            else {
              if (this.state.pass === this.state.confirmPass){
                this.verifyCurrentPassword(this.state.oldPass, this.state.pass)
              }
              else {
                Alert.alert(this.Global.APP_NAME, "Password is not confirm.")
              }
            }
          }}
        >
          <Text style={styles.textLogin}>CHANGE PASSWORD</Text>
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
  avatar: {
    width: height < 812 ? (height < 736 ? (height < 667 ? 166 : 200) : 220) : 220,
    height: height < 812 ? (height < 736 ? (height < 667 ? 166 : 200) : 220) : 220,
    resizeMode: "cover",
    borderRadius: height < 812 ? (height < 736 ? (height < 667 ? 83 : 100) : 110) : 110,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 25 : 35) : 45) : 65,
  },
  textName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
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
  waperLogin: {
    width: width - 40,
    height: height < 667 ? 40 : 45,
    borderRadius: height < 667 ? 20 : 22.5,
    backgroundColor: '#F15F66',
    shadowColor: '#ED969B',
    shadowOffset: { width: 1, height: 1.3, },
    shadowOpacity: 84,
    shadowRadius: 1,
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 22 : 30) : 45) : 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  textLogin: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#ffff',
    backgroundColor: 'transparent'
  },
  containerForm: {
    width: width - 40,
    height: height < 667 ? 40 : 45,
    borderRadius: height < 667 ? 20 : 22.5,
    backgroundColor: 'rgba(202,148,157,1)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row'
  },
  styleUserName: {
    marginLeft: 10,
    borderColor: 'transparent',
    fontSize: 14,
    color: '#ffffff',
    width: width - 90,
  },
  stylePassword: {
    marginLeft: 10,
    marginRight: 20,
    borderColor: 'transparent',
    fontSize: 14,
    color: '#ffffff',
    width: width - 90,
  },
  backButton: {
    justifyContent: 'center',
    position: 'absolute',
    top: height < 812 ? 30 : 50,
    left: 10,
    backgroundColor: 'transparent'
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
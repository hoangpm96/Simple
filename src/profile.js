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
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modalbox";
const { width, height } = Dimensions.get("window");

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      userName: "HoangPhan",
      Name: "Minh Hoang",
      Age: "21",
      Height: "180",
      Weight: "65",
      Address: "Quang Ngai",
      isPush: false
    };
  }
  _onPress() {
    Alert.alert(
      'Question',
      'Do you want to delete?',
      [,
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }
  _onPressAdd() {
    Alert.alert(
      'Question',
      'Do you want to Add?',
      [,
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }
//   componentWillMount(){
//     console.log("render");    
//   }
  render() {
    return (
      <View
      //source={require("./img/background01.png")}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerInfo}>
              <Image
                source={require("./img/hoangphan.jpg")}
                style={styles.avatar}
              />
              <Text style={styles.textName}>Hoang Phan</Text>
              <View style={styles.containerlover}>
                <View style={styles.lover}>
                  <Text style={{fontSize:14, fontWeight: 'bold', color: '#ffffff'}}>13 lover</Text>
                  </View>
                <Text style={{fontSize:18, fontWeight: 'bold', color: '#ffffff'}}>|</Text>
                <View style={styles.loved}>
                <Text style={{fontSize:14, fontWeight: 'bold', color: '#ffffff'}}>13 loved</Text>
                </View>
              </View>

        </View>

        <View style={styles.containerButton}>
          <View style={styles.containrGroupBtn}>
          <View style={{flex: 1}}>
          <TouchableOpacity
          style={{
            width: width/2 - 30,
          backgroundColor: '#F15F66',
          // backgroundColor: 'transparent',
          shadowColor: '#ED969B',
          shadowOffset: { width: 1, height: 1.3, },
          shadowOpacity: 84,
          shadowRadius: 1,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
          marginBottom: 10,
          marginLeft: 15,
          marginRight: 5,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          }}
              onPress={() => {
                this.Global.isFooter = false;
                Actions.changePassword();
                this.Global.pressStatus = "love";
              }}
            >
            <Icon name="lock" color='#ffffff' size={50} />
                <Text style={styles.textLogin}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
                      style={{
                        width: width/2 - 30,
                      backgroundColor: '#F15F66',
                      shadowColor: '#ED969B',
                      shadowOffset: { width: 1, height: 1.3, },
                      shadowOpacity: 84,
                      shadowRadius: 1,
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 15,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 15,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      }}
              onPress={() => {
                this.Global.isFooter = false;
                Actions.deleteAccount();
                this.Global.pressStatus = "love";
              }}
            >
            <Icon name="user-times" color='#ffffff' size={50} />
                <Text style={styles.textLogin}>Delete Account</Text>
            </TouchableOpacity>
            </View>
          </View >
          <View style={styles.containrGroupBtn}>
          <View style={{flex: 1}}>
          <TouchableOpacity
          style={{
            width: width/2 - 30,
          backgroundColor: '#F15F66',
          shadowColor: '#ED969B',
          shadowOffset: { width: 1, height: 1.3, },
          shadowOpacity: 84,
          shadowRadius: 1,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          marginBottom: 15,
          marginLeft: 15,
          marginRight: 5,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          }}
              onPress={() => {
                this.Global.isFooter = false;
                Actions.changeLanguage();
                this.Global.pressStatus = "profile";
              }}
            >
            <Icon name="language" color='#ffffff' size={50} />
                <Text style={styles.textLogin}>Change Language</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
                      style={{
                        width: width/2 - 30,
                      backgroundColor: '#F15F66',
                      shadowColor: '#ED969B',
                      shadowOffset: { width: 1, height: 1.3, },
                      shadowOpacity: 84,
                      shadowRadius: 1,
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                      marginBottom: 15,
                      marginLeft: 5,
                      marginRight: 15,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      }}
              onPress={() => {
                this.Global.isFooter = false;
                Actions.aboutUs();
                this.Global.pressStatus = "profile";
              }}
            >
            <Icon name="users" color='#ffffff' size={70} />
                <Text style={styles.textLogin}>About Us</Text>
            </TouchableOpacity>
            </View>
          </View>

        </View>

        <View style={styles.containerSignOut}>
            <TouchableOpacity
              onPress={() => {
                this.Global.isFooter = false;
                Actions.login();
                this.Global.pressStatus = "love";
              }}
            >
              <View style={styles.waperLogin}>
                <Text style={styles.textLogin}>SIGN OUT</Text>
              </View>
            </TouchableOpacity>
        </View>
          <TouchableOpacity
            style={
              {
                backgroundColor: '#ffffff',
                // alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                borderRadius: 20,
                position: 'absolute',
                top: height / 2.6,
                left: width / 2 - 20,
                borderWidth: 1,
                borderColor: '#F15F66',
              }
            }
            onPress={() => {
              this.Global.isFooter = false;
              Actions.editProfile();
              this.Global.pressStatus = "profile";
            }}
          >
            <Icon name="edit" color='#F15F66' size={25} />
          </TouchableOpacity>
      </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#CC6666'
  },
  container: {
    flex: 1,
    // backgroundColor: 'red',
    width: width
  },
  containerInfo:{
    flex: 5.5,
    backgroundColor: '#F15F66',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center'
    
  },
  containerButton:{
    flex: 5,
    marginTop: 15,
    // backgroundColor: 'green',
    width: width
  },
  containerSignOut:{
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
    marginTop: 40,
    // alignSelf: 'center'
  },
  textName:{
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  containerlover:{
    // marginTop: 3,
    alignItems: 'center',
    height: 20,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lover:{
    alignItems: 'flex-end',
    marginRight: 5,
    height: 20,
    width: 80,
    // backgroundColor: 'green'
  },
  loved:{
    alignItems: 'flex-start',
    marginLeft: 5,
    height: 20,
    width: 80,
    // backgroundColor: 'green'
  },
  containrGroupBtn: {
    flex: 1,
    width: width,
    // backgroundColor: 'red',
    // borderColor: '#ffff',
    // borderWidth: 1,
    flexDirection: 'row'
  },
  waperLogin: {
    width: width - (width / 8.40), //330
    height: (height/10-(height-370)/12.78), //48,
    backgroundColor: '#FFA8AC',
    shadowColor: '#ED969B',
    shadowOffset: { width: 1, height: 1.3, },
    shadowOpacity: 84,
    shadowRadius: 1,
    borderRadius: 25,
    marginBottom: 10,
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
})
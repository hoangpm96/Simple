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

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.containerInfo}>
          <Image
            source={require("./img/hoangphan.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.textName}>Hoang Phan</Text>
          <View style={styles.containerlover}>
            <Text style={[styles.lover, { textAlign: 'right', marginRight: 5 }]}>13 lover</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>|</Text>
            <Text style={[styles.lover, { textAlign: 'left', marginLeft: 5 }]}>13 loved</Text>
          </View>

        </View>

        <View style={styles.containerButton}>
          <View style={styles.containrGroupBtn}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.detailButton, { marginTop: 15, marginBottom: 10, marginLeft: 15, marginRight: 5, }]}
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.changePassword();
                  this.Global.pressStatus = "love";
                }}
              >
                <Icon name="lock" color='#ffffff' size={
                  height < 812 ? (height < 736 ? (height < 667 ? 50 : 55) : 65) : 75} />
                <Text style={styles.textLogin}>Change Password</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.detailButton, { marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 15, }]}
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.deleteAccount();
                  this.Global.pressStatus = "love";
                }}
              >
                <Icon name="user-times" color='#ffffff' size={
                   height < 812 ? (height < 736 ? (height < 667 ? 50 : 55) : 65) : 75} />
                <Text style={styles.textLogin}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View >
          <View style={styles.containrGroupBtn}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.detailButton, { marginTop: 10, marginBottom: 15, marginLeft: 15, marginRight: 5, }]}
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.changeLanguage();
                  this.Global.pressStatus = "profile";
                }}
              >
                <Icon name="language" color='#ffffff' size={
                   height < 812 ? (height < 736 ? (height < 667 ? 50 : 55) : 65) : 75} />
                <Text style={styles.textLogin}>Change Language</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.detailButton, { marginTop: 10, marginBottom: 15, marginLeft: 5, marginRight: 15, }]}
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.aboutUs();
                  this.Global.pressStatus = "profile";
                }}
              >
                <Icon name="users" color='#ffffff' size={
                   height < 812 ? (height < 736 ? (height < 667 ? 50 : 55) : 65) : 75} />
                <Text style={styles.textLogin}>About Us</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <TouchableOpacity
          onPress={() => {
            this.Global.isFooter = false;
            Actions.login();
            this.Global.pressStatus = "love";
          }}
          style={styles.waperLogin}
        >
          <Text style={styles.textLogin}>SIGN OUT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            this.Global.isFooter = false;
            Actions.editProfile();
            this.Global.pressStatus = "profile";
          }}
        >
          <Icon name="edit" color='#F15F66' size={25} />
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
    height: height < 812 ? (height < 736 ? (height < 667 ? 260 : 306) : 338) : 372,
    width: width,
    backgroundColor: '#F15F66',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center'

  },
  containerButton: {
    height: height < 812 ? (height < 736 ? (height < 667 ? 236 : 278) : 306) : 338,
    marginTop: 15,
    width: width,
  },
  avatar: {
    width: height < 812 ? (height < 736 ? (height < 667 ? 166 : 200) : 220) : 220,
    height: height < 812 ? (height < 736 ? (height < 667 ? 166 : 200) : 220) : 220,
    resizeMode: "cover",
    borderRadius: height < 812 ? (height < 736 ? (height < 667 ? 83 : 100) : 110) : 110,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 25 : 35) : 45) : 75,
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
    fontSize: 14, fontWeight: 'bold', color: '#ffffff'
  },
  containrGroupBtn: {
    flex: 1,
    width: width,
    flexDirection: 'row'
  },
  waperLogin: {
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 2 : 5) : 8) : 12,
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
  },
  textLogin: {
    fontSize: width < 375 ? 14 : 16,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#ffff',
    backgroundColor: 'transparent',
  },
  editButton: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'absolute',
    top: height < 812 ? (height < 736 ? (height < 667 ? 240 : 286) : 318) : 352,
    left: width / 2 - 20,
    borderWidth: 1,
    borderColor: '#F15F66',
  },
  detailButton: {
    width: width / 2 - 30,
    backgroundColor: '#F15F66',
    shadowColor: '#ED969B',
    shadowOffset: { width: 1, height: 1.3, },
    shadowOpacity: 84,
    shadowRadius: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
})
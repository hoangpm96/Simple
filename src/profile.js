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
import Modal from "react-native-modalbox";
import firebase from "firebase";
import { async } from "@firebase/util";
const { width, height } = Dimensions.get("window");

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      Name: "Minh Hoang",
      lover: 0,
      loved: 0,
      Avatar: "",
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
            debugger
            this.setState({
                Name: value[0].name,
                Avatar: value[0].avatarUrl,
                lover: value[0].lover,
                loved: value[0].loved
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
        this.setState({
            animating: false
        })
    }
}
  render() {

    return (
      <View style={styles.background}>
        <View style={styles.containerInfo}>
            <Image style={styles.avatar} source={this.state.Avatar ? {uri: this.state.Avatar}: require("./img/avatar-non.png") } />
          <Text style={styles.textName}>{this.state.Name}</Text>
          <View style={styles.containerlover}>
            <Text style={[styles.lover, { textAlign: 'right', marginRight: 5 }]}>{this.state.lover} lover</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>|</Text>
            <Text style={[styles.lover, { textAlign: 'left', marginLeft: 5 }]}>{this.state.loved} loved</Text>
          </View>

        </View>

        <View style={styles.containerButton}>
          <View style={styles.containrGroupBtn}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.detailButton, { marginTop: 15, marginBottom: 10, marginLeft: 20, marginRight: 10, }]}
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.changePassword();
                }}
              >
                <Icon name="lock" color='#ffffff' size={
                  height < 812 ? (height < 736 ? (height < 667 ? 45 : 55) : 65) : 75} />
                <Text style={styles.textButton}>Change Password</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.detailButton, { marginTop: 15, marginBottom: 10, marginLeft: 10, marginRight: 20, }]}
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.deleteAccount();
                }}
              >
                <Icon name="user-times" color='#ffffff' size={
                   height < 812 ? (height < 736 ? (height < 667 ? 45 : 55) : 65) : 75} />
                <Text style={styles.textButton}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View >
          <View style={styles.containrGroupBtn}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.detailButton, { marginTop: 10, marginBottom: 15, marginLeft: 20, marginRight: 10,}]}
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.changeLanguage();
                }}
              >
                <Icon name="language" color='#ffffff' size={
                   height < 812 ? (height < 736 ? (height < 667 ? 45 : 55) : 65) : 75} />
                <Text style={styles.textButton}>Change Language</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.detailButton, { marginTop: 10, marginBottom: 15, marginLeft: 10, marginRight: 20, }]}
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.aboutUs();
                }}
              >
                <Icon name="users" color='#ffffff' size={
                   height < 812 ? (height < 736 ? (height < 667 ? 45 : 55) : 65) : 75} />
                <Text style={styles.textButton}>About Us</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <TouchableOpacity
          onPress={() => {
            this.Global.isFooter = false;
            Actions.login();
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
          }}
        >
          <Icon name="edit" color='#F15F66' size={25} />
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
    height: height < 812 ? (height < 736 ? (height < 667 ? 196 : 233) : 258) : 286,
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
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 2 : 5) : 10) : 15,
    width: width - 40,
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
  textButton: {
    fontSize: width < 375 ? 13 : 16,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#ffff',
    backgroundColor: 'transparent',
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 0 : 3) : 5) : 8,
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
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
  Linking,
  ImageBackground,
  Switch,
  Button,
  TouchableHighlight,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modalbox";
const { width, height } = Dimensions.get("window");

export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      teamName: "HHK Team",
    };
  }
  render() {
    return (
      <View
        style={styles.background}>
        <TouchableOpacity
          style={
            {
              justifyContent: 'center',
              position: 'absolute',
              top: 40,
              left: 0
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
        <Image
          source={require("./img/HHKTeam.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.textName}>{this.state.teamName}</Text>

        <Text style={styles.textHeader1}>ABOUT US</Text>
          <View style={[styles.objectText, {
            marginTop: height < 812 ? (height < 736 ? (height < 667 ? 10 : 15 ) : 15 ) : 15,
          }]}>
            <Text style={styles.titleText}>Subject:</Text>
            <Text style={styles.text}>Mobile Programming</Text>
          </View>
          <View style={styles.objectText}>
            <Text style={styles.titleText}>Instructor:</Text>
            <Text style={styles.text}>Huỳnh Tuấn Anh</Text>
          </View>
          {/* <View> */}
            <Text style={[styles.titleText, {marginTop: 5, width: width - 40}]}>Students: </Text>
            <Text style={[styles.text, {marginTop: 5, width: 250}]}>* Nguyễn Thị Hiền - 14520272</Text>
            <Text style={[styles.text, {marginTop: 5, width: 250}]}>* Phan Minh Hoàng - 14520317</Text>
            <Text style={[styles.text, {marginTop: 5, width: 250}]}>* Nguyễn Văn Khoa - 14520429</Text>
          {/* </View> */}
        <Text style={styles.textConnect}>
          Connect with us
              </Text>
        <View style={styles.waperConnect}>
          <TouchableOpacity
            onPress={() => {
              this.Global.isFooter = true;
              Linking.openURL('https://www.facebook.com/hoangpm96');
              this.Global.pressStatus = "profile";
            }}
          >
            <Icon name="facebook-square" color='#ffffff' size={height < 667 ? 30 : 40} style={{ marginRight: 7, backgroundColor: 'transparent' }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.Global.isFooter = true;
              Linking.openURL('https://plus.google.com/u/0/104504691257876980003');
              this.Global.pressStatus = "profile";
            }}
          >
            <Icon name="google" color='#ffffff' size={height < 667 ? 30 : 40} style={{ marginLeft: 7, backgroundColor: 'transparent' }} />
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
    backgroundColor: '#F15F66',
    justifyContent: 'flex-start'
  },
  avatar: {
    width: width - 100,
    height: width - 140,
    resizeMode: "cover",
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginTop: height< 812 ? 40: 70,
  },
  textName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  textConnect: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'transparent',
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 20 : 35 ) : 50 ) : 70,
  },
  waperConnect: {
    marginTop: 10,
    flexDirection: 'row',
  },
  textHeader1: {
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 15 : 25 ) : 35 ) : 60,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  titleText: { 
    fontSize: 16, 
    color: 'white', 
    fontWeight: 'bold', 
    backgroundColor: 'transparent', 
    width: 90,
    textAlign: 'left' 
  },
  text: { 
    fontSize: 16, 
    color: 'white', 
    backgroundColor: 'transparent',
    width: width - 130,
    textAlign: 'left'
  },
  objectText: { 
    flexDirection: 'row', 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5
  }
})
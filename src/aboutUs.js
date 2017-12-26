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
        <View style={styles.container}>
          <View style={styles.containerInfo}>
            <Image
              source={require("./img/HHKTeam.jpg")}
              style={styles.avatar}
            />
            <Text style={styles.textName}>{this.state.teamName}</Text>
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
          </View>
          <View style={styles.containerAboutUs}>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'space-around' }}>
<Text style={{flex: 1, marginTop: 20, fontSize: 24, color: 'white', fontWeight: 'bold', backgroundColor: 'transparent', marginTop: 20}}>
  ABOUT US
</Text>
<View style={{flex: 5, marginTop: 10}}>
<View style = {{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: 'white', fontWeight: 'bold', backgroundColor: 'transparent', width: 90}}>Subject:</Text>
<Text style={{fontSize: 16, color: 'white', backgroundColor: 'transparent'}}>Human Computer Interaction</Text>
</View>
<View style = {{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: 'white', fontWeight: 'bold', backgroundColor: 'transparent', width: 90}}>Instructor:</Text>
<Text style={{fontSize: 16, color: 'white', backgroundColor: 'transparent'}}>Nguyễn Công Hoan</Text>
</View>
<View>
  <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold', backgroundColor: 'transparent', width: 90}}>Students: </Text>
  <Text style={{fontSize: 16, color: 'white', backgroundColor: 'transparent'}}>* Nguyễn Thị Hiền - 14520272</Text>
  <Text style={{fontSize: 16, color: 'white', backgroundColor: 'transparent'}}>* Phan Minh Hoàng - 14520317</Text>
  <Text style={{fontSize: 16, color: 'white', backgroundColor: 'transparent'}}>* Nguyễn Văn Khoa - 14520429</Text>
</View>
</View>
            </View>
            <View style={styles.containerConnect}>
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
                <Icon name="facebook-square" color='#ffffff' size={height / 20} style={{ marginRight: 7, backgroundColor: 'transparent' }} />
                </TouchableOpacity>
                <TouchableOpacity 
                              onPress={() => {
                                this.Global.isFooter = true;
                                Linking.openURL('https://plus.google.com/u/0/104504691257876980003');
                                this.Global.pressStatus = "profile";
                              }}
                >
                <Icon name="google" color='#ffffff' size={height / 20} style={{ marginLeft: 7, backgroundColor: 'transparent' }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </View>
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
    width: width
  },
  containerInfo: {
    flex: 5,
    alignItems: 'center',

  },
  avatar: {
    width: width - 100,
    height: width - 140,
    resizeMode: "cover",
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginTop: 40,
  },
  textName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  containerAboutUs: {
    flex: 6

  },
  containerConnect: {
    flex: 1,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textConnect: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  waperConnect: {
    marginTop: 10,
    flexDirection: 'row',
    // height: height / 20,
  }
})
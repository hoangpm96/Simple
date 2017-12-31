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
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");
@autobind
@observer
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      userName: "Hoang Phan",
      Name: "Minh Hoang",
      Age: "21",
      Height: "180",
      Weight: "65",
      Address: "Quang Ngai",
      Email: "hoangpm.qn96@gmail.com",
      isPush: false
    };
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


        <View style={[styles.containerForm, {
          marginTop: height < 812 ? (height < 736 ? (height < 667 ? 35 : 40) : 55) : 75,
        }]}>
          <Icon name="envelope" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
          <TextInput placeholder={'Your email'} style={styles.styleUserName}
            onChangeText={Email => {
              this.setState({ Email: Email });
            }}
            placeholderTextColor={'#DDDDDD'}
            value={this.state.Email}
          />
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
            this.Global.isFooter = true;
            Actions.pop()
            this.Global.pressStatus = "profile";
          }}
        >
          <Text style={styles.textLogin}>CHANGE PASSWORD</Text>
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
    left: 10
},
})
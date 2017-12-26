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
      <ImageBackground
      source={require("./img/background01.png")}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerInfo}>
              <Image
                source={require("./img/hoangphan.jpg")}
                style={styles.avatar}
              />
              <Text style={styles.textName}>{this.state.userName}</Text>
              <View style={styles.containerlover}>
                <View style={styles.lover}>
                  <Text style={{fontSize:14, fontWeight: 'bold', color: '#ffffff'}}>13 lover</Text>
                  </View>
                <Text style={{fontSize:18, fontWeight: 'bold', color: '#ffffff'}}>|</Text>
                <View style={styles.loved}>
                <Text style={{fontSize:14, fontWeight: 'bold', color: '#ffffff'}}>13 loved</Text>
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

        <View style={{flex: 6, width: width, justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={{marginTop: 30}}>
        <View style={styles.containerUserName}>
                        <Icon name="envelope" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <TextInput placeholder={'Your email'} style={styles.styleUserName}
                            onChangeText={Email => {
                                this.setState({ Email: Email});
                            }}
                            placeholderTextColor={'#DDDDDD'}
                            value={this.state.Email}
                        />
                    </View>
                    <View style={styles.containerPassword}>
                        <Icon name="unlock-alt" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
                        <TextInput style={[styles.stylePassword, {marginLeft: 18}]}
                            placeholder={'Old Password'}
                            placeholderTextColor={'#DDDDDD'}
                            secureTextEntry={true}
                            onChangeText={oldPass => {
                                this.setState({ oldPass: oldPass});
                            }}
                            value={this.state.oldPass}
                        />
                    </View>
                    <View style={[styles.containerPassword, {marginTop: 5}]}>
                        <Icon name="key" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
                        <TextInput style={styles.stylePassword}
                            placeholder={'Password'}
                            placeholderTextColor={'#DDDDDD'}
                            secureTextEntry={true}
                            onChangeText={pass => {
                                this.setState({ pass: pass});
                            }}
                            value={this.state.pass}
                        />
                    </View>
                    <View style={[styles.containerPassword, {marginTop: 5}]}>
                        <Icon name="key" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
                        <TextInput style={styles.stylePassword}
                            placeholder={'Confirm Password'}
                            placeholderTextColor={'#DDDDDD'}
                            secureTextEntry={true}
                            onChangeText={confirmPass => {
                                this.setState({ confirmPass: confirmPass});
                            }}
                            value={this.state.confirmPass}
                        />
                    </View>
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

        </View>

      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'rgba(226,39,44,0.7)'
  },
  container: {
    flex: 1,
    // backgroundColor: 'red',
    width: width
  },
  containerInfo:{
    flex: 4,
    backgroundColor: '#F15F66',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center'
    
  },
  containerDelete:{
    flex: 6,
    width: width,
    alignItems: 'center',
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
  waperLogin: {
    width: width - (width / 8.40), //330
    height: (height/10-(height-370)/12.78), //48,
    backgroundColor: '#F15F66',
    shadowColor: '#ED969B',
    shadowOffset: { width: 1, height: 1.3, },
    shadowOpacity: 84,
    shadowRadius: 1,
    borderRadius: 25,
    marginBottom: 25,
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
containerUserName: {
  width: width - (width / 8.33), //330
  height: (height/10-(height-370)/12.78),//48, //48
  borderRadius: height / 28,
  backgroundColor: 'rgba(202,148,157,1)',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 5,
  flexDirection: 'row'
},
styleUserName: {
  marginLeft: 10,
  borderColor: 'transparent',
  fontSize: 14,
  color: '#ffffff',
  width: width - (width / 8.33) - 70,
},
containerPassword: {
  width: width - (width / 8.40), //330
  height: (height/10-(height-370)/12.78), //48
  borderRadius: height / 28,
  backgroundColor: 'rgba(202,148,157,1)',
  justifyContent: 'flex-start',
  alignItems: 'center',
  // marginBottom: 3,
  flexDirection: 'row',
},
stylePassword: {
  marginLeft: 10,
  marginRight: 20,
  borderColor: 'transparent',
  fontSize: 14,
  color: '#ffffff',
  width: width - (width / 8.33) - 70,
},
})
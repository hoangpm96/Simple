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



export default class DeleteAccount extends Component {
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
      Email: "",
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

        <View style={styles.containerDelete}>
                    <View style={{ flex: 1, width: width }}>
                        <View style={{ flex: 1.5, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}>
                                When you delete account
        </Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'space-around', marginBottom: 5, marginLeft: 20 }}>
                            <Text style={{ fontSize: 16, color: '#ffffff' }}>
                                * Delete all account information, name, avatar.
        </Text>
                            <Text style={{ fontSize: 16, color: '#ffffff' }}>
                                * Delete all messeage, wish list.
        </Text>
                            <Text style={{ fontSize: 16, color: '#ffffff' }}>
                                * Can’t restore database after delete account.
        </Text>
                        </View>
                    </View>
        <View style={{flex: 2, width: width, justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={{marginTop: 10}}>
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
                        <Icon name="key" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
                        <TextInput style={styles.stylePassword}
                            placeholder={'Confirm Password'}
                            placeholderTextColor={'#DDDDDD'}
                            secureTextEntry={true}
                            onChangeText={pass => {
                                this.setState({ pass: pass});
                            }}
                            value={this.state.pass}
                        />
                    </View>
        </View>

                    <TouchableOpacity
        style={styles.waperLogin}  
        onPress={() => {
                this.Global.isFooter = false;
                Alert.alert(
                  'Question',
                  'Do you want to delete this Account?',
                  [,
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: () => Actions.login() },
                  ],
                  { cancelable: false }
                )
                this.Global.pressStatus = "love";
              }}
            >
                <Text style={styles.textLogin}>DELETE ACCOUNT</Text>
            </TouchableOpacity>
        </View>

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
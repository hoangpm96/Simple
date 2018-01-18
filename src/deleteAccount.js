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
const { width, height } = Dimensions.get("window");



export default class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      Name: "Minh Hoàng",
      lover: 6,
      loved: 12,
      Avatar: "https://firebasestorage.googleapis.com/v0/b/simple-6e793.appspot.com/o/default-avatar%2Fhoangphan.jpg?alt=media&token=b8c0dca2-3521-4188-8820-6c472fa18b73",
      Email: "",
      pass: "",
      EmailConfirm: "hoangpm.qn96@gmail.com",
      PasswordConfirm: "minhhoang"
    };
  }
  verrifyEmailPasswordCorrect = (email, password) => {
    if (email === this.state.EmailConfirm && password === this.state.PasswordConfirm){
      this.Global.isFooter = false;
      Actions.login();
      this.Global.pressStatus = "love";
      Alert.alert(this.Global.APP_NAME, "Delete Account success!")
    }
    else
    {
      Alert.alert(this.Global.APP_NAME, "Email, Password is incorrect")
    }
  }
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

        <Text style={styles.titleText}>
          When you delete account
        </Text>
        <Text style={styles.textDelete}>
          * Delete all account information, name, avatar.
        </Text>
        <Text style={styles.textDelete}>
          * Delete all messeage, wish list.
        </Text>
        <Text style={styles.textDelete}>
          * Can’t restore database after delete account.
        </Text>
        <View style={[styles.containerForm, {
          marginTop: height < 812 ? (height < 736 ? (height < 667 ? 10 : 25) : 35) : 50,
        }]}>
          <Icon name="envelope" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
          <TextInput placeholder={'Your email'} 
          autoCapitalize = "none"
          style={styles.styleUserName}
            onChangeText={Email => {
              this.setState({ Email: Email });
            }}
            placeholderTextColor={'#DDDDDD'}
            value={this.state.Email}
          />
        </View>
        <View style={styles.containerForm}>
          <Icon name="key" color='#DDDDDD' size={24} style={{ marginLeft: 19 }} />
          <TextInput style={styles.stylePassword}
            placeholder={'Confirm Password'}
            placeholderTextColor={'#DDDDDD'}
            secureTextEntry={true}
            onChangeText={pass => {
              this.setState({ pass: pass });
            }}
            value={this.state.pass}
          />
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
                { text: 'OK', onPress: () => {
                  this.verrifyEmailPasswordCorrect(this.state.Email, this.state.pass);
                } },
              ],
              { cancelable: false }
            )
            this.Global.pressStatus = "love";
          }}
        >
          <Text style={styles.textLogin}>DELETE ACCOUNT</Text>
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
    marginTop: height < 812 ? (height < 736 ? (height < 667 ? 15 : 28) : 40) : 50,
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
    marginBottom: height < 667 ? 5 : 10,
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
  textDelete: {
    fontSize: 16, 
    color: '#ffffff', 
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5
  },
  titleText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginTop: height < 667 ? 12 : 25,
    marginBottom: height < 667 ? 10 : 20,
  },
})
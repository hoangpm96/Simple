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
import firebase from "firebase";
import { async } from "@firebase/util";
import Modal from "react-native-modalbox";
const { width, height } = Dimensions.get("window");



export default class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      Name: "Minh Hoang",
      lover: 0,
      loved: 0,
      Avatar: "",
      Email: "",
      pass: "",
      EmailData: "",
      tags: [],
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
        .once("value", snapshot => {
          if (snapshot.val()) {
            let value = Object.values(snapshot.val());
            this.setState({
                Name: value[0].name,
                Avatar: value[0].avatarUrl,
                lover: value[0].lover,
                loved: value[0].loved,
                EmailData: value[0].email
            })
            let array = []
            for (var tag in value[0].tags) {
                    array.push(tag),
                this.setState({tags:  array});
            }
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
verrifyEmailPasswordCorrect = async (email, password) => {
  try {
    //verify correct email
    if (email === this.state.EmailData )
    {
      this.setState({
        animating: true
    })
    //verify correct password
    await firebase.auth().currentUser
    .reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(this.state.Email, password))
    .then( () => {
      //deleteAccount
      this.deleteAccount(this.state.Email,this.state.pass);

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
    else {
      Alert.alert(this.Global.APP_NAME, "Email is incorrect");
    }

  }
  catch(error) {
    Alert.alert(this.Global.APP_NAME, error);
}
}
  deleteAccount = async (email, password) => {
    try {
      this.setState({
          animating: true
      })
      
      console.log(firebase.auth().currentUser)
      await 
        // User deleted.
        firebase
          .database()
          .ref("users")
          .child(this.Global.currentUserId)
          .remove()
      //end delete from ref User
      debugger
      for (let tag of this.state.tags) {
        //remove tags from firebase ref tags
        firebase
          .database()
          .ref("tags")
          .child(tag)
          .child(this.Global.currentUserId)
          .remove()
          .catch((error) =>{
            const { code, message } = error;
            Alert.alert(this.Global.APP_NAME, message);
            debugger
            
          });
      }
                // end delete from ref tags
                firebase
                .database()
                .ref("wishlist")
                .child(this.Global.currentUserId)
                .remove() 
                .catch((error) => {
            const { code, message } = error;
            Alert.alert(this.Global.APP_NAME, message);
            debugger
            
          });      
                //end xóa wishlist với user hiện tại 
                debugger
                firebase
                .database()
                .ref("wishlist")
                .once("value", function(snapshots) {
                  snapshots.forEach(function(data) {
                    let tempArr = [];
                    debugger
                    tempArr.push(data.val());
                    console.log(data.val())
                    debugger
                  });
                })
                .catch((error) => {
                const { code, message } = error;
                Alert.alert(this.Global.APP_NAME, message);
                debugger
                
              });   
                debugger
                //end lấy tất cả danh sách các user có trong wish list 
                //xóa id user hiện tại từ wishlist của các user đã có 
                // delete from wishlist
                //
      //delete user from authentication -> done
                await 
                firebase.auth().currentUser.delete().then(() => {
        Actions.login();
      }).catch((error) =>
      {
        this.setState({
          animating: false
      })
        const { code, message } = error;
        Alert.alert(this.Global.APP_NAME, message);
        
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
          <TextInput placeholder={'Your email'} style={styles.styleUserName}
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
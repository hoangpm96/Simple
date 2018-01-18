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
  TextInput,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Slider,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ViewPager from 'react-native-viewpager';
import TagInput from 'react-native-tag-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");
const PAGES = ['Page 1','Page 2', 'Page 3'];
const inputProps = {
  keyboardType: 'default',
  placeholder: 'hobby',
  placeholderTextColor: 'white',
  color: 'white',
  autoFocus: true,
  style: {
      fontSize: 14,
      marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};
// import firebase from "firebase";
// import { forEach } from "@firebase/util";
@autobind
@observer


export default class RegisterStep extends Component {
  constructor(props) {
    super(props);
    background = require("./img/background.png");
    logo = require("./img/logo.png");
    this.Global = this.props.Global;
    // this.state = {
    //   name: "",
    //   email: "",
    //   pass: "",
    //   age: 18,
    //   tags: [],
    //   text: "",
    //   isMale: true,
    // };
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state = {
      dataSource: dataSource.cloneWithPages(PAGES),
      currentPage:0,
      name: "",
      email: "",
      pass: "",
      age: 18,
      tags: [],
      text: "",
      isMale: true,
    }
  }
  check_email = (email) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
    if (email.match(mailformat)) {
      return true;
    }
    else {
      return false;
    } 
  }
  onChangeTags = tags => {
    this.setState({ tags });
  };

   onNextPress(){
  }

  onChangeText = text => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [",", " ", ";", "\n"];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: ""
      });
    }
  };

  labelExtractor = tag => tag;
  render() {
    return (
      <ImageBackground source={background} style={styles.waperContainer}>
              <Image source={logo} style={styles.logoStyle} />
        <Text style={styles.textName}>REGISTER</Text>
              <ViewPager
          dataSource={this.state.dataSource}
          renderPage={this.renderViewPagerPage}
          onChangePage={(page) => {this.setState({currentPage:page})}}
          />

        </ImageBackground>
    );
  }
  renderViewPagerPage = (data) => {
    return(<View style={styles.page}>
      {
        data === 'Page 1' ? 
        <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
      <View style={styles.containerInfo}>
        {/* You are? */}
        <View style={styles.containerYouAre}>
          <Text style={styles.textQA}>You are?</Text>
          <View style={styles.containerButton01}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isMale: true });
              }}
            >
              <View
                style={[
                  styles.waperLogin01,
                  this.state.isMale
                    ? { backgroundColor: "#F15F66" }
                    : { backgroundColor: "#FFA8AC" },
                  { marginRight: 5 }
                ]}
              >
                <Text style={styles.textButton}>MALE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isMale: false });
              }}
            >
              <View
                style={[
                  styles.waperRegister,
                  ,
                  !this.state.isMale
                    ? { backgroundColor: "#F15F66" }
                    : { backgroundColor: "#FFA8AC" },
                  { marginLeft: 5 }
                ]}
              >
                <Text style={styles.textButton}>FEMALE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* How old are you? */}
        <View style={styles.containerAge}>
          <View style={styles.containerTextAge}>
            <Text style={styles.textQA}>How old are you?</Text>
            <Text style={styles.textQA}>I'm {this.state.age} years old</Text>
          </View>
          <Slider
            style={{ width: width < 414 ? width - 40 : width - 50,}}
            step={1}
            minimumTrackTintColor="#F15F66"
            maximumTrackTintColor="#FFA8AC"
            minimumValue={16}
            maximumValue={40}
            value={this.state.age}
            onValueChange={val => this.setState({ age: val })}
          />
        </View>
      </View>
      {/* Button */}
      <View style={styles.containerButton02}>
        <TouchableOpacity
          onPress={() => {
            this.Global.isFooter = false;
            Actions.login();
          }}
        >
          <View style={[styles.waperRegister, { marginRight: 5 }]}>
            <Text style={styles.textButton}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onNextPress}
        >
          <View style={[styles.waperLogin01, { marginLeft: 5 }]}>
            <Text style={styles.textButton}>NEXT</Text>
          </View>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
        :
        (
        data === 'Page 2' ?
        <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
      <View style={styles.containerInfo}>
        {/* What are your hobbies? */}
        <View style={styles.containerHobby}>
          <Text style={[styles.textQA, { flex: 1 }]}>
            What are your hobbies?
          </Text>
          <View
            style={{
              marginTop: 6,
              alignItems: "flex-start",
              backgroundColor: "rgba(202,148,157,1)",
              borderRadius: 15,
              flex: 6
            }}
          >
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                flexDirection: "row",
                alignItems: "flex-start",
                backgroundColor: "transparent"
              }}
            >
              <TagInput
                value={this.state.tags}
                onChange={this.onChangeTags}
                labelExtractor={this.labelExtractor}
                text={this.state.text}
                onChangeText={this.onChangeText}
                tagColor="#FFA8AC"
                tagTextColor="#ffffff"
                inputProps={inputProps}
                // maxHeight = {20}
                maxHeight={height<812 ? (height < 736 ? (height < 667 ? 98 : 115):127 ): 140} // height /5.8
              />
            </View>
          </View>
        </View>
      </View>
      {/* Button */}
      <View style={styles.containerButton02}>
        <TouchableOpacity
          onPress={() => {
            // this.Global.isFooter = false;
            // Actions.login();
          }}
        >
          <View style={[styles.waperRegister, { marginRight: 5 }]}>
            <Text style={styles.textButton}>BACK</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
              if(this.state.tags.length <=0){
                Alert.alert(
                  this.Global.APP_NAME,
                  "Please enter a hobby!",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: false }
                );
              }
              else 
              {
              
              }
            }}
        >
          <View style={[styles.waperLogin01, { marginLeft: 5 }]}>
            <Text style={styles.textButton}>NEXT</Text>
          </View>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
      :
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
      

        <View style={{ flex: 1 }}>
          <View style={[styles.containerForm, { flex: 5 }]}>
            <View style={styles.containerUserName}>
              <Icon
                name="envelope"
                color="#DDDDDD"
                size={24}
                style={{ marginLeft: 20 }}
              />
              <TextInput
                placeholder={"Mail"}
                style={styles.styleUserName}
                onChangeText={email => {
                  this.setState({ email: email });
                }}
                placeholderTextColor={"#DDDDDD"}
                value={this.state.email}
                autoFocus={true}
              />
            </View>
            <View style={styles.containerUserName}>
              <Icon
                name="user-o"
                color="#DDDDDD"
                size={24}
                style={{ marginLeft: 20 }}
              />
              <TextInput
                placeholder={"Name"}
                style={styles.styleUserName}
                onChangeText={uname => {
                  this.setState({ name: uname });
                }}
                placeholderTextColor={"#DDDDDD"}
                value={this.state.name}
              />
            </View>
            <View style={styles.containerPassword}>
              <Icon
                name="key"
                color="#DDDDDD"
                size={24}
                style={{ marginLeft: 19 }}
              />
              <TextInput
                style={styles.stylePassword}
                placeholder={"Password"}
                placeholderTextColor={"#DDDDDD"}
                secureTextEntry={true}
                onChangeText={pass => {
                  this.setState({ pass: pass });
                }}
                value={this.state.pass}
              />
            </View>
            <View style={styles.containerLink}>
              <TouchableOpacity
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.login();
                }}
              >
                <Text style={styles.textForgot}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.Global.isFooter = false;
                  Actions.forgot();
                }}
              >
                <Text style={styles.textForgot}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.containerButton, { flex: 4 }]}>
            {/* Button Login */}
            <TouchableOpacity
            // onPress={() => {
            //   debugger
            //   if (this.state.email === "" || this.state.pass === "" || this.state.name === "") {
            //       Alert.alert(
            //         this.Global.APP_NAME,
            //         "Email, Name, Password blank",
            //         [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            //         { cancelable: false }
            //       );
            //     }
            //     else {
            //       debugger
            //           this.Global.isFooter = true;
            //           this.Global.firstLogin = false;
            //           Actions.search();
            // }
            // }}
              onPress={() => {
                if (this.state.email === "" || this.state.pass === "" || this.state.name === "") {
                  Alert.alert(
                    this.Global.APP_NAME,
                    "Email, Name, Password blank",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                  );
                }
                else {
                  if(this.check_email(this.state.email)) {
                    if(this.state.pass.length < 6) {
                      Alert.alert(
                        this.Global.APP_NAME,
                        "The password must be 6 characters in length!",
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                        { cancelable: false }
                      );
                    }
                    else {
                      this.Global.isFooter = true;
                      this.Global.firstLogin = false;
                      Actions.search();
                    }
                  }
                  else
                  {
                    Alert.alert(
                      this.Global.APP_NAME,
                      "You have entered an invalid email address!",
                      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                      { cancelable: false }
                    );
                  }
                }
              }}
            >
              <View style={styles.waperLogin}>
                <Text style={styles.textLogin}>REGISTER</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAwareScrollView>)
      }
    </View>)
  }
}
const styles = StyleSheet.create({
  stepIndicator: {
    marginVertical: 5,
  },
    page: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: width,
    // backgroundColor: '#ffffff',
  },
  waperContainer: {
    flexDirection: 'column',
    alignContent: 'space-around',
    flex: 1,
  },

  logoStyle: {
    marginTop: height < 812 ? (height < 667 ? 45 : 55) : 60,
    width: height < 812 ? (height < 736 ? (height < 667 ? 180 : 205) : 230) : 250,
    height: height < 812 ? (height < 736 ? (height < 667 ? 180 : 205) : 230) : 250,
    alignSelf: 'center',
  },
  textName: {
    fontSize: 28,  //42
    fontWeight: 'bold',
    fontFamily: 'System',
    color: '#ffff',
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  containerForm: {
    marginTop: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerUserName: {
    width: width < 414 ? width - 40 : width - 50,
    height: height < 667 ? 40 : 45,
    borderRadius: height < 667 ? 20 : 22.5,
    backgroundColor: 'rgba(202,148,157,1)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 4,
    flexDirection: 'row'
  },
  styleUserName: {
    marginLeft: 10,
    borderColor: 'transparent',
    fontSize: 14,
    color: '#ffffff',
    width: width < 414 ? width - 110 : width - 120,
  },
  containerPassword: {
    width: width < 414 ? width - 40 : width - 50,
    height: height < 667 ? 40 : 45,
    borderRadius: height < 667 ? 20 : 22.5,
    backgroundColor: 'rgba(202,148,157,1)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  stylePassword: {
    marginLeft: 10,
    marginRight: 20,
    borderColor: 'transparent',
    fontSize: 14,
    color: '#ffffff',
    width: width < 414 ? width - 110 : width - 120,
  },
  containerLink: {
    width: width < 414 ? width - 40 : width - 50,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textForgot: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#ffffff',
    fontStyle: 'italic'
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 50
  },
  waperLogin: {
    width: width < 414 ? width - 40 : width - 50,
    height: height < 667 ? 40 : 45,
    backgroundColor: '#F15F66',
    shadowColor: '#ED969B',
    shadowOffset: { width: 1, height: 1.3, },
    shadowOpacity: 84,
    shadowRadius: 1,
    borderRadius: height < 667 ? 20 : 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#ffff',
    backgroundColor: 'transparent'
  },
  waperConnect: {
    flexDirection: 'row',
    height: 40
  },
  waperRegister: {
    width: width < 414 ? width / 2 - 25 : width / 2 - 30,
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
containerInfo: {
  flex: 6,
  marginTop: height < 667 ? 5 : 10,
},
containerYouAre: {
  flex: 1,
  alignSelf: 'center',
  marginTop: 20
},
textQA: {
  fontSize: 16,
  color: '#ffffff',
  backgroundColor: 'transparent',
  marginBottom: height < 736 ? 5 : 12,
},
containerButton01: {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row'
},
waperLogin01: {
  width: width < 414 ? width / 2 - 25 : width / 2 - 30,
  height: height < 667 ? 40 : 45,
  backgroundColor: '#F15F66',
  shadowColor: '#ED969B',
  shadowOffset: { width: 1, height: 1.3, },
  shadowOpacity: 84,
  shadowRadius: 1,
  borderRadius: height < 667 ? 20 : 22.5,
  alignItems: 'center',
  justifyContent: 'center',

},
textButton: {
  fontSize: 18,
  fontFamily: 'System',
  fontWeight: 'bold',
  color: '#ffff',
  backgroundColor: 'transparent'
},
containerButton02: {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  height: height < 812 ? (height < 736 ? (height < 667 ? 60 : 70) : 80) : 90,
  marginBottom: 60,
  marginTop: 30
},
containerTextAge: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: width < 414 ? width - 40 : width - 50,
  // marginLeft: width < 414 ? 20 : 25,
},
containerAge: {
  flex: 1,
  marginTop: height < 667 ? 20 : 0,
  alignItems: 'center',
  justifyContent: 'space-around',

},
containerHobby: {
  flex: 2,
  width: width < 414 ? width - 40 : width - 50,
  alignSelf: 'center',
  marginTop: height < 667 ? 20 : 0,
},
})
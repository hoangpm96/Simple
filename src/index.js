import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native";
import { Actions, Router, Scene } from "react-native-mobx";
import Love from "./love";
import Login from "./login";
import Forgot from "./forgotpw";
import RegisterInfo from "./registerInfo";
import Footer from "./components/footer";
import Example from "./message/App"
import Chat from "./chat";
import AddChat from "./addChat";
import Messager from "./messager";
import Register from "./register"
import Main from "./main";
import SearchFriend from "./search";
import SearchResult from "./searchResult"
import Profile from "./profile";
import DeleteAccount from "./deleteAccount";
import ChangePassword from "./changePassword";
import ChangeLanguage from "./changeLanguage";
import AboutUs from "./aboutUs";
import EditProfile from "./editProfile";
// import App00 from "./example";
import Icon from "react-native-vector-icons/FontAwesome";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
import Global from "./models/global";

@autobind
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.Global = Global;
  }
  componentDidMount() {}
  componentWillMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router
          sceneStyle={{
            paddingTop: 64
          }}
          backButtonIcon="angle-left"
          leftIconStyle={{
            fontSize: 32,
            color: "#fff",
            width: 53.33,
            height: 53.33,
            lineHeight: 53.33,
            paddingLeft: 15
          }}
          Global={this.Global}
        >
          <Scene
            // initial
            key="example"
            title=""
            component={Example}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="register"
            title=""
            component={Register}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
             initial
            key="main"
            title=""
            component={Main}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="registerInfo"
            title=""
            component={RegisterInfo}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="login"
            title=""
            component={Login}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="forgot"
            title=""
            component={Forgot}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="love"
            title=""
            component={Love}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0,
            }}
          />
          <Scene
            // initial
            key="chat"
            title=""
            component={Chat}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0,
            }}
          />
          <Scene
            // initial
            key="messager"
            title=""
            component={Messager}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0,
            }}
          />
          <Scene
            // initial
            key="addchat"
            title=""
            component={AddChat}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0,
            }}
          />
          <Scene
            // initial
            key="search"
            title={""}
            component={SearchFriend}
            hideNavBar={true}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            sceneStyle={{
              paddingTop: 0
            }}
          />
                    <Scene
            // initial
            key="searchResult"
            title={""}
            component={SearchResult}
            hideNavBar={true}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="profile"
            title={""}
            component={Profile}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="deleteAccount"
            title={""}
            component={DeleteAccount}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="changePassword"
            title={""}
            component={ChangePassword}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="changeLanguage"
            title={""}
            component={ChangeLanguage}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="aboutUs"
            title={""}
            component={AboutUs}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="editProfile"
            title={""}
            component={EditProfile}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          {/* <Scene
            // initial
            key="example"
            title={""}
            component={App00}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          /> */}
        </Router>
        <Footer Global={this.Global} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
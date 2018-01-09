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
import ListLoved from "./listLoved";
import Register from "./register"
import Main from "./main";
import SearchFriend from "./search";
import Profile from "./profile";
import DeleteAccount from "./deleteAccount";
import ChangePassword from "./changePassword";
import ChangeLanguage from "./changeLanguage";
import AboutUs from "./aboutUs";
import EditProfile from "./editProfile";
import LoverProfile from "./loverProfile";
import Icon from "react-native-vector-icons/FontAwesome";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
import Global from "./models/global";
import firebase from "firebase";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";
// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
      //this is a local notification
    }
    if(notif.opened_from_tray){
      //iOS: app is open/resumed because user clicked banner
      //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();

    if(Platform.OS ==='ios'){
      //optional
      //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
      //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //notif._notificationType is available for iOS platfrom
      switch(notif._notificationType){
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          break;
      }
    }
});
FCM.on(FCMEvent.RefreshToken, (token) => {
    console.log(token)
    // fcm token may not be available on first load, catch it here
});
FCM.subscribeToTopic("/topics/test");
@autobind
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.Global = Global;
  }
  componentDidMount() {
    // config firebase
    var config = {
      apiKey: "AIzaSyAE-sTE-LGom4QiX-XAzMpGmhOL2kO0DnI",
      authDomain: "simple-6e793.firebaseapp.com",
      databaseURL: "https://simple-6e793.firebaseio.com",
      projectId: "simple-6e793",
      storageBucket: "simple-6e793.appspot.com",
      messagingSenderId: "445665131019"
    };
    firebase.initializeApp(config);
    FCM.requestPermissions()
      .then(() => console.log("granted"))
      .catch(() => console.log("notification permission rejected"));

    FCM.getFCMToken().then(token => {
      console.log(token);
      // debugger;
      // store fcm token in your server
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
      // optional, do some component related stuff
    });

    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
    FCM.getInitialNotification().then(notif => {
      console.log(notif);
    });
  }
  componentWillMount() {}
  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
  }
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
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="listLoved"
            title=""
            component={ListLoved}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="chat"
            title=""
            component={Chat}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="messager"
            title=""
            component={Messager}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            // initial
            key="addchat"
            title=""
            component={AddChat}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
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
          <Scene
            // initial
            key="loverProfile"
            title={""}
            component={LoverProfile}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
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
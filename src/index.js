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
import HomePage from "./homepage";
import Menu from "./menu";
import InfoMenu from "./infoMenu";
import DetailInfo from "./detail-info";
import Order from "./orders";
import AboutUs from "./about-us";
import Event from "./events";
import InfoEvent from "./info-event";
import Contacts from "./contacts";
import Login from "./login";
import Register from "./register";
import Main from "./main";
import Footer from "./components/footer";
import Cart from "./cart";
import PlaceOrder from "./place-order";
import Search from "./search";
import Account from "./account";
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
              key="main"
            title=""
            component={Main}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
              key="login"
            title=""
            component={Login}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
              initial
              key="homePage"
            title=""
            component={HomePage}
            hideNavBar={true}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            key="menu"
            title="Menu"
            component={Menu}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="infoMenu"
            title={""}
            component={InfoMenu}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="detailInfo"
            title={""}
            component={DetailInfo}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="order"
            title={"Order"}
            component={Order}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="aboutUs"
            title={"About Us"}
            component={AboutUs}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="event"
            title={"Events"}
            component={Event}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="infoEvent"
            title={"Events"}
            component={InfoEvent}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="cart"
            title={"Cart"}
            component={Cart}
            hideNavBar={true}
            schema="modal"
            direction="vertical"
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
            sceneStyle={{
              paddingTop: 0
            }}
          />
          <Scene
            key="contacts"
            title={"Contacts"}
            component={Contacts}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="register"
            title={"Register"}
            component={Register}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="placeOrder"
            title={"Place Order"}
            component={PlaceOrder}
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 20
            }}
          />
          <Scene
            key="search"
            title={""}
            component={Search}
            hideNavBar={true}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
            sceneStyle={{
                paddingTop: 0
            }}
          />
          <Scene
            key="account"
            title={""}
            component={Account}
            hideNavBar={true}
            navigationBarStyle={{
              backgroundColor: "#000"
            }}
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

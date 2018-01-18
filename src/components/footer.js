import React, { Component } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  PickerIOS,
  TouchableOpacity,
  Text
} from "react-native";
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
import { Actions } from "react-native-mobx";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/FontAwesome";

@autobind
@observer
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.pressStatus = this.props.pressStatus;
    //add footer for coding.
  }
  render() {
    return (
      <View>
        {this.Global.isFooter
          ? <View
            style={{
              width: width,
              height: height < 812 ? (height < 736 ? (height < 667 ? 40 : 45) : 48) : 52,
              backgroundColor: "#F15F66",
              flexDirection: "row",
              borderTopWidth: 0.5,
              justifyContent: "space-around",
              bottom: 0,
              borderTopColor: "#fff"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Actions.search();

                this.Global.pressStatus = "search"
              }}
              style={this.Global.pressStatus === "search" ? styles.disableBackground : styles.background}
            >
              <Icon name="search" color='#ffffff' size={height < 812 ? (height < 736 ? (height < 667 ? 33 : 36) : 38) : 40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Actions.love();
                this.Global.pressStatus = "love"
              }}
              style={this.Global.pressStatus === "love" ? styles.disableBackground : styles.background}
            >
              <Icon name="heartbeat" color='#ffffff' size={height < 812 ? (height < 736 ? (height < 667 ? 33 : 36) : 38) : 40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Actions.chat();
                this.Global.pressStatus = "chat"
              }}
              style={this.Global.pressStatus === "chat" ? styles.disableBackground : styles.background}
            >
              <Icon name="wechat" color='#ffffff' size={height < 812 ? (height < 736 ? (height < 667 ? 33 : 36) : 38) : 40} />
              {/* {this.Global.pressStatus !== "chat" ?
                <View style={styles.notifyContain}>
                  <Text style={styles.notifyText}>5</Text>
                </View>
                : null} */}

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //this.Global.isFooter = false;
                Actions.profile();
                this.Global.pressStatus = "profile"
              }}
              style={this.Global.pressStatus === "profile" ? styles.disableBackground : styles.background}
            >
              <Icon name="navicon" color='#ffffff' size={height < 812 ? (height < 736 ? (height < 667 ? 33 : 36) : 38) : 40} />
            </TouchableOpacity>
          </View>
          : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: height < 812 ? (height < 736 ? (height < 667 ? 40 : 45) : 48) : 52,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F15F66',
  },
  disableBackground: {
    flex: 1,
    height: height < 812 ? (height < 736 ? (height < 667 ? 40 : 45) : 48) : 52,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFA8AC',
  },
  notifyContain: {
    backgroundColor: 'rgba(226,39,44,0.9)',
    borderRadius: 20,
    position: 'absolute',
    left: width / 8,
    bottom: 35
  },
  notifyText: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  }
})
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
    // this.Global.isFooter = true
  }
  render() {
    return (
      <View>
        {this.Global.isFooter
          ? <View
            style={{
              width: width,
              height: (height + 323) / 19.8,
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
                
                this.Global.pressStatus="search"
              }}
              style={this.Global.pressStatus==="search" ? styles.disableBackground : styles.background}
            >
              <Icon name="search" color='#ffffff' size={(height+719)/33-6} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Actions.love();
                this.Global.pressStatus="love"
              }}
              style={this.Global.pressStatus==="love" ? styles.disableBackground : styles.background}
            >
              <Icon name="heartbeat" color='#ffffff' size={(height+719)/33-6} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Actions.chat();
                this.Global.pressStatus="chat"
              }}
              style={this.Global.pressStatus==="chat" ? styles.disableBackground : styles.background}
            >
              <Icon name="wechat" color='#ffffff' size={(height+719)/33-6} />
              {this.Global.pressStatus!=="chat"  ?
                <View style={
                  {
                    backgroundColor: 'rgba(226,39,44,0.9)',
                    
                    // height: 25,
                    // width: 25,
                    borderRadius: 20,
                    position: 'absolute',
                    left: width/8,
                    bottom: 35
                  }
                }>
                <Text
                style={{
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontSize: 16,
                  marginLeft: 8,
                  marginRight: 8,
                  marginTop: 3,
                  marginBottom: 3,
                  fontWeight: 'bold',
                  backgroundColor: 'transparent'
                }}
                >5</Text>
                </View>
                : null}

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //this.Global.isFooter = false;
                Actions.profile();
                this.Global.pressStatus="profile"
              }}
              style={this.Global.pressStatus==="profile" ? styles.disableBackground : styles.background}
            >
              <Icon name="navicon" color='#ffffff' size={(height+719)/33-6} />
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
    height: (height + 323) / 19.8-1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F15F66',
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  disableBackground: {
    flex: 1,
    height: (height + 323) / 19.8-1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFA8AC',
    borderWidth: 1,
    borderColor: '#ffffff'
  }
})
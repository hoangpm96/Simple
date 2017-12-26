/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
    ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { observable, autorun } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");



@autobind
@observer
export default class InfoMenu extends Component {
  @observable data = [];
  constructor(props) {
    super(props);
    this.state = {

    };
    this.Global = this.props.Global;
  }
  componentWillMount() {

  }
  render() {
    let data = this.props.dataMenu;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ae522e"
        }}
      >
        <FlatList
          keyExtractor={(item, index) => index}
          data={data}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderItems(item, index)}
        />
      </View>
    );
  }

  renderItems(item, index) {
    return (
      <TouchableOpacity
        key={"index" + index}
        style={{
          height: 120,
          width: width,
          justifyContent: "center",
          flexDirection: "row",
          borderBottomColor: "rgba(0, 0, 0, 0.15)",
          borderBottomWidth: 1.5,
          borderStyle: "solid",
          padding: 10
        }}
        onPress={() => {
          Actions.detailInfo({ title: item.title, item: item });
        }}
      >
        <Image
          source={item.img}
          style={{
            width: 100,
            height: 100,
            resizeMode: "cover",
            borderWidth: 1,
            borderColor: "#fff"
          }}
        />
        <View
          style={{
            width: width - 100 - 30,
            paddingLeft: 10
          }}
        >
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold",
                flex: 1.4
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                textAlign: "right",
                color: "#ffdb95",
                fontWeight: "bold",
                flex: 1,
                fontSize: 16
              }}
            >
              {this.Global.formatThousand(item.price, ".")} VND
            </Text>
          </View>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={{
              paddingTop: 5,
              color: "#fff",
              fontSize: 15,
              width: width - 120 - 30
            }}
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: "center",
    resizeMode: "stretch"
    //backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

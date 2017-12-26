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
const { width, height } = Dimensions.get("window");

export default class DetailInfo extends Component {
  constructor(props) {
    super(props);
    this.Item = this.props.item;
    this.Global = this.props.Global;
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ae522e",
          alignItems: "center",
          padding: 15
        }}
      >
        <Image
          style={{
            width: width - 30,
            height: 250,
            resizeMode: "cover"
          }}
          source={this.Item.img}
        />
        <Text
          style={{
            fontSize: 20,
            color: "#ffdb95",
            paddingTop: 20,
            fontWeight: "bold"
          }}
        >
          {this.Item.title}
        </Text>
        <ScrollView
          style={{
            height: 100
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "#fff",
              paddingTop: 20
            }}
          >
            {this.Item.description}
          </Text>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: 100,
              height: 3,
              backgroundColor: "rgba(0, 0, 0, 0.15)"
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: "#ffdb95",
              paddingLeft: 10,
              paddingRight: 10,
              fontWeight: "bold"
            }}
          >
            {this.Global.formatThousand(this.Item.price, ".")} VND
          </Text>
          <View
            style={{
              width: 100,
              height: 3,
              backgroundColor: "rgba(0, 0, 0, 0.15)"
            }}
          />
        </View>

        <TouchableOpacity
            onPress={()=>{
                let item = this.Item;
                let count = 0;
                this.Global.myCart.map((v, i)=>{
                    if (item.title === v.title){
                        count++;
                        v.size++;
                    }
                });
                if (count === 0){
                    item["size"] = 1;
                    item["totalPrice"] = item.price;
                    this.Global.myCart.push(item);
                }

                Actions.cart();


            }}
          style={{
            width: 200,
            height: 50,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#fff",
            marginTop: 25,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#ffdb95"
            }}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

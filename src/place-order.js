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
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modalbox"
const { width, height } = Dimensions.get("window");

export default class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      name: "",
      address: "",
        phone: ""
    };
  }
  render() {
      let totalPrice = this.props.price;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ae522e",
          paddingLeft: 20
        }}
      >
        <TextInput
          placeholder="Name..."
          placeholderTextColor="#fff"
          selectionColor="#fff"
          underlineColorAndroid="transparent"
          style={{
            fontStyle: this.state.name === "" ? "italic" : "normal",
            fontSize: 18,
            color: "#fff",
            paddingLeft: 15,
            width: width - 40,
            height: 50,
            borderRadius: 5,
            borderColor: "#8A180C",
            borderWidth: 3,
            backgroundColor: "rgba(0,0,0,.1)",
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center"
          }}
          onChangeText={name => {
            this.setState({ name: name });
          }}
          value={this.state.name}
        />

          <TextInput
              placeholder="Phone..."
              placeholderTextColor="#fff"
              selectionColor="#fff"
              underlineColorAndroid="transparent"
              style={{
                  fontStyle: this.state.phone === "" ? "italic" : "normal",
                  fontSize: 18,
                  color: "#fff",
                  paddingLeft: 15,
                  width: width - 40,
                  height: 50,
                  borderRadius: 5,
                  borderColor: "#8A180C",
                  borderWidth: 3,
                  backgroundColor: "rgba(0,0,0,.1)",
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center"
              }}
              onChangeText={phone => {
                  this.setState({ phone: phone });
              }}
              value={this.state.phone}
          />

        <TextInput
          placeholder="Address..."
          placeholderTextColor="#fff"
          selectionColor="#fff"
          underlineColorAndroid="transparent"
          style={{
            fontStyle: this.state.address === "" ? "italic" : "normal",
            fontSize: 18,
            color: "#fff",
            paddingLeft: 15,
            width: width - 40,
            height: 50,
            borderRadius: 5,
            borderColor: "#8A180C",
            borderWidth: 3,
            backgroundColor: "rgba(0,0,0,.1)",
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center"
          }}
          onChangeText={address => {
            this.setState({ address: address });
          }}
          value={this.state.address}
        />

        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            paddingTop: 15
          }}
        >
          Total price:{" "}
          {
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#ffdb95"
              }}
            >
              {this.Global.formatThousand(totalPrice, ".")} VND
            </Text>
          }
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            paddingTop: 15
          }}
        >
          Ship:{" "}
          {
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#ffdb95"
              }}
            >
              Free ship
            </Text>
          }
        </Text>
        <TouchableOpacity
          onPress={() => {
              this.refs.modal.open()
          }}
          style={{
            width: 200,
            height: 50,
            borderRadius: 5,
            borderColor: "#fff",
            borderWidth: 1,
            marginLeft: width / 2 - 100,
            marginTop: 10,
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
            Place Order
          </Text>
        </TouchableOpacity>
          <Modal
              swipeToClose={false}
              backdropPressToClose={false}
              coverScreen={true}
              ref={"modal"}
              style={{
              width: width - 20,
              height: 220,
              borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ae522e'
          }}>
              <Icon
                  name="check-circle-o"
                  size={120}
                  color="#ffdb95"
              />
              <Text style={{
                  color: '#ffdb95',
                  fontSize: 20,
                  fontWeight: 'bold'
              }}>
                  Successful!
              </Text>
              <TouchableOpacity

                  onPress={()=>{
                      this.refs.modal.close();
                      Actions.homePage({type:'replace'});
                      this.Global.myCart = [];
                  }}
                  style={{
                  width: 200,
                  height: 50,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#fff',
                  marginTop: 5,
              }}>
                  <Text style={{
                      color: '#ffdb95',
                      fontSize: 18,
                      fontWeight: '600'
                  }}>
                      Done
                  </Text>
              </TouchableOpacity>
          </Modal>
      </View>
    );
  }
}

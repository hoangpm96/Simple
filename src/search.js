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
import Modal from "react-native-modalbox";
const { width, height } = Dimensions.get("window");

let dataSearch = [
  {
    img: require("./img/menu/coffee-cocktails/espresso.jpg"),
    title: "Espresso",
    description:
      "Tart and refreshing coffee with Italian character, with a nice smooth cream-colored nut. Feel aroma of real coffee, which will charge you for the day.",
    price: 50000
  },
  {
    img: require("./img/menu/hot-drinks/classess-cocoa.jpg"),
    title: "Classic Cocoa",
    description:
      "Sweet-sweet chocolate drink - a unique blend of dark chocolate sauce and whipped milk. Adorned with a cap of whipped cream and chocolate topping of dark chocolate.",
    price: 40000
  },
  {
    img: require("./img/menu/iced-coffee/smothie.jpg"),
    title: "Smothie",
    description:
      "Ice drink with a taste of tropical fruits, consisting of natural fruit puree, fruit juice with the addition of ice. All the ingredients are whipped in the blender.",
    price: 30000
  },
  {
    img: require("./img/menu/iced-coffee/moccacino.jpg"),
    title: "White Iced Moccacino",
    description:
      "Invigorating, refreshing iced coffee, espresso-based, cold milk with the addition of ice, white chocolate sauce and chocolate powder. All the ingredients are whipped in the blender.\n" +
      "We recommend to add the syrup - coconut. The combination of opposites - the icy calm passions and carnival mokkachino coconut paradise.",
    price: 30000
  },
  {
    img: require("./img/menu/desserts/vienna-strudel.jpg"),
    title: "Vienna Strudel",
    description:
      "Cherry strudel with ice-cream.\n" +
      "Strudel with apples and cinnamon with ice-cream.\n" +
      "Cottage cheese strudel with raspberries and ice-cream.",
    price: 20000
  },
  {
    img: require("./img/menu/desserts/petit-four.jpg"),
    title: "Petit four",
    description:
      "Petit four with apple.\n" +
      "Petit four with mango.\n" +
      "Petit four with raspberry.",
    price: 20000
  }
];

let dataSearchresult = [
  {
    img: require("./img/menu/coffee-cocktails/espresso.jpg"),
    title: "Espresso",
    description:
      "Tart and refreshing coffee with Italian character, with a nice smooth cream-colored nut. Feel aroma of real coffee, which will charge you for the day.",
    price: 50000
  }
];
export default class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
      txtSearch: "",
      onFocus: false,
    };
  }
  render() {
    let placeholder = (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          position: "absolute",
          backgroundColor: "transparent",
          alignItems: "center",
          left: this.state.onFocus ? 37 : null
        }}
      >
        <Icon name="search" size={15} color="#ffdb95" />
        <Text
          style={{
            fontSize: 18,
            color: "#ffdb95",
            paddingLeft: 5
          }}
        >
          Search
        </Text>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ae522e"
        }}
      >
        <View
          style={{
            width: width,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8A180C"
          }}
        >
            {this.state.txtSearch === "" ? placeholder : null}
            <TextInput
            selectionColor="#fff"
            underlineColorAndroid="transparent"
            style={{
              fontStyle: this.state.txtSearch === "" ? "italic" : "normal",
              fontSize: 18,
              color: "#fff",
              paddingLeft: 15,
              width: width - 40,
              height: 50,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,.1)",
              flexDirection: "row",
              alignItems: "center"
            }}
            onChangeText={txtSearch => {
              this.setState({ txtSearch: txtSearch });
            }}
            value={this.state.txtSearch}
            onFocus={() => {
              this.setState({
                onFocus: true
              });
            }}
            onSubmitEditing={() => {
              this.setState({
                onFocus: false
              });
            }}
          />
        </View>
        {!(this.state.txtSearch !== "" && !this.state.onFocus)
          ? <View
              style={{
                flex: 1,
                paddingTop: 40,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 25
                }}
              >
                Trending Searches
              </Text>
              <FlatList
                style={{
                  paddingTop: 20
                }}
                data={dataSearch}
                renderItem={({ item, index }) => this._renderTrend(item, index)}
                keyExtractor={(item, index) => index}
              />
            </View>
          : <FlatList
              style={{}}
              data={dataSearchresult}
              renderItem={({ item, index }) => this._renderSearch(item, index)}
              keyExtractor={(item, index) => index}
            />}
      </View>
    );
  }
  _renderTrend(item, index) {
    return (
      <TouchableOpacity
        key={index}
        style={{
          backgroundColor: "transparent",
          alignItems: "center",
          marginTop: 10
        }}
        onPress={() => {
          Actions.detailInfo({ title: item.title, item: item });
        }}
      >
        <Text
          style={{
            color: "#ffdb95",
            fontSize: 18
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderSearch(item, index) {
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

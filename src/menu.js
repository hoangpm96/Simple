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
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { observable, autorun } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");

let data = [
  {
    img: require("./img/menu/menu-coffee.jpg"),
    name: "Coffee & coffee cocktails"
  },
  {
    img: require("./img/menu/menu-hotdrink.jpg"),
    name: "Hot drinks"
  },
  {
    img: require("./img/menu/menu-ice-coffee.jpg"),
    name: "Iced coffee & cocktails"
  },
  {
    img: require("./img/menu/menu-desserts.jpg"),
    name: "Desserts"
  }
];

let coffeeCocktails = [
    {
        img: require("./img/menu/coffee-cocktails/espresso.jpg"),
        title: "Espresso",
        description:
            "Tart and refreshing coffee with Italian character, with a nice smooth cream-colored nut. Feel aroma of real coffee, which will charge you for the day.",
        price: 50000
    },
    {
        img: require("./img/menu/coffee-cocktails/cappuccino.jpg"),
        title: "Cappuccino",
        description:
        "Delicate coffee drink, on the basis of espresso with the addition of whipped milk and milk foam air cap, decorated with chocolate crumbs and cinnamon.\n" +
        "Successfully highlight the tenderness and flavor of whole milk, coffee syrup, add hazelnut.",
        price: 50000
    },
    {
        img: require("./img/menu/coffee-cocktails/caffee-latte.jpg"),
        title: "Caffee Latte",
        description:
            "Tart and refreshing coffee with Italian character with a dollop of light milk foam. If you want to cheer, but want something soft and sophisticated, the Espresso Macchiato - is the right choice.",
        price: 50000
    }
];

let hotDrinks = [
    {
        img: require("./img/menu/hot-drinks/classess-cocoa.jpg"),
        title: "Classic Cocoa",
        description:
            "Sweet-sweet chocolate drink - a unique blend of dark chocolate sauce and whipped milk. Adorned with a cap of whipped cream and chocolate topping of dark chocolate.",
        price: 40000
    },
    {
        img: require("./img/menu/hot-drinks/amaretto.jpg"),
        title: "Amaretto Hot Chocolate",
        description:
            "The cold, blustery days of winter call for a comforting cup of hot chocolate. Flavored with Amaretto Liquor for a subtle almond flavor and rich chocolate, this Amaretto Hot Chocolate is the most decadently delicious drink perfect on a cold night!",
        price: 40000
    }
];

let icedCoffee = [
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
        img: require("./img/menu/iced-coffee/oreo-shake.jpg"),
        title: "Oreo Shake",
        description:
            "Delicate ice drink with a sauce of white chocolate, chocolate icing and cookie crumbs «OREO». With the addition of cold milk and ice. All the ingredients are whipped in a blender until a thick smooth paste. ",
        price: 30000
    }
];

let desserts = [
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
        img: require("./img/menu/desserts/cup-cakes.jpg"),
        title: "Cup Cakes",
        description:
        "Cup Cake vanilla with strawberry cream.\n" +
        "Cup Cake vanilla with peach cream.\n" +
        "Cup Cake chocolate with chocolate cream.\n" +
        "Cup Cake chocolate with banana cream.",
        price: 20000
    },
    {
        img: require("./img/menu/desserts/sacher-cake.jpg"),
        title: "Sacher cake",
        description:
            "Chocolate sponge cake with a layer of apricot jam in a chocolate glaze.",
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

@autobind
@observer
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.Global = this.props.Global;
    }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ae522e"
        }}
      >
        <FlatList
          style={{
            padding: 10
          }}
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
          backgroundColor: "#944627",
          height: 80,
          width: width - 20,
          alignItems: "center",
          marginTop: 8,
          flexDirection: "row"
        }}
        onPress={()=>{
            let dataMenu = null;
            switch (item.name) {
                case "Coffee & coffee cocktails":
                    dataMenu =  coffeeCocktails;
                    break;
                case "Hot drinks":
                    dataMenu =  hotDrinks;
                    break;
                case "Iced coffee & cocktails":
                    dataMenu =  icedCoffee;
                    break;
                case "Desserts":
                    dataMenu =  desserts;
                    break;
                default:
                    break;
            }
            Actions.infoMenu({title: item.name, dataMenu: dataMenu});
        }}
      >
        <View
          style={{
            width: 130,
            height: 80,
            borderWidth: 10,
            borderColor: "#eadad4",
              justifyContent:'center',
              alignItems:'center'
          }}
        >
          <Image
            source={item.img}
            style={{
              width: 120,
              height: 70,
              resizeMode: "stretch"
            }}
          />
        </View>

        <Text
          style={{
            paddingLeft: 10,
            color: "#ffdb94",
            fontSize: 14,
            fontWeight: "bold"
          }}
        >
          {item.name}
        </Text>
        <Icon
          style={{
            right: 4,
            position: "absolute"
          }}
          name="chevron-right"
          color="#000"
          size={16}
        />
      </TouchableOpacity>
    );
  };
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

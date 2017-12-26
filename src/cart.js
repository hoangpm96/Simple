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
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";

@autobind
@observer
export default class Cart extends Component {
    @observable totalPrice = 0;
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.state = {
        totalPrice: 0
    }
  }
  componentDidMount() {
      let myCart = this.Global.myCart;
      this.totalPrice = 0;
      myCart.length !== 0 ?
          myCart.map((v, i) => {
              this.totalPrice += v.price * v.size;
          }) : null;
  }
  render() {
    let isNoneEmpty = (
      <View
        style={{
          width: width,
          height: height - 64 - 55
        }}
      >
        <FlatList
          style={{
            padding: 5,
            paddingTop: 10,
            height: height - 64 - 55 - 100 - 10,
            width: width
          }}
          keyExtractor={(item, index) => index}
          data={this.Global.myCart}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderItems(item, index)}
        />
        <View
          style={{
            width: width,
            height: 100
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              paddingLeft: 10
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
                {this.Global.formatThousand(this.totalPrice, ".")} VND
              </Text>
            }
          </Text>
            <TouchableOpacity
                onPress={()=>{
                    Actions.placeOrder({price: this.totalPrice});
                }}
                style={{
                width: 200,
                height: 50,
                borderRadius: 5,
                borderColor: "#fff",
                borderWidth: 1,
                marginLeft: width / 2 - 100,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 20,
                    color: "#ffdb95"
                }}>
                    Place Order
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
    let isEmpty = (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: 50
        }}
      >
        <Icon name="shopping-cart" color="#fff" size={120} />
        <Text
          style={{
            paddingTop: 20,
            color: "#fff",
            fontSize: 25
          }}
        >
          Your cart is empty!
        </Text>
        <TouchableOpacity
          onPress={() => {
            Actions.menu();
          }}
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
            width: 150,
            height: 50
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#ffdb95"
            }}
          >
            Add Items
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "#ae522e"
        }}
      >
        <View
          style={{
            width: width,
            height: 64,
            alignItems: "center",
            backgroundColor: "#000",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}
            style={{
              width: 55,
              height: 64,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon name="times" color="#0916BA" size={30} />
          </TouchableOpacity>

          <View
            style={{
              alignItems: "center",
              width: width - 55,
              paddingRight: 55 / 2
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20
              }}
            >
              Shopping Cart
            </Text>
          </View>
        </View>
        {this.Global.myCart.length === 0 ? isEmpty : isNoneEmpty}
      </Animated.View>
    );
  }
  renderItems(item, index) {
    return (
      <View
        style={{
          width: width - 10,
          height: 120,
          justifyContent: "center",
          borderColor: "#fff",
          borderWidth: 1,
          flexDirection: "row",
            marginBottom: this.Global.myCart.length - 1 === index ? 15 : 0
        }}
      >
        <Image
          source={item.img}
          style={{
            width: 100,
            height: 118,
            resizeMode: "cover"
          }}
        />
        <View
          style={{
            flex: 1,
            paddingLeft: 10
          }}
        >
          <View
            style={{
              flex: 1.5,
              paddingTop: 5
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#ffdb95",
                  fontSize: 18,
                  fontWeight: "bold",
                  width: width - 150
                }}
              >
                {item.title}
              </Text>
              <TouchableOpacity>
                <Icon name="trash" color="#fff" size={25} style={{}} />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                paddingTop: 5
              }}
            >
              Quantity:
              {
                <Text
                  style={{
                    color: "#ffdb95",
                    fontWeight: "bold",
                    marginLeft: 5
                  }}
                >
                  {" " + item.size}
                </Text>
              }
            </Text>

            <Text
              style={{
                color: "#fff",
                fontSize: 16
              }}
            >
              Price:
              {
                <Text
                  style={{
                    color: "#ffdb95",
                    fontWeight: "bold",
                    marginLeft: 5,
                    fontSize: 16
                  }}
                >
                  {" " + this.Global.formatThousand(item.price, ".")} VND
                </Text>
              }
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                flex: 2.2,
                color: "#fff",
                fontSize: 16
              }}
            >
              Total:{" "}
              {
                <Text
                  style={{
                    color: "#ffdb95",
                    fontWeight: "bold",
                    marginLeft: 5,
                    fontSize: 16
                  }}
                >
                  {" " +
                    this.Global.formatThousand(
                      item.price * item.size,
                      "."
                    )}{" "}
                  VND
                </Text>
              }
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 5
              }}
            >
              <TouchableOpacity
                onPress={() => {
                   item.size > 1 ? this.totalPrice = this.totalPrice - item.size * item.price + --item.size * item.price
                   : null;
                  this.setState({});
                }}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderTopLeftRadius: 3,
                  borderBottomLeftRadius: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30
                }}
              >
                <Text
                  style={{
                    color: "#fff"
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                    this.totalPrice = this.totalPrice - item.size * item.price + ++item.size * item.price;
                  this.setState({});
                }}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderTopRightRadius: 3,
                  borderBottomRightRadius: 3,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "#fff"
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

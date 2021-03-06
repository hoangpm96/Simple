import React, { Component } from "react";
import { Actions, Router, Scene } from "react-native-mobx";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ListView,
  RefreshControl,
  Animated,
  TouchableHighlight,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from "react-native-swipe-list-view";
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation
} from "react-native-popup-dialog";
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const scaleAnimation = new ScaleAnimation();
const { width, height } = Dimensions.get("window");
import Global from "./models/global";
import firebase from "firebase";
import { validateArgCount } from "@firebase/util";
@autobind
@observer
export default class ListLoved extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      age2: 21,
      name: "Huong Giang Ido",
      Quote: "A woman gives and forgives, a man gets and forgets",
      refreshing: false,
      listViewData: [],
      isSwipe: false
    };

    this._renderRow = this._renderRow.bind(this);
  }
  showScaleAnimationDialog() {
    // this.scaleAnimationDialog.show();
  }
  _onReLoad() {
    this.setState({ refreshing: true });
    this.setState({
      listViewData: this.state.listViewData,
      refreshing: false
    });
  }

  async componentWillMount() {
    var tempArr = [];
    try {
       await firebase
        .database()
        .ref("lovedlist")
        .child(this.Global.currentUserId)
        .once("value", function(snapshots) {
          snapshots.forEach(function(data) {
            tempArr.push(data.key);
          });
        });

      this.loadWishListUser(tempArr);
    }catch(error) {

    }
  }

  loadWishListUser = async (userIds) => {
    var tempUsers = [];
    
    try {
      await Promise.all(
        userIds.map(async id => {
          await firebase
            .database()
            .ref("users")
            .orderByKey()
            .equalTo(id)
            .once("value", snapshot => {
              if (snapshot.val()) {
                let value = Object.values(snapshot.val());
                value[0].key = snapshot.node_.children_.root_.key;
                tempUsers.push(value[0]);
              }
            })
        })
      ).then(data => {
         let userData = this.createDataList(tempUsers);
         this.setState({ listViewData: userData });
      });

      // this.showScaleAnimationDialog();
    } catch (error) {
      // this.showError(error);
    }
  };

  // rawData là data từ firebase -> Chuyển thành mảng dùng được 
  createDataList = (rawData) => {

    // TODO: Thêm các thômg tin cần thiết nếu cần 
    
    // "image": 
    // "name": 
    // "user-name": 
    // "age": 
    // "weight": 
    // "height": 
    // "hobbies": 
    // "chat": "
      var arr = [];
      for (let ele of rawData) {
          ele.weight = 100;
          ele.name = ele.name
          ele.height = 100;
          ele.hobbies = "random";
          ele.chat = "chat";
          arr.push(ele);
      }
      return arr;
  }

  componentDidMount() {
    this.setState({
      listViewData: this.state.listViewData
    });
    this.Global.firstLogin === true ? this.scaleAnimationDialog.show() : null;
    this.Global.firstLogin = false;
  }

  deleteRow = async (secId, rowId, rowMap) => {
            //xoa ra khoi lovedList (ignore)
            try {
              await firebase
              .database()
              .ref("lovedlist")
              .child(this.Global.currentUserId)
              .child(this.state.listViewData[rowId]["key"])
              .set(null);
            }
            catch (error) {
              const { code, message } = error;
              Alert.alert(this.Global.APP_NAME, message);
            }
    rowMap[`${secId}${rowId}`].closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  deleteRowAddtoWishList = async (secId, rowId, rowMap) => {
                //xoa ra khoi lovedList (ignore) them vao WishList
                try {
                  await firebase
                  .database()
                  .ref("lovedlist")
                  .child(this.Global.currentUserId)
                  .child(this.state.listViewData[rowId]["key"])
                  .set(null);
                  //them vao wishlist
                  await firebase
                  .database()
                  .ref("wishlist")
                  .child(this.Global.currentUserId)
                  .child(this.state.listViewData[rowId]["key"])
                  .set(true);

                  // add table notifycation
                  await firebase
                  .database()
                  .ref("notifications")
                  .push({
                    receiver: this.state.listViewData[rowId]["key"],
                    sender: this.Global.currentUserId,
                    // token: this.Global.token
                  });
                }
                catch (error) {
                  const { code, message } = error;
                  Alert.alert(this.Global.APP_NAME, message);
                }
    rowMap[`${secId}${rowId}`].closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  _renderRow(rowData) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.Global.isFooter = true;
          this.Global.pressStatus = "love";
          this.Global.loverId = rowData.key.toString();
          Actions.loverProfile();
        }}
        style={styles.viewContainer}
      >
        <Image style={styles.avatar_image} source={{ uri: rowData.avatarUrl }} />
        <View style={styles.viewInformation}>
          <Text numberOfLines={1} style={styles.informationStyle}>
            * {rowData.name}, {rowData.age}
          </Text>
          <Text numberOfLines={1} style={styles.informationStyle}>
            * {rowData.age}
          </Text>
          <Text numberOfLines={1} style={styles.informationStyleHobby}>
            * Hobbies: {rowData.hobbies}
          </Text>
          <Text numberOfLines={1} style={styles.informationStyle}>
            * Height: {rowData.height}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const animatedValue = this.state.animatedValue;
    return (
      <View style={styles.background}>
        <Animated.View style={styles.headerContainer}>
          <Text style={styles.headerText}>LOVED LIST</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              this.Global.isFooter = true;
              Actions.pop();
              this.Global.pressStatus = "love";
            }}
          >
            <Icon name="chevron-left" color='#ffffff' size={22} style={{ marginLeft: 15, marginBottom: 5 }} />
          </TouchableOpacity>
        </Animated.View>
        <SwipeListView
          contentContainerStyle={styles.loveContainer}
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          renderRow={this._renderRow}
          renderHiddenRow={(data, secId, rowId, rowMap) => (
            <View style = {{flexDirection: 'row', alignSelf: "flex-end"}}>
            <TouchableOpacity
              style={[styles.backRightBtnRight]}
              onPress={_ => this.deleteRow(secId, rowId, rowMap)}
            >
              <Icon name="trash" color="#F15F66" size={32} />
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.backRightBtnRight2]}
            onPress={_ => this.deleteRowAddtoWishList(secId, rowId, rowMap)}
          >
            <Icon name="check" color="#F15F66" size={32} />
          </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-150}
          // leftOpenValue={75}
          disableRightSwipe={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onReLoad.bind(this)}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CC6666"
  },
  headerContainer: {
    width: width,
    height: height < 812 ? 65 : 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F15F66",
    flexDirection: "row"
  },
  headerText: {
    marginTop: height < 812 ? 20 : 30,
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold"
  },
  loveContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    justifyContent: "center"
  },
  viewContainer: {
    width: width - 20,
    height: 72,
    backgroundColor: "#CC6666",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255, 0.3)",
    flexDirection: "row"
  },
  avatar_image: {
    height: 56,
    width: 56,
    resizeMode: "cover",
    borderRadius: 28,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 2,
    alignSelf: "center"
  },
  viewInformation: {
    marginTop: 5,
    marginBottom: 5,
    alignContent: "space-around",
    alignItems: "center",
    justifyContent: "space-around",

    position: "absolute",
    top: 0,
    left: 80,
    bottom: 0,
    right: 0
  },
  informationStyle: {
    color: "#ffff",
    fontSize: 13,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    width: width - 120,
    alignSelf: "center"
  },
  informationStyleHobby: {
    color: "#ffff",
    fontSize: 13,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    width: width - 120,
    flexDirection: "column",
    flexWrap: "wrap",
    alignSelf: "center"
  },
  textAdd: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  containterAdd: {
    position: "absolute",
    left:
      height < 812
        ? height < 736
          ? height < 667 ? (width - 39) / 2 : (width - 42) / 2
          : (width - 44) / 2
        : (width - 48) / 2,
    bottom: height < 812 ? 15 : 25,
    width: height < 812 ? (height < 736 ? (height < 667 ? 39 : 42) : 44) : 48,
    height: height < 812 ? (height < 736 ? (height < 667 ? 39 : 42) : 44) : 48,
    borderRadius:
      height < 812 ? (height < 736 ? (height < 667 ? 19.5 : 21) : 22) : 24,
    backgroundColor: "#F15F66",
    borderWidth: 1,
    borderColor: "rgba(226,39,44,0.2)",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  backRightBtnRight: {
    backgroundColor: "#Ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    alignSelf: "flex-end"
  },
  backRightBtnRight2: {
    backgroundColor: 'green',//"#Ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    alignSelf: "flex-end"
  },
  backTextWhite: {
    color: "#F15F66"
  },
  dialogContentView: {
    flex: 1
  },
  viewQuote: {
    marginTop: 10,
    width: width < 375 ? width - 90 : width - 120,
    height: 58,
    backgroundColor: "#BAA8AE",
    alignSelf: "flex-end",
    marginRight: 10,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  textQuote: {
    margin: 10,
    fontSize: 14,
    color: "#ffff",
    fontStyle: "italic"
  },
  avatar: {
    width: width < 375 ? width - 50 : width - 40,
    height: width < 375 ? width - 50 : width - 40,
    resizeMode: "cover",
    borderRadius: 15,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
    marginTop: 10
  },
  containerButton01: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  waperButton: {
    width: width < 375 ? width / 2 - 40 : width / 2 - 35,
    height: height < 667 ? 40 : 45,
    backgroundColor: "#F15F66",
    shadowColor: "#ED969B",
    shadowOffset: { width: 1, height: 1.3 },
    shadowOpacity: 84,
    shadowRadius: 1,
    borderRadius: height < 667 ? 20 : 22.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: width < 375 ? 10 : 13
  },
  textButton: {
    fontSize: 18,
    fontFamily: "System",
    fontWeight: "bold",
    color: "#ffff",
    backgroundColor: "transparent"
  },
  nameAge: {
    position: "absolute",
    width: width < 375 ? width - 50 : width - 40,
    height: 35,
    top: width < 375 ? width - 7 : width + 3,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  backButton: {
    justifyContent: 'center',
    position: 'absolute',
    top: height < 812 ? 30 : 50,
    left: 10
  },
});

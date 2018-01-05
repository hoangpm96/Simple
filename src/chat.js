

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
  ListView,
  RefreshControl,
  Animated,
  TouchableHighlight,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");
import firebase from "firebase";
import { async } from "@firebase/util";
@autobind
@observer
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.pressStatus = this.props.pressStatus;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      refreshing: false,
      listViewData: [],
      isSwipe: false
    };

    this._renderRow = this._renderRow.bind(this);
  }

  async componentWillMount() {
    var tempArr = [];
    try {
      await firebase
        .database()
        .ref("wishList")
        .child(this.Global.currentUserId)
        .once("value", function(snapshots) {
          snapshots.forEach(function(data) {
            tempArr.push(data.key);
          });
        });

      this.loadWishListUser(tempArr);
    } catch (error) {}
  }

  loadWishListUser = async userIds => {
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
                let tempObj = value[0];
                let keys = Object.keys(snapshot.val());
                tempObj.id = keys[0];
                tempUsers.push(tempObj);
              }
            });
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
  createDataList = rawData => {
    // TODO: Thêm các thômg tin cần thiết nếu cần
    var arr = [];
    for (let ele of rawData) {
      ele.name = ele.username;
      ele.chat = "chat message here";
      ele.lastActive = "69s ago";
      arr.push(ele);
    }
    return arr;
  };
  componentDidMount() {
    this.setState({
      listViewData: this.state.listViewData
    });
  }
  _onReLoad() {
    this.setState({ refreshing: true });
    this.setState({
      listViewData: this.state.listViewData,
      refreshing: false
    });
  }

  checkConversation = async () => {
    let self = this;
    var isCreating = true; 
    
    await firebase
      .database()
      .ref("users/" + this.Global.currentUserId + "/conversations")
      .child(this.Global.selectedChatUser.id)
      .once("value", snapshot => {
        const userData = snapshot.val();
        if (userData) {
          
          console.log(userData.conversationId);
          self.Global.selectedConversation = userData.conversationId;
          isCreating = false;
        } else {
          self.createConversation();
          isCreating = true;
        }
      });

      if (!isCreating) {
          Actions.messager();
      }


  };
  createConversation = async () => {
     
      let conver = await firebase
      .database()
      .ref("conversations")
      .push({
        members: {
          [this.Global.currentUserId]: true,
          [this.Global.selectedChatUser.id]: true
        }
      });

    await firebase
      .database()
      .ref("users")
      .child(this.Global.currentUserId)
      .child("conversations")
      .child(this.Global.selectedChatUser.id)
      .set({
        conversationId: conver.key
      });
  
    await firebase
      .database()
      .ref("users")
      .child(this.Global.selectedChatUser.id)
      .child("conversations")
      .child(this.Global.currentUserId)
      .set({
        conversationId: conver.key
      });
      this.Global.selectedConversation = conver.key
      Actions.messager();
  }
  // componentDidMount() {
  //   this.setState({
  //     listViewData: this.state.listViewData
  //   });
  // }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  _renderRow(rowData) {
    return (
      <TouchableOpacity
        style={styles.viewContainer}
        onPress={() => {
          console.log(rowData);

          this.Global.selectedChatUser = rowData;
          this.Global.isFooter = false;
          this.Global.pressStatus = "chat";
          this.checkConversation();

          // create conversation here

        
        }}
      >
        <Image
          style={styles.avatar_image}
          source={{ uri: rowData.avatarUrl }}
        />
        <View style={styles.viewInformation}>
          <View
            style={[styles.informationTextContain, { flexDirection: "row" }]}
          >
            <Text style={{ fontSize: 20, color: "green" }}>*</Text>
            <Text
              numberOfLines={1}
              style={[styles.informationStyle, { fontSize: 16 }]}
            >
              {" "}
              {rowData.name}, {rowData.age}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={[styles.informationStyle, { marginTop: 2, marginRight: 5 }]}
          >
            {rowData.chat}
          </Text>
          <Text style={styles.styleTextTime}> {rowData.lastActive}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.background}>
        <Animated.View style={styles.headerContainer}>
          <Text style={styles.headerText}>CHAT</Text>
        </Animated.View>
        <SwipeListView
          contentContainerStyle={styles.loveContainer}
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          renderRow={this._renderRow}
          renderHiddenRow={(data, secId, rowId, rowMap) => (
            <TouchableOpacity
              style={[styles.backRightBtnRight]}
              onPress={_ => this.deleteRow(secId, rowId, rowMap)}
            >
              <Icon name="trash" color="#F15F66" size={32} />
            </TouchableOpacity>
          )}
          rightOpenValue={-75}
          disableRightSwipe={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onReLoad.bind(this)}
            />
          }
        />
        <TouchableOpacity
          onPress={() => {
            this.Global.isFooter = false;
            this.Global.pressStatus = "search";
            Actions.addchat();
          }}
          style={styles.containterAdd}
        >
          <Icon name="search" color="#ffffff" size={23} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#CC6666'
  },
  headerContainer: {
    width: width,
    height: height < 812 ? 65 : 75,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#F15F66',
    flexDirection: "row"
  },
  headerText: {
    marginTop: height < 812 ? 20 : 30,
    color: "#ffffff",
    fontSize: 28,
    fontWeight: 'bold'
  },
  loveContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    justifyContent: 'center',

  },
  viewContainer: {
    width: width - 20,
    height: 54,
    backgroundColor: "#CC6666",
    flex: 1,
    flexDirection: 'row',
  },
  avatar_image: {
    height: 46,
    width: 46,
    resizeMode: "cover",
    borderRadius: 23,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 2,
    alignSelf: 'center'
  },
  viewInformation: {
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, 0.3)',
  },

  informationTextContain: {
    marginRight: 5 
  },
  informationStyle: {
    color: '#ffff',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    width: width - 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  containterAdd: {
    position: 'absolute',
    left: height < 812 ? (height < 736 ? (height < 667 ? (width - 39)/2 : (width - 42)/2 ) : (width - 44)/2 ) : (width - 48)/2,
    bottom: height < 812 ? 15: 25,
    width: height < 812 ? (height < 736 ? (height < 667 ? 39 : 42 ) : 44 ) : 48,
    height: height < 812 ? (height < 736 ? (height < 667 ? 39 : 42 ) : 44 ) : 48,
    borderRadius: height < 812 ? (height < 736 ? (height < 667 ? 19.5 : 21 ) : 22 ) : 24,
    backgroundColor: '#F15F66',
    borderWidth: 1,
    borderColor: 'rgba(226,39,44,0.2)',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  styleTextTime: {
    color: 'white', position: 'absolute',
    right: 2,
    top: 3
  },
  backRightBtnRight: {
    backgroundColor: '#Ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 54,
    alignSelf: 'flex-end'
  },
});

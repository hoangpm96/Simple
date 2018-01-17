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
const data = require('./data/users.json');
import Global from "./models/global";
@autobind
@observer
export default class Love extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      refreshing: false,
      listViewData: [],
      isSwipe: false,
      random_id: 0
    };

    this._renderRow = this._renderRow.bind(this);
    
  }
  showScaleAnimationDialog() {
    this.scaleAnimationDialog.show();
  }
  _onReLoad() {
    this.setState({ refreshing: true });
    this.setState({
      listViewData: this.state.listViewData,
      refreshing: false
    });
  }

  componentWillMount() {
    let userData = this.createDataList(data);
    this.setState({ 
      listViewData: userData,
      random_id: Math.floor((Math.random() * userData.length))
    });
  }
  createDataList = (rawData) => {
      var arr = [];
      for (let ele of rawData) {
        var hobbies = ""
        for (let hobby in ele.tags){
          hobbies = hobbies + ", " +hobby.toString()
        }
        hobbies = hobbies.substr(2, hobbies.length - 2);
        ele.hobbies = hobbies;
          arr.push(ele);
      }
      return arr;
  }

  componentDidMount() {
    this.Global.firstLogin = true;
    this.setState({
      listViewData: this.state.listViewData
    });
    this.Global.firstLogin === true ? this.scaleAnimationDialog.show() : null;
    this.Global.firstLogin = false;
  }

  deleteRow = async (secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });

  }

  _renderRow(rowData, secId, rowId, rowMap) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.Global.isFooter = true;
          this.Global.loverId = rowId;
          this.Global.pressStatus = "love";
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
            * Gender: {rowData.gender}
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
        {
          this.state.listViewData.length > 0  ? 
          <View style = {{flex: 1}}>
          <Animated.View style={styles.headerContainer}>
          <Text style={styles.headerText}>WISH LIST</Text>
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

        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="People you may like!"
              titleStyle={{ backgroundColor: "#CEB7C3" }}
              titleTextStyle={{
                color: "#ffff",
                fontSize: 18,
                fontWeight: "bold"
              }}
            />
          }
          ref={popupDialog => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          width={width < 375 ? width - 50 : width - 40}
          height={width < 375 ? width + 140 : width + 160}
          dialogStyle={{ backgroundColor: "rgba(202,148,157,1)" }}
        >
          <View style={styles.dialogContentView}>
            <View style={styles.viewQuote}>
              <Text style={styles.textQuote}> {this.state.listViewData[this.state.random_id].quote}</Text>
            </View>
            <Image
              source={{uri: this.state.listViewData[this.state.random_id].avatarUrl}}
              style={styles.avatar}
              debbuger 
            />
            <View style={styles.containerButton01}>
              <TouchableOpacity
                onPress={() => {
                  this.scaleAnimationDialog.dismiss();
                  this.Global.firstLogin = false;
                }}
                style={[
                  styles.waperButton,
                  { backgroundColor: "#FFA8AC", marginRight: 5 }
                ]}
              >
                <Text style={styles.textButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.Global.isFooter = false;
                  this.Global.pressStatus = "chat";
                  Actions.messager();
                }}
                style={[
                  styles.waperButton,
                  { backgroundColor: "#F15F66", marginLeft: 5 }
                ]}
              >
                <Text style={styles.textButton}>Chat</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.nameAge}>
              <Text style={{ color: "#ffffff", fontSize: 16 }}>
                {this.state.listViewData[this.state.random_id].name} - {this.state.listViewData[this.state.random_id].age}
              </Text>
            </View>
          </View>
        </PopupDialog>
          </View>

        : 
        <View>
        <Animated.View style={styles.headerContainer}>
        <Text style={styles.headerText}>WISH LIST</Text>
      </Animated.View>
        <Text style={styles.wishlist_blank}>Make more friends... </Text>
        </View>
        }
        <TouchableOpacity
          onPress={() => {
            this.Global.isFooter = true;
            this.Global.pressStatus = "love";
            Actions.listLoved();
          }}
          style={styles.containterAdd}
        >
          <Text style={styles.textAdd}>+</Text>
        </TouchableOpacity>
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
  wishlist_blank: {
    marginTop: height/2 - 70, 
    color: 'white', 
    alignSelf: 'center', 
    fontSize: 16,
    fontWeight: 'bold'
  }
});

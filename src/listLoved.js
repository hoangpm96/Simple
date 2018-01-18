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
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");
const data = require('./data/users.json');
import Global from "./models/global";
@autobind
@observer
export default class Love extends Component {
  constructor(props) {
    super(props);
    this.Global = this.props.Global;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      refreshing: false,
      listViewData: [],
      isSwipe: false,
      random_id: 0
    };
    this.Global.isFooter = true;

    this._renderRow = this._renderRow.bind(this);
    
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
    this.setState({
      listViewData: this.state.listViewData
    });
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
          this.Global.isFooter = false;
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
          </View>

        : 
        <View>
        <Animated.View style={styles.headerContainer}>
        <Text style={styles.headerText}>LOVED LIST</Text>
      </Animated.View>
        <Text style={styles.wishlist_blank}>Wating for adding friend... </Text>
        </View>
        }
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
  },
  backButton: {
    justifyContent: 'center',
    position: 'absolute',
    top: height < 812 ? 30 : 50,
    left: 10
  },
});

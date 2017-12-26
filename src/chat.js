

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
import { SwipeListView } from 'react-native-swipe-list-view';
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");
const data = require('./data/api.json');

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
      listViewData: data,
      isSwipe: false
    };

    this._renderRow = this._renderRow.bind(this);
  }

  _onReLoad() {
    this.setState({ refreshing: true });
    this.setState({
      listViewData: this.state.listViewData,
      refreshing: false
    });
  }

  componentDidMount() {
    this.setState({
      listViewData: this.state.listViewData,
    });

  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  _renderRow(rowData) {
    return (
      <View>
        <TouchableOpacity style={styles.viewContainer} 
                    onPress={() => {
                      this.Global.isFooter = false;
                      this.Global.pressStatus = "chat";
                      Actions.messager();
                    }}
        >
          <Image
            style={styles.avatar_image}
            source={{ uri: rowData.image }}
          />
          <View style={styles.viewInformation}>
            <View style={styles.chatStyle}>
              {/* Tên */}
              <View style={[styles.informationTextContain,{flexDirection: 'row'}]}>
              <Text style={{fontSize: 20, color: 'green'}}>*</Text>
                <Text numberOfLines={1} style={[styles.informationStyle, {fontSize: 16}]}  >  {rowData.name}, {rowData.age}</Text>
              </View>
              {/* Que quan */}
              <View style={styles.informationTextContain}>
                {/* <Text style={styles.titleContain}>Age: </Text> */}
                <Text numberOfLines={1} style={[styles.informationStyle, {marginTop: 2}]}  >{rowData.chat}</Text>
              </View>
            </View>
            <View style={styles.styleTextTime}>
            <TouchableOpacity
            onPress={() => {
              this.Global.isFooter = false;
              this.Global.pressStatus = "search";
              Actions.addchat();
            }}
            >
            <Text style={{color: 'white'}}> 1 min ago</Text>
            </TouchableOpacity>
            </View>
          </View>

        </TouchableOpacity >
      </View>
    )
    // debugger;
  }
  render() {

    return (
      <ImageBackground
        source={require("./img/background01.png")}
        style={styles.background}
      >
        <Animated.View>
          <View style={styles.headerContainer}>
            <View style={styles.headerTextContain}>
              <Text style={styles.headerText}>
                CHAT
            </Text>
            </View>
          </View>
        </Animated.View>
                <SwipeListView contentContainerStyle={styles.loveContainer}
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          renderRow={this._renderRow}
          renderHiddenRow={(data, secId, rowId, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon name="trash" color='#F15F66' size={32} />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75}
          disableRightSwipe={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onReLoad.bind(this)} />
          }
        />
        <TouchableOpacity
          onPress={() => {
            this.Global.isFooter = false;
            this.Global.pressStatus = "search";
            Actions.addchat();
          }}
        >
          <View style={styles.containterAdd}>
          <Icon name="search" color='#ffffff' size={23} />
          </View>
        </TouchableOpacity>
      </ImageBackground>
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
    height: (height + 1000) / 21.37,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#F15F66',
    flexDirection: "row"
  },
  headerTextContain: {
    alignItems: "center",
    marginTop: (height + 1000) / 58,
    alignSelf: 'center'
  },
  headerText: {
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
    height: height / 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "transparent",
    // backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#CC6666",
  },
  avatar_image: {
    height: height / 12,
    width: height / 12,
    resizeMode: "cover",
    borderRadius: height / 24,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 2,
    alignSelf: 'center'
  },
  viewInformation: {
    // marginRight: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
    // marginBottom: 5,
  },
  chatStyle: {
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, 0.3)',
    marginLeft: 10
    // backgroundColor: 'blue'
  },
  informationTextContain: {
    // marginLeft: 10,
    marginRight: 5 
  },
  informationStyle: {
    color: '#ffff',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    // marginRight: 10,
    width: width - height / 6,
    alignSelf: 'center',
    marginBottom: 10,
  },
  informationStyleHobby: {
    color: '#ffff',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    width: width - 40 - height / 5.5,
    // flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignSelf: 'center'
  },
  containterAdd: {
    position: 'absolute',
    left: -(height + 719) / 66,
    bottom: 10,
    width: (height + 719) / 33,
    height: (height + 719) / 33,
    borderRadius: ((height + 719) / 33) / 2,
    backgroundColor: '#F15F66',
    borderWidth: 1,
    borderColor: 'rgba(226,39,44,0.2)',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  styleTextTime: {
    position: 'absolute',
    right: 2,
    top: 5
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnRight: {
    backgroundColor: '#Ffffff',
    right: 0,
    // marginTop: 10,
    // marginBottom: 10,

  },
  backTextWhite: {
    color: '#F15F66'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});

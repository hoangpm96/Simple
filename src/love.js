

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
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");
import Global from "./models/global";
const data = require('./data/api.json');

@autobind
@observer
export default class Love extends Component {

  constructor(props) {
    super(props);
    // Global.isFooter=true;
    // this.pressStatus = this.props.pressStatus;
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
        <View style={styles.viewContainer} >
          <Image
            style={styles.avatar_image}
            source={{ uri: rowData.image }}
          />
          <View style={styles.viewInformation}>
            {/* Tên */}
            <View style={styles.informationTextContain}>
              {/* <Text style={styles.titleContain}>Name: </Text> */}
              <Text numberOfLines={1} style={styles.informationStyle}  >* {rowData.name}, {rowData.age}</Text>
            </View>
            {/* Que quan */}
            <View style={styles.informationTextContain}>
              {/* <Text style={styles.titleContain}>Age: </Text> */}
              <Text numberOfLines={1} style={styles.informationStyle}  >* {rowData.age}</Text>
            </View>
            {/* So Thich */}
            <View style={styles.informationTextContain}>
              <Text numberOfLines={1} style={styles.informationStyleHobby}  >* Hobbies: {rowData.hobbies}</Text>
            </View>
            {/* Chiều cao */}
            <View style={styles.informationTextContain}>
              <Text numberOfLines={1} style={styles.informationStyle}  >* Height: {rowData.height}</Text>
            </View>
          </View>
        </View>
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
                WISH LIST
            </Text>
            </View>
          </View>
        </Animated.View>

        {/* <ListView contentContainerStyle={styles.loveContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onReLoad.bind(this)} />
          }
          
        /> */}
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
            // this.Global.isFooter = true;
            this.Global.pressStatus = "search";
            Actions.search();
          }}
        >
          <View style={styles.containterAdd}>
            <Text style={styles.textAdd}>
              +
      </Text>
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
    backgroundColor: 'rgba(226,39,44,0.7)'
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
    // backgroundColor: 'red',
    width: width - 20,
    // margin: 4,
    height: height / 8,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#CC6666",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, 0.3)',
    flexDirection: 'row',
    // borderRadius: 15

  },
  avatar_image: {
    height: height / 10,
    width: height / 10,
    resizeMode: "cover",
    borderRadius: height / 20,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 2,
    alignSelf: 'center'
  },
  viewInformation: {
    // backgroundColor: '#92d1f3',
    marginTop: 5,
    marginBottom: 5,
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-around',

    position: 'absolute',
    top: 0,
    left: 80,
    bottom: 0,
    right: 0,

  },
  informationTextContain: {
    width: width - 100,
  },
  informationStyle: {
    color: '#ffff',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    width: width - 120,
    alignSelf: 'center'
  },
  informationStyleHobby: {
    color: '#ffff',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    width: width - 120,
    // flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignSelf: 'center'
  },
  textAdd: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: "transparent",
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
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'transparent',
    right: 75
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

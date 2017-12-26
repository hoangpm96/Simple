

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
    this.Global = this.props.Global;
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
        <View style={styles.viewContainer} >
          <Image
            style={styles.avatar_image}
            source={{ uri: rowData.image }}
          />
          <View style={styles.viewInformation}>
              <Text numberOfLines={1} style={styles.informationStyle}  >* {rowData.name}, {rowData.age}</Text>
              <Text numberOfLines={1} style={styles.informationStyle}  >* {rowData.age}</Text>
              <Text numberOfLines={1} style={styles.informationStyleHobby}  >* Hobbies: {rowData.hobbies}</Text>
              <Text numberOfLines={1} style={styles.informationStyle}  >* Height: {rowData.height}</Text>
          </View>
        </View>
    )
  }
  render() {

    return (
      <ImageBackground
        source={require("./img/background01.png")}
        style={styles.background}
      >
        <Animated.View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                WISH LIST
            </Text>
        </Animated.View>
        <SwipeListView contentContainerStyle={styles.loveContainer}
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          renderRow={this._renderRow}
          renderHiddenRow={(data, secId, rowId, rowMap) => (
              <TouchableOpacity style={[styles.backRightBtnRight]} onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon name="trash" color='#F15F66' size={32} />
              </TouchableOpacity>
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
            this.Global.isFooter = true;
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
    height: 72,
    backgroundColor: "#CC6666",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, 0.3)',
    flexDirection: 'row',

  },
  avatar_image: {
    height: 56,
    width: 56,
    resizeMode: "cover",
    borderRadius: 28,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 2,
    alignSelf: 'center'
  },
  viewInformation: {
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
    left: height < 812 ? (height < 736 ? (height < 667 ? -19.5 : -21 ) : -22 ) : -24,
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
  backRightBtnRight: {
    backgroundColor: '#Ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    alignSelf: 'flex-end'
  },
  backTextWhite: {
    color: '#F15F66'
  },
});

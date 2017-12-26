
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
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
const { width, height } = Dimensions.get("window");
const data = require('./data/api.json');

@autobind
@observer

export default class AddChat extends Component {

    constructor(props) {
      super(props);
      this.Global = this.props.Global;
      this.pressStatus = this.props.pressStatus;
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
        dataSource: ds.cloneWithRows(data),
        refreshing: false
      };
  
      this._renderRow = this._renderRow.bind(this);
    }
  
    _onReLoad() {
      this.setState({ refreshing: true });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        refreshing: false
      });
    }
  
    componentDidMount() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
      });
  
    }
  
    _onMoviePress(rowData) {
      alert(1);
      //  const { navigate } = this.props.navigation;
      //  navigate('MovieDetail', { data: rowData });
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
              <View style={styles.chatStyle}>
                {/* Tên */}
                <View style={[styles.informationTextContain, { flexDirection: 'row' }]}>
                  <Text style={{ color: 'green' }}>*</Text>
                  <Text numberOfLines={1} style={[styles.informationStyle, { fontSize: 16 }]}  >  {rowData.name}, {rowData.age}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Actions.messager();
                    this.Global.isFooter = false;
                    this.Global.pressStatus = "chat";
                  }}
                >
                  <Icon name="chevron-right" color='#ffffff' size={22} style={{ margin: 10 }} />
                </TouchableOpacity>
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
            <View style={[styles.headerContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <TouchableOpacity
                onPress={() => {
                  Actions.chat();
                  this.Global.isFooter = true;
                  this.Global.pressStatus = "chat";
                }}
              >
                <View style={{ height: 50, width: 50, alignContent: 'center', justifyContent: 'center' }}>
                  <Icon name="chevron-left" color='#ffffff' size={22} style={{ marginLeft: 15, marginBottom: 5 }} />
                </View>
              </TouchableOpacity>
              <View style={styles.containerUserName}>
                <Icon name="search" color='#ffffff' size={22} style={{ marginLeft: 10 }} />
                <TextInput placeholder={'Search friend on your wish lish'} style={styles.styleUserName}
                  onChangeText={username => {
                    this.setState({ userName: username});
                  }}
                  placeholderTextColor={'#ffffff'}
                  value={this.state.userName}
                />
              </View>
            </View>
          </Animated.View>
  
          <ListView contentContainerStyle={styles.loveContainer}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
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
              Actions.messager();
            }}
          >
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
      alignItems: "flex-end",
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
      margin: 2,
      height: height / 15,
      // alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: "transparent",
      // backgroundColor: 'green',
      flex: 1,
      flexDirection: 'row',
      borderRadius: 15
  
    },
    avatar_image: {
      height: height / 15 - 4,
      width: height / 15 - 4,
      resizeMode: "cover",
      borderRadius: (height / 15 - 4)/2,
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
      marginBottom: 5,
    },
    chatStyle: {
      alignContent: 'space-around',
      alignItems: 'center',
      justifyContent: 'space-around',
      // backgroundColor: 'blue',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255, 0.3)',
      marginLeft: 10
    },
    informationTextContain: {
      // marginLeft: 10,
      marginRight: 5,
  
    },
    informationStyle: {
      color: '#ffff',
      fontSize: 13,
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      // marginRight: 10,
      width: width - 120,
      alignSelf: 'center'
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
    containerUserName: {
      width: width - 70,
      height: (height / 18), //48
      borderRadius: height / 28,
      backgroundColor: '#C9939D',
      // justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      // alignSelf: 'flex-end',
      marginBottom: 10,
      marginRight: 15
    },
    styleUserName: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 3,
      borderColor: 'transparent',
      fontSize: 14,
      color: '#ffffff',
      width: width - 130,
    },
  });
  
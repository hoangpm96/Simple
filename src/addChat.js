
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
    _renderRow(rowData) {
      return (
          <View style={styles.viewContainer} >
            <Image
              style={styles.avatar_image}
              source={{ uri: rowData.image }}
            />
              <View style={styles.chatStyle}>
                {/* Tên */}
                <View style={styles.informationTextContain}>
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
      )
    }
    render() {
  
      return (
        <View style={styles.background}>
          <Animated.View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                Actions.chat();
                this.Global.isFooter = true;
                this.Global.pressStatus = "chat";
              }}
              style={styles.backbutton} 
            >
              <Icon name="chevron-left" color='#ffffff' size={22} />
            </TouchableOpacity>
            <View style={styles.containerUserName}>
              <Icon name="search" color='#ffffff' size={22} style={{ marginLeft: 10 }} />
              <TextInput placeholder={'Search friend on your wish lish'} style={styles.styleUserName}
                onChangeText={username => {
                  this.setState({ userName: username });
                }}
                placeholderTextColor={'#ffffff'}
                value={this.state.userName}
              />
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
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    background: {
      alignItems: "center",
      backgroundColor: '#CC6666',
      flex: 1
    },
    headerContainer: {
      width: width,
      height: height < 812 ? 70 : 85,
      alignItems: "flex-end",
      justifyContent: 'space-between',
      backgroundColor: '#F15F66',
      flexDirection: "row"
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
      height: 40,
      flexDirection: 'row',
      borderRadius: 15,
      alignItems: 'center'
  
    },
    avatar_image: {
      height: 30,
      width: 30,
      resizeMode: "cover",
      borderRadius: 15,
      marginTop: 4,
      marginBottom: 4,
      marginLeft: 2,
      alignSelf: 'center'
    },
    chatStyle: {
      alignContent: 'space-around',
      alignItems: 'center',
      justifyContent: 'space-around',
      // backgroundColor: 'blue',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255, 0.3)',
      marginLeft: 10,
      marginTop: 5,
      marginBottom: 5,
    },
    informationTextContain: {
      flexDirection: 'row',
      marginRight: 5,
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
    containerUserName: {
      width: width - 65,
      height: height < 667 ? 36 : 40,
      borderRadius: height < 667 ? 18 : 20,
      backgroundColor: '#C9939D',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 8,
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
    backbutton: { 
      marginLeft: 15, 
      marginBottom: height < 667 ? 14 : 16,
      alignContent: 'center', 
      justifyContent: 'center',
    }
  });
  
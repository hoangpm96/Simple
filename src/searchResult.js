

import React, { Component } from "react";
import { Actions, Router, Scene } from "react-native-mobx";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Slider,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ListView,
  RefreshControl,
  Animated,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Button,
  Alert,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SimplePicker from 'react-native-simple-picker';
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
import TagInput from 'react-native-tag-input';
import Expand from 'react-native-simple-expand';
const { width, height } = Dimensions.get("window");
const data = require('./data/api.json');
const citys = ['Ha Noi', 'Quang Ngai', 'Quang Nam', 'Hai Phong', 'Can Tho', 'Da Nang', 'Lao Cai', 'Lang Son', 'Kien Giang', 'Tien Giang', 'Ho Chi Minh City', 'Long An', 'Dong Nai', 'Vung Tau', 'Hue', 'Phu Yen', 'Gia Lai', 'Daklak', 'Lam Dong', 'Quang Binh', 'Quang Tri', 'Binh Dinh', 'Binh Thuan', 'Tay Ninh', 'Binh Duong'];
const dictricts = ['Dictrict 1', 'Dictrict 2', 'Dictrict 3', 'Dictrict 4', 'Dictrict 5', 'Dictrict 6', 'Dictrict 7', 'Dictrict 8', 'Dictrict 9', 'Dictrict 10', 'Dictrict 11', 'Dictrict 12', 'Thu Duc Dictrict', 'Tan Binh Dictrict', 'Tan Phu Dictrict', 'Phu Nhuan Dictrict', 'Binh Thanh Dictrict', 'Binh Chanh Dictrict', 'Nha Be Dictrict', 'Can Gio Dictrict', 'Cu Chi Dictrict', '37', '38', '39', '40'];
const inputProps = {
  keyboardType: 'default',
  placeholder: 'hobby',
  placeholderTextColor: 'white',
  color: 'white',
  autoFocus: true,
  style: {
    fontSize: 15,
    marginVertical: Platform.OS == 'ios' ? 0 : -2,
    marginTop: 10
  },
};
autobind
observer
export default class SearchResult extends Component {

  constructor(props) {
    super(props);

    this.Global = this.props.Global;
    this.Global.isFooter = true;
    this.state = {
      tags: [],
      text: "",
      age: 18,
      selectedCity: "Select City",
      selectedDictrict: "Select Dictrict",
      sliderOneChanging: false,
      sliderOneValue: [5],
      multiSliderValue: [18, 23],
      weight: [55, 75],
      height: [150, 180],
      animatedValue: new Animated.Value(0)
    };
  }
  onChangeTags = (tags) => {
    this.setState({ tags });
  }

  onChangeText = (text) => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: "",
      });
    }
  }

  labelExtractor = (tag) => tag;

  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
  }
  weightChange = (values) => {
    this.setState({
      weight: values,
    });
  }
  heightChange = (values) => {
    this.setState({
      height: values,
    });
  }
  render() {
    const animatedValue = this.state.animatedValue;
    return (
      <ImageBackground
        source={require("./img/background01.png")}
        style={styles.background}
      >
<TouchableOpacity
          onPress={() => {
            this.Global.isFooter = true;
            this.Global.pressStatus = "search";
            Actions.search();
          }}
        >
<Text style = {{color: 'white', backgroundColor: 'blue', margin: 50, width: 130, height: 30}}>Search result</Text>

        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#F15F66'
  },
  headerContainer: {
    width: width,
    height: (height + 1000) / 21.37,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#F15F66',
    flexDirection: "row"
  },
  buttonClose: {
    width: 55,
    height: 64,
    justifyContent: "center",
    alignItems: "center"
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
  containerHobby: {
    flex: 2,
    width: width - (width / 8.33),
    alignSelf: 'center',
  },
  containerAge: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  containerWeight: {
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  containerHeight: {
    // marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  containerTextAge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - (width / 8.33),
  },
  textQA: {
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'transparent',
    marginBottom: 5,
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  toggle: {
    alignItems: 'center',
  },
  arrow: {
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: 70
  },
  arrow2: {
    marginTop: 15,
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  containerUserName: {
    width: width - (width / 8.33), //330
    height: (height / 10 - (height - 370) / 12.78), //48
    borderRadius: height / 28,
    backgroundColor: 'rgba(202,148,157,1)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  styleUserName: {
    marginLeft: 10,
    borderColor: 'transparent',
    fontSize: 14,
    color: '#ffffff',
    width: width - (width / 8.33) - 70,
  },
});



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
@autobind
@observer
export default class SearchFriend extends Component {

  constructor(props) {
    super(props);
    this.Global = this.props.Global;
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
      <View style={styles.background}>
        <Animated.View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          SEARCH
      </Text>
      </Animated.View>
        <Text style={styles.textSearch}>{this.state.open ? 'SEARCH WITH ADDRESS' : ' SEARCH AROUND'}</Text>
        <ScrollView
          style={{ width: width, height: height }}
          removeClippedSubviews={true}
        >
          <View style={styles.containerHobby}>
            <View style={styles.hobbiesTitle}>
              <Text style={styles.hobbiesText}>
                Hobbies?
          </Text>
            </View>
            <View style={styles.hobbiesContainerInput}>
              <View style={styles.hobbiesInput}>
                <TagInput
                  value={this.state.tags}
                  onChange={this.onChangeTags}
                  labelExtractor={this.labelExtractor}
                  text={this.state.text}
                  onChangeText={this.onChangeText}
                  tagColor="#FFA8AC"
                  tagTextColor="#ffffff"
                  inputProps={inputProps}
                  maxHeight={135}
                />
              </View>
            </View>
          </View>
          <View style={styles.containerAge}>
            <View style={styles.containerTextAge}>
              <Text style={styles.textQA}>Age?</Text>
              <Text style={styles.textQA}>{this.state.multiSliderValue[0]} - {this.state.multiSliderValue[1]}</Text>
            </View>
              <MultiSlider
                values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                sliderLength={width - 50}
                onValuesChange={this.multiSliderValuesChange}
                min={16}
                max={40}
                step={1}
                minimumTrackTintColor='#F15F66'
                maximumTrackTintColor='#FFA8AC'
                allowOverlap
                snapped
              />
            </View>
          <View style={{ marginTop: -15 }}>
            <Expand
              minHeight={0}
              ref="expand"
              value={this.state.open}
              animatedValue={animatedValue}>
                  <Animated.View style={styles.containerHeight}>
                      <TouchableOpacity
                        onPress={() => {
                          this.refs.picker.show();
                        }
                        }
                        style={[styles.containerUserName, { marginTop: 5 }]}
                      >
                        <Icon name="angle-down" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <Text style={{ fontSize: 14, color: '#DDDDDD', marginTop: 2, marginLeft: 10 }}>{this.state.selectedCity}</Text>

                      </TouchableOpacity>
                      <SimplePicker
                        ref={'picker'}
                        options={citys}
                        itemStyle={{
                          fontSize: 25,
                          color: '#F15F66',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                        buttonStyle={{
                          fontSize: 18,
                          color: '#F15F66',
                          fontWeight: 'bold'
                        }}
                        confirmText='Select'
                        onSubmit={(option) => {
                          this.setState({
                            selectedCity: option,
                            selectedDictrict: 'Select Dictrict'
                          });
                        }}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          this.refs.picker2.show();
                        }
                        }
                        style={[styles.containerUserName, { marginTop: 5 }]}
                      >
                        <Icon name="angle-down" color='#DDDDDD' size={24} style={{ marginLeft: 20 }} />
                        <Text style={styles.dictricts}>{this.state.selectedDictrict}</Text>

                      </TouchableOpacity>
                      <SimplePicker
                        ref={'picker2'}
                        options={dictricts}
                        itemStyle={{
                          fontSize: 25,
                          color: '#F15F66',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                        buttonStyle={{
                          fontSize: 18,
                          color: '#F15F66',
                          fontWeight: 'bold'
                        }}
                        confirmText='Select'
                        onSubmit={(option) => {
                          this.setState({
                            selectedDictrict: option,
                          });
                        }}
                      />
                  </Animated.View>
            </Expand>
              <TouchableOpacity style={styles.toggle} onPress={() => this.setState({ open: !this.state.open })}>
                <Text style={this.state.open ? styles.arrow : styles.arrow2}>{this.state.open ? 'SEARCH AROUND ▲' : 'SEARCH WITH ADDRESS ▼'}</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.Global.isFooter = true;
            this.Global.pressStatus = "search";
            Actions.searchResult();
          }}
        >
          <View style={styles.containterAdd}>
            <Icon name="search" color='#ffffff' size={23} />
          </View>
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
  buttonClose: {
    width: 55,
    height: 64,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: height < 812 ? 20 : 30,
    color: "#ffffff",
    fontSize: 28,
    fontWeight: 'bold'
  },
  containerHobby: {
    flex: 2,
    width: width < 414 ? width - 40 : width - 50,
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    backgroundColor: 'transparent'
  },
  containerTextAge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width < 414 ? width - 40 : width - 50,
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
    width: width < 414 ? width - 40 : width - 50,
    height: height < 667 ? 40 : 45,
    borderRadius: height < 667 ? 20 : 22.5,
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
    width: width < 414 ? width - 110 : width - 120,
  },
  textSearch: {
    marginTop: 20, 
    color: '#ffff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    backgroundColor: 'transparent' 
  },
  hobbiesTitle: {
    marginTop: 16, 
    height: 30, 
    backgroundColor: '#CEB7C3',
    borderTopLeftRadius: 16, 
    borderTopRightRadius: 16,
    justifyContent: 'center'
  },
  hobbiesText: {
    color: "#ffffff",
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  hobbiesContainerInput: { 
    alignItems: 'flex-start', 
    backgroundColor: 'rgba(202,148,157,1)', 
    borderBottomLeftRadius: 16, 
    borderBottomRightRadius: 16, 
    height: 150 
  },
  hobbiesInput: { 
    marginLeft: 10, 
    marginRight: 10, 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    backgroundColor: 'transparent' 
  },
  dictricts: { 
    fontSize: 14, 
    color: '#DDDDDD', 
    marginTop: 2, 
    marginLeft: 10 
  }
});

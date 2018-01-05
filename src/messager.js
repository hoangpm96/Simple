import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome";
import { Actions, Router, Scene } from "react-native-mobx";
import {GiftedChat, Actions1, Bubble, SystemMessage} from 'react-native-gifted-chat';
import CustomActions from './message/CustomActions';
import CustomView from './/message/CustomView';
const { width, height } = Dimensions.get("window");

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };
    
    this.Global = this.props.Global;
    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('./message/data/messages.js'),
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./message/data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'Huong Giang Ido is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions1
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFA8AC',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
          color: '#ffff'
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
      );
    }
    return null;
  }

  render() {
    return <View style={styles.background}>
        <Animated.View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {
              Actions.chat();
              this.Global.isFooter = true;
              this.Global.pressStatus = "chat";
            }} style={styles.backbutton}>
            <Icon name="chevron-left" color="#ffffff" size={22} />
          </TouchableOpacity>
          <View style={styles.containerUserName}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "green", fontSize: 30, marginTop: 10 }}>
                *
              </Text>
              <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
                {this.Global.selectedChatUser.username} , {this.Global.selectedChatUser.age}
              </Text>
            </View>
            <Text
              style={{ fontSize: 13, color: "#ffffff", marginLeft: 10 }}
            >
              Lass access
            </Text>
          </View>
        </Animated.View>

        <GiftedChat messages={this.state.messages} onSend={this.onSend} loadEarlier={this.state.loadEarlier} onLoadEarlier={this.onLoadEarlier} isLoadingEarlier={this.state.isLoadingEarlier} user={{ _id: 1 } // sent messages should have same user._id
          } renderActions={this.renderCustomActions} renderBubble={this.renderBubble} renderSystemMessage={this.renderSystemMessage} renderCustomView={this.renderCustomView} renderFooter={this.renderFooter} />
      </View>;
  }
}

const styles = StyleSheet.create({
  footerText: {
    fontSize: 14,
    color: '#ffff',
    backgroundColor: 'transparent',
    margin: 10
  },
  background: {
    backgroundColor: '#CC6666',
    width: width,
    height: height
  },
  headerContainer: {
    width: width,
    height: height < 812 ? 70 : 85,
    alignItems: "flex-end",
    justifyContent: 'space-between',
    backgroundColor: '#F15F66',
    flexDirection: "row"
  },
  containerUserName: {
    width: width - 70,
    height: 48, //48
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginRight: 15,
  },
  backbutton: { 
    marginLeft: 15, 
    marginBottom: height < 667 ? 14 : 16,
    alignContent: 'center', 
    justifyContent: 'center',
  }
});
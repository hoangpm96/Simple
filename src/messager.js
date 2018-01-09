import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Actions, Router, Scene } from "react-native-mobx";
import {
  GiftedChat,
  Actions1,
  Bubble,
  SystemMessage
} from "react-native-gifted-chat";
import CustomActions from "./message/CustomActions";
import CustomView from ".//message/CustomView";
const { width, height } = Dimensions.get("window");
import firebase from "firebase";
import { async } from "@firebase/util";
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loadEarlier: false,
      typingText: null,
      isLoadingEarlier: false,
      conversationId: "",
      showUserAvatar: true
    };

    this.Global = this.props.Global;
    this._isMounted = false;

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
  }

  

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    // debugger;
    // subcribe để tải tin nhắn mới
    let self = this;
    // debugger;
    firebase
      .database()
      .ref("conversations")
      // .child(this.Global.selectedConversation)
      .child(this.Global.selectedConversation)
      .child("messages")
      // .limitToLast(1)
      .on("child_added", snapshot => {
        var key = snapshot.key;
        var value = snapshot.val();
        value.id = key;
        let messageAarr = [];
        messageAarr.push(value);

        let newMessages = self.processMessage(messageAarr);
        // debugger;
        // debugger;
        self.setState(previousState => {
          return { messages: GiftedChat.append(previousState.messages, newMessages) };
        });
      });

  }


  async onLoadEarlier() {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true
      };
    });

    var rawMessage = [];
    await firebase
      .database()
      .ref("conversations")
      .child(this.Global.selectedConversation)
      .child("messages")
      .once("value", snapshot => {
        snapshot.forEach(function(child) {
          var key = child.key;
          var value = child.val();
          value.id = key;
          rawMessage.push(value);
        });
      });
    let oldMessage = this.processMessage(rawMessage);
    if (this._isMounted === true) {
      this.setState(previousState => {
        return {
          messages: GiftedChat.prepend(previousState.messages, oldMessage),
          loadEarlier: false,
          isLoadingEarlier: false
        };
      });
    }
  }

  processMessage = messages => {
    var arr = [];
    for (const ele of messages) {
      let message = {};
      message.text = ele.text;
      message._id = ele.id;
      message.createdAt = ele.createdAt;
      // Không phải tin của user hiện tại
      const userId = ele.senderId == this.Global.currentUserId ? 1 : 2;
      const avatarUrl = ele.senderId == this.Global.currentUserId ? this.Global.currentUserAvatar : this.Global.selectedChatUser.avatarUrl;
      message.user = {
        _id: userId,
        name: ele.username,
        avatar: avatarUrl

      };
      message.createdAt = new Date(ele.createdAt);
      arr.push(message);
    }
    return arr;
  };

  onSend = async (messages = []) => {
    // tạo conversation nếu là lần đầu ( cho có tin nhắn )

    // update lại converstaion trong node users

    let self = this;
    try {
      await firebase
        .database()
        .ref("conversations")
        .child(this.Global.selectedConversation)
        .child("messages")
        .push({
          text: messages[0].text,
          createdAt: messages[0].createdAt.toString(),
          senderId: this.Global.currentUserId,
          username: this.Global.currentUsername
        });
      // console.log(result);

      // this.setState(previousState => {
      //   return {
      //     messages: GiftedChat.append(previousState.messages, messages)
      //   };
      // });
    } catch (error) {
      console.log(error);
    }

    // for demo purpose
    // this.answerDemo(messages);
  };

  answerDemo(messages) {
    if (messages.length > 0) {
      if (messages[0].image || messages[0].location || !this._isAlright) {
        this.setState(previousState => {
          return {
            typingText: "Huong Giang Ido is typing"
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive("Nice picture!");
          } else if (messages[0].location) {
            this.onReceive("My favorite place");
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive("Alright");
            }
          }
        }
      }

      this.setState(previousState => {
        return {
          typingText: null
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 10000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://facebook.github.io/react/img/logo_og.png"
          }
        })
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === "ios") {
      return <CustomActions {...props} />;
    }
    const options = {
      "Action 1": props => {
        alert("option 1");
      },
      "Action 2": props => {
        alert("option 2");
      },
      Cancel: () => {}
    };
    return <Actions1 {...props} options={options} />;
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#FFA8AC"
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
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14,
          color: "#ffff"
        }}
      />
    );
  }

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return <Text style={styles.footerText}>{this.state.typingText}</Text>;
    }
    return null;
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
            <Icon name="chevron-left" color="#ffffff" size={22} />
          </TouchableOpacity>
          <View style={styles.containerUserName}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "green", fontSize: 30, marginTop: 10 }}>
                *
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 10
                }}
              >
                {this.Global.selectedChatUser.username} ,{" "}
                {this.Global.selectedChatUser.age}
              </Text>
            </View>
            <Text style={{ fontSize: 13, color: "#ffffff", marginLeft: 10 }}>
              Lass access
            </Text>
          </View>
        </Animated.View>

        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          user={
            { _id: 1 } // sent messages should have same user._id
          }
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          renderSystemMessage={this.renderSystemMessage}
          renderCustomView={this.renderCustomView}
          renderFooter={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerText: {
    fontSize: 14,
    color: "#ffff",
    backgroundColor: "transparent",
    margin: 10
  },
  background: {
    backgroundColor: "#CC6666",
    width: width,
    height: height
  },
  headerContainer: {
    width: width,
    height: height < 812 ? 70 : 85,
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#F15F66",
    flexDirection: "row"
  },
  containerUserName: {
    width: width - 70,
    height: 48, //48
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginBottom: 10,
    marginRight: 15
  },
  backbutton: {
    marginLeft: 15,
    marginBottom: height < 667 ? 14 : 16,
    alignContent: "center",
    justifyContent: "center"
  }
});

import { observable, autorun } from "mobx";
import { autobind } from "core-decorators";
import React, { Component } from "react";
import { Animated } from "react-native";
import { observer } from "mobx-react/native";

@autobind
class Global {
  constructor(props) {}
  @observable dataMenu = [];

  formatThousand(x, a) {
    x = String(x);
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, a);
  }
  // For registerInfo.js
  @observable registerAge = 1;
  @observable registerTags = [];
  @observable registerIsMale = false;
  @observable isFooter = false;

  // 
  


  @observable myCart = [];
  @observable pressStatus = "love";


  @observable activityIndicator = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80
  };
  @observable APP_NAME = "Simple";

  @observable firstLogin = false;

}
const global = new Global();
export default global;

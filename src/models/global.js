import { observable, autorun } from "mobx";
import { autobind } from "core-decorators";
import React, { Component } from "react";
import { Animated } from "react-native";
import { observer } from "mobx-react/native";

@autobind
class Global {
    constructor(props){}
  @observable dataMenu = [];

  formatThousand(x, a) {
    x = String(x);
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, a);
  }
  @observable isFooter = false;
  @observable myCart = [];
  @observable pressStatus = "love";
}
const global = new Global();
export default global;

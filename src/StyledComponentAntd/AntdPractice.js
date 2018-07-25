import React, { Component} from "react";
import { DatePicker } from "antd";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

export function DataPickerAnt(){
  return (
    <DatePicker />
  );
}

export class App extends Component {
  render() {
    return (
      <DataPickerAnt />
    );
  }
}
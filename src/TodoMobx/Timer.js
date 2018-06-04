import React from "react";
import ReactDOM from "react-dom";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
class TimerView extends React.Component {
  render() {
    return (
      <button onClick={this.onReset.bind(this)}>
        Seconds passed: {this.props.appState.timer}
      </button> );
  };

  onReset () {
    this.props.appState.resetTimer();
  }
};

var appState = observable({
  timer: 0
});

appState.resetTimer = action(() => {
  appState.timer = 0;
});

setInterval(action(() => {
  appState.timer += 1;
}), 1000);

ReactDOM.render(<TimerView appState={appState} />, document.getElementById("root"));
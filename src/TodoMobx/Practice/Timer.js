import React from "react";
import ReactDOM from "react-dom";
import { observable, action, trace } from "mobx";
import { observer } from "mobx-react";
import Devtools from "mobx-react-devtools";

@observer
class TimerView extends React.Component {
  render() {
    // trace(true);
    const {timer} = this.props.appState;
    return (
      <button onClick={this.onReset.bind(this)}>
        Seconds passed: {timer}
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

const App = () => (
  <div>
    <TimerView appState={appState} />
    
    <Devtools />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
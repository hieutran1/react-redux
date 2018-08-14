import React, { Component } from "react";
import ReactDOM from 'react-dom'

class Counter extends Component {
  //MOUNTING
  constructor(props) {
    super(props);
    console.log("child - constructor", "props: ", props);
  }
  //MOUNTING
  componentWillMount() {
    // THIS GET FIRED BEFORE RENDER METHODS
    console.log("child - componentWillMount fired");
  }

  //MOUNTING
  componentDidMount() {
    // FOR setState AND FETCH DATA FOR API OR OUR JSON FILE
    console.log("child - componentDidMount fired");
  }

  //UPDATING
  componentWillReceiveProps(nextProps) {
    //WHEN COMPONENT WILL RECEIVE NEW PROPS FROM PARENT
    console.log("child - componentWillReceiveProps fired, nextProps:", nextProps);
  }

  //UPDATING
  shouldComponentUpdate(nextProps, nextState) {
    // LET REACT KNOW IF A COMPONENT'S OUTPUT IS NOT AFFECTED BY THE CURRENT CHANGE IN STATE/PROPS
    console.log("child - shouldComponentUpdate fired");
    return true;
  }

  //UPDATING
  componentWillUpdate(nextProps, nextState) {
    // WHEN THERE IS A CHANGE IN STATE AND THE COMPONENT WILL RE-RENDER AND CAN COMPARE NEW PROPS/STATE WITH CURRENT STATE/PROPS
    console.log(
      "child - componentWillUpdate, nextProps:",
      nextProps,
      " nextState:",
      nextState
    );
  }

  //UPDATING
  componentDidUpdate(prevProps, prevState) {
    //WHEN THE COMPONENT RE-RENDERED AND CAN COMPARE PREVIOUS PROPS/STATE WITH NEW STATE/PROPS
    console.log(
      "child - componentDidUpdate, prevProps:",
      prevProps,
      " prevState:",
      prevState
    );
  }

  render() {
    console.log("child - render fired");
    return (
      <div>
        Counter value: {this.props.counter}
      </div>
    );
  }
}

export default Counter;

export class App extends Component {
    //MOUNTING
    constructor(props) {
      super(props);
      this.state = {
        counter: 0
      };
      console.log("parent - constructor");
    }

    // MOUNTING
    componentWillMount() {
      // THIS GET FIRED BEFORE RENDER METHODS
      console.log("parent - componentWillMount fired");
    }

    //MOUNTING
    componentDidMount() {
      // FOR setState AND FETCH DATA FOR API OR OUR JSON FILE
      console.log("parent - componentDidMount fired");
    }

    //UPDATING
    componentWillReceiveProps(nextProps) {
      //WHEN COMPONENT WILL RECEIVE NEW PROPS FROM PARENT
      console.log("parent - componentWillReceiveProps fired, nextProps:", nextProps);
    }

    //UPDATING
    shouldComponentUpdate(nextProps, nextState) {
      // LET REACT KNOW IF A COMPONENT'S OUTPUT IS NOT AFFECTED BY THE CURRENT CHANGE IN STATE/PROPS
      console.log("parent - shouldComponentUpdate fired");
      return true;
    }

    //UPDATING
    componentWillUpdate(nextProps, nextState) {
      // WHEN THERE IS A CHANGE IN STATE AND THE COMPONENT WILL RE-RENDER AND CAN COMPARE NEW PROPS/STATE WITH CURRENT STATE/PROPS
      console.log(
        "parent - componentWillUpdate, nextProps:",
        nextProps,
        " nextState:",
        nextState
      );
    }

    //UPDATING
    componentDidUpdate(prevProps, prevState) {
      //WHEN THE COMPONENT RE-RENDERED AND CAN COMPARE PREVIOUS PROPS/STATE WITH NEW STATE/PROPS
      console.log(
        "parent - componentDidUpdate, prevProps:",
        prevProps,
        " prevState:",
        prevState
      );
    }

    incrementCounter = () => {
        this.setState({
            counter: ++this.state.counter
        });
    };

    //MOUNTING & UPDATING
    render() {
        console.log("parent - render");
        return (
            <div>
                <Counter counter={this.state.counter} />
                <button onClick={this.incrementCounter}>Click1</button>
            </div>
        );
    }
}
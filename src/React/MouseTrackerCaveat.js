import React from 'react';
import ReactDOM from 'react-dom';
import './MouseTracker.css';

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      // <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      <div style={{ position: 'absolute', left: mouse.x, top: mouse.y, 
        backgroundColor: 'yellow', height: '20px', width: '20px'}}></div>
    );
  }
}

class Mouse extends React.PureComponent {
  static defaultProps = {
    offsetX: 0,
    offsetY: 0,
  }

  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 10, y: 10 };
  }

  handleMouseMove(event) {
    console.log('Mouse Move - clientX: ', event.clientX,
    ', clientY: ', event.clientY);
    this.setState({
      x: event.clientX - this.props.offsetX,
      y: event.clientY - this.props.offsetY
    });
  }

  render() {
    return (
      <div style={{ height: '200px', width: '200px', backgroundColor: 'green', position:'relative'}} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        {/*
          This is bad! The value of the `render` prop will
          be different on each render.
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} {...this.props} />
      </div>
    );
  }
}

class MouseTrackerResolve extends React.Component {
  // Defined as an instance method, `this.renderTheCat` always
  // refers to *same* function when we use it in render
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <div>Resolve caveat</div>
        <Mouse render={this.renderTheCat} {...this.props}/>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.forceRender = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    this.forceRender();
  }
  
  render() {
    return (
      <div>
        <MouseTracker />
        <MouseTrackerResolve offsetY={218} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />, document.getElementById('root')
);
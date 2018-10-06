import React from 'react';
import { render } from 'react-dom';
import './MouseTracker.css';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
function withMouse(WrappedComponent) {
  class WithMouse extends React.Component {
    render() {
      return (
        // <Mouse render={mouse => (
        //   <WrappedComponent {...this.props} mouse={mouse} />
        // )}/>
        <Mouse>
          {mouse => (
            <WrappedComponent {...this.props} mouse={mouse} />
          )}
        </Mouse>
      );
    }
  }
  WithMouse.displayName = `withMouse(${getDisplayName(WrappedComponent)})`;
  return WithMouse;
}

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

class MouseWithCat extends React.Component {
  static defaultProps = {
    offsetX: 0,
    offsetY: 0
  };

  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX - this.props.offsetX,
      y: event.clientY - this.props.offsetY
    });
  }

  render() {
    return (
      <div style={{ height: '200px', width: '200px', backgroundColor: 'green', position:'relative'}} onMouseMove={this.handleMouseMove}>

        {/*
          We could just swap out the <p> for a <Cat> here ... but then
          we would need to create a separate <MouseWithSomethingElse>
          component every time we need to use it, so <MouseWithCat>
          isn't really reusable yet.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
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
        {this.props.children(this.state)}
      </div>
    );
  }
}

Mouse.defaultProps = {
  offsetX: 0,
  offsetY: 0
};

// Mouse.propTypes = {
//   children: PropTypes.func.isRequired,
// }

class MouseTracker extends React.Component {
  render() {
    const WithMouseCat = withMouse(Cat);
    return (
      <div style={{display: 'flex'}}>
        <div style={{marginRight: '10px'}}>
          <div>Higher-Order Component</div>
          <WithMouseCat />
        </div>
        <div style={{marginRight: '10px'}}>
          <div>Miss Mouse & Cat components</div>
          <MouseWithCat offsetX={210}/>
        </div>
        <div>
          {/* <Mouse render={mouse => (
          <Cat mouse={mouse} />
          )}/> */}
          <div>Use Cat component is children of Mouse</div>
          <Mouse offsetX={420}>
            {mouse => (
              <Cat mouse={mouse} />
            )}
          </Mouse>
        </div>
      </div>
    );
  }
}

render(
  <MouseTracker />, document.getElementById('root')
);

import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { last, get } from "lodash/fp";

class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.persons.length < this.props.persons.length) {
      const persons = this.listRef.current;
      console.log('getSnapshotBeforeUpdate- scrollHeight:', persons.scrollHeight, ', scrollTop', persons.scrollTop,
      ', snapshot = scrollHeight - scrollTop : ', persons.scrollHeight - persons.scrollTop);
      return persons.scrollHeight - persons.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const persons = this.listRef.current;
      persons.scrollTop = persons.scrollHeight - snapshot;
      console.log('componentDidUpdate - scrollHeight:', persons.scrollHeight, 
        ', scrollTop = scrollHeight - snapshot = ', persons.scrollTop);
    }
  }
  
  render() {
    const {persons} = this.props;
    const list = persons.map((item) => (
      <div key={item.Id}>{item.Name}</div>
    ));
    return (
      <div ref={this.listRef} style={{overflow: 'auto', height:'100px'}}>
        {list}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      persons: [
        {Id: 0, Name: 'hieu'},
        {Id: 1, Name: 'hieu'},
        {Id: 2, Name: 'hieu'},
        {Id: 3, Name: 'hieu'},
        {Id: 4, Name: 'hieu'},
        {Id: 5, Name: 'hieu'},
      ]
    }
  }

  onChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  addPerson = (event) => {
    const max = get("Id", last(this.state.persons));
    this.setState({
      persons: [...this.state.persons, {Id: max + 1, Name: this.state.name}]
    })
    event.preventDefault();
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.addPerson}>
          <input type="text" value={this.state.name} onChange={this.onChange} />
          <input type="submit" value="Add"/>
        </form>
        <ScrollingList persons={this.state.persons} />
      </Fragment>
      
    );
  }
}

render(
  <App />, document.getElementById('root')
);
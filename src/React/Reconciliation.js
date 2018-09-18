import React, { Component } from "react";
import ReactDOM from 'react-dom';

const ToDo = props => (
  <tr>
    <td>
      <label>{props.id}</label>
    </td>
    <td>
      <input />
    </td>
    <td>
      <label>{props.createdAt.toTimeString()}</label>
    </td>
  </tr>
);

class ToDoList extends React.Component {
  constructor() {
    super();
    const date = new Date();
    const toDoCounter = 1;
    this.state = {
      list: [
        {
          id: toDoCounter,
          createdAt: date,
        },
      ],
      toDoCounter: toDoCounter,
    };
  }

  sortByEarliest() {
    const sortedList = this.state.list.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
    this.setState({
      list: [...sortedList],
    });
  }

  sortByLatest() {
    const sortedList = this.state.list.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    this.setState({
      list: [...sortedList],
    });
  }

  addToEnd() {
    const date = new Date();
    const nextId = this.state.toDoCounter + 1;
    const newList = [
      ...this.state.list,
      {id: nextId, createdAt: date},
    ];
    this.setState({
      list: newList,
      toDoCounter: nextId,
    });
  }

  addToStart() {
    const date = new Date();
    const nextId = this.state.toDoCounter + 1;
    const newList = [
      {id: nextId, createdAt: date},
      ...this.state.list,
    ];
    this.setState({
      list: newList,
      toDoCounter: nextId,
    });
  }

  render() {
    return (
      <div>
        <code>key=id</code>
        <br />
        <button onClick={this.addToStart.bind(this)}>
          Add New to Start
        </button>
        <button onClick={this.addToEnd.bind(this)}>
          Add New to End
        </button>
        <button onClick={this.sortByEarliest.bind(this)}>
          Sort by Earliest
        </button>
        <button onClick={this.sortByLatest.bind(this)}>
          Sort by Latest
        </button>
        <table>
          <tr>
            <th>ID</th>
            <th />
            <th>created at</th>
          </tr>
          {this.state.list.map((todo, index) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </table>
      </div>
    );
  }
}

const Person = props => (
  <tr>
    <td>
      <label>{props.year}</label>
    </td>
    <td>
      <input />
    </td>
    <td>
      <label>{props.name}</label>
    </td>
  </tr>
);

class PersonList extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [
        {
          name: 'Duke',
          year: 2015
        },
        {
          name: 'Villanova',
          year: 2016
        },
      ],
    };
  }

  sortByEarliest() {
    const sortedList = this.state.list.sort((a, b) => {
      return a.year - b.year;
    });
    this.setState({
      list: [...sortedList],
    });
  }

  sortByLatest() {
    const sortedList = this.state.list.sort((a, b) => {
      return b.year - a.year;
    });
    this.setState({
      list: [...sortedList],
    });
  }

  addToEnd() {
    const newList = [
      ...this.state.list,
      {name: 'hieu', year: 2017},
    ];
    this.setState({
      list: newList
    });
  }

  addToStart() {
    const newList = [
      {name: 'Connecticut', year: 2014},
      ...this.state.list,
    ];
    this.setState({
      list: newList,
    });
  }

  render() {
    return (
      <div>
        <code>key=id</code>
        <br />
        <button onClick={this.addToStart.bind(this)}>
          Add New to Start
        </button>
        <button onClick={this.addToEnd.bind(this)}>
          Add New to End
        </button>
        <button onClick={this.sortByEarliest.bind(this)}>
          Sort by Earliest
        </button>
        <button onClick={this.sortByLatest.bind(this)}>
          Sort by Latest
        </button>
        <table>
          <thead>
            <tr>
              <th>year</th>
              <th />
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((person, index) => (
              <Person key={person.year} {...person} />
              // <Person {...person} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

ReactDOM.render(
  <PersonList />,
  document.getElementById('root')
);

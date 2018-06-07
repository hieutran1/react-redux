import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import ObservableTodoStore from "../Store/ObservableTodoStore";
import Devtools from "mobx-react-devtools";
import { observable } from "mobx";

@observer
class TodoList extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        { store.report }
        <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
        </ul>
        { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
        <button onClick={ this.onNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>
        <RenderCounter />
      </div>
    );
  }

  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }
}

@observer
class TodoView extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={ this.onRename }>
        <input
          type='checkbox'
          checked={ todo.completed }
          onChange={ this.onToggleCompleted }
        />
        { todo.task }
        { todo.assignee
          ? <small>{ todo.assignee.name }</small>
          : null
        }
        <RenderCounter />
      </li>
    );
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }
}

@observer
class RenderCounter extends React.Component {
  render() {
    return (<div></div>);
  }
}

@observer
class MyName extends React.Component {
  render() {
    const peopleStore = this.props.store;
    return (
      <input onKeyUp={(e) => peopleStore[1].name = e.target.value } />
    )
  }
}

const observableTodoStore = new ObservableTodoStore();
observableTodoStore.addTodo("read MobX tutorial");
observableTodoStore.addTodo("try MobX");
observableTodoStore.todos[0].completed = true;
observableTodoStore.todos[1].task = "try MobX in own project";
observableTodoStore.todos[0].task = "grok MobX tutorial";
observableTodoStore.pendingRequests++;
setTimeout(() => {
  observableTodoStore.addTodo('Random Todo ' + Math.random());
  observableTodoStore.pendingRequests--;
}, 2000);

var peopleStore = observable([
  { name: "Michel" },
  { name: "Me" }
]);
observableTodoStore.todos[0].assignee = peopleStore[0];
observableTodoStore.todos[1].assignee = peopleStore[1];
peopleStore[0].name = "Michel Weststrate";

const App = () => (
  <div>
    <TodoList store={ observableTodoStore } />
    <MyName store={ peopleStore } />

    <Devtools />
  </div>
);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


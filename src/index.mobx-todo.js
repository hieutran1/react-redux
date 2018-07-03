import 'todomvc-common';
import TodoStore from './TodoMobx/Stores/TodoStore';
import ViewStore from './TodoMobx/Stores/ViewStore';
import TodoApp from './TodoMobx/Components/TodoApp';
import React from 'react';
import ReactDOM from 'react-dom';

const initialState = window.initialState && JSON.parse(window.initialState) || {};

var todoStore = TodoStore.fromJS(initialState.todos || []);
var viewStore = new ViewStore();

todoStore.subscribeServerToStore();

ReactDOM.render(
	<TodoApp todoStore={todoStore} viewStore={viewStore}/>,
	document.getElementById('todoapp')
);

if (module.hot) {
  module.hot.accept('./TodoMobx/Components/TodoApp', () => {
    var NewTodoApp = require('./TodoMobx/Components/TodoApp').default;
    ReactDOM.render(
      <NewTodoApp todoStore={todoStore} viewStore={viewStore}/>,
      document.getElementById('todoapp')
    );
  });
}


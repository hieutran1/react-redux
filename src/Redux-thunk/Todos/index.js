import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducers from './todosReducer';
import Todos from './TodosComponent';
import fetchTodos from './todosAction';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware));

// store.dispatch(fetchTodos()).then(() => console.log(store.getState()));

render(
  <Provider store={store}>
    <Todos />
  </Provider>,
  document.getElementById('root')
);
import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware, Provider } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import mySaga from './sagas';
import User from "./UserComponent";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

// then run the saga
sagaMiddleware.run(mySaga);

// render the application
render(
  <Provider store={store}>
    <User />
  </Provider>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { Counter } from './Counter';

//
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// ...
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

// rest unchanged
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  );
}
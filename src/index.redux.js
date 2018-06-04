import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Todos/Reducers/reducers";
import App from "./Todos/ContainerComponents/App";

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById("root"));

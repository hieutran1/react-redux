import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import styled, { ThemeProvider } from "styled-components";
import StyledComponentAntd from "./StyledComponentAntd/StyledComponentAntd";

const store = createStore(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <StyledComponentAntd />
  </Provider>,
   document.getElementById("root"));
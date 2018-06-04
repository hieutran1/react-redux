import { createStore } from "redux";
import {rootReducer } from '../Reducers/reducers';

export const store = createStore(rootReducer);

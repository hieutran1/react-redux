import { createStore } from "redux";
import reducers from '../Reducers/reducers';

export const store = createStore(reducers);

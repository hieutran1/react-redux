import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../AsyncActions/AsyncReducers";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState){
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunk,
      loggerMiddleware
    )
  );
}
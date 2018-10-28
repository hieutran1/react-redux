import { REQUEST_TODOS, RECEIVE_TODOS, FAILURE_TODOS } from "./todosAction";
import { combineReducers } from "redux";

const todosReducer = (
  state = {
    isFetching: false,
    didInvalidate: false,
    todos: [],
    error: ''
  }, action) => {
  switch(action.type) {
    case REQUEST_TODOS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_TODOS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        todos: action.todos
      });
    case FAILURE_TODOS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todosReducer
});

export default rootReducer;
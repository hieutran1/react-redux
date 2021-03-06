import { combineReducers } from "redux";
import { SET_VISIBILITY_FILTER, ADD_TODO, TOGGLE_TODO, VisibilityFilters } from "../Actions/actions";

const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL , action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action){
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state, 
        {
          id: state[state.length - 1] ? state[state.length - 1].id + 1: 1,
          text: action.text, 
          completed: false
        }];
    case TOGGLE_TODO:
        return state.map((todo, index) => {
          if(index === action.index) {
            return Object.assign({}, todo, { completed: !todo.completed });
          }
          return todo;
        });
    default:
      return state;
  }
}

export default combineReducers({
  visibilityFilter,
  todos
});
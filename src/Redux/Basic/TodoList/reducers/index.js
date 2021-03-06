import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  todos,
  visibilityFilter
});

// this is equivalent to:
// export default function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }
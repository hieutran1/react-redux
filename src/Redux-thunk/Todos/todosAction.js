export const REQUEST_TODOS = 'REQUEST_TODOS';
function requestTodos() {
  return {
    type: REQUEST_TODOS
  };
}

export const RECEIVE_TODOS = 'RECEIVE_TODOS';
function receiveTodos(todos) {
  return {
    type: RECEIVE_TODOS,
    todos
  };
}

export default function fetchTodos() {
  return dispatch => {
    dispatch(requestTodos());
    return fetch('/data/todos.json')
      .then(response => response.json())
      .then(
        todos => {
          setTimeout(() => {
            dispatch(receiveTodos(todos));
          }, 2000);
        }
      );
  };
}

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import fetchTodos from './todosAction';

const Todo = ({todo}) => (
  <div>Id: {todo.id}, task: {todo.description}</div>
);

const Todos = ({todos}) => {
  return (
    todos.map((todo) => {
      return (<Todo key={todo.id} todo={todo} />);
    })
  );
}

class TodosComponent extends Component {
  componentDidMount(){
    this.props.getTodos();
  }
  handleRefreshClick = () => {
    this.props.getTodos();
  }
  render() {
    const { todos, isFetching, error } = this.props;

    return (
      <div>
        {!error && (
          <div>{error}</div>
        )}
        {!isFetching && (
          <button onClick={this.handleRefreshClick}>Refresh</button>
        )}

        {isFetching && todos.length === 0 && <h2>Loading...</h2>}
        {todos.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Todos todos={todos} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { todosReducer } = state;
  const { todos, isFetching, error } = todosReducer
  || {
    todos: [],
    isFetching: true
  };
  return {
    todos,
    isFetching,
    error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(fetchTodos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosComponent);
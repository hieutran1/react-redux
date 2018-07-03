import { observable, reaction, computed } from "mobx";
import uuid from "node-uuid";
import Todo from "../Model/Todo";

export class TodoStore {
  authorStore;
  transportLayer;
  @observable todos = [];
  @observable isLoading = true;

  constructor(rootStore, transportLayer, authorStore) {
    this.rootStore = rootStore;
    this.authorStore = authorStore; // Store that can resolve authors for us
    this.transportLayer = transportLayer; // Thing that can make server requests for us
    this.transportLayer.onReceiveTodoUpdate(updatedTodo => this.updateTodoFromServer(updatedTodo));
    this.loadTodos();
  }

  /**
   * Fetches all todo's from the server
   */
  loadTodos() {
    this.isLoading = true;
    this.transportLayer.fetchTodos().then(fetchedTodos => {
      fetchedTodos.forEach(json => this.updateTodoFromServer(json));
      this.isLoading = false;
    })
  }

  /**
  * Update a todo with information from the server. Guarantees a todo
  * only exists once. Might either construct a new todo, update an existing one,
  * or remove an todo if it has been deleted on the server.
  */
  updateTodoFromServer(json) {
    var todo = this.todos.find(todo => todo.id === json.id);
    if(!todo) {
      todo = new Todo(this, json.id);
      this.todos.push(todo);
    }
    if(json.isDeleted) {
      this.removeTodo(todo);
    } else {
      todo.updateFromJson(json);
    }
  }

  /**
  * Creates a fresh todo on the client and server
  */
  createTodo() {
    var todo = new Todo(this);
    this.todos.push(todo);
    return todo;
  }

  /**
  * A todo was somehow deleted, clean it from the client memory
  */
 removeTodo(todo) {
   this.todos.splice(this.todos.indexOf(todo), 1);
   todo.dispose();
 }
}

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.todoStore = new TodoStore(this);
  }
}

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  getTodos(user) {
    // access todoStore through the root store
    return this.rootStore.todoStore.todos.filter(todo => todo.author === user)
  }
}

class TodoStore {
  @observable todos = [];

  constructor(rootStore) {
    this.rootStore = rootStore
  }
}
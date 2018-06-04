import { observable, autorun } from "mobx";

var todoStore = observable({
  // some observable state
  todos: [],

  // a derived value
  get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }
});

// a function that observes the state
autorun(function () {
  console.log("Completed $d of $d items",
              todoStore.completedCount,
            todoStore.todos.length);
});

// .. and some actions that modify the state
todoStore.todos[0] = {
  title: "Take a walk",
  completed: false
};
todoStore.todos[0].completed = true;
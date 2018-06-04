import React from "react";
import AddTodo from "./AddTodo";
import Footer from "../PresentationalComponents/Footer";
import VisibleTodoList from "./VisibleTodoList";

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
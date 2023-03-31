import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";

function App() {
  const [todoList, setTodoList] = useState(
    () => JSON.parse(localStorage.getItem("todoList")) || []
  );

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      //check if the current todo is empty or only white space
      return;
    }
    todo["text"] = todo["text"].replace(/\s+/g, " "); //trim extra spaces
    setTodoList([...todoList, todo]);
  };

  const deleteTodo = (event, todoId) => {
    event.stopPropagation();
    setTodoList((oldTodos) => oldTodos.filter((todo) => todo.id !== todoId));
  };

  const toggleCompleted = (todoId) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const clearCompleted = () => {
    setTodoList((oldTodos) => oldTodos.filter((todo) => !todo.completed));
  };

  return (
    <div className="container">
      <div className="sub-con">
        <Header />
        <main>
          <Input onSubmit={addTodo} />
          <List
            todoList={todoList}
            setTodoList={setTodoList}
            deleteTodo={deleteTodo}
            toggleCompleted={toggleCompleted}
            clearCompleted={clearCompleted}
          />
        </main>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import React, { useReducer } from "react";
import { Home } from "../home/home";
import { ToDo } from "../todo/todo";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Chat } from "../chat/chat";
import { TodoProvider } from "./context";
/*
var initialList = [];
const changeToDoListReducer = (state, action) => {
  var newTodos = [];
  switch (action.type) {
    case "addItem":
      newTodos = [...state, { text: action.text, isCompleted: false }];
      return newTodos;

    case "removeItem":
      newTodos = [...state];
      newTodos.splice(action.index, 1);
      return newTodos;

    case "completeItem":
      newTodos = [...state];
      newTodos[action.index].isCompleted = true;
      return newTodos;

    default:
      throw new Error(`Count Reducer does not recognize ${action.type}`);
  }
};

export const ListContext = React.createContext();
*/
function App() {
  /*const [toDoState, dispatchChangeToDoList] = useReducer(
    changeToDoListReducer,
    initialList
  );*/

  return (
    <TodoProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </HashRouter>
    </TodoProvider>
  );
}

export default App;

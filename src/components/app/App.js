import "./App.css";
import React, { useReducer } from "react";
import { Home } from "../home/home";
import { ToDo } from "../todo/todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";

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

function App() {
  const [toDoState, listDispatch] = useReducer(
    changeToDoListReducer,
    initialList
  );

  return (
    <ListContext.Provider
      value={{ listState: toDoState, listDispatch: dispatchChangeToDoList }}
    >
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/todo"
              element={<ToDo dispatchChangeToDoList />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ListContext.Provider>
  );
}

export default App;

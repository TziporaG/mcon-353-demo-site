import React, { useReducer } from "react";

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

export const TodoContext = React.createContext();

export const TodoProvider = (props) => {
  const [toDoState, dispatchChangeToDoList] = useReducer(
    changeToDoListReducer,
    initialList
  );

  return (
    <TodoContext.Provider
      value={{
        listState: toDoState,
        listDispatch: dispatchChangeToDoList,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

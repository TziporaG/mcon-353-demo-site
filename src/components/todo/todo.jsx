import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { pink } from "@mui/material/colors";

function ToDoItem(props) {
  const completeTodo = (index) => {
    const newTodos = [...props.todos];
    newTodos[props.index].isCompleted = true;
    props.setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...props.todos];
    newTodos.splice(props.index, 1);
    props.setTodos(newTodos);
  };

  return (
    <table
      style={{
        textDecoration: props.todo.isCompleted ? "line-through" : "",
        width: "100%",
        borderBottom: "1px solid #e91e63",
        fontStyle: "normal",
        color: props.todo.isCompleted ? pink[200] : "",
      }}
    >
      <tr>
        <td style={{ width: "10%" }}>
          <CheckCircleOutlineIcon
            fontSize="large"
            onClick={() => completeTodo(props.index)}
          />
        </td>
        <td style={{ width: "80%", textAlign: "left" }}>{props.todo.text}</td>

        <td style={{ width: "10%" }}>
          <DeleteOutlineIcon
            sx={{ color: pink[300] }}
            fontSize="large"
            onClick={() => removeTodo(props.index)}
          ></DeleteOutlineIcon>
        </td>
      </tr>
    </table>
  );
}

function TodoInputItem({ addTodo }) {
  const [inputToDoItem, setInputToDoItem] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputToDoItem) return;
    addTodo(inputToDoItem);
    setInputToDoItem("");
  };

  return (
    <div style={{ width: "100%" }}>
      <AddCircleOutlineIcon
        fontSize="large"
        onClick={handleSubmit}
      ></AddCircleOutlineIcon>
      <input
        className="input"
        value={inputToDoItem}
        onChange={(e) => setInputToDoItem(e.target.value)}
        placeholder=" type here"
      ></input>
    </div>
  );
}

export const ToDo = () => {
  const [todos, setTodos] = React.useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1 className="App-sub-header">To Do</h1>

      <TodoInputItem addTodo={addTodo} />
      <p
        style={{
          border: "5px solid #e91e63",
          width: "65%",
          height: "500px",
          marginTop: "10px",
          padding: "0px",
        }}
      >
        {todos.map((todo, index) => (
          <ToDoItem
            key={index}
            index={index}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </p>
    </div>
  );
};

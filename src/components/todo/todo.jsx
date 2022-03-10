import React, { useContext } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { pink } from "@mui/material/colors";
import { ListContext } from "../app/App";

function ToDoItem(props) {
  const listContext = useContext(ListContext);

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
      <tbody>
        <tr>
          <td style={{ width: "10%" }}>
            <CheckCircleOutlineIcon
              fontSize="large"
              onClick={() =>
                listContext.listDispatch({
                  type: "completeItem",
                  index: props.index,
                })
              }
            />
          </td>
          <td style={{ width: "80%", textAlign: "left" }}>{props.todo.text}</td>

          <td style={{ width: "10%" }}>
            <DeleteOutlineIcon
              sx={{ color: pink[300] }}
              fontSize="large"
              onClick={() =>
                listContext.listDispatch({
                  type: "removeItem",
                  index: props.index,
                })
              }
            ></DeleteOutlineIcon>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function TodoInputItem() {
  const listContext = useContext(ListContext);
  const [inputToDoItem, setInputToDoItem] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputToDoItem) return;
    listContext.listDispatch({
      type: "addItem",
      text: inputToDoItem,
    });
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
  const listContext = useContext(ListContext);

  return (
    <div className="App">
      <h1 className="App-sub-header">To Do</h1>

      <TodoInputItem />
      <span id="displayBox">
        {listContext.listState.map((todo, index) => (
          <ToDoItem
            key={index}
            index={index}
            todo={todo}
            todos={listContext.listState}
          />
        ))}
      </span>
    </div>
  );
};

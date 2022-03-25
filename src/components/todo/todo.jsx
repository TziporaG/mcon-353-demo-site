import React, { useContext } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { pink } from "@mui/material/colors";
import { TodoContext } from "../app/context";

function ToDoItem(props) {
  const listContext = useContext(TodoContext);

  return (
    <table
      data-testid="to-do-item"
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
              data-testid="complete-to-do"
              fontSize="medium"
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
              data-testid="remove-to-do"
              sx={{ color: pink[300] }}
              fontSize="medium"
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
  const listContext = useContext(TodoContext);
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
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div>
        <AddCircleOutlineIcon
          data-testid="to-do-input-button"
          fontSize="meduim"
          onClick={handleSubmit}
        ></AddCircleOutlineIcon>
        <input
          data-testid="to-do-input"
          className="input"
          value={inputToDoItem}
          onChange={(e) => setInputToDoItem(e.target.value)}
          placeholder=" type here"
        ></input>
      </div>
    </form>
  );
}

export const ToDo = () => {
  const listContext = useContext(TodoContext);

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

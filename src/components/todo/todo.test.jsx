import { ToDo } from "./todo";
import { render, screen } from "@testing-library/react";
import { TodoProvider } from "../app/context";

describe("Todo component", () => {
  test("test add todo", () => {
    render(
      <TodoProvider>
        <ToDo />{" "}
      </TodoProvider>
    );
    const inputEl = screen.getByPlaceholderText("type here");
    console.log(inputEl);
  });

  test("view todos", () => {
    render(
      <TodoProvider>
        <ToDo />
      </TodoProvider>
    );
    const inputEl = screen.getByPlaceholderText("type here");
    console.log(inputEl);
  });
});

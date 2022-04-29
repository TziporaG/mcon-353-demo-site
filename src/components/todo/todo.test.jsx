import { ToDo } from "./todo";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoProvider } from "../app/context";

describe("Todo component", () => {
  test("test add todo", () => {
    const container = render(
      <TodoProvider>
        <ToDo />
      </TodoProvider>
    );

    const input = container.getByTestId("to-do-input");

    fireEvent.change(input, {
      target: { value: "Go shopping" },
    });

    fireEvent(
      container.getByTestId("to-do-input-button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    const currentToDo = screen.getByTestId("to-do-item");
    expect(currentToDo).toHaveTextContent("Go shopping");
  });

  test("test complete to do marks item as grayed and crossed out", () => {
    const container = render(
      <TodoProvider>
        <ToDo />
      </TodoProvider>
    );
    const input = container.getByTestId("to-do-input");

    fireEvent.change(input, {
      target: { value: "Go shopping" },
    });

    fireEvent(
      container.getByTestId("to-do-input-button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    fireEvent(
      container.getByTestId("complete-to-do"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    const currentToDo = screen.getByTestId("to-do-item");
    expect(container.getByTestId("complete-to-do")).toBeChecked;

    const styles = getComputedStyle(currentToDo);
    expect(styles.textDecoration).toBe("line-through");
    expect(styles.color).toBe("rgb(244, 143, 177)");
  });

  test("test delete to do removes item from the list", () => {
    const container = render(
      <TodoProvider>
        <ToDo />
      </TodoProvider>
    );
    const input = container.getByTestId("to-do-input");

    fireEvent.change(input, {
      target: { value: "Go shopping" },
    });

    fireEvent(
      container.getByTestId("to-do-input-button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    fireEvent(
      container.getByTestId("remove-to-do"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(container.queryByTestId("to-do-item")).toBeNull();
  });

  test("test no item is added with empty input tag", () => {
    const container = render(
      <TodoProvider>
        <ToDo />
      </TodoProvider>
    );

    fireEvent(
      container.getByTestId("to-do-input-button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(container.queryByTestId("to-do-item")).toBeNull();
  });

  test("test can add and see multiple to do items", () => {
    const container = render(
      <TodoProvider>
        <ToDo />
      </TodoProvider>
    );
    const input = container.getByTestId("to-do-input");

    fireEvent.change(input, {
      target: { value: "Go shopping" },
    });

    fireEvent(
      container.getByTestId("to-do-input-button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    fireEvent.change(input, {
      target: { value: "Excersize" },
    });

    fireEvent(
      container.getByTestId("to-do-input-button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    fireEvent.change(input, {
      target: { value: "Read a book" },
    });

    fireEvent(
      container.getByTestId("to-do-input-button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    const currentToDos = screen.queryAllByTestId("to-do-item");

    expect(currentToDos[0]).toHaveTextContent("Go shopping");
    expect(currentToDos[1]).toHaveTextContent("Excersize");
    expect(currentToDos[2]).toHaveTextContent("Read a book");
  });
});

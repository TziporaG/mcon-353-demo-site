/*import { App } from "./app";
import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import { TodoProvider } from "../app/context";

describe("Todo component", () => {
  test("test add todo", () => {
    const container = render(<App />);

    const menuOptions = screen.queryAllByTestId("header-menu-item");

    fireEvent(
      menuOptions[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(container.findAllByTestId("page-name")).toHaveTextContent(
      "Hi there, I'm Tzipora"
    );
  });
});*/

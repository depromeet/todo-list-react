import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders todos", async () => {
  render(<App />);

  expect(await screen.findByText("todo-list-react")).toBeVisible();
});

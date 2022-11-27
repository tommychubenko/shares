import { Add } from "./addTicker";
import { render, screen } from "@testing-library/react";

test("Add ticker is showing", () => {
  render(<Add />);

  const input = screen.getByTestId("input");
  expect(input).toBeInTheDocument();
});

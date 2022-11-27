import { Screen } from "./screen";
import { render, screen } from "@testing-library/react";

test("Screen Dashboard is showing", () => {
  render(<Screen />);

  const dashboard = screen.getByTestId("dashboard");
  expect(dashboard).toBeInTheDocument();
});

import React from "react";
import { render } from "@testing-library/react";
import Sketchbook from "./Sketchbook";

test("renders Sketchbook component", () => {
  const { getByText } = render(<Sketchbook />);
  const canvasElement = getByText(/Canvas Saved!/i);
  expect(canvasElement).toBeInTheDocument();
});

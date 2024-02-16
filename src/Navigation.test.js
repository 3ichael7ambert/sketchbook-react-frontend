// Navigation.test.js
import { render, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";

test("renders Navigation component", () => {
  const { getByText } = render(<Navigation />);
  const pencilButton = getByText(/Add Pencil/i);
  expect(pencilButton).toBeInTheDocument();
});

test("toggle color picker visibility on button click", () => {
  const { getByText, getByTestId } = render(<Navigation />);
  const colorPickerButton = getByTestId("color-picker-button");
  const colorPicker = getByTestId("color-picker-popover");

  expect(colorPicker).toHaveStyle("display: none");
  fireEvent.click(colorPickerButton);
  expect(colorPicker).toHaveStyle("display: block");
  fireEvent.click(colorPickerButton);
  expect(colorPicker).toHaveStyle("display: none");
});

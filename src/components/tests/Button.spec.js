import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("should render", () => {
    const testMessage = "Test Message";
    const clickHandler = jest.fn();
    const { getByText } = render(
      <Button onClick={clickHandler}>{testMessage}</Button>
    );

    fireEvent.click(getByText(/Test Message/i));

    expect(getByText(testMessage)).toBeDefined();
    expect(clickHandler.mock.calls[0]).toBeDefined();
  });
});

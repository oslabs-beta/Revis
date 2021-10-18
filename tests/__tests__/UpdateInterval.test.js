import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateInterval from "../../src/components/Globals/UpdateInterval";
import { GlobalProvider } from "../../src/context/Provider";

describe("testing functionality of Upload Interval component", () => {
  beforeEach(() =>
    render(
      <GlobalProvider>
        <UpdateInterval />
      </GlobalProvider>
    )
  );
  afterEach(cleanup);

  it("should have an input field for updating interval", () => {
    const inputElement = screen.getByDisplayValue("");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toContainHTML("input");
    fireEvent.change(inputElement, { target: { value: "testing" } });
    expect(inputElement.value).toBe("testing");
  });

  it("should have a upload button", () => {
    const buttonElement = screen.getByText(/upload/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toContainHTML("input");
  });

});

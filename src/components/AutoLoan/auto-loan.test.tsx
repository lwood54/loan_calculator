import { expect, it, test, describe } from "bun:test";
import { render, screen } from "@testing-library/react";
import AutoLoan from "./auto-loan";

describe("<AutoLoan />", () => {
  it("should render <AutoLoan />", () => {
    // expect(2 + 2).toBe(4);
    // render(<AutoLoan />)
    // render(<div data-testid="test">hello world</div>);
    render(<AutoLoan />);
    // expect()
    // screen.getByText(/hello world/i);
    // expect(screen.getByTestId("test")).toBe({});
    expect(screen.getByTestId("auto-loan")).toBeDefined();
  });
});

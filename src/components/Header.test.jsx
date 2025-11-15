import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("displays the title", () => {
    render(<Header />);
    expect(screen.getByText("Desserts")).toBeInTheDocument();
  });
});

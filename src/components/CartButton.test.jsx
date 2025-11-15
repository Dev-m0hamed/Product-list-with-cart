import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartButton from "./CartButton";

describe("cartButton", () => {
  let user;
  let onChange;
  let count = 0;
  beforeEach(() => {
    user = userEvent.setup();
    onChange = vi.fn();
  });

  it("renders add to cartBtn if count <= 0", () => {
    render(<CartButton count={count} />);
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("adds a product to cart when clicking Add to Cart button", async () => {
    render(<CartButton onChange={onChange} name={"apple"} count={count} />);
    const addToCartBtn = screen.getByText("Add to Cart");
    await user.click(addToCartBtn);
    count++;
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("apple", 1);
  });

  it("renders + and - button if count > 0", () => {
    render(<CartButton count={count} />);
    expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
    expect(screen.getByTestId("minus")).toBeInTheDocument();
    expect(screen.getByTestId("plus")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("increases count when clicking + button", async () => {
    render(<CartButton onChange={onChange} name={"apple"} count={count} />);
    await user.click(screen.getByTestId("plus"));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("apple", count + 1);
    count++;
  });

  it("decrease count if count > 0 else return 0", async () => {
    render(<CartButton onChange={onChange} name={"banana"} count={count} />);
    await user.click(screen.getByTestId("minus"));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(
      "banana",
      count - 1 <= 0 ? 0 : count - 1
    );
    count--;
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});

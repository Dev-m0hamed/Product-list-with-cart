import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart";

describe("Cart", () => {
  const data = [
    { name: "apple", price: 6.5, image: { thumbnail: "/fake/apple.png" } },
    { name: "banana", price: 8, image: { thumbnail: "/fake/banana.png" } },
  ];
  const items = { apple: 3, banana: 2 };
  let user, setCart, updateCart;

  beforeEach(() => {
    user = userEvent.setup();
    setCart = vi.fn();
    updateCart = vi.fn();
    render(
      <Cart
        data={data}
        items={items}
        setCart={setCart}
        updateCart={updateCart}
      />
    );
  });
  it("renders the cart with items", () => {
    expect(screen.getByText("Your Cart (5)")).toBeInTheDocument();
    expect(screen.getByText("apple")).toBeInTheDocument();
    expect(screen.getByText("banana")).toBeInTheDocument();
    expect(screen.getByText("3x")).toBeInTheDocument();
    expect(screen.getByText("2x")).toBeInTheDocument();
    expect(screen.getByText("@$6.50")).toBeInTheDocument();
    expect(screen.getByText("@$8.00")).toBeInTheDocument();
    expect(screen.getByText("$19.50")).toBeInTheDocument();
    expect(screen.getByText("$16.00")).toBeInTheDocument();
    expect(screen.getByText("$35.50")).toBeInTheDocument();
  });

  it("removes an item when clicking X icon", async () => {
    await user.click(screen.getAllByTestId("delete-item")[0]);
    expect(updateCart).toHaveBeenCalledWith("apple", 0);
  });

  it("renders ConfirmedOrder component when confirm button is clicked", async () => {
    await user.click(screen.getByText("Confirm Order"));
    expect(screen.getByText("Order Confirmed")).toBeInTheDocument();
  });

  it("shows empty cart message when no items", () => {
    render(
      <Cart items={{}} setCart={setCart} updateCart={updateCart} data={data} />
    );
    expect(
      screen.getByText("Your added items will appear here")
    ).toBeInTheDocument();
  });
});

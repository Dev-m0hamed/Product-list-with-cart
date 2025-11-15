import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmedOrder from "./ConfirmedOrder";

describe("ConfirmedOrder", () => {
  const data = [
    { name: "apple", price: 6.5, image: { thumbnail: "/fake/apple.png" } },
    { name: "banana", price: 8, image: { thumbnail: "/fake/banana.png" } },
  ];
  const items = { apple: 3, banana: 2 };
  let user, setCart, setConfirmed;

  beforeEach(() => {
    user = userEvent.setup();
    setCart = vi.fn();
    setConfirmed = vi.fn();
    render(
      <ConfirmedOrder
        data={data}
        items={items}
        setCart={setCart}
        orderTotal={19.5 + 16}
        setConfirmed={setConfirmed}
      />
    );
  });

  it("renders items correctly", () => {
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

  it("starts new order when clicking start new order button", async () => {
    await user.click(screen.getByRole("button", { name: "Start New Order" }));
    expect(setCart).toHaveBeenCalledOnce();
    expect(setConfirmed).toHaveBeenCalledOnce();
    expect(setCart).toHaveBeenCalledWith({});
    expect(setConfirmed).toHaveBeenCalledWith(false);
  });
});

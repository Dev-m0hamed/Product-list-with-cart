import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "./Products";
import data from "../data.json";

describe("Products component", () => {
  const updateCart = vi.fn().mockImplementation((prev, name, count) => {
    if (count === 0) {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    } else return { ...prev, [name]: count };
  });

  beforeEach(() => {
    render(<Products />);
  });

  it("displays the products correctly", async () => {
    for (const p of data) {
      expect(await screen.findByText(p.name)).toBeInTheDocument();
    }
  });

  it("renders Add to Cart buttons", () => {
    data.forEach(() => {
      const btn = screen.getAllByRole("button", {
        name: "Add to Cart",
      });
      expect(btn.length).toBe(data.length);
    });
  });

  it("shows correctly formatted prices", () => {
    data.forEach((p) => {
      const productContainer = screen.getByText(p.name).closest("div");
      expect(productContainer).toHaveTextContent(`$${p.price.toFixed(2)}`);
    });
    const img = screen.getAllByTestId("product-img");
    expect(img[0]).not.toHaveClass("border-red!");
  });

  it("adds border class to product image", async () => {
    const addToCartBtn = screen.getAllByText("Add to Cart")[0];
    await userEvent.click(addToCartBtn);
    const img = screen.getAllByTestId("product-img");
    expect(img[0]).toHaveClass("border-red!");
  });

  it("adds a new product if not in cart", () => {
    const result = updateCart({}, "apple", 1);
    expect(result).toEqual({ apple: 1 });
  });

  it("updates count if product already exists", () => {
    const result = updateCart({ apple: 1 }, "apple", 5);
    expect(result).toEqual({ apple: 5 });
  });

  it("removes product if count = 0", () => {
    const result = updateCart({ apple: 1 }, "apple", 0);
    expect(result).toEqual({});
  });
});

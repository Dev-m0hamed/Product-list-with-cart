import { useState } from "react";
import Cart from "./Cart";
import CartButton from "./CartButton";
import data from "../../public/data.json";

function Products() {
  const [cart, setCart] = useState({});

  const updateCart = (name, count) => {
    setCart((prev) => {
      if (count === 0) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      } else return { ...prev, [name]: count };
    });
  };
  return (
    <main className="container mx-auto px-4 pb-5 md:pb-8 xl:px-15 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Cart items={cart} setCart={setCart} data={data} updateCart={updateCart} />

      {data.map((product) => (
        <div key={product.name} className="flex flex-col gap-8">
          <div>
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={product.image.desktop}
              />
              <source
                media="(min-width: 768px)"
                srcSet={product.image.tablet}
              />
              <img
                src={product.image.mobile}
                alt={product.category}
                className={`max-w-full rounded-xl border-3 border-transparent transition ease-out duration-300 ${
                  cart[product.name] !== undefined && "border-red!"
                }`}
              />
            </picture>

            <CartButton
              name={product.name}
              onChange={updateCart}
              count={cart[product.name] || 0}
            />
          </div>
          <div>
            <span className="text-rose-500">{product.category}</span>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <span className="text-red font-bold">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </main>
  );
}

export default Products;

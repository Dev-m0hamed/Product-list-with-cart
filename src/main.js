const products = document.getElementById("products");
const countItems = document.getElementById("countItems");
const emptyCart = document.getElementById("emptyCart");
const orders = document.getElementById("orders");
const orderTotal = document.getElementById("orderTotal");
const confirmBtn = document.getElementById("confirmBtn");
const popup = document.getElementById("popup");
const confirmedOrder = document.getElementById("confirmedOrder");
const finalPrice = document.getElementById("finalPrice");
const confirmedBtn = document.getElementById("confirmedBtn");
let totalCount = 0;

async function getProducts() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    window.allProducts = data;
    renderProducts(data);
  } catch (error) {
    console.error("Failed to load products", error);
  }
}

function renderProducts(data) {
  const fragment = document.createDocumentFragment();
  data.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `<div>
          <picture>
            <source media="(min-width: 1024px)" srcset="${
              product.image.desktop
            }">
            <source media="(min-width: 768px)" srcset="${product.image.tablet}">
            <img
            src="${product.image.mobile}"
            alt="${product.category}"
            class="product-img"
          />
          </picture>
          <div>
            <button
              class="cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                fill="none"
                viewBox="0 0 21 20"
              >
                <g fill="#C73B0F" clip-path="url(#a)">
                  <path
                    d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
                  />
                  <path
                    d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.333 0h20v20h-20z" />
                  </clipPath>
                </defs>
              </svg>
              Add to Cart
            </button>
            <button
              tabindex="-1"
              class="counter"
            >
              <svg
                tabindex="0"
                class="minus"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
              <span class="quantity">0</span>
              <svg
                tabindex="0"
                class="plus"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="currentColor"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <span class="product-name">${product.category}</span>
          <h2 class="description">${product.name}</h2>
          <span class="price">$${product.price.toFixed(2)}</span>
        </div>`;
    setupProductLogic(productDiv, product);
    fragment.appendChild(productDiv);
  });
  products.appendChild(fragment);
}

function setupProductLogic(productDiv, product) {
  productDiv.dataset.name = product.name;
  const img = productDiv.querySelector(".product-img");
  const cartBtn = productDiv.querySelector(".cart");
  const counterBtn = productDiv.querySelector(".counter");
  const minus = productDiv.querySelector(".minus");
  const plus = productDiv.querySelector(".plus");
  const quantity = productDiv.querySelector(".quantity");

  let count = 0;

  const updateDisplay = () => {
    quantity.textContent = count;
    countItems.textContent = totalCount;
  };

  function updateCartUI() {
    if (totalCount === 0) {
      emptyCart.classList.remove("hidden");
      orders.classList.add("hidden");
    } else {
      emptyCart.classList.add("hidden");
      orders.classList.remove("hidden");
    }
  }

  function increase() {
    count++;
    totalCount++;
    updateDisplay();
    showOrders(product, count);
    updateCartUI();
  }

  function decrease() {
    if (count > 1) {
      count--;
      totalCount--;
      updateDisplay();
      showOrders(product, count);
    } else if (count === 1) {
      count--;
      totalCount--;
      img.style.borderColor = "transparent";
      cartBtn.classList.remove("hidden");
      counterBtn.classList.remove("flex");
      counterBtn.classList.add("hidden");
      updateDisplay();
      showOrders(product, count);
      updateCartUI();
    }
  }

  cartBtn.addEventListener("click", () => {
    count = 0;
    img.style.borderColor = "var(--color-red)";
    cartBtn.classList.add("hidden");
    counterBtn.classList.remove("hidden");
    counterBtn.classList.add("flex");
    increase();
  });

  plus.addEventListener("click", increase);
  minus.addEventListener("click", decrease);

  minus.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowRight") return;
    if (e.key === "ArrowDown") decrease();
    if (e.key === "ArrowRight") plus.focus();
  });

  plus.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      increase();
      showOrders(product, count);
    }
    if (e.key === "ArrowLeft") minus.focus();
  });

  function showOrders(product, countValue) {
    const existingOrder = orders.querySelector(`[data-name="${product.name}"]`);

    if (countValue === 0 && existingOrder) {
      existingOrder.remove();
      updateTotal();
      return;
    }

    if (existingOrder) {
      existingOrder.querySelector(".quantity").textContent = `${countValue}x`;
      existingOrder.querySelector(".total-order").textContent = `$${(
        countValue * product.price
      ).toFixed(2)}`;
    } else if (countValue > 0) {
      const order = document.createElement("div");
      order.innerHTML = `<div data-name="${product.name}"
              class="flex justify-between items-center border-b border-b-rose-300 py-4"
            >
              <div>
                <h3 class="font-medium mb-2">${product.name}</h3>
                <span class="quantity text-red font-bold mr-2">${count}x</span>
                <span class="product-price text-rose-400 mr-1">@$${product.price.toFixed(
                  2
                )}</span>
                <span class="total-order text-rose-500">$${(
                  count * product.price
                ).toFixed(2)}</span>
              </div>
              <svg
                tabindex="0"
                class="removeOrder text-rose-300 rounded-full border border-rose-300 p-[3px] cursor-pointer hover:text-rose-900 hover:border-rose-900 transition duration-300"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="currentColor"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </div>`;

      const removeOrder = order.querySelector(".removeOrder");
      removeOrder.addEventListener("click", () => {
        totalCount -= count;
        if (totalCount < 0) totalCount = 0;
        count = 0;
        img.style.borderColor = "transparent";
        cartBtn.classList.remove("hidden");
        counterBtn.classList.remove("flex");
        counterBtn.classList.add("hidden");
        updateDisplay();
        order.remove();
        updateTotal();
        updateCartUI();
      });

      orders.prepend(order);
    }

    updateTotal();
  }

  function updateTotal() {
    const allOrders = orders.querySelectorAll(".total-order");
    const total = [...allOrders].reduce(
      (sum, el) => sum + parseFloat(el.textContent.replace("$", "")),
      0
    );
    orderTotal.textContent = `$${total.toFixed(2)}`;
    finalPrice.textContent = `$${total.toFixed(2)}`;
    updateCartUI();
  }
}

getProducts();

confirmBtn.addEventListener("click", () => {
  const cartItems = orders.querySelectorAll("[data-name]");
  cartItems.forEach((item) => {
    const name = item.dataset.name;
    const quantity = item.querySelector(".quantity").textContent;
    const total = item.querySelector(".total-order").textContent;
    const priceText = item.querySelector(".product-price").textContent;
    const product = window.allProducts.find((p) => p.name === name);
    const orderConfirmed = document.createElement("div");
    orderConfirmed.innerHTML = `<div
              class="flex justify-between items-center border-b border-b-rose-300 py-4 text-sm"
            >
              <div class="flex items-center gap-4">
                <img
                  src="${product.image.thumbnail}"
                  alt="${product.category}"
                  class="size-15 md:size-12"
                />
                <div class="mr-4">
                  <h2 class="font-medium mb-1">${product.name}</h2>
                  <span class="text-red font-bold mr-2.5">${quantity}</span>
                  <span class="text-rose-400">${priceText}</span>
                </div>
              </div>
              <span class="text-rose-900 font-medium">${total}</span>
            </div>`;
    confirmedOrder.prepend(orderConfirmed);
  });
  popup.classList.remove("hidden");
});


confirmedBtn.addEventListener("click", () => {
  window.location.reload();
});
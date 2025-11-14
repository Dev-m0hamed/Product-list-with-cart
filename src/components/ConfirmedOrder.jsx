function ConfirmedOrder({ items, setCart, setConfirmed, data, orderTotal }) {
  const names = Object.keys(items);
  return (
    <div className="bg-black/30 fixed inset-0 w-full h-dvh z-30">
      <div className="bg-rose-50 min-h-[60%] max-h-[90%] w-full absolute bottom-0 rounded-t-2xl p-4 flex flex-col justify-between md:w-fit md:top-1/2 md:left-1/2 md:-translate-1/2 md:rounded-2xl md:max-h-[70vh]">
        <div>
          <svg
            className="my-4 md:mt-0"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
              fill="#1EA575"
            />
            <path
              d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
              fill="#1EA575"
            />
          </svg>
          <h2 className="text-rose-900 font-bold text-2xl">Order Confirmed</h2>
          <p className="text-rose-300">We hope you enjoy your food!</p>
        </div>
        <div className="bg-rose-100 mt-5 px-4 pb-4 rounded-lg max-h-[50vh] overflow-y-auto scrollbar-none">
          {names.map((name) => {
            const product = data.find((p) => p.name === name);
            const count = items[name];
            return (
              <div key={name}>
                <div className="flex justify-between items-center border-b border-b-rose-300 py-4 text-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image.thumbnail}
                      alt={product.category}
                      className="size-15 md:size-12"
                    />
                    <div className="mr-4">
                      <h2 className="font-medium mb-1">{product.name}</h2>
                      <span className="text-red font-bold mr-2.5">
                        {count}x
                      </span>
                      <span className="text-rose-400">
                        @${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <span className="text-rose-900 font-medium">
                    ${(count * product.price).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between py-7">
          <p className="text-rose-500">Order Total</p>
          <span className="text-rose-900 font-bold text-xl tracking-wide">
            ${orderTotal.toFixed(2)}
          </span>
        </div>
        <button
          className="bg-red text-white p-4 w-full rounded-4xl mt-5 cursor-pointer hover:bg-red-800 transition duration-300 md:p-3"
          onClick={() => {
            setCart({});
            setConfirmed(false);
          }}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmedOrder;

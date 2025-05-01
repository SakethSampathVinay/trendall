import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    products,
    cartItems,
    updateQuantity,
    getTotalPrice,
    delivery_fee,
    getTotalItemsCount,
  } = useContext(ShopContext);

  const [cartArray, setCartArray] = useState([]);
  const navigate = useNavigate();

  // Build cart array only when cartItems AND products are ready
  useEffect(() => {
    if (products.length === 0) return; // Wait until products are fetched

    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        tempData.push({
          _id: productId,
          size,
          quantity: cartItems[productId][size],
        });
      }
    }
    setCartArray(tempData);
  }, [cartItems, products]);

  const cartProducts = cartArray
    .map((entry) => {
      const product = products.find((item) => item._id === entry._id);
      return product ? { ...product, ...entry } : null;
    })
    .filter(Boolean); // remove nulls

  const updateQuantityCart = (event, item) => {
    const newQty = event.target.valueAsNumber;
    if (!isNaN(newQty) && newQty >= 1) {
      updateQuantity(item._id, item.size, newQty);
    }
  };

  const handlePlaceOrder = () => {
    navigate("/place-order");
  };

  if (!products.length) {
    return <p className="text-center font-semibold">Loading cart...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Cart Items</h1>

      {cartProducts.length === 0 ? (
        <p className="font-bold text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col justify-between w-full">
          {cartProducts.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className="flex flex-row m-3 justify-between"
            >
              <div className="flex flex-row">
                <img
                  src={item.image[0] || assets.placeholder_image}
                  alt={item.name}
                  className="h-25 w-25"
                />
                <div className="pl-5">
                  <p className="font-bold">{item.name}</p>
                  <div className="flex flex-row justify-start items-center pt-3">
                    <p className="font-semibold">${item.price}</p>
                    <p className="border border-gray-200 bg-gray-100 ml-3 px-3">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => updateQuantityCart(e, item)}
                className="border border-gray-200 bg-gray-100 w-10 h-10 text-center"
                type="number"
                value={item.quantity}
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className="h-5 w-5 ml-1 cursor-pointer"
                alt="remove item"
              />
            </div>
          ))}

          <div className="w-full flex flex-col md:w-[250px] justify-between md:ml-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Cart Totals
            </h1>
            <div className="flex flex-row justify-between">
              <p className="text-gray-800 pr-5">Subtotal:</p>
              <p className="font-bold text-gray-800">${getTotalPrice()}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-gray-800 pr-5">Shipping Fee:</p>
              <p className="font-bold text-gray-800">${delivery_fee}</p>
            </div>
            <hr className="bg-gray-600 mt-2 mb-2 w-full" />
            <div className="flex flex-row justify-between">
              <h1 className="text-gray-800 pr-5">Total:</h1>
              <p className="font-bold text-gray-800">
                ${getTotalPrice() + delivery_fee}
              </p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white p-2 mt-3 cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

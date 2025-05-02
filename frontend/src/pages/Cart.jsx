import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems, updateQuantity, getTotalPrice, delivery_fee } =
    useContext(ShopContext);

  const [cartArray, setCartArray] = useState([]);
  const navigate = useNavigate();

  // Step 1: Convert cartItems into an array of items with productId, size, quantity
  useEffect(() => {
    if (products.length === 0) return;

    const tempCart = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        tempCart.push({
          productId,
          size,
          quantity: cartItems[productId][size],
        });
      }
    }

    setCartArray(tempCart);
  }, [cartItems, products]);

  // Step 2: Map cartArray to actual product details
  const cartProducts = cartArray
    .map((entry) => {
      const product = products.find(
        (item) => String(item.id) === String(entry.productId)
      );
      return product ? { ...product, ...entry } : null;
    })
    .filter(Boolean); // Remove nulls (in case a product is missing)

  // Step 3: Update quantity in cart
  const handleQuantityChange = (e, item) => {
    const newQty = e.target.valueAsNumber;
    if (!isNaN(newQty) && newQty >= 1) {
      updateQuantity(item.productId, item.size, newQty);
    }
  };

  // Step 4: Go to place-order page
  const handlePlaceOrder = () => {
    navigate("/place-order");
  };

  // Step 5: Loading state if products are not fetched
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
          {/* Render each item in cart */}
          {cartProducts.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex flex-row m-3 justify-between"
            >
              {/* Product Info */}
              <div className="flex flex-row">
                <img
                  src={
                    typeof item.image === "string" && item.image.includes(",")
                      ? item.image.split(",")[0]
                      : item.image || assets.placeholder_image
                  }
                  alt={item.name}
                  className="h-25 w-25"
                />
                <div className="pl-5">
                  <p className="font-bold">{item.name}</p>
                  <div className="flex flex-row items-center pt-3">
                    <p className="font-semibold">${item.price}</p>
                    <p className="border border-gray-200 bg-gray-100 ml-3 px-3">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => handleQuantityChange(e, item)}
                className="border border-gray-200 bg-gray-100 w-10 h-10 text-center"
                type="number"
                value={item.quantity}
              />

              {/* Remove Item */}
              <img
                onClick={() => updateQuantity(item.productId, item.size, 0)}
                src={assets.bin_icon}
                className="h-5 w-5 ml-1 cursor-pointer"
                alt="remove item"
              />
            </div>
          ))}

          {/* Totals Section */}
          <div className="w-full flex flex-col md:w-[250px] justify-between md:ml-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Cart Totals
            </h1>
            <div className="flex flex-row justify-between">
              <p className="text-gray-800">Subtotal:</p>
              <p className="font-bold text-gray-800">${getTotalPrice()}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-gray-800">Shipping Fee:</p>
              <p className="font-bold text-gray-800">${delivery_fee}</p>
            </div>
            <hr className="bg-gray-600 my-2 w-full" />
            <div className="flex flex-row justify-between">
              <h1 className="text-gray-800">Total:</h1>
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

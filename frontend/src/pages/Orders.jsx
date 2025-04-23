import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div className="p-4">
      {products.slice(0, 5).map((product, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-center gap-4 border-b py-4"
        >
          <div className="flex items-center gap-4 w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700">
                <span className="font-bold">
                  {currency} {product.price}
                </span>{" "}
                | Quantity: 1 | Size: L
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-green-600 rounded-full h-3 w-3"></span>
            <h1 className="text-sm font-medium text-green-700">Order Placed</h1>
          </div>

          <div>
            <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;

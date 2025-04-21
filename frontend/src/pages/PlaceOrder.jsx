import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const { getTotalPrice, delivery_fee } = useContext(ShopContext);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Delivery Information</h1>
      <div className="flex flex-row w-full gap-6 sm:w-full">
        <div className="w-1/2">
          <div className="flex flex-row">
            <input
              className="border-1 border-gray-200 p-2 pr-5 rounded-lg mr-3 w-[50%]"
              type="text"
              placeholder="First name"
            />
            <input
              className="border-1 border-gray-200 p-2 pr-5 rounded-lg w-[50%]"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            className="border-1 border-gray-200 p-2 rounded-lg w-full mt-3"
            type="email"
            placeholder="Email address"
          />
          <input
            className="border-1 border-gray-200 p-2 rounded-lg w-full mt-3"
            type="text"
            placeholder="Street"
          />
          <div className="flex flex-row">
            <input
              className="border-1 border-gray-200 p-2 pr-5 rounded-lg mr-3 mt-3 w-[50%]"
              type="text"
              placeholder="City"
            />
            <input
              className="border-1 border-gray-200 p-2 rounded-lg mt-3 w-[50%]"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex flex-row">
            <input
              className="border-1 border-gray-200 p-2 pr-5 rounded-lg mr-3 mt-3 w-[50%]"
              type="number"
              placeholder="Zipcode"
            />
            <input
              className="border-1 border-gray-200 p-2 rounded-lg mt-3 w-[50%]"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            className="border-1 border-gray-200 p-2 rounded-lg w-full mt-3"
            type="number"
            placeholder="Phone"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center sm:w-full">
          <div className="flex flex-col w-[250px] justify-between ml-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Cart Totals
            </h1>
            <div className="flex flex-row justify-between">
              <p className="text-gray-800 pr-5 flex justify-start">Subtotal:</p>
              <p className="font-bold text-gray-800">${getTotalPrice()}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-gray-800 pr-5">Shipping Fee: </p>
              <p className="font-bold text-gray-800">${delivery_fee}</p>
            </div>
            <hr className="bg-gray-600 mt-2 mb-2 w-full" />
            <div className="flex flex-row justify-between">
              <h1 className="text-gray-800 pr-5">Total: </h1>
              <p className="font-bold text-gray-800">
                ${getTotalPrice() + delivery_fee}
              </p>
            </div>
          </div>
          {/* <div className="flex flex-row justify-between ">
            <div>
              <img src={assets.stripe_logo} className="h-5 w-12" />
            </div>
            <div>
              <img src={assets.razorpay_logo} className="h-5 w-12" />
            </div>
            <div>
              <h1>CASH ON DELIVERY</h1>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;

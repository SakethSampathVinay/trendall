import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalPrice, delivery_fee } = useContext(ShopContext);
  const [payment, setPayment] = useState("COD");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handlePaymentMethod = (event) => {
    const selectedPayment = event.target.value;
    setPayment(selectedPayment);
  };

  const placeorder = (event) => {
    event.preventDefault();
    navigate("/orders");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Delivery Information</h1>
      <div className="flex flex-col md:flex-row justify-between">
        <form onSubmit={placeorder} className="md:w-1/2">
          <div className="flex flex-col md:flex-row">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              className="border-1 border-gray-200 p-2 pr-5 rounded-lg mt-2 md:mr-3 w-full md:w-[50%]"
              type="text"
              placeholder="First name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              className="border-1 border-gray-200 p-2 pr-5 rounded-lg mt-2 w-full md:w-[50%]"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            className="border-1 border-gray-200 p-2 rounded-lg w-full mt-3"
            type="email"
            placeholder="Email address"
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            className="border-1 border-gray-200 p-2 rounded-lg w-full mt-3"
            type="text"
            placeholder="Street"
          />
          <div className="flex flex-col md:flex-row">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              className="border-1 border-gray-200 p-2 pr-5 rounded-lg mt-2 md:mr-3 w-full md:w-[50%]"
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              className="border-1 border-gray-200 p-2 rounded-lg mt-2 w-full md:w-[50%]"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex flex-row">
            <input
              required
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              className="border-1 border-gray-200 p-2 pr-5 rounded-lg mr-3 mt-3 w-[50%]"
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              className="border-1 border-gray-200 p-2 rounded-lg mt-3 w-[50%]"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            className="border-1 border-gray-200 p-2 rounded-lg w-full mt-3"
            type="number"
            placeholder="Phone"
          />
          <button
            type="submit"
            className="bg-black text-white p-2 mt-3 ml-auto cursor-pointer"
          >
            PLACE ORDER
          </button>
        </form>
        <div className="md:w-1/2 flex flex-col justify-center items-center w-full">
          <div className="flex flex-col w-full md:w-[250px] justify-between md:ml-auto">
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
            <div className="">
              <h1 className="text-1xl mt-2 font-bold mb-4 text-gray-800">
                PAYMENT METHOD
              </h1>
              <div className="flex flex-row justify-between items-center">
                <div
                  className="border border-gray-200 rounded-2lg flex flex-row mr-2"
                  onClick={() => setPayment("Stripe")}
                >
                  <p
                    className={
                      payment === "Stripe"
                        ? "bg-green-600 rounded-2xl h-3 w-3 mt-[15px] ml-2 justify-center items-center"
                        : ""
                    }
                  ></p>
                  <img src={assets.stripe_logo} className="h-5 w-10 m-3" />
                </div>
                <div
                  className="border border-gray-200 rounded-2lg flex flex-row mr-1"
                  onClick={() => setPayment("Razorpay")}
                >
                  <p
                    className={
                      payment === "Razorpay"
                        ? "bg-green-600 rounded-2xl h-3 w-3 mt-[15px] ml-2 justify-center items-center"
                        : ""
                    }
                  ></p>
                  <img src={assets.razorpay_logo} className="h-5 w-20 m-3" />
                </div>
                <div
                  className="border border-gray-200 rounded-2lg p-2 flex flex-row"
                  onClick={() => setPayment("COD")}
                >
                  <p
                    className={
                      payment === "COD"
                        ? "bg-green-600 rounded-2xl h-3 w-3 mt-[6px] ml-2 mr-2 justify-center items-center"
                        : ""
                    }
                  ></p>
                  <h3>COD</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;

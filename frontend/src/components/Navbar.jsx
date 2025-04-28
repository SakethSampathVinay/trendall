import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";

const Navbar = () => {
  const { getTotalItemsCount } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center">
      <Link to="/">
        <img
          className="h-20 w-30"
          src="https://res.cloudinary.com/dgtfgihga/image/upload/v1744549148/ChatGPT_Image_Apr_13_2025_06_28_32_PM_re1dpv.png"
          alt="Logo"
        />
      </Link>
      <ul className="hidden sm:flex font-normal gap-4">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/collection">COLLECTION</NavLink>
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <img src={assets.profile_icon} className="w-5 cursor-pointer" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-2xl">
              <Link to="/login">
                <p className="cursor-pointer hover:text-black">My Profile</p>
              </Link>
              <Link to="/orders">
                <p className="cursor-pointer hover:text-black">Orders</p>
              </Link>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black rounded-full text-white">
            {getTotalItemsCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3"
            >
              <img className="h-4 rotate-180" src={assets.dropdown_icon} />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="hover:bg-black hover:text-white p-2 border"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="hover:bg-black hover:text-white p-2 border"
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="hover:bg-black hover:text-white p-2 border"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="hover:bg-black hover:text-white p-2 border"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

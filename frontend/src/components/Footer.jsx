import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 justify-items-center items-center mt-5">
        <div className="flex flex-col">
          <Link to="/">
            <img
              className="h-20 w-30"
              src="https://res.cloudinary.com/dgtfgihga/image/upload/v1744549148/ChatGPT_Image_Apr_13_2025_06_28_32_PM_re1dpv.png"
              alt="Logo"
            />
          </Link>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex flex-col justify-around">
          <h1 className="font-bold">COMPANY</h1>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold">GET IN TOUCH</h1>
          <p>+1000 000 000</p>
          <p>trendall@gmail.com</p>
          <p>New York, USA</p>
        </div>
      </div>
      <hr className="w-full" />
      <p className="text-center mt-3">
        &copy; Copyright 2025@TRENDALL - All Rights Reserved
      </p>
    </>
  );
};

export default Footer;

import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center mt-10">
      <div className="flex flex-col justify-center items-center mt-5">
        <img src={assets.exchange_icon} alt="exchange icon" className="" />
        <h1 className="font-bold">Easy Exchange Policy</h1>
        <p>We offer hassle free exchange policy</p>
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <img src={assets.quality_icon} alt="quality icon" className="" />
        <h1 className="font-bold">7 Days Return Policy</h1>
        <p>We provide 7 days free return policy</p>
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <img src={assets.support_img} alt="support icon" className="" />
        <h1 className="font-bold">Best customer support</h1>
        <p>we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;

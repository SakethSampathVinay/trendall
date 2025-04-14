import React from "react";
import { assets } from "../assets/assets.js";

const Hero = () => {
  return (
    <div className="border border-1 border-gray-300 rounded-lg md:flex ">
      <div className="p-15 md:w-1/2 flex flex-col justify-center items-start">
        <p className="font-normal text-2xl">____OUR BESTSELLERS</p>
        <h1 className="font-mono font-bold text-4xl">Latest Arrivals</h1>
        <p className="font-normal text-2xl">SHOP NOW____</p>
      </div>
      <div className="md:w-1/2 ">
        <img src={assets.hero_img} />
      </div>
    </div>
  );
};

export default Hero;

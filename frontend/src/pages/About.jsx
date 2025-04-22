import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="px-4 md:px-16 py-10">
      {/* Title */}
      <div className="text-center text-2xl text-[#707070]">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mt-10">
        <img
          className="w-full md:w-1/2 rounded"
          src={assets.about_img}
          alt="about"
        />
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-base text-gray-600">
          <p>
            Trendall was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes...
          </p>
          <p>
            Our mission at Trendall is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations...
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl mt-16 mb-6 text-center md:text-left">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-between">
        <div className="flex-1 min-w-[260px] border p-6 md:p-10 hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
          <b>Quality Assurance:</b>
          <p className="mt-2">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        <div className="flex-1 min-w-[260px] border p-6 md:p-10 hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
          <b>Convenience:</b>
          <p className="mt-2">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        <div className="flex-1 min-w-[260px] border p-6 md:p-10 hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
          <b>Exceptional Customer Service:</b>
          <p className="mt-2">
            Our team of dedicated professionals is here to assist you every step
            of the way. Your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";

const NewsletterBox = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1 className="font-bold text-2xl ">Subscribe now & get 20% off</h1>
      <p className="font-light pt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-row mt-3">
        <input
          type="email"
          className="border border-gray-300 rounded-l-md p-3 w-[300px]"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white p-1 ml-[-5px] cursor-pointer"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;

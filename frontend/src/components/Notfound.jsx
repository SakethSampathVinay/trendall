import React from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-bold text-2xl">
          You are in a page that does not exists
        </h1>
        <button
          onClick={handleClick}
          className="bg-black text-white p-3 rounded-lg mt-5 cursor-pointer" 
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Notfound;

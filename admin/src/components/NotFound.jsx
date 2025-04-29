import React, { use } from "react";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl">Page Not found.</h1>
      <button
        onClick={() => navigate("/login")}
        className="bg-gray-800 border-none px-5 py-2 rounded-full ml-4 mt-5 text-white cursor-pointer"
      >
        {" "}
        Redirect to Login
      </button>
    </div>
  );
};

export default NotFound;

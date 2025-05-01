import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");

    console.log(token);
    console.log("Logged out successfully");
  };

  return (
    <nav className="flex flex-row justify-between items-center p-4 text-white border border-gray-200">
      <img
        className="h-20 w-30"
        src="https://res.cloudinary.com/dgtfgihga/image/upload/v1744549148/ChatGPT_Image_Apr_13_2025_06_28_32_PM_re1dpv.png"
        alt="Logo"
      />
      <button
        onClick={logout}
        className="bg-gray-800 border-none px-5 py-2 rounded-full"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

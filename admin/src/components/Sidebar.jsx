import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/6 min-h-screen border-r border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-4">
        <Link to="/add">
          <button className="w-full text-left py-2 px-4 font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition">
            Add
          </button>
        </Link>
        <Link to="/list">
          <button className="w-full text-left py-2 px-4 font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition">
            List Items
          </button>
        </Link>
        <Link to="/orders">
          <button className="w-full text-left py-2 px-4 font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition">
            Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

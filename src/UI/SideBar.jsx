import React from "react";
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';  
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-primaryMain border max-lg:hidden border-gray-700 bg-opacity-75 text-white w-[20vw] h-screen flex flex-col items-center py-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CiMenuFries />Menu</h2>
      <ul className="text-center space-y-6">
        <li className="flex items-center space-x-3 cursor-pointer hover:text-yellow-500 transition-all duration-300">
          <FaHome />
          <Link to="/">Home</Link>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-yellow-500 transition-all duration-300">
          <FaUserAlt />
          <span>Profile</span>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-yellow-500 transition-all duration-300">
          <FaCog />
          <span>Settings</span>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-yellow-500 transition-all duration-300">
          <FaSignOutAlt />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;

// UI/Navbar.jsx
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="bg-gray-900 bg-opacity-75 mr-4 ml-4 mt-4 text-white flex items-center p-4 font-bold border border-gray-700  rounded-sm  h-[4vw]">
     <MdOutlineDashboard  className="text-2xl font-bold mr-2"/>  <h1 className="text-xl">Dashboard</h1>
    </div>
  );
};

export default Navbar;

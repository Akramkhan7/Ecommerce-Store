import React from "react";
import { assets } from "../assets/admin_assets/assets";

function Navbar({ setToken }) { //login
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-36 " src={assets.logo} alt="" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-3 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;

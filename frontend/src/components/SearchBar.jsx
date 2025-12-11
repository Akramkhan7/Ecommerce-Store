import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname.includes('collection')){
      setVisible(true); 
    }else{
      setVisible(false);
    }
  },[location])
  
  return showSearch && visible ? (
  <div className=" text-center py-4">
  <div className="inline-flex items-center justify-center border border-gray-400 px-4 py-2 my-5 rounded-full max-w-xl mx-auto w-full">
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
      placeholder="Search"
      type="search"
    />
    <img
      className="w-5 h-5 opacity-60 ml-3"
      src={assets.search_icon}
      alt="search icon"
    />
  </div>

  <img
    onClick={() => setShowSearch(false)}
    className="inline w-3 cursor-pointer m-2"
    src={assets.cross_icon}
    alt="close icon"
  />
</div>

) : null;

}

export default SearchBar;

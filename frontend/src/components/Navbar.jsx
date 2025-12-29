import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {

  const [visible, setVisible] = useState();
  const {setShowSearch,getCartCount,navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const logOut = () => {
    navigate("/login")
   localStorage.removeItem("token")
   setToken('');

  }
  return (
    <div className="flex items-center justify-between py-4 font-medium">
      {/* Logo */}
      <Link to='/' ><img src={assets.logo} className="w-36 cursor-pointer" alt="Logo" /></Link>

      {/* Menu */}
      <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
         
           onClick={() => 
            setShowSearch(true)
          }
        />

        <div className="relative group">
       
          <img
            onClick={()=> token ? null : navigate('/login')}
            src={assets.profile_icon}
            alt="Profile"
            className="w-5 cursor-pointer"
          />
        

          {token &&  <div
            className="absolute right-0 top-full hidden group-hover:block bg-slate-100 
      text-gray-400 
      w-36 
      rounded"
          >
            <p className="cursor-pointer hover:text-gray-800 px-3 py-2 border-b">
              My Profile
            </p>
            <p
            onClick={()=>navigate('/orders')} 
            className="cursor-pointer hover:text-gray-800 px-3 py-2 border-b">
              Orders
            </p>
            <p 
            onClick={logOut}
            className="cursor-pointer hover:text-gray-800 px-3 py-2  ">
              Log Out
            </p>
          </div>}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="Shopping cart icon"
            className="w-5 cursor-pointer"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-2xl text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img onClick={()=>{setVisible(true)}} src={assets.menu_icon} alt="" className="sm:hidden w-5 cursor-pointer" />
      </div>

      {/* Side menu Bar for small Screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0' }`}>
        <div className="flex flex-col text-gray-600">
            <div onClick={()=>{setVisible(false)}} className="flex items-center gap-4 p-3">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
            </div>
            <NavLink onClick={()=>{setVisible(false)}} to='/' className='py-2 flex items-center px-4 cursor-pointer hover:text-black border border-gray-100 pl-6' >HOME</NavLink>
            <NavLink onClick={()=>{setVisible(false)}} to='/collection' className='py-2 flex items-center px-4 cursor-pointer hover:text-black border border-gray-100 pl-6' >COLLECTION</NavLink>
            <NavLink onClick={()=>{setVisible(false)}} to='/about' className='py-2 flex items-center px-4 cursor-pointer hover:text-black border border-gray-100 pl-6' >ABOUT</NavLink>
            <NavLink onClick={()=>{setVisible(false)}} to='/contact' className='py-2 flex items-center px-4 cursor-pointer hover:text-black border border-gray-100 pl-6' >CONTACT</NavLink>
        </div>   
      </div>
    </div>
  );
}

export default Navbar;

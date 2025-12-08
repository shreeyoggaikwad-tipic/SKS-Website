import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.jpg"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const activeClass = "text-white bg-[#4f567a] border-b-2 border-cyan-400";
  const normalClass = "text-gray-300 hover:text-white hover:bg-[#4f567a] transition-all duration-300";

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="bg-[#3b4059] shadow-xl sticky top-0 z-50 border-b-2 border-[#4f567a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="w-18 flex items-center justify-center">
                <img src={logo} alt="" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide uppercase">Smart Kitchen Solutions</h1>
                <p className="text-xs text-cyan-400 font-medium tracking-wider">YOUR DESTINATIONS FOR UNRIVALED PRODUCTS</p>
              </div>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) => `px-5 py-3 text-sm font-medium tracking-wide uppercase ${isActive ? activeClass : normalClass}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `px-5 py-3 text-sm font-medium tracking-wide uppercase ${isActive ? activeClass : normalClass}`}
            >
              Who we are?
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) => `px-5 py-3 text-sm font-medium tracking-wide uppercase ${isActive ? activeClass : normalClass}`}
            >
              Products
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => `px-5 py-3 ml-2 text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 ${isActive ? 'shadow-xl' : ''}`}
            >
              Reach Us
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 focus:outline-none bg-[#4f567a] hover:bg-[#5f668a] transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-6 h-0.5 bg-white mb-1.5 transform transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transform transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="lg:hidden pb-4 flex flex-col space-y-0 bg-[#32364a] mt-2 border-t-2 border-[#4f567a]">
            <NavLink
              to="/"
              className={({ isActive }) => `px-5 py-4 flex items-center space-x-3 border-b border-[#3b4059] ${isActive ? 'bg-[#4f567a] text-white font-semibold' : 'text-gray-300 hover:bg-[#3b4059] hover:text-white'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">🏠</span><span className="text-sm font-medium">HOME</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `px-5 py-4 flex items-center space-x-3 border-b border-[#3b4059] ${isActive ? 'bg-[#4f567a] text-white font-semibold' : 'text-gray-300 hover:bg-[#3b4059] hover:text-white'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">ℹ️</span><span className="text-sm font-medium">WHO WE ARE?</span>
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) => `px-5 py-4 flex items-center space-x-3 border-b border-[#3b4059] ${isActive ? 'bg-[#4f567a] text-white font-semibold' : 'text-gray-300 hover:bg-[#3b4059] hover:text-white'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">📦</span><span className="text-sm font-medium">PRODUCTS</span>
            </NavLink>

            <NavLink
              to="/contact"
              className="px-5 py-4 flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">📞</span><span className="text-sm font-bold">REACH US</span>
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
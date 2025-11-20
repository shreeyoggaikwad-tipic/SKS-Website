import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.jpg"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const activeClass = "text-white bg-[#3a3f5c] border-b-2 border-cyan-400";
  const normalClass = "text-gray-300 hover:text-white hover:bg-[#3a3f5c] transition-all duration-300";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 150);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const productCategories = [
    { name: 'Smart Appliances', path: '/products', icon: '📱' },
    { name: 'Modular Kitchens', path: '/products', icon: '🏗️' },
    { name: 'Storage Solutions', path: '/products', icon: '📦' },
    { name: 'Lighting Systems', path: '/products', icon: '💡' },
    { name: 'Countertops', path: '/products', icon: '🪨' },
    { name: 'Cabinets & Drawers', path: '/products', icon: '🗄️' },
    { name: 'Kitchen Accessories', path: '/products', icon: '🔧' },
    { name: 'Premium Collection', path: '/products', icon: '⭐' },
  ];

  return (
    <header className="bg-[#282b40] shadow-xl sticky top-0 z-50 border-b-2 border-[#3a3f5c]">
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
                <p className="text-xs text-cyan-400 font-medium tracking-wider">INNOVATION IN EVERY CORNER</p>
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

            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`px-5 py-3 text-sm font-medium tracking-wide uppercase flex items-center space-x-2 ${normalClass}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
              >
                <span>Products</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProductsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 w-64 bg-[#1f2235] shadow-2xl border-t-2 border-cyan-400 z-10"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {productCategories.map((category) => (
                    <NavLink
                      key={category.name}
                      to={category.path}
                      state={{ category: category.name }}
                      className="flex items-center space-x-3 px-5 py-4 text-gray-300 hover:bg-[#282b40] hover:text-white border-b border-[#282b40] transition-all duration-200"
                      onClick={() => setIsProductsDropdownOpen(false)}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            <NavLink
              to="/contact"
              className={({ isActive }) => `px-5 py-3 ml-2 text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 ${isActive ? 'shadow-xl' : ''}`}
            >
              Reach Us
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 focus:outline-none bg-[#3a3f5c] hover:bg-[#4a4f6c] transition-colors duration-300"
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
          <nav className="lg:hidden pb-4 flex flex-col space-y-0 bg-[#1f2235] mt-2 border-t-2 border-[#3a3f5c]">
            <NavLink
              to="/"
              className={({ isActive }) => `px-5 py-4 flex items-center space-x-3 border-b border-[#282b40] ${isActive ? 'bg-[#3a3f5c] text-white font-semibold' : 'text-gray-300 hover:bg-[#282b40] hover:text-white'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">🏠</span><span className="text-sm font-medium">Home</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `px-5 py-4 flex items-center space-x-3 border-b border-[#282b40] ${isActive ? 'bg-[#3a3f5c] text-white font-semibold' : 'text-gray-300 hover:bg-[#282b40] hover:text-white'} transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">ℹ️</span><span className="text-sm font-medium">About</span>
            </NavLink>

            {/* Mobile Products Section with Submenu */}
            <div>
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-gray-300 hover:bg-[#282b40] hover:text-white border-b border-[#282b40] transition-all duration-300"
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📦</span><span className="text-sm font-medium">Products</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobileProductsOpen && (
                <div className="bg-[#282b40]">
                  {productCategories.map((category) => (
                    <NavLink
                      key={category.name}
                      to={category.path}
                      state={{ category: category.name }}
                      className="px-8 py-3 flex items-center space-x-3 text-gray-400 hover:bg-[#3a3f5c] hover:text-white border-b border-[#1f2235] transition-all duration-300 text-sm"
                      onClick={() => { setIsOpen(false); setIsMobileProductsOpen(false); }}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            <NavLink
              to="/contact"
              className="px-5 py-4 flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">📞</span><span className="text-sm font-bold">Get Quote</span>
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
import React, { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 top-0 z-50 w-full fixed">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PICT CONNECT</span>
        </a>
        <button id="toggleBtn" className="lg:hidden cursor-pointer" onClick={toggleMenu}>
          <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div id="menu" className={`lg:hidden absolute top-full left-0 right-0 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 ${menuOpen ? '' : 'hidden'}`}>
          <ul className="py-2">
            <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Home</a></li>
            <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">About</a></li>
            <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Login</a></li>
          </ul>
        </div>
        <div className="hidden lg:flex lg:w-auto lg:items-center">
          <ul className="flex flex-col lg:flex-row lg:space-x-8">
            <li>
              <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700">About</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

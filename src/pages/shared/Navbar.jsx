import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-transparent backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-white font-bold text-xl transform hover:scale-105 transition-all duration-300">
              BISTRO BOSS
              <Link to='/resturant' className="block text-sm font-normal">Restaurant</Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to ='/' href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">HOME</Link>
            <Link to='Contact' href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">CONTACT US</Link>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">DASHBOARD</a>
            <Link to='/menu' href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">OUR MENU</Link>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">OUR SHOP</a>
            
            {/* Cart Icon */}
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
              <svg className="w-6 h-6 text-white hover:text-yellow-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>

            {/* Sign Out Button */}
            <button className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="ml-2">SIGN OUT</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-sm transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 pt-2 pb-3 space-y-3">
          <a href="#" className="block text-white hover:text-yellow-400 transition-colors duration-300">HOME</a>
          <a href="#" className="block text-white hover:text-yellow-400 transition-colors duration-300">CONTACT US</a>
          <a href="#" className="block text-white hover:text-yellow-400 transition-colors duration-300">DASHBOARD</a>
          <a href="#" className="block text-white hover:text-yellow-400 transition-colors duration-300">OUR MENU</a>
          <a href="#" className="block text-white hover:text-yellow-400 transition-colors duration-300">OUR SHOP</a>
          <button className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="ml-2">SIGN OUT</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
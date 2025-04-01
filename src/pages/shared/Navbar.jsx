import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    } backdrop-blur-sm`}>
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
            <Link to='/' className="text-white hover:text-yellow-400 transition-colors duration-300">HOME</Link>
            <Link to='/contact' className="text-white hover:text-yellow-400 transition-colors duration-300">CONTACT US</Link>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">DASHBOARD</a>
            <Link to='/menu' className="text-white hover:text-yellow-400 transition-colors duration-300">OUR MENU</Link>
            <Link to='/shop' className="text-white hover:text-yellow-400 transition-colors duration-300">OUR SHOP</Link>
            
            {/* Cart Icon */}
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
              <svg className="w-6 h-6 text-white hover:text-yellow-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>

            {/* Sign In Button */}
            <button className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <Link to='/login' className="ml-2">SIGN IN</Link>
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
          <Link to='/' className="block text-white hover:text-yellow-400 transition-colors duration-300">HOME</Link>
          <Link to='/contact' className="block text-white hover:text-yellow-400 transition-colors duration-300">CONTACT US</Link>
          <a href="#" className="block text-white hover:text-yellow-400 transition-colors duration-300">DASHBOARD</a>
          <Link to='/menu' className="block text-white hover:text-yellow-400 transition-colors duration-300">OUR MENU</Link>
          <Link to='/shop' className="block text-white hover:text-yellow-400 transition-colors duration-300">OUR SHOP</Link>
          <button className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="ml-2">SIGN IN</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
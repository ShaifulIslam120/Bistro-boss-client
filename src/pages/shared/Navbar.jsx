import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../Authentication/provider/useAuth';
import { useCart } from '../Cart/CartProvider';

const Navbar = () => {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const closeMobileMenu = () => setIsOpen(false);

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
              <Link to='/restaurant' className="block text-sm font-normal">Restaurant</Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link to='/' className="text-white hover:text-yellow-400 px-3 py-2 transition-colors duration-300">HOME</Link>
            <Link to='/contact' className="text-white hover:text-yellow-400 px-3 py-2 transition-colors duration-300">CONTACT US</Link>
            <Link to='/dashboard' className="text-white hover:text-yellow-400 px-3 py-2 transition-colors duration-300">DASHBOARD</Link>
            <Link to='/menu' className="text-white hover:text-yellow-400 px-3 py-2 transition-colors duration-300">OUR MENU</Link>
            <Link to='/shop' className="text-white hover:text-yellow-400 px-3 py-2 transition-colors duration-300">OUR SHOP</Link>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative px-3 py-2">
              <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
              <svg className="w-6 h-6 text-white hover:text-yellow-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>

            {/* Sign In/Out Button */}
            {user ? (
              <button 
                onClick={handleLogout}
                className="flex items-center text-white hover:text-yellow-400 px-3 py-2 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="ml-2 hidden lg:inline">SIGN OUT</span>
              </button>
            ) : (
              <Link to='/login' className="flex items-center text-white hover:text-yellow-400 px-3 py-2 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="ml-2 hidden lg:inline">SIGN IN</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
              <svg className="w-6 h-6 text-white hover:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 p-1 focus:outline-none"
              aria-label="Menu"
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
        } md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-black/95 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="px-4 pt-2 pb-8 space-y-4">
          <Link 
            to='/' 
            className="block text-white hover:text-yellow-400 py-3 transition-colors duration-300 border-b border-gray-800"
            onClick={closeMobileMenu}
          >
            HOME
          </Link>
          <Link 
            to='/contact' 
            className="block text-white hover:text-yellow-400 py-3 transition-colors duration-300 border-b border-gray-800"
            onClick={closeMobileMenu}
          >
            CONTACT US
          </Link>
          <Link 
            to="/dashboard" 
            className="block text-white hover:text-yellow-400 py-3 transition-colors duration-300 border-b border-gray-800"
            onClick={closeMobileMenu}
          >
            DASHBOARD
          </Link>
          <Link 
            to='/menu' 
            className="block text-white hover:text-yellow-400 py-3 transition-colors duration-300 border-b border-gray-800"
            onClick={closeMobileMenu}
          >
            OUR MENU
          </Link>
          <Link 
            to='/shop' 
            className="block text-white hover:text-yellow-400 py-3 transition-colors duration-300 border-b border-gray-800"
            onClick={closeMobileMenu}
          >
            OUR SHOP
          </Link>
          
          <div className="pt-4 border-t border-gray-800">
            {user ? (
              <button 
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="flex items-center justify-center w-full text-white hover:text-yellow-400 py-3 transition-colors duration-300"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                SIGN OUT
              </button>
            ) : (
              <Link 
                to='/login' 
                className="flex items-center justify-center w-full text-white hover:text-yellow-400 py-3 transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                SIGN IN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
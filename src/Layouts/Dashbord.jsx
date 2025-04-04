import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaList, FaBook, FaUsers, FaUtensils, FaShopify, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../Authentication/provider/useAuth';
import axios from 'axios';
import useAxiosSecure from '../Hooks/useAxiossecure';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); 

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            // Close sidebar when resizing to desktop if mobile menu was open
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(user?.email) {
            axiosSecure.get(`/users/admin/${user.email}`)
                .then(res => {
                    setIsAdmin(res.data.isAdmin);
                })
                .catch(error => {
                    console.error('Admin check error:', error);
                });
        }
    }, [user, axiosSecure]);

    const adminMenuItems = [
        { to: "/dashboard/admin-home", icon: <FaHome />, text: "Admin Home" },
        { to: "/dashboard/add-items", icon: <FaUtensils />, text: "Add Items" },
        { to: "/dashboard/manage-items", icon: <FaList />, text: "Manage Items" },
        { to: "/dashboard/manage-bookings", icon: <FaBook />, text: "Manage Bookings" },
        { to: "/dashboard/all-users", icon: <FaUsers />, text: "All Users" },
    ];

    const userMenuItems = [
        { to: "/dashboard/user-home", icon: <FaHome />, text: "User Home" },
        { to: "/dashboard/reservation", icon: <FaUtensils />, text: "Reservation" },
        { to: "/dashboard/Payment-history", icon: <FaList />, text: "Payment History" },
        { to: "/dashboard/my-cart", icon: <FaShoppingCart />, text: "My Cart" },
        { to: "/dashboard/add-review", icon: <FaUsers />, text: "Add Review" },
        { to: "/dashboard/my-booking", icon: <FaBook />, text: "My Booking" },
    ];

    const commonLinks = [
        { to: "/", icon: <FaHome />, text: "Home" },
        { to: "/menu", icon: <FaList />, text: "Menu" },
        { to: "/shop", icon: <FaShopify />, text: "Shop" },
        { to: "/contact", icon: <FaEnvelope />, text: "Contact" },
    ];

    const renderNavLink = ({ to, icon, text }) => (
        <li key={to}>
            <NavLink 
                to={to} 
                onClick={() => isMobile && setIsOpen(false)}
                className={({ isActive }) => `
                    flex items-center gap-3 py-3 px-4 rounded-lg
                    transition-all duration-300 
                    hover:bg-[#b88d47] hover:translate-x-2
                    group
                    ${isActive ? 'bg-[#b88d47] text-white' : 'text-black hover:text-white'}
                `}
            >
                <span className="text-lg transform transition-transform group-hover:rotate-12">
                    {icon}
                </span>
                <span className="text-sm lg:text-base transform transition-transform group-hover:translate-x-1">
                    {text}
                </span>
            </NavLink>
        </li>
    );

    return (
        <div className="flex min-h-screen relative bg-[#F6F6F6]">
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>

            {/* Mobile Menu Button */}
            {isMobile && (
                <button 
                    className="fixed top-4 left-4 z-50 p-2 bg-[#D1A054] rounded-lg shadow-lg"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <FaTimes className="text-white text-xl" />
                    ) : (
                        <FaBars className="text-white text-xl" />
                    )}
                </button>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative top-0 left-0 h-screen w-64 bg-[#D1A054] 
                transition-all duration-300 ease-in-out shadow-xl
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                z-40 overflow-y-auto
            `}>
                <div className="p-4 text-center sticky top-0 bg-[#D1A054] z-10">
                    <h2 className="text-2xl font-bold mb-2 hover:scale-105 transition-transform duration-300">
                        BISTRO BOSS
                    </h2>
                    <h3 className="text-xl mb-8 hover:scale-105 transition-transform duration-300">
                        RESTAURANT
                    </h3>
                </div>

                <nav className="px-4 pb-8">
                    <ul className="space-y-2">
                        {(isAdmin ? adminMenuItems : userMenuItems).map(renderNavLink)}
                    </ul>

                    <div className="divider my-6 border-b border-[#b88d47] opacity-50"></div>

                    <ul className="space-y-2">
                        {commonLinks.map(renderNavLink)}
                    </ul>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && isMobile && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 min-h-screen overflow-x-hidden">
                <div className="p-4 lg:p-8 mt-16 lg:mt-0">
                    <div className="animate-fadeIn">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
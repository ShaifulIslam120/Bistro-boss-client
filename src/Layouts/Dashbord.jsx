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
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); 

    
    useEffect(() => {
        if(user?.email) {
            axiosSecure.get(`/users/admin/${user.email}`)
                .then(res => {
                    console.log('is admin response', res.data);
                    setIsAdmin(res.data.isAdmin);
                })
                .catch(error => {
                    console.error('Admin check error:', error);
                });
        }
    }, [user, axiosSecure]);
    const adminMenuItems = [
        { to: "dashboard/admin-home", icon: <FaHome />, text: "Admin Home" },
        { to: "dashboard/add-items", icon: <FaUtensils />, text: "Add Items" },
        { to: "dashboard/manage-items", icon: <FaList />, text: "Manage Items" },
        { to: "dashboard/manage-bookings", icon: <FaBook />, text: "Manage Bookings" },
        { to: "dashboard/all-users", icon: <FaUsers />, text: "All Users" },
    ];

    const userMenuItems = [
        { to: "dashboard/user-home", icon: <FaHome />, text: "User Home" },
        { to: "dashboard/reservation", icon: <FaUtensils />, text: "Reservation" },
        { to: "dashboard/Payment-history", icon: <FaList />, text: "Payment History" },
        { to: "dashboard/my-cart", icon: <FaShoppingCart />, text: "My Cart" },
        { to: "dashboard/add-review", icon: <FaUsers />, text: "Add Review" },
        { to: "dashboard/my-booking", icon: <FaBook />, text: "My Booking" },
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
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                    flex items-center gap-2 py-2 px-4 rounded-lg
                    transition-all duration-300 
                    hover:bg-[#b88d47] hover:translate-x-2
                    group
                    ${isActive ? 'bg-[#b88d47] text-white' : 'text-black hover:text-white'}
                `}
            >
                <span className="transform transition-transform group-hover:rotate-12">
                    {icon}
                </span>
                <span className="transform transition-transform group-hover:translate-x-1">
                    {text}
                </span>
            </NavLink>
        </li>
    );

    return (
        <div className="flex min-h-screen relative">
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>

            <button 
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#D1A054] rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`
                fixed lg:sticky top-0 h-screen w-64 bg-[#D1A054] 
                transition-all duration-300 hover:shadow-xl
                ${isOpen ? 'left-0' : '-left-64 lg:left-0'}
                z-40 overflow-y-auto
            `}>
                <div className="p-4 text-center">
                    <h2 className="text-2xl font-bold mb-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
                        BISTRO BOSS
                    </h2>
                    <h3 className="text-xl mb-8 hover:scale-105 transition-transform duration-300 cursor-pointer">
                        RESTAURANT
                    </h3>
                </div>

                <nav className="px-4">
                    <ul className="space-y-2">
                        {(isAdmin ? adminMenuItems : userMenuItems).map(renderNavLink)}
                    </ul>

                    <div className="divider my-8 border-b-2 border-[#b88d47] opacity-50"></div>

                    <ul className="space-y-2">
                        {commonLinks.map(renderNavLink)}
                    </ul>
                </nav>
            </div>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div className="flex-1 bg-[#F6F6F6] p-4 lg:p-8">
                <div className="animate-fadeIn mt-16 lg:mt-0">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaList, FaBook, FaUsers, FaUtensils, FaShopify, FaEnvelope } from 'react-icons/fa';
import PageTitle from '../pages/reusable/PageTitle';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    const menuItems = [
        { to: "/dashboard", icon: <FaHome />, text: "Admin Home" },
        { to: "/dashboard/add-items", icon: <FaUtensils />, text: "Add Items" },
        { to: "/dashboard/manage-items", icon: <FaList />, text: "Manage Items" },
        { to: "/dashboard/bookings", icon: <FaBook />, text: "Manage Bookings" },
        { to: "/dashboard/users", icon: <FaUsers />, text: "All Users" },
    ];

    const commonLinks = [
        { to: "dashboard/home", icon: <FaHome />, text: "Home" },
        { to: "/menu", icon: <FaList />, text: "Menu" },
        { to: "/shop", icon: <FaShopify />, text: "Shop" },
        { to: "/contact", icon: <FaEnvelope />, text: "Contact" },
    ];

    const renderNavLink = ({ to, icon, text }) => (
        
        <li key={to}>
            <NavLink 
                to={to} 
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
        <div className="flex min-h-screen">
            <Helmet>
                            <title>Bistro Boss|Dashboard</title>
                        </Helmet>
            {/* Sidebar */}
            <div className="w-64 bg-[#D1A054] transition-all duration-300 hover:shadow-xl">
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
                        {menuItems.map(renderNavLink)}
                    </ul>

                    <div className="divider my-8 border-b-2 border-[#b88d47] opacity-50"></div>

                    <ul className="space-y-2">
                        {commonLinks.map(renderNavLink)}
                    </ul>
                </nav>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 bg-[#F6F6F6]">
                <div className="p-8 animate-fadeIn">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
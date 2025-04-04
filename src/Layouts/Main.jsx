import React from 'react';
import Home from '../pages/Home';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer';
import Navbar from '../pages/shared/Navbar';
import { useTheme } from '../Authentication/provider/ThemeContext';

const Main = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import menuBanner from '../../assets/menu/banner3.jpg';
import PopularMenu from '../PopularMenu';
import DesertCata from '../Catagories/DesertCata';
import Pizzacata from '../Catagories/Pizzacata';
import SaladsCata from '../Catagories/SaladsCata';
import SoupCata from '../Catagories/SoupCata';

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss|Menu</title>
            </Helmet>
            <div className="relative h-[400px] bg-cover bg-center bg-fixed" style={{
                backgroundImage: `url(${menuBanner})`
            }}>
                <div 
                    className="absolute inset-20 flex flex-col items-center justify-center text-white"
                    style={{
                        background: 'linear-gradient(rgba(21, 21, 21, 0.7), rgba(21, 21, 21, 0.7))'
                    }}
                >
                    <h1 className="text-5xl font-serif mb-4">OUR MENU</h1>
                    <p className="text-xl tracking-wider">WOULD YOU LIKE TO TRY A DISH?</p>
                </div>
            </div>
            <div className='max-w-screen-xl mx-auto'>
            <PopularMenu></PopularMenu>
            <DesertCata></DesertCata>
            <Pizzacata></Pizzacata>
            <SaladsCata></SaladsCata>
            <SoupCata></SoupCata>
            </div>
        </div>
    );
};

export default Menu;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ourshop from '../../assets/shop/banner2.jpg'
import Tabmenu from './Tabmenu';
import UseMenu from '../hooks/UseMenu';

const OurShop = () => {
    const [menu] = UseMenu();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        setMenuItems(menu);
    }, [menu]);

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Shop</title>
            </Helmet>
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] bg-cover bg-center bg-fixed" style={{
                backgroundImage: `url(${ourshop})`
            }}>
                
                <div 
                    className=" absolute inset-0 sm:inset-10 md:inset-20 flex flex-col items-center justify-center text-white"
                    style={{
                        background: 'linear-gradient(rgba(21, 21, 21, 0.7), rgba(21, 21, 21, 0.7))'
                    }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2 sm:mb-4">OUR SHOP</h1>
                    <p className="text-sm sm:text-lg md:text-xl tracking-wider px-4 text-center">
                        WOULD YOU LIKE TO TRY A DISH?
                    </p>
                </div>
            </div>
            <Tabmenu items={menuItems} />
        </div>
    );
};

export default OurShop;
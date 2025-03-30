import React, { useState, useEffect } from 'react';
import SectionTitle from './reusable/SectionTitle';

const PopularSection = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular');
                setMenu(popularItems);
            });
    }, []);

    return (
        <div>
            <div className="py-10">
            <SectionTitle
                topText="check it out"
                mainText="From Our menu"
            />
            
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {menu.map((item) => (
                        <div key={item._id} className="flex items-start gap-4">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-[120px] h-[120px] object-cover rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center border-b border-dotted border-gray-300 mb-2">
                                    <h3 className="text-xl font-medium uppercase">{item.name}</h3>
                                    <p className="text-yellow-500 font-medium">${item.price}</p>
                                </div>
                                <p className="text-gray-500">{item.recipe}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
                
            </div>
            <div className="text-center mt-10">
                    <button className="uppercase border-b-2 border-black hover:text-yellow-500 hover:border-yellow-500 transition-colors duration-300 p-4 rounded-xl">
                        View Full Menu
                    </button>
                </div>
        </div>

        </div>
    );
};

export default PopularSection;
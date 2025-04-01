import React, { useState } from 'react';
import FoodCard from './FoodCard';

const Tabmenu = ({ items = [], defaultCategory = 'salad' }) => {
    const [activeTab, setActiveTab] = useState(defaultCategory);

    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    
    const filteredItems = items.filter(item => 
        item?.category?.toLowerCase() === activeTab.toLowerCase()
    );

    return (
        <div className="my-8">
            <div className="w-full overflow-x-auto">
                <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center min-w-max md:min-w-0 px-4 md:px-0 space-x-2 sm:space-x-4 md:space-x-8 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`text-sm sm:text-base md:text-lg font-medium pb-2 px-2 whitespace-nowrap transition-all duration-300
                                ${activeTab === category 
                                    ? 'text-[#BB8506] border-b-4 border-[#BB8506]' 
                                    : 'text-gray-600 hover:text-[#BB8506]'
                                }`}
                        >
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                    <FoodCard 
                        key={item._id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tabmenu;
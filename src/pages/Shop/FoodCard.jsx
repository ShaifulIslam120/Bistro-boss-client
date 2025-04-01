import React from 'react';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;

    return (
        <div className="flex justify-center items-center ">
            <div className="w-full max-w-[424px] bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-[300px] object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded">
                        ${price}
                    </span>
                </div>
                <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold mb-2">{name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{recipe}</p>
                    <button className="bg-[#E8E8E8] hover:bg-[#1F2937] text-[#BB8506] hover:text-[#BB8506] font-medium py-2 px-6 rounded-lg transition-colors duration-300">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
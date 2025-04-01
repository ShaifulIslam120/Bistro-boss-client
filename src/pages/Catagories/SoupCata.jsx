import React from 'react';
import { useNavigate } from 'react-router-dom';
import chefService from '../../assets/home/chef-service.jpg';
import { motion } from 'framer-motion';
import UseMenu from '../hooks/UseMenu';
import CoverSection from '../reusable/CoverSection';


const SoupCata = () => {
    const navigate = useNavigate();
    const [menu, loading] = UseMenu();
    const soup = menu.filter(item => item.category === 'soup');

    const handleOrderClick = () => {
        navigate('/shop', { state: { category: 'soup' } });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <CoverSection
                backgroundImage={chefService}
                title="SOUP"
                description="Would you like to try a dish?"
            />
            <div className="w-11/12 max-w-screen-xl mx-auto my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
                    {soup.map((item, index) => (
                        <motion.div 
                            key={item._id} 
                            className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.img 
                                className="w-full sm:w-[120px] h-[120px] object-cover rounded-md"
                                src={item.image} 
                                alt={item.name}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            />
                            <div className="flex flex-col justify-between flex-1">
                                <div>
                                    <motion.h3 
                                        className="text-lg sm:text-xl font-semibold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {item.name}
                                    </motion.h3>
                                    <motion.p 
                                        className="text-gray-600 text-sm sm:text-base mt-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {item.recipe}
                                    </motion.p>
                                </div>
                                <motion.p 
                                    className="text-[#BB8506] font-medium mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    ${item.price}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <button 
                        onClick={handleOrderClick}
                        className="uppercase border-b-4 border-black hover:border-[#BB8506] text-black hover:text-[#BB8506] transition-colors duration-300 px-8 py-4 rounded-lg font-medium"
                    >
                        ORDER YOUR FAVOURITE FOOD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SoupCata;
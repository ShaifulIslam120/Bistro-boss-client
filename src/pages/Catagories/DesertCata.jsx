import React from 'react';
import chefService from '../../assets/home/chef-service.jpg';
import { motion } from 'framer-motion'; // Added missing import
import CoverSection from '../reusable/CoverSection';
import UseMenu from '../hooks/UseMenu';

const DesertCata = () => {
    const [menu, loading] = UseMenu();
    const Desert = menu.filter(item => item.category === 'dessert');

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CoverSection
                backgroundImage={chefService}
                title="DESSERTS"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo."
            />
            <div className="w-11/12 max-w-screen-xl mx-auto my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
                    {Desert.map((item, index) => ( // Changed popularItems to Desert
                        <motion.div 
                            key={item._id} 
                            className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.img 
                                className="w-full sm:w-[120px] h-[200px] sm:h-[100px] object-cover rounded-md"
                                src={item.image} 
                                alt={item.name}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            />
                            <div className="flex flex-col justify-center">
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
                                <motion.p 
                                    className="text-primary font-medium mt-2"
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
                <div className="flex justify-center mt-8">
                    <button className="uppercase items-center border-b-2 border-black hover:text-yellow-500 hover:border-yellow-500 transition-colors duration-300 p-4 rounded-xl">
                        ORDER YOUR FAVOURITE FOOD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DesertCata;
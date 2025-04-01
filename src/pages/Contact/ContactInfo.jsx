import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactInfo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto px-4 py-8 ">
            <div className="bg-[#F3F3F3] p-6 rounded-lg">
                <div className="bg-[#D1A054] p-4 rounded-lg mb-4 flex justify-center">
                    <FaPhone className="text-white text-2xl" />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">PHONE</h3>
                    <p className="text-gray-600">+38 (012) 34 56 789</p>
                </div>
            </div>

            <div className="bg-[#F3F3F3] p-6 rounded-lg">
                <div className="bg-[#D1A054] p-4 rounded-lg mb-4 flex justify-center">
                    <FaMapMarkerAlt className="text-white text-2xl" />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">ADDRESS</h3>
                    <p className="text-gray-600">+38 (012) 34 56 789</p>
                </div>
            </div>

            <div className="bg-[#F3F3F3] p-6 rounded-lg">
                <div className="bg-[#D1A054] p-4 rounded-lg mb-4 flex justify-center">
                    <FaClock className="text-white text-2xl" />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">WORKING HOURS</h3>
                    <p className="text-gray-600">Mon - Fri: 08:00 - 22:00</p>
                    <p className="text-gray-600">Sat - Sun: 10:00 - 23:00</p>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
import React, { useState } from 'react';
import SectionTitle from '../pages/reusable/SectionTitle';
import ContactInfo from '../pages/Contact/ContactInfo';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiossecure';
import { useAuth } from '../Authentication/provider/useAuth';

const Reservation = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: '1 Person',
        name: user?.displayName || '',
        phone: '',
        email: user?.email || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            Swal.fire({
                title: "Please login",
                text: "You need to login to make a reservation",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        try {
            const response = await axiosSecure.post('/reservations', formData);
            if(response.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Table Reserved Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setFormData({
                    date: '',
                    time: '',
                    guests: '1 Person',
                    name: user?.displayName || '',
                    phone: '',
                    email: user?.email || ''
                });
            }
        } catch (error) {
            console.error('Reservation error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to make reservation!"
            });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto px-4 py-8"
        >
            <SectionTitle
                topText="Reservation"
                mainText="BOOK A TABLE"
            />
            
            <motion.form 
                onSubmit={handleSubmit} 
                className="mt-8 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <label className="block text-gray-700">Date*</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <label className="block text-gray-700">Time*</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <label className="block text-gray-700">Guest*</label>
                        <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            required
                        >
                            <option>1 Person</option>
                            <option>2 People</option>
                            <option>3 People</option>
                            <option>4 People</option>
                            <option>5 People</option>
                            <option>6 People</option>
                        </select>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <label className="block text-gray-700">Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <label className="block text-gray-700">Phone*</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <label className="block text-gray-700">Email*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            required
                        />
                    </motion.div>
                </div>

                <motion.div 
                    className="flex justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button
                        type="submit"
                        className="bg-[#D1A054] text-white px-8 py-3 rounded-lg hover:bg-[#b88d47] transition-colors duration-300"
                    >
                        Book A Table
                    </button>
                </motion.div>
            </motion.form>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <ContactInfo />
            </motion.div>
        </motion.div>
    );
};

export default Reservation;
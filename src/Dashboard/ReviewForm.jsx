import React, { useState, useEffect } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiossecure';
import { useAuth } from '../Authentication/provider/useAuth';
import SectionTitle from '../pages/reusable/SectionTitle';

const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [formData, setFormData] = useState({
        recipe: '',
        suggestion: '',
        review: '',
        name: ''
    });
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.displayName) {
            setFormData(prev => ({
                ...prev,
                name: user.displayName
            }));
        }
    }, [user]);

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
                text: "You need to login to submit a review",
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

        if (rating === 0) {
            Swal.fire({
                icon: "warning",
                title: "Please rate us",
                text: "Rating is required!"
            });
            return;
        }

        try {
            const reviewData = {
                ...formData,
                rating,
                email: user.email,
                date: new Date().toISOString(),
                image: user.photoURL || null
            };

            const response = await axiosSecure.post('/reviews', reviewData);
            
            if(response.data.insertedId) {
                setRating(0);
                setFormData({
                    recipe: '',
                    suggestion: '',
                    review: '',
                    name: user?.displayName || ''
                });
                
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thank you for your review!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Review submission error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to submit review!"
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
                topText="Sharing is Caring!!!"
                mainText="GIVE A REVIEW..."
            />
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-50 p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-2xl font-semibold">RATE US!</h3>
                    <Rating
                        style={{ maxWidth: 250 }}
                        value={rating}
                        onChange={setRating}
                        isRequired
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Which recipe you liked most?</label>
                        <input
                            type="text"
                            name="recipe"
                            value={formData.recipe}
                            onChange={handleChange}
                            placeholder="Recipe you liked most"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Do you have any suggestion for us?</label>
                        <input
                            type="text"
                            name="suggestion"
                            value={formData.suggestion}
                            onChange={handleChange}
                            placeholder="Suggestion"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Kindly express your care in a short way.</label>
                        <textarea
                            name="review"
                            value={formData.review}
                            onChange={handleChange}
                            placeholder="Review in detail"
                            rows="4"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                        />
                    </div>
                </div>

                <motion.div 
                    className="flex justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button
                        type="submit"
                        className="bg-[#D1A054] text-white px-8 py-3 rounded-lg hover:bg-[#b88d47] transition-colors duration-300 shadow-md"
                    >
                        Send Review
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
};

export default ReviewForm;
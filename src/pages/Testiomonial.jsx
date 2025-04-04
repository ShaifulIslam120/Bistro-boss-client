import React, { useState, useEffect } from 'react';
import SectionTitle from '../pages/reusable/SectionTitle';
import Slider from 'react-slick';
import ReactStarsRating from 'react-awesome-stars-rating';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Testimonial = () => {
    const [testimonialData, setTestimonialData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axiosPublic.get('/reviews');
                setTestimonialData(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setError('Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, [axiosPublic]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    if (loading) {
        return (
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        topText="What Our Clients Say"
                        mainText="TESTIMONIALS"
                    />
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D1A054]"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        topText="What Our Clients Say"
                        mainText="TESTIMONIALS"
                    />
                    <div className="flex justify-center items-center h-64">
                        <p className="text-red-500">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!testimonialData?.length) {
        return (
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        topText="What Our Clients Say"
                        mainText="TESTIMONIALS"
                    />
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500">No testimonials available yet.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 bg-gray-50"
        >
            <div className="container mx-auto px-4">
                <SectionTitle
                    topText="What Our Clients Say"
                    mainText="TESTIMONIALS"
                />
                
                <div className="mt-12">
                    <Slider {...settings}>
                        {testimonialData.map((testimonial) => (
                            <motion.div 
                                key={testimonial._id} 
                                className="px-4"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="mb-4">
                                        <ReactStarsRating 
                                            value={testimonial.rating} 
                                            isEdit={false}
                                            size={24}
                                            primaryColor="#D1A054"
                                            secondaryColor="#ddd"
                                        />
                                    </div>
                                    <p className="text-gray-600 mt-4 mb-6 line-clamp-3">
                                        {testimonial.review}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        {testimonial.image ? (
                                            <img 
                                                src={testimonial.image} 
                                                alt={testimonial.name} 
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-[#D1A054] flex items-center justify-center">
                                                <span className="text-white text-xl">
                                                    {testimonial.name?.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {new Date(testimonial.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </Slider>
                </div>
            </div>
        </motion.div>
    );
};

export default Testimonial;
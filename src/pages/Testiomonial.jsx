import React, { useState, useEffect } from 'react';
import SectionTitle from './reusable/SectionTitle';
import Slider from 'react-slick';
import ReactStarsRating from 'react-awesome-stars-rating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
    const [testimonialData, setTestimonialData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('rating.json');
                const data = await response.json();
                setTestimonialData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <SectionTitle
                    topText="What Our Clients Say"
                    mainText="TESTIMONIALS"
                />
                
                <div className="mt-12">
                    <Slider {...settings}>
                        {testimonialData.map((testimonial) => (
                            <div key={testimonial._id} className="px-4">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="mb-4">
                                        <ReactStarsRating 
                                            value={testimonial.rating} 
                                            isEdit={false}
                                            size={24}
                                            primaryColor="#ffd700"
                                            secondaryColor="#ddd"
                                        />
                                    </div>
                                    <p className="text-gray-600 mt-4 mb-6">
                                        {testimonial.details}
                                    </p>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {testimonial.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
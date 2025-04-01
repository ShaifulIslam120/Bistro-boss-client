import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [captchaError, setCaptchaError] = useState('');
    const captchaRef = useRef(null);
    
    // Google's test reCAPTCHA keys (works on localhost)
    const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCaptchaError('');
        
        // Verify CAPTCHA
        const captchaValue = captchaRef.current?.getValue();
        if (!captchaValue) {
            setCaptchaError('Please verify you are not a robot');
            return;
        }

        setIsLoading(true);
        try {
            // For demo purposes - log the captcha verification
            console.log('reCAPTCHA token:', captchaValue);
            
            const response = await fetch('https://getform.io/f/aolmygjb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    'g-recaptcha-response': captchaValue
                }),
            });
            
            if (response.ok) {
                setShowModal(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
                captchaRef.current?.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const SuccessModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-in-out]">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative animate-[slideUp_0.3s_ease-out]">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                        <svg className="w-8 h-8 text-green-500 animate-scale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2 animate-fadeIn">Thank You!</h3>
                    <p className="text-gray-600 text-center mb-6 animate-fadeIn">
                        Your message has been successfully sent. We'll get back to you soon!
                    </p>
                    
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-[#D1A054] text-white px-6 py-2 rounded-md hover:bg-[#b88d47] transition-all duration-300 hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="max-w-2xl mx-auto p-6 bg-[#F3F3F3] rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="6"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
                            placeholder="Write your message here"
                        ></textarea>
                    </div>
                    
                    {/* reCAPTCHA Widget */}
                    <div className="my-4">
                        <ReCAPTCHA
                            ref={captchaRef}
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={() => setCaptchaError('')}
                        />
                        {captchaError && (
                            <p className="text-red-500 text-sm mt-1">{captchaError}</p>
                        )}
                    </div>
                    
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-[#D1A054] text-white px-8 py-3 rounded-md transition-colors duration-300 
                                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#b88d47] hover:scale-105'}`}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {showModal && <SuccessModal />}
        </>
    );
};

export default ContactForm;
import React, { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import loginBg from '../assets/others/authentication.png';
import loginImg from '../assets/others/authentication2.png';
import { Link } from 'react-router-dom';

const Register = () => {
    const [disabled, setDisabled] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!disabled) {
            console.log(formData);
            // Add your registration logic here
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center py-8 px-4 sm:px-6 lg:px-8 bg-opacity-90"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex overflow-hidden">
                <div className="hidden lg:block w-1/2 p-8">
                    <img 
                        src={loginImg} 
                        alt="Restaurant illustration" 
                        className="w-full h-full object-cover drop-shadow-2xl"
                    />
                </div>

                <div className="w-full lg:w-1/2 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 drop-shadow-sm">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054] shadow-sm"
                                placeholder="Type here"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054] shadow-sm"
                                placeholder="Type here"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054] shadow-sm"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">Captcha</label>
                            <LoadCanvasTemplate />
                            <input
                                type="text"
                                onChange={handleValidateCaptcha}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054] shadow-sm mt-2"
                                placeholder="Type the captcha above"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={disabled}
                            className={`w-full py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg active:shadow-sm transform hover:-translate-y-1 active:translate-y-0 
                                ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D1A054] hover:bg-[#b88d47] text-white'}`}
                        >
                            Sign Up
                        </button>

                        <div className="text-center">
                            <p className="text-[#D1A054] mb-3 text-sm">
                                Already registered? <Link to="/login" className="hover:underline font-medium">Go to log in</Link>
                            </p>
                            <p className="text-gray-600 text-sm">Or sign up with</p>
                            <div className="flex justify-center space-x-3 mt-3">
                                <button type="button" className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </button>
                                <button type="button" className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978c-.517-.557-1.429-1.205-2.708-1.205c-2.31 0-4.187 1.933-4.187 4.416c0 2.483 1.877 4.416 4.187 4.416c2.704 0 3.683-1.938 3.828-2.937h-3.828v-2.616h6.457c.063.329.097.661.097 1.085c0 3.975-2.663 6.07-6.554 6.07z"/>
                                    </svg>
                                </button>
                                <button type="button" className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
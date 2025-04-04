import React, { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import loginBg from '../assets/others/authentication.png';
import loginImg from '../assets/others/authentication2.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from './provider/useAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase/firebase.config';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const { signIn, googleSignIn } = useAuth();
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const saveUser = async (user) => {
        const userInfo = {
            name: user.displayName || user.email.split('@')[0], // Use email username if displayName is null
            email: user.email,
            photoURL: user.photoURL || null,
            createdAt: new Date()
        };
        
        try {
            const response = await axios.post('https://bistro-boss-server-ruby-nu.vercel.app/users', userInfo);
            return response.data;
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (user_captcha_value.length === 6) {
            if (validateCaptcha(user_captcha_value)) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!disabled) {
            setLoading(true);
            try {
                const { email, password } = formData;
                const result = await signInWithEmailAndPassword(auth, email, password);
                
                if (result.user) {
                    await saveUser(result.user);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await googleSignIn();
            if (result.user) {
                await saveUser(result.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center py-4 md:py-8 px-2 md:px-6 lg:px-8"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex overflow-hidden">
                <div className="hidden lg:block w-1/2 p-8">
                    <img 
                        src={loginImg} 
                        alt="Restaurant illustration" 
                        className="w-full h-full object-cover drop-shadow-2xl animate-fadeIn"
                    />
                </div>

                <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        <div className="space-y-2">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Captcha</label>
                            <LoadCanvasTemplate />
                            <input
                                type="text"
                                onChange={handleValidateCaptcha}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1A054] shadow-sm"
                                placeholder="Type the captcha above"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={disabled || loading}
                            className={`w-full py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg active:shadow-sm transform hover:-translate-y-1 active:translate-y-0 
                                ${disabled || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D1A054] hover:bg-[#b88d47] text-white'}`}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <div className="text-center text-sm">
                            <p className="text-[#D1A054]">
                                New here? <Link to="/register" className="hover:underline font-medium">Create a New Account</Link>
                            </p>
                        </div>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300"
                        >
                            <FaGoogle className="text-[#D1A054]" />
                            <span>Sign in with Google</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
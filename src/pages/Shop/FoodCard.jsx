import React from 'react';
import Swal from 'sweetalert2';
import { useCart } from '../Cart/CartProvider';
import { useAuth } from '../../Authentication/provider/useAuth';
import useAxiosSecure from '../../Hooks/useAxiossecure';
import { useNavigate } from 'react-router-dom';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { addToCart } = useCart();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (!user) {
            Swal.fire({
                title: "Please login",
                text: "You need to login to add items to cart",
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
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
                quantity: 1
            };

            const response = await axiosSecure.post('/carts', cartItem);
            
            if(response.data.insertedId) {
                addToCart(item);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added to cart!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Add to cart error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to add to cart!"
            });
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-[424px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="relative">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-[300px] object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded hover:bg-opacity-80 transition-all duration-300">
                        ${price}
                    </span>
                </div>
                <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold mb-2 hover:text-[#BB8506] transition-colors duration-300">
                        {name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                        {recipe}
                    </p>
                    <button 
                        onClick={handleAddToCart}
                        className="bg-[#E8E8E8] hover:bg-[#1F2937] text-[#BB8506] hover:text-[#BB8506] font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
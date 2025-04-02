import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCart } from './CartProvider';
import Swal from 'sweetalert2';
import { useAuth } from '../../Authentication/provider/useAuth';
import useAxiosSecure from '../../Hooks/useAxiossecure';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const { removeCartItem, getCartItems } = useAxiosSecure();
    const { user } = useAuth();
    const [dbCartItems, setDbCartItems] = useState([]);
    const total = dbCartItems.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        const loadCartItems = async () => {
            if (user?.email) {
                const items = await getCartItems(user.email);
                setDbCartItems(items);
            }
        };
        loadCartItems();
    }, [user]);

    const handleRemoveFromCart = async (id, index) => {
        try {
            await removeCartItem(id);
            removeFromCart(index);
            const updatedItems = dbCartItems.filter(item => item._id !== id);
            setDbCartItems(updatedItems);
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item removed from cart!",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to remove item!"
            });
        }
    };

    return (
        <div className="pt-20">
            <h2 className="text-3xl font-semibold text-center my-8">My Cart</h2>
            <div className="max-w-4xl mx-auto p-4">
                {dbCartItems.length === 0 ? (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="space-y-4">
                            {dbCartItems.map((item, index) => (
                                <div key={item._id} className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center space-x-4">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-gray-600">${item.price}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveFromCart(item._id, index)}
                                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
                            <button className="bg-[#D1A054] text-white px-6 py-2 rounded-lg hover:bg-[#b88d47] transition-colors duration-300">
                                Pay Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
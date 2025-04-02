import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useCart } from './CartProvider';
import Swal from 'sweetalert2';
import { useAuth } from '../../Authentication/provider/useAuth';
import useAxiosSecure from '../../Hooks/useAxiossecure';
import SectionTitle from '../reusable/SectionTitle';

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

        <div className="w-full px-2 md:px-6 lg:px-8 py-4 md:py-8">
        <SectionTitle
            topText="My Cart" 
            mainText="WANNA ADD MORE?" 
        />
        <h2 className="text-xl md:text-3xl font-semibold mb-4 md:mb-8">TOTAL ITEMS: {dbCartItems.length}</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            {/* Table Header */}
            <div className="min-w-[600px] bg-[#D1A054] text-white grid grid-cols-5 gap-2 md:gap-4 p-2 md:p-4 text-sm md:text-base">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-1">ITEM IMAGE</div>
                <div className="col-span-1">ITEM NAME</div>
                <div className="col-span-1">PRICE</div>
                <div className="col-span-1">ACTION</div>
            </div>

            {/* Table Body */}
            <div className="min-w-[600px]">
                {dbCartItems.map((item, index) => (
                    <div key={item._id} className="grid grid-cols-5 gap-2 md:gap-4 p-2 md:p-4 items-center border-b text-sm md:text-base">
                        <div className="col-span-1 text-center">{index + 1}</div>
                        <div className="col-span-1">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                            />
                        </div>
                        <div className="col-span-1 truncate">{item.name}</div>
                        <div className="col-span-1">${item.price}</div>
                        <div className="col-span-1 flex gap-1 md:gap-2">
                            <button 
                                onClick={() => handleRemoveFromCart(item._id, index)}
                                className="bg-red-500 text-white p-1.5 md:p-2 rounded hover:bg-red-600 transition-colors duration-300"
                            >
                                <FaTrash className="text-xs md:text-sm" />
                            </button>
                            <button 
                                className="bg-[#D1A054] text-white p-1.5 md:p-2 rounded hover:bg-[#b88d47] transition-colors duration-300"
                            >
                                <FaEdit className="text-xs md:text-sm" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {dbCartItems.length === 0 && (
                <div className="p-4 md:p-8 text-center text-gray-500">
                    Your cart is empty
                </div>
            )}
        </div>

        {dbCartItems.length > 0 && (
            <div className="mt-4 md:mt-6 flex justify-end">
                <div className="bg-[#D1A054] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg">
                    <p className="text-base md:text-lg font-semibold">Total: ${total.toFixed(2)}</p>
                </div>
            </div>
        )}
    </div>
    );
};

export default Cart;
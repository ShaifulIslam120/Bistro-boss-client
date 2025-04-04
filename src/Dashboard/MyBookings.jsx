import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiossecure';
import { useAuth } from '../Authentication/provider/useAuth';
import { useCart } from '../pages/Cart/CartProvider';
import SectionTitle from '../pages/reusable/SectionTitle';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { cartItems } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsRes, totalRes] = await Promise.all([
                    axiosSecure.get(`/reservations/user/${user.email}`),
                    axiosSecure.get(`/carts/total/${user.email}`)
                ]);
                
                setBookings(bookingsRes.data);
                setCartTotal(totalRes.data.total);
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to load bookings",
                    text: "Please try again later"
                });
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchData();
        }
    }, [user, axiosSecure]);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await axiosSecure.delete(`/reservations/${id}`);
                setBookings(prev => prev.filter(booking => booking._id !== id));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Booking cancelled successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            Swal.fire({
                icon: "error",
                title: "Failed to cancel booking",
                text: "Please try again"
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#D1A054]"></div>
            </div>
        );
    }

    return (
        <div className="w-full p-4 md:px-8">
            <SectionTitle
                topText="Excellent Ambience"
                mainText="MY BOOKINGS"
            />
    
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-lg md:text-xl font-semibold">
                        Total bookings: {bookings.length}
                    </h2>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <h2 className="text-lg md:text-xl font-semibold">
                            Total price: ${cartTotal?.toFixed(2) || '0.00'}
                        </h2>
                        {cartItems?.length > 0 && (
                            <Link to="/dashboard/payment">
                                <button className="w-full md:w-auto bg-[#D1A054] text-white px-4 py-2 rounded-lg hover:bg-[#b88d47] transition-colors duration-300">
                                    Pay
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
    
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-[#D1A054] text-white">
                            <tr>
                                <th className="p-3 md:p-4 text-left text-sm md:text-base">ITEM IMAGE</th>
                                <th className="p-3 md:p-4 text-left text-sm md:text-base">GUEST NUMBER</th>
                                <th className="p-3 md:p-4 text-left text-sm md:text-base">CATEGORY</th>
                                <th className="p-3 md:p-4 text-left text-sm md:text-base">STATUS</th>
                                <th className="p-3 md:p-4 text-left text-sm md:text-base">PRICE</th>
                                <th className="p-3 md:p-4 text-left text-sm md:text-base">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 md:p-4">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg">
                                            {booking.image && (
                                                <img
                                                    src={booking.image}
                                                    alt={booking.category}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-3 md:p-4 text-sm md:text-base">{booking.guests} guest</td>
                                    <td className="p-3 md:p-4 text-sm md:text-base">{booking.category}</td>
                                    <td className="p-3 md:p-4 text-sm md:text-base">
                                        <span className={`${
                                            booking.status === 'Approved' 
                                                ? 'text-green-600' 
                                                : booking.status === 'Rejected'
                                                ? 'text-red-600'
                                                : 'text-[#D1A054]'
                                        }`}>
                                            {booking.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="p-3 md:p-4 text-sm md:text-base">
                                        ${booking.price?.toFixed(2) || '0.00'}
                                    </td>
                                    <td className="p-3 md:p-4">
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            disabled={booking.status === 'Approved'}
                                            className={`${
                                                booking.status === 'Approved'
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-red-500 hover:text-red-700'
                                            } transition-colors duration-300`}
                                            title={booking.status === 'Approved' ? "Can't cancel approved booking" : "Cancel booking"}
                                        >
                                            <FaTrash size={16} className="md:w-5 md:h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
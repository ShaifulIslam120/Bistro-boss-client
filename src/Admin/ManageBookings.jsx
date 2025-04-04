import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiossecure';
import SectionTitle from '../pages/reusable/SectionTitle';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        setPageCount(Math.ceil(bookings.length / itemsPerPage));
    }, [bookings]);

    const fetchBookings = async () => {
        try {
            const response = await axiosSecure.get('/all-reservations');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            Swal.fire({
                icon: "error",
                title: "Failed to load bookings",
                text: "Please try again later"
            });
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await axiosSecure.patch(`/reservations/${id}`, {
                status: newStatus
            });
            
            if (response.data.modifiedCount > 0) {
                const updatedBookings = bookings.map(booking => 
                    booking._id === id ? { ...booking, status: newStatus } : booking
                );
                setBookings(updatedBookings);
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Booking ${newStatus.toLowerCase()}!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Failed to ${newStatus.toLowerCase()} booking`,
                text: "Please try again"
            });
        }
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % bookings.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    const currentBookings = bookings.slice(itemOffset, itemOffset + itemsPerPage);

    return (
        <div className="w-full px-4 md:px-10">
            <SectionTitle
                topText="---At a Glance!---"
                mainText="MANAGE ALL BOOKINGS"
            />
            
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">
                    TOTAL BOOKINGS: {bookings.length}
                </h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-[#D1A054] text-white">
                            <tr>
                                <th className="p-4 text-left">USER EMAIL</th>
                                <th className="p-4 text-left">PHONE NUMBER</th>
                                <th className="p-4 text-left">BOOKING DATE</th>
                                <th className="p-4 text-left">BOOKING TIME</th>
                                <th className="p-4 text-center">ACTIVITY</th>
                                <th className="p-4 text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBookings.map((booking) => (
                                <tr key={booking._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{booking.email}</td>
                                    <td className="p-4">{booking.phone}</td>
                                    <td className="p-4">{booking.date}</td>
                                    <td className="p-4">{booking.time}</td>
                                    <td className="p-4 text-center">
                                        <span className={`${
                                            booking.status === 'Approved' 
                                                ? 'text-green-600' 
                                                : booking.status === 'Rejected'
                                                ? 'text-red-600'
                                                : 'text-[#D1A054]'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                               

<td className="p-4 text-center flex justify-center gap-2">
    <button 
        onClick={() => handleStatusUpdate(booking._id, 'Approved')}
        disabled={booking.status === 'Approved' || booking.status === 'Rejected'}
        className={`p-2 rounded-full ${
            booking.status === 'Approved' || booking.status === 'Rejected'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
        }`}
        title="Approve Booking"
    >
        <FaCheckCircle size={20} />
    </button>
    <button 
        onClick={() => handleStatusUpdate(booking._id, 'Rejected')}
        disabled={booking.status === 'Approved' || booking.status === 'Rejected'}
        className={`p-2 rounded-full ${
            booking.status === 'Approved' || booking.status === 'Rejected'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-100 text-red-600 hover:bg-red-200'
        }`}
        title="Reject Booking"
    >
        <FaTimes size={20} />
    </button>
</td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next →"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="← Previous"
                    renderOnZeroPageCount={null}
                    containerClassName="flex justify-center items-center gap-2 mt-8"
                    pageClassName="px-3 py-1 rounded border hover:bg-[#D1A054] hover:text-white transition-colors"
                    activeClassName="!bg-[#D1A054] text-white"
                    previousClassName="px-3 py-1 rounded border hover:bg-[#D1A054] hover:text-white transition-colors"
                    nextClassName="px-3 py-1 rounded border hover:bg-[#D1A054] hover:text-white transition-colors"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    breakClassName="px-3 py-1"
                />
            </div>
        </div>
    );
};

export default ManageBookings;
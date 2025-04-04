import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

import ReactPaginate from 'react-paginate';
import useAxiosSecure from '../Hooks/useAxiossecure';
import SectionTitle from '../pages/reusable/SectionTitle';

const ManageItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchMenuItems();
    }, []);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(menuItems.length / itemsPerPage));
    }, [menuItems, itemOffset]);

    const fetchMenuItems = async () => {
        try {
            const response = await axiosSecure.get('/menu');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            Swal.fire({
                icon: "error",
                title: "Failed to load menu items",
                text: "Please try again later"
            });
        }
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % menuItems.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

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
                const res = await axiosSecure.delete(`/menu/${id}`);
                if (res.data.deletedCount > 0) {
                    setMenuItems(menuItems.filter(item => item._id !== id));
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item deleted successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to delete item!"
            });
        }
    };

    const currentItems = menuItems.slice(itemOffset, itemOffset + itemsPerPage);

    return (
        <div className="w-full px-4 md:px-10">
            <SectionTitle
                topText="---Hurry Up!---"
                mainText="MANAGE ALL ITEMS"
            />
            
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">
                    TOTAL ITEMS: {menuItems.length}
                </h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-[#D1A054] text-white">
                            <tr>
                                <th className="p-4 text-left">#</th>
                                <th className="p-4 text-left">ITEM IMAGE</th>
                                <th className="p-4 text-left">ITEM NAME</th>
                                <th className="p-4 text-left">PRICE</th>
                                <th className="p-4 text-center">ACTION</th>
                                <th className="p-4 text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{itemOffset + index + 1}</td>
                                    <td className="p-4">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">${item.price}</td>
                                    <td className="p-4 text-center">
                                        <button 
                                            className="bg-[#D1A054] p-3 rounded text-white hover:bg-[#b88d47] transition-colors"
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-600 p-3 rounded text-white hover:bg-red-700 transition-colors"
                                        >
                                            <FaTrashAlt />
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

export default ManageItems;
import { useEffect, useState } from 'react';
// import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiossecure';
import { FaTrash, FaUserShield, FaUserAlt } from 'react-icons/fa';
const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const { axiosSecure } = useAxiosSecure();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axiosSecure.get('/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    

    const handleDeleteUser = async (user) => {
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
                const response = await axiosSecure.delete(`/users/${user._id}`);
                if (response.data.deletedCount > 0) {
                    setUsers(users.filter(u => u._id !== user._id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                }
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleToggleRole = async (user) => {
        try {
            const newRole = user.role === 'admin' ? 'user' : 'admin';
            const response = await axiosSecure.patch(`/users/toggle-role/${user._id}`, {
                role: newRole
            });
            
            if (response.data.modifiedCount > 0) {
                const updatedUsers = users.map(u => {
                    if (u._id === user._id) {
                        return { ...u, role: newRole };
                    }
                    return u;
                });
                setUsers(updatedUsers);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is now a ${newRole}!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error toggling role:', error);
        }
    };

    return (
        <div className="w-full px-4">
            <h2 className="text-3xl font-semibold my-4">Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* ... existing thead ... */}
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button 
                                        onClick={() => handleToggleRole(user)}
                                        className={`btn btn-ghost ${user.role === 'admin' ? 'bg-green-600' : 'bg-[#D1A054]'} text-white hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105`}
                                        title={user.role === 'admin' ? 'Make User' : 'Make Admin'}
                                    >
                                        {user.role === 'admin' ? 
                                            <FaUserAlt className="text-xl" /> : 
                                            <FaUserShield className="text-xl" />
                                        }
                                    </button>
                                </td>
                                <td>
                                                        <button 
                            onClick={() => handleDeleteUser(user)}
                            className="btn btn-ghost bg-red-600 text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                        >
                            <FaTrash className="text-xl" />
                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
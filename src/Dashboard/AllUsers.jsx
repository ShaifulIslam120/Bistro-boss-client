import { useEffect, useState } from 'react';
import { FaTrash, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiossecure';
import { useAuth } from '../Authentication/provider/useAuth';
import SectionTitle from '../pages/reusable/SectionTitle';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user: currentUser } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axiosSecure.get('/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, [axiosSecure]);

    const handleDeleteUser = async (user) => {
        try {
            if (user.email === currentUser?.email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Not Allowed',
                    text: 'You cannot delete your own account!'
                });
                return;
            }

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
            if (user.email === currentUser?.email && user.role === 'admin') {
                Swal.fire({
                    icon: 'error',
                    title: 'Not Allowed',
                    text: 'You cannot remove your own admin role!'
                });
                return;
            }

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
        <div className="w-full p-8">
            <SectionTitle
          topText="How many??" 
          mainText="MANAGE ALL USERS" 
        />
            <h2 className="text-2xl font-bold mb-6">TOTAL USERS: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#D1A054] text-white">
                            <th className="p-4 text-left">#</th>
                            <th className="p-4 text-left">NAME</th>
                            <th className="p-4 text-left">EMAIL</th>
                            <th className="p-4 text-left">ROLE</th>
                            <th className="p-4 text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="border-b border-gray-200">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4 flex items-center gap-2">
                                    <button 
                                        onClick={() => handleToggleRole(user)}
                                        className={`p-2 rounded ${user.role === 'admin' ? 'bg-green-600' : 'bg-[#D1A054]'}`}
                                    >
                                        <FaUserShield className="text-white text-xl" />
                                    </button>
                                    <span className={`font-medium ${user.role === 'admin' ? 'text-green-600' : 'text-[#D1A054]'}`}>
                                        {user.role === 'admin' ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button 
                                        onClick={() => handleDeleteUser(user)}
                                        className="p-2 rounded bg-red-600"
                                    >
                                        <FaTrash className="text-white text-xl" />
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
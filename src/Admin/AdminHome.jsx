import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FaUsers, FaMoneyBill, FaShoppingCart, FaBoxOpen } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiossecure';

const AdminHome = () => {
    const [stats, setStats] = useState({
        revenue: 0,
        customers: 0,
        products: 0,
        orders: 0
    });
    const [categoryData, setCategoryData] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, categoryRes] = await Promise.all([
                    axiosSecure.get('/admin/stats'),
                    axiosSecure.get('/admin/category-stats')
                ]);
                setStats(statsRes.data);
                setCategoryData(categoryRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, [axiosSecure]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const StatCard = ({ icon: Icon, value, label, color }) => (
        <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="text-2xl text-white" />
                </div>
                <div>
                    <h3 className="text-3xl font-bold">{value}</h3>
                    <p className="text-gray-600">{label}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold mb-8">Hi, Welcome Back!</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    icon={FaMoneyBill} 
                    value={stats.revenue} 
                    label="Revenue" 
                    color="bg-purple-500"
                />
                <StatCard 
                    icon={FaUsers} 
                    value={stats.customers} 
                    label="Customers" 
                    color="bg-yellow-500"
                />
                <StatCard 
                    icon={FaBoxOpen} 
                    value={stats.products} 
                    label="Products" 
                    color="bg-pink-500"
                />
                <StatCard 
                    icon={FaShoppingCart} 
                    value={stats.orders} 
                    label="Orders" 
                    color="bg-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Category Sales</h3>
                    <AreaChart
                        width={500}
                        height={300}
                        data={categoryData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="sold" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Category Distribution</h3>
                    <div className="flex justify-center">
                        <PieChart width={400} height={300}>
                            <Pie
                                data={categoryData}
                                cx={200}
                                cy={150}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {categoryData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                                />
                                <span>{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
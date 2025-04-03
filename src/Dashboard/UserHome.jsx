import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWallet, FaShoppingCart, FaPhone } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiossecure';
import { useAuth } from '../Authentication/provider/useAuth';

const UserHome = () => {
  const { user } = useAuth();
  const [menuCount, setMenuCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch menu count
    axios.get('http://localhost:4000/menu')
      .then(res => {
        setMenuCount(res.data.length);
      })
      .catch(error => console.error('Error fetching menu:', error));

    // Fetch cart count if user is logged in
    if (user?.email) {
      axiosSecure.get(`/carts?email=${user.email}`)
        .then(res => {
          setCartCount(res.data.length);
        })
        .catch(error => console.error('Error fetching cart:', error));
    }
  }, [user, axiosSecure]);

  const menuItems = [
    { 
      id: menuCount, 
      icon: <FaWallet className="text-2xl" />, 
      label: 'Menu', 
      bgColor: 'bg-[#BB34F5]' 
    },
    { 
      id: cartCount, 
      icon: <FaShoppingCart className="text-2xl" />, 
      label: 'Shop', 
      bgColor: 'bg-[#D3A256]' 
    },
    { 
      id: '03', 
      icon: <FaPhone className="text-2xl" />, 
      label: 'Contact', 
      bgColor: 'bg-[#FE4880]' 
    }
  ];

  const activities = [
    { icon: '🛒', label: 'Orders', count: 0 },
    { icon: '⭐', label: 'Reviews', count: 0 },
    { icon: '📅', label: 'Bookings', count: 0 },
    { icon: '💳', label: 'Payment', count: 0 }
  ];

  const userName = user?.email?.split('@')[0] || 'Guest';

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Hi, Welcome Back {userName}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {menuItems.map(item => (
          <div 
            key={item.label}
            className={`${item.bgColor} p-6 rounded-lg text-white cursor-pointer 
              transition-transform hover:scale-105`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                {item.icon}
              </div>
              <div>
                <div className="text-3xl font-bold">{item.id}</div>
                <div className="text-sm font-medium">{item.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 bg-[#FFF8F5] rounded-lg overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#D3A256] overflow-hidden mb-4">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={userName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#D3A256] flex items-center justify-center">
                <span className="text-4xl text-white uppercase">
                  {userName[0]}
                </span>
              </div>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {userName}
          </h2>
        </div>

        <div className="bg-[#FFF9E7] p-8">
          <h3 className="text-xl font-bold mb-6">Your Activities</h3>
          <div className="space-y-4">
            {activities.map(activity => (
              <div 
                key={activity.label} 
                className="flex items-center gap-3 bg-white p-3 rounded-lg"
              >
                <span className="text-2xl">{activity.icon}</span>
                <span className="font-medium text-gray-700">{activity.label}:</span>
                <span className="font-bold text-gray-900">{activity.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
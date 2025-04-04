import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWallet, FaShoppingCart, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../Authentication/provider/useAuth';
import useAxiosSecure from '../Hooks/useAxiossecure';

const UserHome = () => {
  const { user } = useAuth();
  const [menuCount, setMenuCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const menuRes = await axios.get('https://bistro-boss-server-ruby-nu.vercel.app/menu');
        setMenuCount(menuRes.data.length);

        if (user?.email) {
          const [cartRes, reservationRes, reviewRes] = await Promise.all([
            axiosSecure.get(`/carts?email=${user.email}`),
            axiosSecure.get(`/reservations?email=${user.email}`),
            axiosSecure.get(`/reviews/user/${user.email}`)
          ]);

          setCartCount(cartRes.data.length);
          setReservationCount(reservationRes.data.length);
          setReviewCount(reviewRes.data.length);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, axiosSecure]);

  const menuItems = [
    { 
      id: menuCount, 
      icon: <FaWallet className="text-2xl" />, 
      label: 'Menu', 
      bgColor: 'bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF]' 
    },
    { 
      id: cartCount, 
      icon: <FaShoppingCart className="text-2xl" />, 
      label: 'Shop', 
      bgColor: 'bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]' 
    },
    { 
      id: '03', 
      icon: <FaPhone className="text-2xl" />, 
      label: 'Contact', 
      bgColor: 'bg-gradient-to-r from-[#FE4880] to-[#FECDE9]' 
    }
  ];

  const activities = [
    { icon: '🛒', label: 'Orders', count: cartCount },
    { icon: '⭐', label: 'Reviews', count: reviewCount },
    { icon: '📅', label: 'Bookings', count: reservationCount },
    { icon: '💳', label: 'Payment', count: 0 }
  ];

  const userName = user?.displayName || user?.email?.split('@')[0] || 'Guest';

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#D3A256]"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Hi, Welcome Back {userName}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {menuItems.map(item => (
          <motion.div 
            key={item.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${item.bgColor} p-6 rounded-lg text-white cursor-pointer 
              shadow-lg hover:shadow-xl transition-all duration-300`}
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
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 bg-[#FFF8F5] rounded-lg overflow-hidden shadow-lg">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-8 flex flex-col items-center"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#D3A256] overflow-hidden mb-4 shadow-lg">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={userName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] flex items-center justify-center">
                <span className="text-4xl text-white uppercase">
                  {userName[0]}
                </span>
              </div>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {userName}
          </h2>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#FFF9E7] p-8"
        >
          <h3 className="text-xl font-bold mb-6">Your Activities</h3>
          <div className="space-y-4">
            {activities.map(activity => (
              <motion.div 
                key={activity.label}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="text-2xl">{activity.icon}</span>
                <span className="font-medium text-gray-700">{activity.label}:</span>
                <span className="font-bold text-gray-900">{activity.count}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserHome;
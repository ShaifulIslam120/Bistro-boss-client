import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:4000'
});

const useAxiosSecure = () => {
    const addToCart = async (cartItem) => {
        try {
            const response = await axiosSecure.post('/carts', cartItem);
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const getCartItems = async (email) => {
        try {
            const response = await axiosSecure.get(`/carts?email=${email}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            throw error;
        }
    };

    const removeCartItem = async (id) => {
        try {
            const response = await axiosSecure.delete(`/carts/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error removing cart item:', error);
            throw error;
        }
    };

    return {
        axiosSecure,
        addToCart,
        getCartItems,
        removeCartItem
    };
};

export default useAxiosSecure;
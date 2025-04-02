import { useEffect, useState } from "react";
import { useAuth } from "../Authentication/provider/useAuth";
import useAxiosSecure from "./useAxiossecure";

const useCart = () => {
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            if (user?.email) {
                try {
                    const response = await axiosSecure.get(`/carts?email=${user.email}`);
                    setCart(response.data);
                } catch (error) {
                    console.error('Error fetching cart:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCart();
    }, [user, axiosSecure]);

    return [cart, loading];
};

export default useCart;
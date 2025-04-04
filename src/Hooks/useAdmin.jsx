import { useEffect, useState } from "react";
import { useAuth } from "../Authentication/provider/useAuth";
import axios from "axios";

const useAdmin = () => {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            if (user?.email) {
                const response = await axios.get(`https://bistro-boss-server-ruby-nu.vercel.app/users/admin/${user.email}`);
                setIsAdmin(response.data.isAdmin);
                setIsAdminLoading(false);
            }
        };
        checkAdmin();
    }, [user]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
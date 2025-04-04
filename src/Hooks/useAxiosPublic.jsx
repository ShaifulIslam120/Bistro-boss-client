import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-server-ruby-nu.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
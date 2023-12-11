import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://ghostrider5026-001-site1.anytempurl.com/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance;

import {BASE_URL} from "../../utils/constants.js";
import axios from "axios";




export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
    });

    api.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    });


export default api;

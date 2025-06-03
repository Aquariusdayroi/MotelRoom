import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";
import { logout } from "../authToken";
import forceLogout from "../until/forceLogout";

const baseURL = process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api`
    : "http://localhost:8000";
const axiosClient = axios.create({
    baseURL: baseURL,
    // headers: {
    //     "Content-Type": "application/json",
    // },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    if (config.skipAuth) {
        return config;
    }
    const token = Cookies.get("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res && res.data) {
            return { data: res.data, status: res.status };
        }
        return res;
    },
    (error) => {
        throw error;
    }
);

axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("Error response:", error.response);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            forceLogout();
        }

        return Promise.reject(error);
    }
);

export default axiosClient;

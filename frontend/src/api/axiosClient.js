import axios from "axios";
import queryString from "query-string";

const baseURL = process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api`
    : "http://localhost:8000";
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    if (config.skipAuth) {
        return config;
    }
    const token = localStorage.getItem("access_token");
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
        console.error("Error response:", error.response);
        throw error;
    }
);

export default axiosClient;

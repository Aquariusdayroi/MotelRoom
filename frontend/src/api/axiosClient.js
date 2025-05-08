import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";
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
console.log("Helllo\n");
console.log(axiosClient.baseURL);

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
        console.error("Error response:", error.response);
        throw error;
    }
);

axiosClient.interceptors.request.use(
    (config) => {
        console.log("Request:", config.url, config.params);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        console.log("Response:", response.data);
        return response;
    },
    (error) => {
        console.error("Error response:", error.response);
        return Promise.reject(error);
    }
);

export default axiosClient;

import axiosClient from "./axiosClient";

const authApi = {
    login: (data) => {
        const url =
            data.provider === "google"
                ? "/user/api/login/google"
                : "/user/api/login";
        if (data.provider === "google") {
            data = {
                token: data.token,
            };
        }
        return axiosClient.post(url, data, { skipAuth: true });
    },

    register: (data) => {
        const url = "/user/api/register";
        return axiosClient.post(url, data, { skipAuth: true });
    },
};

export default authApi;

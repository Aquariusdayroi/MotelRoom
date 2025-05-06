import axiosClient from "../axiosClient";

const roomTypeApi = {
    getAll: () => {
        const url = "/rental_post/api/post/";
        return axiosClient.get(url);
    },

    searchByType: (homeType, page = 1) => {
        const url = "/rental_post/api/post/";
        return axiosClient.get(url, {
            params: {
                home_type: homeType,
                page: page,
            },
        });
    },

    getById: (id) => {
        const url = `/rental_post/api/post/${id}/`;
        return axiosClient.get(url);
    },

    searchByType: (params) => {
        const url = "/rental_post/api/post/";
        return axiosClient.get(url, { params });
    },
};

export default roomTypeApi;

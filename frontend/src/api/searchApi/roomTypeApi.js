import axiosClient from "../axiosClient";

const roomTypeApi = {
    getAll: () => {
        const url = "/rental_post/api/search/";
        return axiosClient.get(url);
    },

    searchByType: async (params) => {
        try {
            const url = "/rental_post/api/search/";
            const response = await axiosClient.get(url, {
                params: {
                    ...params,
                    page: params.page || 1,
                },
            });
            return response;
        } catch (error) {
            console.error("Lỗi API:", error);
            throw error;
        }
    },

    getById: (id) => {
        const url = `/rental_post/api/search/${id}/`;
        return axiosClient.get(url);
    },
};

export default roomTypeApi;

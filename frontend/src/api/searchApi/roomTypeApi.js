import axiosClient from "../axiosClient";

const roomTypeApi = {
    // Lấy tất cả danh sách phòng
    getAll: () => {
        const url = "/rental_post/api/search/";
        return axiosClient.get(url);
    },

    // Tìm kiếm phòng theo nhiều tiêu chí
    searchByType: async (params) => {
        try {
            console.log("Đang gọi API với tham số:", params);
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

    // Lấy thông tin chi tiết phòng theo ID
    getById: (id) => {
        const url = `/rental_post/api/search/${id}/`;
        return axiosClient.get(url);
    },
};

export default roomTypeApi;

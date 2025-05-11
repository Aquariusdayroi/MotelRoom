import axiosClient from "../axiosClient";

const searchApi = {
    searchRooms: async (params = {}) => {
        try {
            const response = await axiosClient.get("/rental_post/api/search/", {
                params,
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tìm kiếm phòng:", error);
            return { results: [], count: 0 };
        }
    },
};

export default searchApi;

import axiosClient from "../axiosClient";

export const getOwnerRequestStats = async (groupBy = "all_year") => {
    try {
        const response = await axiosClient.get(
            `/user-admin/api/requests/static-owner-by-time-group/`,
            {
                params: { group_by: groupBy },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thống kê yêu cầu làm chủ trọ:", error);
        throw error;
    }
};

export const getOwnerStats = async (groupBy = "all_year") => {
    try {
        const response = await axiosClient.get(`/user/api/admin/user-count/`, {
            params: { group_by: groupBy },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thống kê yêu cầu làm chủ trọ:", error);
        throw error;
    }
};

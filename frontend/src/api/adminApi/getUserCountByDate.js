import axiosClient from "../axiosClient";

export const getUserCountByDate = async (date) => {
    try {
        const response = await axiosClient.get(
            `/user-admin/api/requests/count-users-by-date/?date=${date}`
        );

        if (response.data?.success) {
            return {
                date: response.data.date,
                count: response.data.total_users || 0,
            };
        } else {
            return { date, count: 0 };
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu theo ngày:", error);
        return { date, count: 0 };
    }
};

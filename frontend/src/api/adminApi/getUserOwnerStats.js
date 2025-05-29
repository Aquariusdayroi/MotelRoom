import axiosClient from "../axiosClient";

export const getUserOwnerStats = async () => {
    try {
        const response = await axiosClient.get(
            "/user-admin/api/requests/static-user-owner/"
        );
        if (response.data?.success) {
            return {
                totalUser: response.data.total_user,
                totalOwner: response.data.total_owner,
            };
        } else {
            throw new Error("Không lấy được thống kê người dùng & chủ trọ.");
        }
    } catch (error) {
        console.error("Lỗi khi lấy thống kê user/owner:", error);
        throw error;
    }
};

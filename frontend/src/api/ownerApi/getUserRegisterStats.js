import axiosClient from "../axiosClient";

export const getUserRegisterStats = async (groupBy = "all_year") => {
    try {
        const response = await axiosClient.get(
            `/user-admin/api/requests/static-user-register-group/`,
            {
                params: { group_by: groupBy },
            }
        );
        console.log("cc", response);

        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thống kê đăng ký:", error);
        throw error;
    }
};

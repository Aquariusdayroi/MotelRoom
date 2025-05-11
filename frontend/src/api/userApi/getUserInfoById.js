import axiosClient from "../axiosClient";

export const getUserInfoById = async (userId) => {
    if (!userId) {
        throw new Error("Phải truyền vào userId.");
    }

    try {
        const response = await axiosClient.get(
            `/user/api/user-info/${userId}/`
        );

        if (response.data && response.data.success) {
            return response.data.user;
        } else {
            throw new Error("Không lấy được thông tin người dùng.");
        }
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        throw error;
    }
};

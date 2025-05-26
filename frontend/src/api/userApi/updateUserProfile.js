import axiosClient from "../axiosClient";

export const updateUserProfileInfo = async (data) => {
    try {
        const response = await axiosClient.put("/user/api/me", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.data.success) {
            return response.data.user;
        } else {
            alert("Có lỗi xảy ra khi cập nhật thông tin!");
        }
    } catch (error) {
        console.error("Lỗi cập nhật thông tin:", error);
        throw error;
    }
};

export const updateUserAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
        const response = await axiosClient.put("/user/api/me", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.success) {
            return response.data.user;
        } else {
            alert("Có lỗi xảy ra khi cập nhật avatar!");
        }
    } catch (error) {
        console.error("Lỗi cập nhật avatar:", error);
        throw error;
    }
};

export const getMyProfile = async () => {
    try {
        const response = await axiosClient.get("/user/api/me");
        if (response?.data?.success && response?.data?.user) {
            return response.data.user;
        } else {
            throw new Error(
                response?.data?.message ||
                    "Không lấy được thông tin người dùng."
            );
        }
    } catch (error) {
        console.error("Lỗi khi lấy thông tin cá nhân:", error);
        throw error;
    }
};

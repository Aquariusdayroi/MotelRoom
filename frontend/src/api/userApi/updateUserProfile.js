import axiosClient from "../axiosClient";

export const updateUserProfile = async (formData) => {
    console.log("Response:", formData);
    try {
        const response = await axiosClient.put("/user/api/me", formData, {});

        if (response.data.success) {
            return response.data.user;
        } else {
            alert("Có lỗi xảy ra!");
        }
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
    }
};

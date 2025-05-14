import axiosClient from "../axiosClient";

export const updateUserProfile = async (data) => {
    const formData = new FormData();

    for (let key in data) {
        if (
            typeof data[key] === "object" &&
            data[key] !== null &&
            !(data[key] instanceof File)
        ) {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }

    try {
        const response = await axiosClient.put("/user/api/me", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.success) {
            return response.data.user;
        } else {
            alert("Có lỗi xảy ra!");
        }
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
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

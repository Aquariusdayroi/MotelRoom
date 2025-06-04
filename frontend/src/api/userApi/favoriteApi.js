import axiosClient from "../axiosClient"; // hoặc axios instance của bạn
import Cookies from "js-cookie";

const getAuthHeader = () => {
    const token = Cookies.get("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addFavoritePost = async (rentalPostId) => {
    try {
        const response = await axiosClient.post(
            `/favorite/api/add/${rentalPostId}/`
        );
        return response.data;
    } catch (error) {
        console.error(
            "Lỗi khi thêm bài đăng yêu thích:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const deleteFavoritePost = async (rentalPostId) => {
    try {
        const response = await axiosClient.delete(
            `/favorite/api/delete/${rentalPostId}/`
        );
        return response.data;
    } catch (error) {
        console.error(
            "Lỗi khi xóa bài đăng yêu thích:",
            error.response?.data || error.message
        );
        throw error;
    }
};

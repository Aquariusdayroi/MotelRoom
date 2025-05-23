import axiosClient from "../axiosClient";

export const getPostStatsByOwner = async () => {
    try {
        const response = await axiosClient.get(
            "/rental-post-admin/api/requests/stat_rental/"
        );
        console.log(response);

        if (response.data?.success) {
            return {
                totalOwner: response.data.total_owner,
                results: response.data.results,
            };
        } else {
            throw new Error(
                response.data?.message || "Không lấy được thống kê."
            );
        }
    } catch (error) {
        console.error("Lỗi khi lấy thống kê bài đăng:", error);
        throw error;
    }
};

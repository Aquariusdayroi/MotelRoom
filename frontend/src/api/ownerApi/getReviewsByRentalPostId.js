import axiosClient from "../axiosClient";

export const getReviewsByRentalPostId = async (rentalPostId, rating) => {
    try {
        const params = {};
        if (rating !== undefined) {
            params.rating = rating;
        }

        const response = await axiosClient.get(
            `/user/api/user-info/my-reviews/`,
            { params }
        );

        if (response?.data?.success) {
            return response.data.reviews;
        } else {
            throw new Error(
                response?.data?.message || "Không lấy được đánh giá."
            );
        }
    } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
        throw error;
    }
};

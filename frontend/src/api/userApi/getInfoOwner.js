import axiosClient from "../axiosClient";

const getInfoOwner = {
    getUserInfoByPostId: async (postId) => {
        if (!postId) throw new Error("Phải truyền vào postId.");

        const response = await axiosClient.get(
            `/rental_post/api/${postId}/user-info/`
        );

        if (response.data && response.data.success) {
            return response.data.user;
        } else {
            throw new Error("Không lấy được thông tin chủ nhà.");
        }
    },
};

export default getInfoOwner;

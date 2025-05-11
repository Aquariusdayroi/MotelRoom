// src/api/ownerPostApi.js
import axiosClient from "./axiosClient";

const ownerPostApi = {
    // Lấy danh sách bài đăng của chủ trọ theo trang
    getAll: (params) => {
        return axiosClient.get(`/rental_post/api/my-posts/`, { params });
    },

    hidePost: (id) => {
        return axiosClient.post(`/rental_post/hide/${id}/`);
    },

    // Xoá bài đăng
    delete: (id) => {
        return axiosClient.delete(`/rental_post/api/my-posts/${id}/`);
    },
    search: ({ page = 1, keyword = '', ordering = 'oldest' }) => {
        return axiosClient.get('/rental_post/api/my-posts/search/', {
            params: {
                page,
                keyword,
                ordering,
            },
        });
    },

};

export default ownerPostApi;

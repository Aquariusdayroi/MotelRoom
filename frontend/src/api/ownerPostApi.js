// src/api/ownerPostApi.js
import axiosClient from "./axiosClient";

const ownerPostApi = {
    // Lấy danh sách bài đăng của chủ trọ theo trang
    getAll: (params) => {
        return axiosClient.get(`/rental_post/api/my-posts/`, { params });
    },
    
    // Xoá bài đăng
    delete: (id) => {
        return axiosClient.delete(`/rental_post/api/my-posts/${id}/`);
    },
    search: ({ page = 1, keyword = '', ordering = 'newest' }) => {
        return axiosClient.get('/rental_post/api/my-posts/search/', {
            params: {
                page,
                keyword,
                ordering,
            },
        });
    },

    // Cập nhật bài đăng
    update: (id, data) => {
        return axiosClient.put(`/rental_post/api/my-posts/${id}/`, data);
    },

};

export default ownerPostApi;

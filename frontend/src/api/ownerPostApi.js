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
    },    // Get top 5 posts by views
    getTopViews: () => {
        return axiosClient.get('/rental_post/api/my-posts/top-views/');
    },

    // Lấy thống kê tương tác của một bài đăng
    getPostInteractions: (postId) => {
        return axiosClient.get(`/rental_post/api/by-posts/${postId}/reviews/static/`);
    },    // Cập nhật bài đăng
    update: (id, data) => {
        console.log('Sending PUT request to update post...');
        console.log('Request Data:', data);

        return axiosClient.put(`/rental_post/api/my-posts/${id}/`, data)
            .then(response => {
                console.log('Response Data:', response.data);
                return response.data;
            });
    },


};

export default ownerPostApi;
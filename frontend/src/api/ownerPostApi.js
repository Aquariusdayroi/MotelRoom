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
    update: (id, data, token) => {
        // Cấu hình headers với token
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        console.log('Sending PUT request to update post...');
        console.log('API URL:', `/rental_post/api/my-posts/${id}/`);
        console.log('Request Data:', data);
        console.log('Request Headers:', headers);

        return axiosClient.put(`/rental_post/api/my-posts/${id}/`, data, { headers })
            .then(response => {
                console.log('Response Data:', response.data);  // Kiểm tra dữ liệu trả về từ API
                return response.data;  // Trả về dữ liệu từ phản hồi của API
            })
            .catch(error => {
                if (error.response) {
                    console.log('Backend error:', error.response.data);
                    console.log('Backend status:', error.response.status);
                    console.log('Backend headers:', error.response.headers);
                } else {
                    console.log('Network error:', error.message);
                }
                throw error;  // Đảm bảo ném lỗi để xử lý ở nơi khác nếu cần
            });
    },


};

export default ownerPostApi;

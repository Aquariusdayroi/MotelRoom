import axiosClient from "../axiosClient";

const priceApi = {
    getAll: () => {
        const url = "/rental_post/api/search/";
        return axiosClient.get(url, { skipAuth: true });
    },

    searchByPrice: (minPrice, maxPrice, page = 1) => {
        const url = "/rental_post/api/search/";
        return axiosClient.get(url, {
            params: {
                min_price: minPrice,
                max_price: maxPrice,
                page: page,
            },
        });
    },
};

export default priceApi;

import axiosClient from "../axiosClient";

const priceApi = {
    getAll: () => {
        const url = "/rental_post/api/post/";
        return axiosClient.get(url);
    },

    searchByPrice: (minPrice, maxPrice, page = 1) => {
        const url = "/rental_post/api/post/";
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

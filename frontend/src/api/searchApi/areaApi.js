import axiosClient from "../axiosClient";

const areaApi = async (lat, lng) => {
    try {
        const response = await axiosClient.get(`/rental_post/api/search/`, {
            params: {
                lat,
                lng,
            },
        });
        return response.data.results || [];
    } catch (error) {
        console.error("Error fetching area suggestions:", error);
        return [];
    }
};

export default areaApi;

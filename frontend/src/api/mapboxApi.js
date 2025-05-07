const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// Hàm tạo session token
const generateSessionToken = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
};

// Hàm search suggestions
const searchLocation = async (searchText) => {
    try {
        if (!searchText || searchText.length < 3) {
            return [];
        }
        const encodedQuery = encodeURIComponent(searchText.trim());

        const params = {
            q: encodedQuery,
            language: "vi",
            country: "VN",
            limit: "5",
            access_token: MAPBOX_TOKEN,
            proximity: "106.629700,10.823100",
            types: "address,poi,district,locality",
            bbox: "106.360000,10.370000,107.030000,11.030000",
            session_token: "47df658e-ba82-4884-a6be-fad82bba3fb2",
        };
        console.debug("Mapbox API request:", params);

        const response = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/suggest?${new URLSearchParams(
                params
            )}`
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                `HTTP error! status: ${
                    response.status
                }, message: ${JSON.stringify(errorData)}`
            );
        }
        const data = await response.json();

        if (data.suggestions) {
            return data.suggestions.map((suggestion) => ({
                id: suggestion.mapbox_id,
                name: suggestion.name || suggestion.name_preferred,
                description:
                    suggestion.full_address || suggestion.place_formatted,
                coordinates: {
                    lat: suggestion.point ? suggestion.point.latitude : null,
                    lng: suggestion.point ? suggestion.point.longitude : null,
                },
                color: "#2196f3",
            }));
        }
        return [];
    } catch (error) {
        console.error("Error searching locations:", error);
        return [];
    }
};

// Hàm retrieve chi tiết địa điểm
const retrieveLocation = async (locationId) => {
    try {
        const response = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/retrieve/${locationId}?` +
                new URLSearchParams({
                    access_token: MAPBOX_TOKEN,
                    session_token: "47df658e-ba82-4884-a6be-fad82bba3fb2",
                })
        );

        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            return {
                coordinates: {
                    lat: feature.geometry.coordinates[1],
                    lng: feature.geometry.coordinates[0],
                },
            };
        }
        return null;
    } catch (error) {
        console.error("Error retrieving location:", error);
        return null;
    }
};

// Hàm lấy tọa độ từ địa chỉ
const fetchCoordinates = async (address) => {
    try {
        const encodedAddress = encodeURIComponent(address);
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?` +
                new URLSearchParams({
                    access_token: MAPBOX_TOKEN,
                    country: "VN",
                    language: "vi",
                    limit: "1",
                })
        );

        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            return [lat, lng];
        }

        throw new Error("Không tìm thấy tọa độ cho địa chỉ.");
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw error;
    }
};

export const mapboxApi = {
    searchLocation,
    retrieveLocation,
    fetchCoordinates,
};

export default mapboxApi;

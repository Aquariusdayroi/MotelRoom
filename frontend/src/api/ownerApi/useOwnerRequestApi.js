import axiosClient from "../axiosClient";
import { useEffect, useState } from "react";

const useOwnerRequestCount = (token) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                if (!token) {
                    return;
                }

                const response = await axiosClient.get(
                    "/user/api/owner-requests/"
                );

                if (response.data && response.data.count >= 0) {
                    setCount(response.data.count);
                } else {
                    console.error("Invalid response format:", response.data);
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách yêu cầu:", err);
            }
        };

        fetchRequests();
    }, [token]);

    return count;
};

export default useOwnerRequestCount;

import axiosClient from "../axiosClient";
import { useEffect, useState } from "react";

const useOwnerRequestCount = (token) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // Kiểm tra token trước khi gọi API
                if (!token) {
                    console.log("Token không tồn tại");
                    return;
                }

                const response = await axiosClient.get(
                    "/user/api/owner-requests/"
                );
                console.log("Owner requests response:", response);

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

import axiosClient from "../axiosClient";
import { useEffect, useState } from "react";

export const useOwnerRequestCount = (token) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                if (!token) {
                    return;
                }

                const response = await axiosClient.get(
                    "/user/api/admin/owner-requests/list-request/"
                );

                if (response.data && response.data.requests) {
                    setCount(response.data.requests.length);
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

export const useOwnerRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(
                "/user/api/admin/owner-requests/list-request/"
            );

            if (response?.data?.success && response?.data?.requests) {
                setRequests(response.data.requests);
            } else {
                throw new Error(
                    response?.data?.message || "Không lấy được yêu cầu."
                );
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return { requests, loading, error, refetch: fetchRequests };
};

export const useOwnerRequestById = (id) => {
    const { requests, loading, error } = useOwnerRequests();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        if (!loading && requests.length > 0) {
            const found = requests.find((r) => r.id === id);
            setRequest(found || null);
        }
    }, [loading, requests, id]);

    return { request, loading, error };
};

export const approveOwnerRequest = async (userRequestId) => {
    try {
        const response = await axiosClient.post(
            `/user/api/admin/owner-requests/${userRequestId}/approve/`
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi duyệt yêu cầu:", error);
        throw error;
    }
};

export const rejectOwnerRequest = async (requestId, reason) => {
    if (!reason || reason.trim() === "") {
        throw new Error("Phải có lý do từ chối.");
    }

    const response = await axiosClient.post(
        `/user/api/admin/owner-requests/${requestId}/reject/`,
        { reason }
    );

    return response.data;
};

export default useOwnerRequestCount;

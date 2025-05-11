import { useState, useEffect } from "react";
import axiosClient from "./../axiosClient";

const useUserStatistics = (token) => {
    const [statistics, setStatistics] = useState({
        ownerCount: 0,
        userCount: 0,
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axiosClient.get(
                    "/user-admin/api/requests/stat/?fields=role",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    const roleStats = response.data.statistics.role;
                    const ownerCount =
                        roleStats.find((stat) => stat.role === "owner")
                            ?.count || 0;
                    const userCount =
                        roleStats.find((stat) => stat.role === "user")?.count ||
                        0;

                    setStatistics({
                        ownerCount,
                        userCount,
                    });
                }
            } catch (error) {
                console.error("Error fetching user statistics:", error);
            }
        };

        if (token) {
            fetchStatistics();
        }
    }, [token]);

    return statistics;
};

export default useUserStatistics;

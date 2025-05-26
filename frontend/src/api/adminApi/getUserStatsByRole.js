import axiosClient from "../axiosClient";

export const getUserStatsByRole = async () => {
    try {
        const response = await axiosClient.get(
            "/user-admin/api/requests/stat/?fields=role"
        );

        if (response.data?.success) {
            const stats = response.data.statistics?.role || [];

            const result = {
                admin: 0,
                owner: 0,
                user: 0,
            };

            stats.forEach((item) => {
                const role = item.role;
                const count = item.count;

                if (role === "admin" || role === "owner" || role === "user") {
                    result[role] = count;
                }
            });

            return result;
        } else {
            throw new Error("Không lấy được thống kê theo role.");
        }
    } catch (error) {
        console.error("Lỗi khi lấy thống kê theo role:", error);
        throw error;
    }
};

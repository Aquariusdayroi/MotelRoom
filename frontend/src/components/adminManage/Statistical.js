import { useEffect, useState } from "react";
import InforCart from "./components/InforCart";
import { getPostStatsByOwner } from "../../api/ownerApi/getPostStatsByOwner";

const Statistical = () => {
    const [postCount, setPostCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getPostStatsByOwner();
                const totalPosts = data.results.reduce(
                    (sum, owner) => sum + (owner.total_post || 0),
                    0
                );
                setPostCount(totalPosts);
            } catch (err) {
                console.error("Không thể tải dữ liệu thống kê:", err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container pt-3">
            <div className="row mb-4">
                <div className="col-md-4">
                    <InforCart
                        title="Thống kê số lượng bài đăng trọ"
                        colorIndex={0}
                        totalUser={postCount}
                    />
                </div>
                <div className="col-md-4">
                    <InforCart
                        title="Thống kê người dùng"
                        colorIndex={1}
                        totalUser="--"
                    />
                </div>
                <div className="col-md-4">
                    <InforCart
                        title="Thống kê lượt truy cập"
                        colorIndex={2}
                        totalUser="--"
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistical;

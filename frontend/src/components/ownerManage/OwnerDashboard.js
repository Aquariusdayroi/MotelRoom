import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import { FaUsers, FaTrash, FaEye } from "react-icons/fa";
import styles from "../../styles/OwnerManagement.module.css";
import "chart.js/auto";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import ownerPostApi from "../../api/ownerPostApi";
import { Link, useSearchParams } from "react-router-dom";

// Utility function to retry failed requests
const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await requestFn();
        } catch (error) {
            if (attempt === maxRetries) throw error;
            // Exponential backoff
            const waitTime = delay * Math.pow(2, attempt - 1);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
    }
};

const OwnerDashboard = () => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [data, setData] = useState({});
    const [statsData, setStatsData] = useState({
        views: [],
        interactions: [],
        labels: [],
    });
    const [imageErrors, setImageErrors] = useState({});
    const fallbackImageUrl =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E";

    const handleImageError = (postId, index) => {
        setImageErrors((prev) => ({
            ...prev,
            [`${postId}-${index}`]: true,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state

                // Add timeout to each request
                const timeout = 10000; // 10 seconds
                const requests = [
                    Promise.race([
                        ownerPostApi.getAll({ page: page }),
                        new Promise((_, reject) =>
                            setTimeout(
                                () =>
                                    reject(
                                        new Error(
                                            "Timeout: Posts request took too long"
                                        )
                                    ),
                                timeout
                            )
                        ),
                    ]),
                    Promise.race([
                        ownerPostApi.getTopViews(),
                        new Promise((_, reject) =>
                            setTimeout(
                                () =>
                                    reject(
                                        new Error(
                                            "Timeout: Top views request took too long"
                                        )
                                    ),
                                timeout
                            )
                        ),
                    ]),
                    Promise.race([
                        axiosClient.get("/chat/api/conversations/list/"),
                        new Promise((_, reject) =>
                            setTimeout(
                                () =>
                                    reject(
                                        new Error(
                                            "Timeout: Conversations request took too long"
                                        )
                                    ),
                                timeout
                            )
                        ),
                    ]),
                ];

                const [postsResponse, topPostsResponse, conversationsResponse] =
                    await Promise.all(requests);

                // Format the top posts to include full avatar URL
                const formattedTopPosts = (
                    topPostsResponse.data?.top_viewed_posts || []
                ).map((post) => ({
                    ...post,
                    avatar: post.avatar?.startsWith("http")
                        ? post.avatar
                        : `http://localhost:8000${post.avatar}`,
                    images: post.images?.map((img) => ({
                        ...img,
                        image_url: img.image_url?.startsWith("http")
                            ? img.image_url
                            : `http://localhost:8000${img.image_url}`,
                    })),
                })); // Ensure we have an array of posts and calculate metrics
                const posts = Array.isArray(postsResponse.data.results.data)
                    ? postsResponse.data.results.data
                    : [];
                const totalViews = posts.reduce(
                    (sum, post) => sum + (post.views || 0),
                    0
                );
                const unpublishedCount = posts.filter(
                    (post) => post.is_public === false
                ).length;

                setData({
                    results: formattedTopPosts,
                    count: postsResponse.data.count || 0,
                    total_pages: Math.ceil(postsResponse.data.count / 9) || 1,
                    totalViews: totalViews,
                    unpublishedCount: unpublishedCount,
                    conversationsCount:
                        conversationsResponse.data?.results?.length || 0,
                });
            } catch (error) {
                if (error.response?.status === 401) {
                    setError(
                        "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
                    );
                } else {
                    setError(
                        "Không thể tải dữ liệu: " +
                            (error.response?.data?.message || error.message)
                    );
                }
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);
    const fetchPostStats = async (posts) => {
        try {
            const timeout = 5000; // 5 seconds
            const statsPromises = posts.map((post) =>
                retryRequest(async () => {
                    try {
                        // Sử dụng hàm getPostInteractions từ ownerPostApi
                        const response = await ownerPostApi.getPostInteractions(
                            post.id
                        );

                        // Xử lý phản hồi từ API
                        if (response?.data?.success) {
                            // Dựa trên cấu trúc phản hồi server, dữ liệu reviews_count nằm trực tiếp trong response.data
                            return response.data; // Trả về toàn bộ data, bao gồm reviews_count
                        }
                        console.warn(
                            `No reviews data for post ${post.id}:`,
                            response
                        );
                        return { reviews_count: 0 }; // Trả về giá trị mặc định nếu không thành công
                    } catch (error) {
                        console.warn(
                            `Failed to fetch stats for post ${post.id}:`,
                            error.message
                        );
                        return { reviews_count: 0 }; // Trả về giá trị mặc định khi có lỗi
                    }
                })
            );

            const results = await Promise.allSettled(statsPromises);

            const viewsData = posts.map((post) => post.views || 0);
            const interactionsData = results.map((result) => {
                if (
                    result.status === "fulfilled" &&
                    result.value?.reviews_count !== undefined
                ) {
                    return result.value.reviews_count;
                }
                return 0;
            });

            setStatsData({
                views: viewsData,
                interactions: interactionsData,
                labels: posts.map((post) => `ID: ${post.id}`),
                failedRequests: results.filter((r) => r.status === "rejected")
                    .length,
            });
        } catch (error) {
            console.error("Error fetching post statistics:", error);
            setStatsData((prev) => ({
                ...prev,
                error: "Failed to load interaction data",
                views: posts.map((post) => post.views || 0),
                interactions: Array(posts.length).fill(0),
                labels: posts.map((post) => `ID: ${post.id}`),
            }));
        }
    };

    useEffect(() => {
        if (data.results?.length > 0) {
            fetchPostStats(data.results);
        }
    }, [data.results]);

    const lineData = {
        labels: statsData.labels || [],
        datasets: [
            {
                label: "Lượt xem",
                data: statsData.views || [],
                fill: false,
                borderColor: "#00cfff", // Màu xanh dương cho Lượt xem
                tension: 0.4,
            },
            {
                label: "Lượt tương tác",
                data: statsData.interactions || [],
                fill: false,
                borderColor: "#ff7373", // Màu đỏ cho Lượt tương tác
                tension: 0.4,
            },
        ],
    };

    const barData = {
        labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        datasets: [
            {
                label: "Liên hệ",
                data: [650, 820, 530, 720, 300, 450, 700],
                backgroundColor: "#00cfff",
            },
        ],
    };

    return (
        <div className={styles.container}>
            <Row className="text-center mt-3">
                <Col>
                    <Card className={styles.statCard}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            {" "}
                            <FaUsers className={styles.statIcon} />
                            <div>
                                <div className={styles.statNumber}>
                                    {data?.count || 0}
                                </div>
                                <div className={styles.statLabel}>
                                    Tổng số bài đăng
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.statCard}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <FaTrash className={styles.statIcon} />
                            <div>
                                {" "}
                                <div className={styles.statNumber}>
                                    {data?.unpublishedCount || 0}
                                </div>
                                <div className={styles.statLabel}>
                                    Bài đăng đã ẩn
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.statCard}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <FaEye className={styles.statIcon} />
                            <div>
                                {" "}
                                <div className={styles.statNumber}>
                                    {data?.totalViews || 0}
                                </div>
                                <div className={styles.statLabel}>
                                    Tổng lượt xem
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.statCard}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <FaUsers className={styles.statIcon} />{" "}
                            <div>
                                <div className={styles.statNumber}>
                                    {data?.conversationsCount || 0}
                                </div>
                                <div className={styles.statLabel}>
                                    Liên hệ hiện có
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col md={8}>
                    <Card className="p-3 mb-4">
                        <h5 className="mb-3">Thống kê lượt xem và tương tác</h5>
                        <Line data={lineData} />
                    </Card>
                    <Card className="p-3">
                        <h5 className="mb-3">Thống kê liên hệ theo ngày</h5>
                        <Bar data={barData} />
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3">
                        <h5 className="mb-3">Top bài đăng nổi bật</h5>
                        {data?.results?.slice(0, 5).map((post, i) => (
                            <Link
                                key={i}
                                to={`/detail/${post.id}`}
                                className="text-decoration-none"
                            >
                                {" "}
                                <div
                                    className="d-flex mb-2 p-2"
                                    style={{
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        borderRadius: "8px",
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                                        border: "1px solid #eef0f2",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-3px)";
                                        e.currentTarget.style.boxShadow =
                                            "0 5px 15px rgba(0,0,0,0.1)";
                                        e.currentTarget.style.backgroundColor =
                                            "#f8f9fa";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0)";
                                        e.currentTarget.style.boxShadow =
                                            "0 2px 4px rgba(0,0,0,0.05)";
                                        e.currentTarget.style.backgroundColor =
                                            "#ffffff";
                                    }}
                                >
                                    {" "}
                                    <div
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            minWidth: "60px",
                                            position: "relative",
                                            marginRight: "10px",
                                            borderRadius: "6px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Image
                                            src={
                                                imageErrors[`${post.id}-${i}`]
                                                    ? fallbackImageUrl
                                                    : post.images?.[0]?.image_url?.startsWith(
                                                          "http"
                                                      )
                                                    ? post.images[0].image_url
                                                    : `http://localhost:8000${post.images?.[0]?.image_url}`
                                            }
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                            }}
                                            onError={() =>
                                                handleImageError(post.id, i)
                                            }
                                        />
                                    </div>{" "}
                                    <div>
                                        {" "}
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                color: "#1a365d",
                                                marginBottom: "4px",
                                                lineHeight: "1.3",
                                            }}
                                        >
                                            {post.title}
                                        </div>
                                        <div
                                            style={{
                                                color: "#e53e3e",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            {post.price}
                                        </div>
                                        <div
                                            style={{
                                                color: "#718096",
                                                fontSize: "12px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                            }}
                                        >
                                            {post.address?.address_name}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OwnerDashboard;

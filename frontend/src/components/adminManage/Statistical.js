import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Chart from "react-apexcharts";
import { getPostStatsByOwner } from "../../api/ownerApi/getPostStatsByOwner";
import { getUserOwnerStats } from "../../api/adminApi/getUserOwnerStats";
import InforCart from "./components/InforCart";
import { getUserStatsByRole } from "../../api/adminApi/getUserStatsByRole";
import { getUserCountByDate } from "../../api/adminApi/getUserCountByDate";
import dayjs from "dayjs";
const Statistical = () => {
    const [postCount, setPostCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [ownerCount, setOwnerCount] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [userPie, setUserPie] = useState(null);
    const [accessChart, setAccessChart] = useState(null);
    const [userBar, setUserBar] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const rentalStats = await getPostStatsByOwner();
                const userStats = await getUserOwnerStats();

                setPostCount(rentalStats.total_rentalposts);
                setUserCount(userStats.totalUser);
                setOwnerCount(userStats.totalOwner);

                setChartData({
                    options: {
                        chart: { id: "user-bar" },
                        xaxis: {
                            categories: [
                                "Tháng 1",
                                "Tháng 2",
                                "Tháng 3",
                                "Tháng 4",
                                "Tháng 5",
                                "Tháng 6",
                                "Tháng 7",
                                "Tháng 8",
                            ],
                        },
                    },
                    series: [
                        {
                            name: "Số lượng",
                            data: [9, 13, 15, 21, 11, 14, 19, 26],
                        },
                    ],
                });

                // setUserPie({
                //     series: [130, 110, 32],
                //     options: {
                //         labels: ["Người đăng trọ", "Người thuê", "Khác"],
                //         chart: { type: "donut" },
                //     },
                // });

                setAccessChart({
                    options: {
                        chart: { id: "access-line" },
                        xaxis: {
                            categories: Array.from(
                                { length: 30 },
                                (_, i) => i + 1
                            ),
                        },
                    },
                    series: [
                        {
                            name: "Lượt truy cập",
                            data: [
                                12, 18, 22, 25, 28, 19, 23, 30, 18, 25, 26, 32,
                                35, 38, 29, 24, 22, 30, 28, 26, 25, 20, 27, 30,
                                26, 31, 29, 27, 33, 28,
                            ],
                        },
                    ],
                });
            } catch (err) {
                console.error("Không thể tải dữ liệu thống kê:", err);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const stats = await getUserStatsByRole();

                setUserPie({
                    options: {
                        labels: ["Admin", "Chủ trọ", "Người dùng"],
                        legend: { position: "bottom" },
                    },
                    series: [stats.admin, stats.owner, stats.user],
                });
            } catch (error) {
                console.error(
                    "Không thể tải dữ liệu biểu đồ người dùng:",
                    error
                );
            }
        };

        fetchUserStats();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const today = dayjs();
            const last7Days = Array.from({ length: 7 }, (_, i) =>
                today.subtract(i, "day").format("YYYY-MM-DD")
            ).reverse();

            try {
                const results = await Promise.all(
                    last7Days.map((date) => getUserCountByDate(date))
                );

                setUserBar({
                    options: {
                        chart: { id: "user-bar" },
                        xaxis: {
                            categories: results.map((r) =>
                                r?.date ? dayjs(r.date).format("DD/MM") : "N/A"
                            ),
                        },
                        title: {
                            text: "Lượt đăng ký 7 ngày gần nhất",
                            align: "center",
                        },
                    },
                    series: [
                        {
                            name: "Người đăng ký",
                            data: results.map((r) =>
                                typeof r?.count === "number" ? r.count : 0
                            ),
                        },
                    ],
                });
            } catch (error) {
                console.error("Lỗi khi tạo biểu đồ cột:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container className="pt-3">
            <Row className="mb-4">
                <Col md={4}>
                    <InforCart
                        title="Tổng số bài đăng trọ"
                        totalUser={postCount}
                        colorIndex={0}
                    />
                </Col>
                <Col md={4}>
                    <InforCart
                        title="Tổng số tài khoản người dùng"
                        totalUser={userCount}
                        colorIndex={1}
                    />
                </Col>
                <Col md={4}>
                    <InforCart
                        title="Tổng lượt truy cập"
                        totalUser="12145"
                        colorIndex={2}
                    />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <Card className="p-3 shadow-sm">
                        <Card.Title>Thống kê người dùng</Card.Title>
                        {userPie?.options && userPie?.series && (
                            <Chart
                                options={userPie.options}
                                series={userPie.series}
                                type="donut"
                                width="100%"
                            />
                        )}
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-3 shadow-sm">
                        <Card.Title>Thống kê lượt đăng ký theo ngày</Card.Title>
                        {userBar?.options && userBar?.series && (
                            <Chart
                                options={userBar.options}
                                series={userBar.series}
                                type="bar"
                                height={405}
                            />
                        )}
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card className="p-3 shadow-sm">
                        <Card.Title>Thống kê lượt truy cập</Card.Title>
                        {accessChart?.options && accessChart?.series && (
                            <Chart
                                options={accessChart.options}
                                series={accessChart.series}
                                type="line"
                                width="100%"
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Statistical;

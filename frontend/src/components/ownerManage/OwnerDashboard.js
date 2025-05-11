import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import { FaUsers, FaTrash, FaEye } from 'react-icons/fa';
import styles from '../../styles/OwnerManagement.module.css';
import 'chart.js/auto';
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link, useSearchParams } from "react-router-dom";
import { images } from '../../assets/images';
const OwnerDashboard = () => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(
                    `/rental_post/api/?page=${page}`
                );
                setData(response.data);
            } catch (error) {
                setError("Không thể tải dữ liệu");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, [page]);
    const lineData = {
        labels: Array.from({ length: 12 }, (_, i) => `T${i + 1}`),
        datasets: [
            {
                label: 'Lượt xem',
                data: [600, 700, 800, 750, 850, 900, 880, 920, 960, 940, 980, 1000],
                fill: false,
                borderColor: '#00cfff',
                tension: 0.4,
            },
            {
                label: 'Lượt tương tác',
                data: [200, 300, 250, 350, 400, 420, 450, 460, 430, 470, 490, 500],
                fill: false,
                borderColor: '#ff7373',
                tension: 0.4,
            },
        ],
    };

    const barData = {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
            {
                label: 'Liên hệ',
                data: [650, 820, 530, 720, 300, 450, 700],
                backgroundColor: '#00cfff',
            },
        ],
    };

    return (
        <div className={styles.container}>
            <Row className="text-center mt-3">
                <Col>
                    <Card className={styles.statCard}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <FaUsers className={styles.statIcon} />
                            <div>
                                <div className={styles.statNumber}>12</div>
                                <div className={styles.statLabel}>Tổng số bài đăng</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.statCard}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <FaTrash className={styles.statIcon} />
                            <div>
                                <div className={styles.statNumber}>2</div>
                                <div className={styles.statLabel}>Bài đăng đã xóa</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.statCard}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <FaEye className={styles.statIcon} />
                            <div>
                                <div className={styles.statNumber}>10,000</div>
                                <div className={styles.statLabel}>Tổng lượt xem</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.statCard}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                            <FaUsers className={styles.statIcon} />
                            <div>
                                <div className={styles.statNumber}>100</div>
                                <div className={styles.statLabel}>Liên hệ hiện có</div>
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
                                <div className="d-flex mb-3 p-2 hover-card" style={{ cursor: 'pointer' }}>
                                    <Image
                                        src={post.images && post.images.length > 0 ? post.images[0].image_url : images.emptyImg}
                                        rounded
                                        width={60}
                                        height={60}
                                        className="me-2"
                                        style={{ objectFit: 'cover' }}
                                        onError={e => { e.target.onerror = null; e.target.src = images.emptyImg; }}
                                    />
                                    <div>
                                        <div className="fw-bold">{post.title}</div>
                                        <div className="text-primary">{post.price}</div>
                                        <small className="text-muted">{post.address.description}</small>
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
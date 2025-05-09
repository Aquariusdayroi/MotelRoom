import React from 'react';
import styles from '../styles/HostDashboard.module.css';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import RoomCard from "../components/rooms/RoomCard";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";
import { Button, Dropdown } from 'react-bootstrap';
import { FaPlus, FaChevronDown, FaChevronUp, FaSearch, FaChartLine, FaUsers, FaEye, FaTrash } from 'react-icons/fa';
import { images } from '../assets/images';

const HostDashboard = () => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const [data, setData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredRooms, setFilteredRooms] = useState([]);

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

    useEffect(() => {
        // Khi data thay đổi (tải trang mới), reset kết quả lọc
        setFilteredRooms(data?.results || []);
    }, [data]);

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

    const [activeTab, setActiveTab] = useState('dashboard');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleTabChange = (tab) => setActiveTab(tab);
    const handleSort = (order) => setSortOrder(order);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setFilteredRooms(data?.results || []);
            return;
        }
        const query = searchQuery.toLowerCase().trim();
        const filtered = (data?.results || []).filter(room =>
            room.title.toLowerCase().includes(query) ||
            room.address.description.toLowerCase().includes(query)
        );
        setFilteredRooms(filtered);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (loading) return <div className="text-center p-5">Đang tải...</div>;
    if (error) return <div className="text-center text-danger p-5">{error}</div>;

    return (
        <div className={styles.container}>
            <Row>
                <Col md={2} className={styles.sidebar}>
                    <div
                        className={`${styles.menuItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
                        onClick={() => handleTabChange('dashboard')}
                    >
                        <FaChartLine className="me-2" /> Dashboard
                    </div>
                    <div
                        className={`${styles.menuItem} ${activeTab === 'posts' ? styles.active : ''}`}
                        onClick={() => handleTabChange('posts')}
                    >
                        <FaUsers className="me-2" /> Quản lý bài đăng
                    </div>
                </Col>
                <Col md={10} style={{ padding: '1rem 2rem' }}>
                    {activeTab === 'dashboard' && (
                        <>
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

                            <Row className="mt-4">
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
                        </>
                    )}

                    {activeTab === 'posts' && (
                        <div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.container}>
                                    <div className={`${styles.searchBarGroup} mb-3`}>
                                        <div className={`d-flex align-items-center ${styles.searchLeft}`} style={{ flex: 1, gap: '10px' }}>
                                            <div className="position-relative" style={{ flex: 1 }}>
                                                <input
                                                    type="text"
                                                    className={`form-control ${styles.searchInput}`}
                                                    placeholder="Tìm trong bài đăng của Ender..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </div>
                                            <Button className={styles.btnFind} onClick={handleSearch}>
                                                Tìm
                                            </Button>
                                        </div>
                                        <div className={`d-flex align-items-center ${styles.searchRight}`} style={{ gap: '10px' }}>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="outline-secondary"
                                                    className={styles.sortButton}
                                                >
                                                    Ngày đăng{' '}
                                                    {sortOrder === 'asc' ? (
                                                        <FaChevronUp className={styles.arrow} />
                                                    ) : (
                                                        <FaChevronDown className={styles.arrow} />
                                                    )}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleSort('asc')}>
                                                        Ngày đăng tăng dần
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleSort('desc')}>
                                                        Ngày đăng giảm dần
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Button className={styles.btnCreatePost}>
                                                <FaPlus className="me-1" /> Tạo bài đăng
                                            </Button>
                                        </div>
                                    </div>

                                    <div className={styles.grid}>
                                        {filteredRooms.length === 0 ? (
                                            <div className="text-center p-5">
                                                <p>Không tìm thấy bài đăng nào phù hợp</p>
                                            </div>
                                        ) : (
                                            filteredRooms.map((room) => (
                                                <Link
                                                    key={room.id}
                                                    to={`/detail/${room.id}`}
                                                    className="text-decoration-none"
                                                >
                                                    <RoomCard {...room} />
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                            <Pagination totalPages={data?.total_pages} />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default HostDashboard;

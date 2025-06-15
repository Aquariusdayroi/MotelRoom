import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { FaChartLine, FaUsers } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/OwnerManagement.module.css';
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { DotLoader } from "react-spinners";

const OwnerManagement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const [data, setData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        if (location.pathname === "/owner-manage") {
            navigate("dashboard");
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(
                    `/rental_post/api/?page=${page}`
                );
                setData(response.data || { results: [] });
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
        setFilteredRooms(data?.results || []);
    }, [data]);

    const [activeTab, setActiveTab] = useState("dashboard");
    const [sortOrder, setSortOrder] = useState("desc");
    const handleSort = (order) => setSortOrder(order);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setFilteredRooms(data?.results || []);
            return;
        }
        const query = searchQuery.toLowerCase().trim();
        const filtered = (data?.results || []).filter(
            (room) =>
                room.title.toLowerCase().includes(query) ||
                room.address.description.toLowerCase().includes(query)
        );
        setFilteredRooms(filtered);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    if (loading)
        return (
            <div className="d-flex">
                <Col md={2} className={styles.sidebar}>
                    <Nav className="flex-column">
                        <Nav.Item>
                            <NavLink
                                to="dashboard"
                                className={({ isActive }) =>
                                    `${styles.menuItem} ${
                                        isActive ? styles.active : ""
                                    }`
                                }
                            >
                                <FaChartLine className="me-2" /> Dashboard
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="posts"
                                className={({ isActive }) =>
                                    `${styles.menuItem} ${
                                        isActive ? styles.active : ""
                                    }`
                                }
                            >
                                <FaUsers className="me-2" /> Quản lý bài đăng
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col md={10}>
                    <Outlet />
                </Col>

                {loading && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 9999,
                        }}
                    >
                        <DotLoader color="var(--primary-color)" size={50} />
                        <div
                            style={{
                                color: "white",
                                marginTop: 10,
                                fontSize: 18,
                            }}
                        ></div>
                    </div>
                )}

                {error && (
                    <div
                        className="text-center text-danger p-5"
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(255,255,255,0.8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 10000,
                        }}
                    >
                        {error}
                    </div>
                )}
            </div>
        );

    if (error)
        return <div className="text-center text-danger p-5">{error}</div>;
    return (
        <Row className={styles.ownerContainer}>
            <Col md={2} className={styles.sidebar}>
                <Nav className="flex-column">
                    <Nav.Item>
                        <NavLink
                            to="dashboard"
                            className={({ isActive }) =>
                                `${styles.menuItem} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                        >
                            <FaChartLine className="me-2" /> Dashboard
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink
                            to="posts"
                            className={({ isActive }) =>
                                `${styles.menuItem} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                        >
                            <FaUsers className="me-2" /> Quản lý bài đăng
                        </NavLink>
                    </Nav.Item>
                </Nav>
            </Col>
            <Col md={10}>
                {/* Render nested routes */}
                <Outlet />
            </Col>
        </Row>
    );
};

export default OwnerManagement;

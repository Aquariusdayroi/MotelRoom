import React from "react";
import { Row, Col, Nav } from "react-bootstrap";
import {
    House,
    Building,
    People,
    Clipboard,
    BarChart,
} from "react-bootstrap-icons";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminManagement = () => {
    const location = useLocation();
    if (location.pathname === "/admin-manage") {
        return <Navigate to="/admin-manage/authentic" replace />;
    }

    return (
        <div style={{ padding: "0 10vw" }}>
            <style>
                {`
                .custom-tab-link {
                    color: #272727 !important;
                    transition: color 0.3s ease;
                    border-radius: 6px;
                    padding: 8px 12px;
                    text-decoration: none;
                    white-space: nowrap;
                }

                .custom-tab-link.active {
                    color: white !important;
                    background-color: var(--primary-color, #0d6efd) !important;
                }

                @media (max-width: 991.98px) {
                    .admin-sidebar {
                        flex-direction: row !important;
                        overflow-x: auto;
                        white-space: nowrap;
                        padding: 10px 16px !important;
                        border-right: none !important;
                        border-bottom: 1px solid #ccc;
                        min-height: auto !important;
                    }

                    .admin-sidebar .nav-item {
                        flex-shrink: 0;
                    }

                    .admin-sidebar .custom-tab-link {
                        display: flex;
                        align-items: center;
                        padding: 8px 10px;
                        font-size: 0.9rem;
                    }

                    .admin-content {
                        padding-top: 1rem;
                    }
                }
            `}
            </style>

            <Row>
                <Col
                    md={3}
                    className="admin-sidebar border-end d-flex flex-column align-items-start"
                >
                    <Nav className="flex-column w-100 px-5" style={{ gap: "20px" }}>
                        <Nav.Item>
                            <NavLink
                                to="authentic"
                                className={({ isActive }) =>
                                    `custom-tab-link d-flex align-items-center gap-4 ${
                                        isActive ? "active" : ""
                                    }`
                                }
                            >
                                <House size={20} />
                                Xác thực tài khoản
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="post"
                                className={({ isActive }) =>
                                    `custom-tab-link d-flex align-items-center gap-4 ${
                                        isActive ? "active" : ""
                                    }`
                                }
                            >
                                <Building size={20} />
                                Quản lý bài đăng
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="comment"
                                className={({ isActive }) =>
                                    `custom-tab-link d-flex align-items-center gap-4 ${
                                        isActive ? "active" : ""
                                    }`
                                }
                            >
                                <People size={20} />
                                Quản lý đánh giá
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="account"
                                className={({ isActive }) =>
                                    `custom-tab-link d-flex align-items-center gap-4 ${
                                        isActive ? "active" : ""
                                    }`
                                }
                            >
                                <Clipboard size={20} />
                                Quản lý tài khoản
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="statistical"
                                className={({ isActive }) =>
                                    `custom-tab-link d-flex align-items-center gap-4 ${
                                        isActive ? "active" : ""
                                    }`
                                }
                            >
                                <BarChart size={20} />
                                Thống kê hệ thống
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col md={9} className="admin-content">
                    <Outlet />
                </Col>
            </Row>
        </div>
    );
};

export default AdminManagement;

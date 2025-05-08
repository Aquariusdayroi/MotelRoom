import React from "react";
import { Row, Col, Nav } from "react-bootstrap";
import {
    House,
    Building,
    People,
    Clipboard,
    BarChart,
} from "react-bootstrap-icons";
import { NavLink, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminManagement = () => {
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
                    }

                    .custom-tab-link.active {
                        color: white !important;
                        background-color: var(--primary-color, #0d6efd) !important;
                    }
                `}
            </style>

            <Row>
                <Col
                    md={3}
                    className="border-end d-flex flex-column align-items-start"
                    style={{
                        minHeight: "100vh",
                        paddingTop: "60px",
                    }}
                >
                    <Nav
                        className="flex-column w-100 px-5"
                        style={{ gap: "20px" }}
                    >
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
                <Col md={9}>
                    <Outlet />
                </Col>
            </Row>
        </div>
    );
};

export default AdminManagement;

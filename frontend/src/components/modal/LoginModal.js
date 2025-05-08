import React from "react";
import { Link } from "react-router-dom";

const LoginModal = () => {
    const menuItems = [
        { to: "/profile", label: "Tài khoản" },
        { to: "/notifications", label: "Thông báo" },
        { to: "/messages", label: "Tin nhắn" },
        { to: "/favorites", label: "Yêu thích" },
        { to: "/partners", label: "Đối tác" },
        { to: "/room-search", label: "Tìm phòng" },
        { to: "/terms", label: "Điều khoản" },
        { to: "/policy", label: "Chính sách" },
        { to: "/contact", label: "Liên hệ" },
    ];

    return (
        <div
            className="dropdown-menu show position-absolute end-0 mt-2 p-2 rounded"
            style={{
                minWidth: "170px",
                zIndex: 1000,
                backgroundColor: "var(--primary-color)",
                color: "white",
            }}
        >
            {menuItems.map((item, index) => (
                <React.Fragment key={item.to}>
                    <Link
                        to={item.to}
                        className="dropdown-item text-white"
                        style={{ transition: "background-color 0.2s ease" }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                "var(--text-primary-color)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                "transparent")
                        }
                    >
                        {item.label}
                    </Link>
                    {item.label === "Đối tác" && (
                        <div className="d-flex align-items-center my-1">
                            <div className="flex-grow-1 border-top border-secondary opacity-25 border-light border-2"></div>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default LoginModal;

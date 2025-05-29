import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthToken } from "../../authToken";
import { DotLoader } from "react-spinners";

const LoginModal = () => {
    const menuItems = [
        { to: "/profile", label: "Tài khoản" },
        { to: "/notifications", label: "Thông báo" },
        { to: "/chat", label: "Tin nhắn" },
        { to: "/add-post", label: "Đối tác" },
        { to: "/detail-search", label: "Tìm phòng" },
        { to: "/terms-of-use", label: "Điều khoản" },
        { to: "/policy", label: "Chính sách" },
        { to: "/contact", label: "Liên hệ" },
        { to: "#", label: "Đăng xuất" },
    ];

    const { logout } = useContext(AuthToken);

    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        background: "rgba(255,255,255,0.8)",
                        zIndex: 10000,
                        position: "fixed",
                        top: 0,
                        left: 0,
                    }}
                >
                    <DotLoader
                        color="var(--primary-color)"
                        size={50}
                        aria-label="Loading Spinner"
                    />
                </div>
            )}
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
                            onClick={(e) => {
                                if (item.label === "Đăng xuất") {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleLogout();
                                }
                            }}
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
        </>
    );
};

export default LoginModal;

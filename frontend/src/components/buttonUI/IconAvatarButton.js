import React from "react";
import PropTypes from "prop-types";
import styles from "../../styles/IconAvatarButton.module.css";

const IconAvatarButton = ({ icon, avatar, onClick }) => {
    return (
        <button
            className={`${styles.iconAvatarButton} d-flex align-items-center`}
            onClick={onClick}
        >
            {/* Icon */}
            {icon && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    width="24px"
                    height="24px"
                    className="me-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            )}

            {/* Avatar */}
            {avatar && (
                <img
                    src={avatar}
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                />
            )}
        </button>
    );
};

IconAvatarButton.propTypes = {
    icon: PropTypes.bool, // Hiển thị icon nếu true
    avatar: PropTypes.string, // URL của avatar
    onClick: PropTypes.func, // Hàm xử lý khi nhấn nút
};

export default IconAvatarButton;
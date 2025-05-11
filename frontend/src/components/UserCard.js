import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaCamera } from "react-icons/fa";
import { images } from "../assets/images";
import { updateUserProfile } from "../api/userApi/updateUserProfile";

const UserCard = ({ name, avatar, start, totalComment, year }) => {
    const [avatarPreview, setAvatarPreview] = useState(images.logo);

    useEffect(() => {
        if (avatar) {
            const isFullUrl = avatar.startsWith("http");
            const finalUrl = isFullUrl
                ? avatar
                : `http://localhost:8000${avatar}`;
            setAvatarPreview(finalUrl);
        }
    }, [avatar]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Image = e.target.result;
            setAvatarPreview(base64Image); // Hiển thị trước ảnh

            const formData = new FormData();
            formData.append("avatar", file);

            try {
                const updatedUser = await updateUserProfile(formData);
                if (!updatedUser) {
                    alert("Không thể cập nhật ảnh đại diện.");
                }
            } catch (error) {
                console.error("Lỗi upload avatar:", error);
                alert("Đã xảy ra lỗi khi cập nhật ảnh đại diện.");
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div
            className="d-flex border rounded-4 shadow-sm overflow-hidden"
            style={{ width: "500px", padding: "20px 0" }}
        >
            {/* Avatar Section */}
            <div
                className="d-flex flex-column align-items-center justify-content-center p-3"
                style={{ width: "50%" }}
            >
                <div
                    className="position-relative rounded-circle overflow-hidden"
                    style={{ width: "100px", height: "100px" }}
                >
                    <img
                        src={avatarPreview}
                        alt="Avatar"
                        className="img-fluid rounded-circle w-100 h-100 object-fit-cover"
                    />
                    <div
                        className="position-absolute bottom-0 start-50 translate-middle-x rounded-circle p-1"
                        onClick={() =>
                            document.getElementById("fileInput").click()
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <FaCamera size={30} className="text-muted" />
                    </div>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mt-2 fw-semibold text-center small">{name}</div>
            </div>

            {/* Info Section */}
            <div
                className="d-flex flex-column justify-content-center align-items-center border-start px-3"
                style={{ width: "50%" }}
            >
                <div className="d-flex align-items-center gap-1 mb-1">
                    <FaStar size={30} className="text-dark" />
                    <span className="fw-semibold fs-5">{start}</span>
                </div>
                <div className="text-muted small">{totalComment}</div>
                <div className="fs-3 fw-bold mt-2">{year}</div>
                <div className="text-muted small">năm kinh nghiệm</div>
            </div>
        </div>
    );
};

export default UserCard;

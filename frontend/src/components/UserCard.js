import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar, FaCamera } from 'react-icons/fa';
import { images } from "../assets/images";
const UserCard = () => {
    const [avatar, setAvatar] = useState(images.logo); // State để lưu ảnh đại diện

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target.result); // Cập nhật ảnh đại diện
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraClick = () => {
        document.getElementById('fileInput').click(); // Kích hoạt input file
    };
    return (
        <div className="d-flex border rounded-4 shadow-sm overflow-hidden" style={{ width: '380px', padding: '20px 0' }}>
            {/* Avatar Section */}
            <div className="d-flex flex-column align-items-center justify-content-center p-3" style={{ width: '50%' }}>
                <div className="position-relative rounded-circle overflow-hidden" style={{ width: '80px', height: '80px' }}>
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="img-fluid rounded-circle w-100 h-100 object-fit-cover"
                    />
                    <div
                        className="position-absolute bottom-0 start-50 translate-middle-x rounded-circle p-1"
                        onClick={handleCameraClick} // Gắn sự kiện click
                        style={{ cursor: 'pointer' }}
                    >
                        <FaCamera size={30} className="text-secondary" />
                    </div>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }} // Ẩn input file
                        onChange={handleFileChange} // Xử lý khi chọn file
                    />
                </div>
                <div className="mt-2 fw-semibold text-center small">Nguyễn Tấn Đắt</div>
            </div>

            {/* Info Section */}
            <div className="d-flex flex-column justify-content-center align-items-center border-start px-3" style={{ width: '50%' }}>
                <div className="d-flex align-items-center gap-1 mb-1">
                    <FaStar size={30} className="text-dark" />
                    <span className="fw-semibold fs-5">3.9/5</span>
                </div>
                <div className="text-muted small">69 đánh giá</div>
                <div className="fs-3 fw-bold mt-2">2</div>
                <div className="text-muted small">năm kinh nghi</div>
            </div>
        </div>
    );
};

export default UserCard;

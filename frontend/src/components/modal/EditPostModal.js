import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../../styles/OwnerManagement.module.css';

const EditPostModal = ({ show, onHide, post, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: '',
        information_detail: '',
        home_type: '',
        price: '',
        acreage: '',
        total_occupancy: '',
        has_wifi: false,
        has_parking: false,
        has_toilet: false,
        has_kitchen: false,
        has_washing_machine: false,
        has_fridge: false,
        has_air_conditioner: false,
        has_water_heater: false,
        has_tv: false,
        private_rental: false,
        ...post
    });

    useEffect(() => {
        if (post) {
            console.log('🧭 post.address:', post.address);
            setFormData(prev => ({
                ...prev,
                ...post,
            }));
        }
    }, [post]);



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            home_type: formData.home_type,
            title: formData.title,
            information_detail: formData.information_detail,
            description: post.address?.description || "",
            latitude: parseFloat(post.address?.latitude || 0),
            longitude: parseFloat(post.address?.longitude || 0),
            city: post.address?.city || 0,
            district: post.address?.district || 0,
            total_occupancy: parseInt(formData.total_occupancy),
            acreage: parseFloat(formData.acreage),
            price: parseFloat(formData.price),
            has_toilet: formData.has_toilet,
            private_rental: formData.private_rental, // đúng tên theo yêu cầu backend
            has_washing: formData.has_washing_machine,
            curfew_time: false // hoặc formData.curfew_time nếu bạn có field đó
        };

        // ✅ Log tất cả các key-value gửi lên
        console.log("🧾 Payload gửi lên backend:");
        Object.entries(payload).forEach(([key, value]) => {
            console.log(`${key}:`, value);
        });

        // ⚠️ Option: Kiểm tra thiếu field nào
        const requiredKeys = [
            "home_type", "title", "information_detail", "description", "latitude", "longitude",
            "city", "district", "total_occupancy", "acreage", "price",
            "has_toilet", "private_renta", "has_washing", "curfew_time"
        ];
        requiredKeys.forEach(key => {
            if (!(key in payload)) {
                console.warn(`⚠️ Thiếu trường: ${key}`);
            }
        });

        // Gọi onUpdate hoặc axios
        onUpdate(payload);
    };




    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa bài đăng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Tiêu đề</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mô tả chi tiết</label>
                        <textarea
                            className="form-control"
                            name="information_detail"
                            value={formData.information_detail || ''}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Loại phòng</label>
                            <select
                                className="form-select"
                                name="home_type"
                                value={formData.home_type || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn loại phòng</option>
                                <option value="phòng trọ">Phòng trọ</option>
                                <option value="studio">Studio</option>
                                <option value="duplex">Duplex</option>
                                <option value="căn hộ dịch vụ">Căn hộ dịch vụ</option>
                            </select>
                        </div>
                        <div className="col">
                            <label className="form-label">Giá phòng (VNĐ)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={formData.price || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Diện tích (m²)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="acreage"
                                value={formData.acreage || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label className="form-label">Số người tối đa</label>
                            <input
                                type="number"
                                className="form-control"
                                name="total_occupancy"
                                value={formData.total_occupancy || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tiện nghi</label>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_wifi"
                                        checked={formData.has_wifi || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Wifi</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_parking"
                                        checked={formData.has_parking || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Chỗ để xe</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_toilet"
                                        checked={formData.has_toilet || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Nhà vệ sinh</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_kitchen"
                                        checked={formData.has_kitchen || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Nhà bếp</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_washing_machine"
                                        checked={formData.has_washing_machine || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Máy giặt</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_fridge"
                                        checked={formData.has_fridge || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Tủ lạnh</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_air_conditioner"
                                        checked={formData.has_air_conditioner || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Máy lạnh</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_water_heater"
                                        checked={formData.has_water_heater || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Máy nước nóng</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="has_tv"
                                        checked={formData.has_tv || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">TV</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="private_rental"
                                        checked={formData.private_rental || false}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Cho thuê riêng</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>
                            Hủy
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPostModal;

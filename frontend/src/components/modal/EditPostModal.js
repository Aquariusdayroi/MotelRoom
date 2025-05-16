import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../../styles/OwnerManagement.module.css';

const EditPostModal = ({ show, onHide, post, onUpdate }) => {
    const defaultForm = {
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
        private_rental: false
    };

    const [formData, setFormData] = useState(defaultForm);

    useEffect(() => {
        if (post) {
            setFormData({
                ...defaultForm,
                ...post,
            });
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
            city: parseInt(post.address?.city || 1),
            district: parseInt(post.address?.district || 3),
            total_occupancy: parseInt(formData.total_occupancy),
            acreage: parseFloat(formData.acreage),
            price: parseFloat(formData.price)
        };

        console.log("🧾 Payload gửi lên backend:");
        Object.entries(payload).forEach(([key, value]) => {
            console.log(`${key}:`, value);
        });

        const requiredKeys = [
            "home_type", "title", "information_detail", "description",
            "latitude", "longitude", "city", "district", "total_occupancy",
            "acreage", "price"
        ];

        const missingFields = requiredKeys.filter(key => !(key in payload));
        if (missingFields.length > 0) {
            alert(`⚠️ Thiếu các trường: ${missingFields.join(', ')}`);
            return;
        }
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
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address_description"
                            value={formData.address?.description || ''}
                            onChange={handleChange}
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
                        <label className="form-label">Tiện nghi cơ bản</label>
                        <div className="row g-3">
                            {[
                                { name: "has_wifi", label: "Wifi" },
                                { name: "has_parking", label: "Chỗ để xe" },
                                { name: "has_kitchen", label: "Nhà bếp" },
                                { name: "has_washing_machine", label: "Máy giặt" },
                                { name: "has_fridge", label: "Tủ lạnh" },
                                { name: "has_air_conditioner", label: "Máy lạnh" },
                                { name: "has_water_heater", label: "Máy nước nóng" },
                                { name: "has_tv", label: "TV" },
                                { name: "has_attic", label: "Gác lửng" },
                            ].map(({ name, label }) => (
                                <div className="col-md-4" key={name}>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name={name}
                                            checked={formData[name] || false}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">{label}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <label className="form-label mt-3">Tiện nghi bổ sung</label>
                        <div className="row g-3">
                            {[
                                { name: "has_balcony", label: "Ban công" },
                                { name: "has_dehumidifier", label: "Máy hút ẩm" },
                                { name: "has_elevator", label: "Thang máy" },
                                { name: "has_hot_tub", label: "Bồn tắm nước nóng" },
                                { name: "has_microwave", label: "Lò vi sóng" },
                            ].map(({ name, label }) => (
                                <div className="col-md-4" key={name}>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name={name}
                                            checked={formData[name] || false}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">{label}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <label className="form-label mt-3">Tiện nghi an toàn</label>
                        <div className="row g-3">
                            {[
                                { name: "has_fingerprint_lock", label: "Khoá vân tay" },
                                { name: "has_first_aid_kit", label: "Bộ sơ cứu" },
                                { name: "has_security_camera", label: "Camera an ninh" },
                            ].map(({ name, label }) => (
                                <div className="col-md-4" key={name}>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name={name}
                                            checked={formData[name] || false}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">{label}</label>
                                    </div>
                                </div>
                            ))}
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

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditPostModal = ({ show, onHide, post, onUpdate }) => {
    // Định nghĩa form mặc định với tất cả các trường
    const defaultForm = {
        title: '',
        information_detail: '',
        home_type: '',
        price: '',
        acreage: '',
        total_occupancy: '',
        address_name: '', // Trường địa chỉ (tương ứng với `description` của Address model ở backend)
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
        has_balcony: false,
        has_dehumidifier: false,
        has_elevator: false,
        has_hot_tub: false,
        has_fingerprint_lock: false,
        has_first_aid_kit: false,
        has_security_camera: false,
        has_attic: false,
    };

    const [formData, setFormData] = useState(defaultForm);

    // `useEffect` để khởi tạo form khi `post` thay đổi hoặc modal hiển thị
    useEffect(() => {
        if (post) {
            setFormData({
                ...defaultForm,
                ...post,
                // Ánh xạ `address_name` từ `post.address.address_name` (frontend)
                // vào `address_name` của formData
                address_name: post.address?.address_name || '',
                information_detail: post.information_detail || '',
                // Đảm bảo tất cả các trường boolean được ánh xạ chính xác
                has_wifi: post.has_wifi || false,
                has_parking: post.has_parking || false,
                has_toilet: post.has_toilet || false,
                has_kitchen: post.has_kitchen || false,
                has_washing_machine: post.has_washing_machine || false,
                has_fridge: post.has_fridge || false,
                has_air_conditioner: post.has_air_conditioner || false,
                has_water_heater: post.has_water_heater || false,
                has_tv: post.has_tv || false,
                private_rental: post.private_rental || false,
                has_balcony: post.has_balcony || false,
                has_dehumidifier: post.has_dehumidifier || false,
                has_elevator: post.has_elevator || false,
                has_hot_tub: post.has_hot_tub || false,
                has_fingerprint_lock: post.has_fingerprint_lock || false,
                has_first_aid_kit: post.has_first_aid_kit || false,
                has_security_camera: post.has_security_camera || false,
                has_attic: post.has_attic || false,
            });
        }
    }, [post]);

    // Hàm xử lý thay đổi cho các input trường văn bản và checkbox
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Hàm xử lý khi người dùng gửi form
    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Thêm các trường dữ liệu text và boolean từ formData
        // Đây là những trường mà người dùng có thể đã thay đổi
        Object.keys(formData).forEach(key => {
            if (formData[key] !== undefined) {
                if (typeof formData[key] === 'boolean') {
                    formDataToSend.append(key, formData[key] ? 'true' : 'false');
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
        });

        // --- ĐIỀU CHỈNH CHÍNH: Ghi lại các giá trị ĐỊA CHỈ hiện có từ `post` prop ---
        // Điều này đảm bảo backend luôn nhận đủ thông tin địa chỉ, ngay cả khi không được chỉnh sửa.
        // Các tên trường này phải khớp với các trường `write_only` trong RentalPostSerializer của bạn.
        formDataToSend.append('latitude', parseFloat(post.address?.latitude || 0));
        formDataToSend.append('longitude', parseFloat(post.address?.longitude || 0));
        formDataToSend.append('city', parseInt(post.address?.city || 1));
        formDataToSend.append('district', parseInt(post.address?.district || 3));
        // `address_name` (tức `description` ở backend) đã được lấy từ `formData`
        // vì có input cho nó, nên không cần append lại ở đây.


        // --- ĐIỀU CHỈNH CHÍNH: Ghi lại các giá trị IMAGES hiện có từ `post` prop ---
        // Điều này đảm bảo backend luôn nhận danh sách ảnh hiện có để giữ lại.
        // Tên trường 'existing_images' phải khớp với trường `write_only` trong RentalPostSerializer của bạn.
        if (post?.images && Array.isArray(post.images)) {
            post.images.forEach(img => {
                // Cắt bỏ base URL để gửi đường dẫn tương đối
                const imagePath = img.image_url.replace('http://localhost:8000', '');
                formDataToSend.append('existing_images', imagePath);
            });
        }
        // Frontend này không có chức năng upload ảnh mới khi chỉnh sửa,
        // nên không cần gửi 'new_images'.

        // Ghi log FormData để kiểm tra (chỉ dùng trong quá trình debug)
        // for (let pair of formDataToSend.entries()) {
        //     console.log('FormData content:', pair[0], pair[1]);
        // }

        onUpdate(formDataToSend);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa bài đăng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả chi tiết</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="information_detail"
                            value={formData.information_detail}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="address_name"
                            value={formData.address_name}
                            onChange={handleChange}
                            readOnly // Địa chỉ không chỉnh sửa được trực tiếp từ đây
                            required
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Loại phòng</Form.Label>
                                <Form.Select
                                    name="home_type"
                                    value={formData.home_type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn loại phòng</option>
                                    <option value="phòng trọ">Phòng trọ</option>
                                    <option value="studio">Studio</option>
                                    <option value="duplex">Duplex</option>
                                    <option value="căn hộ dịch vụ">Căn hộ dịch vụ</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Giá phòng (VNĐ)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Diện tích (m²)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="acreage"
                                    value={formData.acreage}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Số người tối đa</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="total_occupancy"
                                    value={formData.total_occupancy}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Phần hiển thị ảnh hiện có (không có chức năng upload/xóa từ đây) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh bài đăng</Form.Label>
                        <div className="mt-3 d-flex flex-wrap gap-2">
                            {post?.images && Array.isArray(post.images) && post.images.length > 0 ? (
                                post.images.map((img, index) => (
                                    <div key={img.id || index} style={{ width: '100px', height: '100px', border: '1px solid #ddd', overflow: 'hidden' }}>
                                        <img src={img.image_url} alt={`post-image-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))
                            ) : (
                                <p>Không có ảnh nào cho bài đăng này.</p>
                            )}
                        </div>
                    </Form.Group>

                    {/* Tiện nghi cơ bản */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tiện nghi cơ bản</Form.Label>
                        <Row className="g-3">
                            {[
                                { name: "has_wifi", label: "Wifi" },
                                { name: "has_parking", label: "Chỗ để xe" },
                                { name: "has_toilet", label: "Nhà vệ sinh" },
                                { name: "has_kitchen", label: "Nhà bếp" },
                                { name: "has_washing_machine", label: "Máy giặt" },
                                { name: "has_fridge", label: "Tủ lạnh" },
                                { name: "has_air_conditioner", label: "Máy lạnh" },
                                { name: "has_water_heater", label: "Máy nước nóng" },
                                { name: "has_tv", label: "TV" },
                                { name: "has_attic", label: "Gác lửng" },
                            ].map(({ name, label }) => (
                                <Col md={4} key={name}>
                                    <Form.Check
                                        type="checkbox"
                                        name={name}
                                        label={label}
                                        checked={formData[name]}
                                        onChange={handleChange}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Form.Group>

                    {/* Tiện nghi bổ sung */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tiện nghi bổ sung</Form.Label>
                        <Row className="g-3">
                            {[
                                { name: "has_balcony", label: "Ban công" },
                                { name: "has_dehumidifier", label: "Máy hút ẩm" },
                                { name: "has_elevator", label: "Thang máy" },
                                { name: "has_hot_tub", label: "Bồn tắm nước nóng" },
                                { name: "has_microwave", label: "Lò vi sóng" },
                                { name: "private_rental", label: "Cho thuê riêng tư" },
                            ].map(({ name, label }) => (
                                <Col md={4} key={name}>
                                    <Form.Check
                                        type="checkbox"
                                        name={name}
                                        label={label}
                                        checked={formData[name]}
                                        onChange={handleChange}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Form.Group>

                    {/* Tiện nghi an toàn */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tiện nghi an toàn</Form.Label>
                        <Row className="g-3">
                            {[
                                { name: "has_fingerprint_lock", label: "Khóa vân tay" },
                                { name: "has_first_aid_kit", label: "Bộ sơ cứu" },
                                { name: "has_security_camera", label: "Camera an ninh" },
                            ].map(({ name, label }) => (
                                <Col md={4} key={name}>
                                    <Form.Check
                                        type="checkbox"
                                        name={name}
                                        label={label}
                                        checked={formData[name]}
                                        onChange={handleChange}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit">
                            Lưu thay đổi
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPostModal;
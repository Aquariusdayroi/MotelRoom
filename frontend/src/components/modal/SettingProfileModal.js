import React, { useRef, useState } from "react";
import { Modal, Form, InputGroup } from "react-bootstrap";
import { PencilSquare, CalendarDate } from "react-bootstrap-icons";
import ButtonPrimary from "../buttonUI/ButtonPrimary";

const SettingProfileModal = ({ show, onHide, userInfo, onSave }) => {
    const firstNameRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const lastNameRef = useRef(null);
    const cityRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: userInfo?.firstName || "",
        lastName: userInfo?.lastName || "",
        birthday: userInfo?.birthday || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
        address: userInfo?.address || "",
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body className="p-4 rounded shadow-sm">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <b>Họ và tên</b>
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                ref={firstNameRef}
                                type="text"
                                value={formData.firstName}
                                onChange={(e) =>
                                    handleChange("firstName", e.target.value)
                                }
                            />
                            <InputGroup.Text
                                onClick={() => firstNameRef.current?.focus()}
                                style={{ cursor: "pointer" }}
                            >
                                <PencilSquare />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            <b>Ngày sinh</b>
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                value={formatDate(formData.birthday)}
                                readOnly
                            />
                            <InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    value={formData.birthday}
                                    onChange={(e) =>
                                        handleChange("birthday", e.target.value)
                                    }
                                    className="opacity-0 position-absolute w-100 h-100"
                                    style={{
                                        top: 0,
                                        left: 0,
                                        cursor: "pointer",
                                    }}
                                />
                                <CalendarDate />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            <b>Email</b>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            <b>Số điện thoại</b>
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                ref={phoneRef}
                                type="text"
                                value={formData.phone}
                                onChange={(e) =>
                                    handleChange("phone", e.target.value)
                                }
                            />
                            <InputGroup.Text
                                onClick={() => phoneRef.current?.focus()}
                                style={{ cursor: "pointer" }}
                            >
                                <PencilSquare />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            <b>Địa chỉ</b>
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                ref={addressRef}
                                type="text"
                                value={formData.address}
                                onChange={(e) =>
                                    handleChange("address", e.target.value)
                                }
                            />
                            <InputGroup.Text
                                onClick={() => addressRef.current?.focus()}
                                style={{ cursor: "pointer" }}
                            >
                                <PencilSquare />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <b>Tên đường</b>
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                ref={lastNameRef}
                                type="text"
                                value={formData.lastName}
                                onChange={(e) =>
                                    handleChange("lastName", e.target.value)
                                }
                            />
                            <InputGroup.Text
                                onClick={() => lastNameRef.current?.focus()}
                                style={{ cursor: "pointer" }}
                            >
                                <PencilSquare />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            <b>Thành phố</b>
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                ref={cityRef}
                                type="text"
                                value={formData.lastName}
                                onChange={(e) =>
                                    handleChange("lastName", e.target.value)
                                }
                            />
                            <InputGroup.Text
                                onClick={() => cityRef.current?.focus()}
                                style={{ cursor: "pointer" }}
                            >
                                <PencilSquare />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <div className="text-center d-flex justify-content-center">
                        <ButtonPrimary
                            des={"Lưu"}
                            onClick={() => onSave(formData)}
                        />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SettingProfileModal;

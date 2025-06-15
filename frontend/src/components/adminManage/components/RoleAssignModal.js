import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function RoleAssignModal({ show, onClose, onSave, user }) {
  const [role, setRole] = useState(user?.role || "Người dùng");

  const handleSave = () => {
    onSave(role);
    onClose();
  };

  const handleClose = () => {
    setRole(user?.role || "Người dùng");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <h5 className="fw-bold mb-3">Phân quyền tài khoản</h5>
        <Form.Group className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" value={user.name} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={user.email} disabled />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Vai trò</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Người dùng</option>
            <option>Chủ trọ</option>
            <option>Quản trị viên</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleClose}>Hủy</Button>
          <Button variant="info" onClick={handleSave}>Lưu</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

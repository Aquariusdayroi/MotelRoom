import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function WarningModal({ show, onClose, onSave, user }) {
  const [reason, setReason] = useState("");

  const handleSave = () => {
    onSave(reason);
    setReason("");
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <h5 className="fw-bold mb-3">Cảnh báo vi phạm tài khoản</h5>
        <Form.Group className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" value={user.name} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={user.email} disabled />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Nhập lý do cảnh báo:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleClose}>Hủy</Button>
          <Button variant="info" onClick={handleSave}>Lưu</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

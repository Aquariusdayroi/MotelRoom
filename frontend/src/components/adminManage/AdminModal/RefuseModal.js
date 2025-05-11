import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ButtonPrimary from "../../buttonUI/ButtonPrimary";
import { rejectOwnerRequest } from "../../../api/ownerApi/useOwnerRequestApi";

const styles = {
    btnGray: "btn btn-secondary rounded-5",
};

const RefuseModal = ({ show, onHide, email, requestId, onSuccess }) => {
    const suggestions = [
        "Khánh ngu",
        "Dữ liệu căn cước không hợp lệ",
        "Thông tin bài đăng đã tồn tại",
        "Bài đăng có nội dung không phù hợp",
    ];

    const [reasonText, setReasonText] = useState("");
    const [selectedReasons, setSelectedReasons] = useState([]);

    const toggleReason = (reason) => {
        let updatedReasons;
        if (selectedReasons.includes(reason)) {
            updatedReasons = selectedReasons.filter((r) => r !== reason);
        } else {
            updatedReasons = [...selectedReasons, reason];
        }
        setSelectedReasons(updatedReasons);
        setReasonText(updatedReasons.join("\n"));
    };

    const handleReasonChange = (e) => {
        setReasonText(e.target.value);
    };

    const handleConfirm = async () => {
        if (!reasonText.trim()) {
            alert("Vui lòng nhập lý do từ chối.");
            return;
        }

        try {
            const res = await rejectOwnerRequest(requestId, reasonText);
            alert(res.message);
            setReasonText("");
            setSelectedReasons([]);
            onHide();
            if (onSuccess) onSuccess();
        } catch (err) {
            alert(err?.response?.data?.message || "Từ chối thất bại.");
        }
    };

    return (
        <>
            {show && (
                <div
                    className="modal-backdrop fade show"
                    style={{
                        zIndex: 1050,
                        backgroundColor: "rgba(26, 26, 26, 0.27)",
                    }}
                ></div>
            )}
            <Modal show={show} centered>
                <Modal.Header>
                    <Modal.Title>Từ chối phiếu đăng ký</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="reasonText">
                        <Form.Label>Lý do từ chối</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={reasonText}
                            onChange={handleReasonChange}
                            placeholder="Nhập lý do từ chối..."
                        />
                    </Form.Group>
                    <div className="mt-3">
                        {suggestions.map((reason, index) => (
                            <Button
                                key={index}
                                variant={
                                    selectedReasons.includes(reason)
                                        ? "secondary"
                                        : "outline-secondary"
                                }
                                className="me-2 mb-2"
                                onClick={() => toggleReason(reason)}
                            >
                                {reason}
                            </Button>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonPrimary
                        des="Hủy"
                        variant="secondary"
                        onClick={onHide}
                        className={`${styles.btnGray}`}
                    />
                    <ButtonPrimary
                        des="Xác nhận"
                        variant="info"
                        onClick={handleConfirm}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RefuseModal;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonPrimary from "../../buttonUI/ButtonPrimary";
import { ArrowLeft } from "react-bootstrap-icons";
import { approveOwnerRequest } from "../../../api/ownerApi/useOwnerRequestApi";
import ConfirmModal from "../../modal/ComfirmModal";
import RefuseModal from "./RefuseModal";

const BASE_URL = "http://localhost:8000";

const styles = {
    btnGray: "btn btn-secondary rounded-5",
};

const ReviewCCCDModal = ({ request, onBack, onSuccess }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showRefuseModal, setShowRefuseModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    if (!request) {
        return null;
    }

    const fields = [
        { label: "Số CCCD", value: request?.cccd || "" },
        { label: "Người dùng", value: request?.user || "" },
        {
            label: "Ngày tạo",
            value: new Date(request?.created_at).toLocaleDateString("vi-VN"),
        },
        { label: "Trạng thái", value: request?.status },
        {
            label: "Lý do từ chối",
            value: request?.rejection_reason || "Chưa có",
        },
    ];

    const handleConfirmApprove = async () => {
        try {
            const res = await approveOwnerRequest(request.id);
            alert(res.message);
            setShowConfirm(false);
            if (onSuccess) onSuccess();
        } catch (err) {
            alert("Duyệt thất bại.");
        }
    };

    return (
        <>
            <div className="container p-4">
                <h5 className="text-center fw-bold mb-4">
                    Duyệt phiếu đăng ký
                </h5>
                <div className="row">
                    <div className="col-md-7">
                        <div className="border rounded p-3">
                            {fields.map((field, index) => (
                                <div
                                    className="mb-2 border rounded p-2"
                                    key={index}
                                >
                                    <div className="fw-semibold small mb-1">
                                        {field.label}
                                    </div>
                                    <div className="text-break">
                                        {field.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-5 d-flex flex-column align-items-center justify-content-center">
                        <img
                            src={BASE_URL + request?.image_front_cccd}
                            alt="Ảnh mặt trước"
                            className="img-fluid rounded mb-3"
                            style={{
                                height: "250px",
                                objectFit: "cover",
                                cursor: "pointer",
                            }}
                            onClick={() =>
                                setPreviewImage(
                                    BASE_URL + request?.image_front_cccd
                                )
                            }
                        />

                        <img
                            src={BASE_URL + request?.image_back_cccd}
                            alt="Ảnh mặt sau"
                            className="img-fluid rounded"
                            style={{
                                height: "250px",
                                objectFit: "cover",
                                cursor: "pointer",
                            }}
                            onClick={() =>
                                setPreviewImage(
                                    BASE_URL + request?.image_back_cccd
                                )
                            }
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3 align-items-center">
                    <ButtonPrimary
                        des="Quay lại"
                        icon={<ArrowLeft />}
                        onClick={onBack}
                    />

                    <div className="d-flex justify-content-end align-items-center gap-2">
                        <ButtonPrimary
                            des="Từ chối"
                            className={`${styles.btnGray}`}
                            onClick={() => setShowRefuseModal(true)}
                        />

                        <ButtonPrimary
                            des="Chấp nhận"
                            onClick={() => setShowConfirm(true)}
                        />
                    </div>
                </div>
            </div>

            <ConfirmModal
                title="Bạn đồng ý duyệt tài khoản này?"
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                onConfirm={handleConfirmApprove}
            />
            <RefuseModal
                show={showRefuseModal}
                onHide={() => setShowRefuseModal(false)}
                requestId={request.id}
                email={request.email}
                onSuccess={onSuccess}
            />
            {previewImage && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0, 0, 0, 0.33)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 1080,
                    }}
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{
                                maxHeight: "100%",
                                maxWidth: "100%",
                                borderRadius: "8px",
                                boxShadow: "0 0 20px rgba(0, 0, 0, 0.33)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewCCCDModal;

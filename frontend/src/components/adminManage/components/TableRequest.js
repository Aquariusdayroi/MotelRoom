import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    useOwnerRequestById,
    useOwnerRequests,
} from "../../../api/ownerApi/useOwnerRequestApi";
import ReviewPostModal from "../AdminModal/ReviewPostModal";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCCCDModal from "./../AdminModal/ReviewCCCDModal";

const TableRequest = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const rowsPerPage = 4;

    const { requests, loading, error, refetch } = useOwnerRequests();

    const [step, setStep] = useState("review");

    const [selectedId, setSelectedId] = useState(null);

    const { request: cccdRequest } = useOwnerRequestById(selectedId);

    const filteredRequests = filterStatus
        ? requests.filter((r) => r.status === filterStatus)
        : requests;

    const sortedRequests = [...filteredRequests].sort((a, b) => {
        if (!sortField) return 0;
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);
        if (sortOrder === "asc") return dateA - dateB;
        else return dateB - dateA;
    });

    const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
    const paginatedData = sortedRequests.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    if (loading) {
        return <div className="text-center p-4">Đang tải...</div>;
    }

    if (error) {
        return <div className="text-center text-danger p-4">{error}</div>;
    }

    const renderStatusBadge = (status) => {
        const handleClick = () => {
            setFilterStatus((prev) => (prev === status ? null : status));
            setCurrentPage(1);
        };

        const commonClass = "badge px-3 py-2 rounded-pill cursor-pointer";
        switch (status) {
            case "Từ chối":
                return (
                    <span
                        className={`${commonClass} bg-danger-subtle text-danger`}
                        onClick={handleClick}
                    >
                        Từ chối
                    </span>
                );
            case "Chờ duyệt":
                return (
                    <span
                        className={`${commonClass} bg-warning-subtle text-warning`}
                        onClick={handleClick}
                    >
                        Chờ duyệt
                    </span>
                );
            case "Đã duyệt":
                return (
                    <span
                        className={`${commonClass} bg-success-subtle text-success`}
                        onClick={handleClick}
                    >
                        Đã duyệt
                    </span>
                );
            default:
                return <span className="badge bg-secondary">Không rõ</span>;
        }
    };

    const renderActionButton = (req) => {
        if (req.status === "Chờ duyệt") {
            return (
                <button
                    className="btn btn-success btn-sm w-50 text-white"
                    onClick={() => {
                        setSelectedRequest(req);
                        setShowModal(true);
                    }}
                >
                    Duyệt
                </button>
            );
        }
        return (
            <button className="btn btn-info btn-sm w-50 text-white">Xem</button>
        );
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const ModalWrapper = () => {
        return (
            <AnimatePresence mode="wait">
                {step === "review" && (
                    <motion.div
                        key="review"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ReviewPostModal
                            request={selectedRequest}
                            onNext={(id) => {
                                setSelectedId(id);
                                setStep("cccd");
                            }}
                        />
                    </motion.div>
                )}

                {step === "cccd" && (
                    <motion.div
                        key="cccd"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ReviewCCCDModal
                            request={cccdRequest}
                            onBack={() => setStep("review")}
                            onSuccess={() => {
                                refetch();
                                setShowModal(false);
                                setStep("review");
                                setSelectedId(null);
                                setSelectedRequest(null);
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };
    return (
        <div className="table-responsive rounded border">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-center">
                    <tr>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("createdAt")}
                        >
                            Ngày tạo{" "}
                            {sortField === "createdAt" &&
                                (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("approvedAt")}
                        >
                            Ngày duyệt{" "}
                            {sortField === "approvedAt" &&
                                (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {paginatedData.map((req, idx) => (
                        <tr key={idx} style={{ height: "74px" }}>
                            <td>{req.fullname}</td>
                            <td>{req.email}</td>
                            <td style={{ cursor: "pointer" }}>
                                {renderStatusBadge(req.status)}
                            </td>
                            <td>{req.createdAt}</td>
                            <td>{req.approvedAt}</td>
                            <td>{renderActionButton(req)}</td>
                        </tr>
                    ))}

                    {Array.from({
                        length: rowsPerPage - paginatedData.length,
                    }).map((_, i) => (
                        <tr key={`empty-${i}`}>
                            <td colSpan="6" style={{ height: "74px" }}></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="mt-3 d-flex justify-content-center">
                    <ul className="pagination mb-0">
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((page) => (
                            <li
                                key={page}
                                className={`page-item ${
                                    page === currentPage ? "active" : ""
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}

            {showModal && (
                <div
                    className="modal d-block fade show"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(36, 36, 36, 0.22)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 1055,
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="modal-dialog modal-xl modal-dialog-centered"
                        style={{ pointerEvents: "auto" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Xét duyệt yêu cầu
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <ModalWrapper request={selectedRequest} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableRequest;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TableRequest = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const requests = [
        {
            fullname: "Nguyễn Tấn Dark",
            email: "darkbrunlmao@gmail.com",
            status: "Từ chối",
            createdAt: "1/1/2025",
            approvedAt: "1/1/2025",
        },
        {
            fullname: "Nguyễn Tấn Dark",
            email: "darkbrunlmao@gmail.com",
            status: "Chờ duyệt",
            createdAt: "1/1/2025",
            approvedAt: "1/1/2025",
        },
        {
            fullname: "Nguyễn Tấn Dark",
            email: "darkbrunlmao@gmail.com",
            status: "Chờ duyệt",
            createdAt: "1/1/2025",
            approvedAt: "1/1/2025",
        },
        {
            fullname: "Nguyễn Tấn Dark",
            email: "darkbrunlmao@gmail.com",
            status: "Từ chối",
            createdAt: "1/1/2025",
            approvedAt: "1/1/2025",
        },
        {
            fullname: "Nguyễn Tấn Dark",
            email: "darkbrunlmao@gmail.com",
            status: "Từ chối",
            createdAt: "1/1/2025",
            approvedAt: "1/1/2025",
        },
        {
            fullname: "Nguyễn Tấn Dark",
            email: "darkbrunlmao@gmail.com",
            status: "Đã duyệt",
            createdAt: "1/1/2025",
            approvedAt: "1/1/2025",
        },
        {
            fullname: "Nguyễn Tấn Dark",
            email: "darkbrunlmao@gmail.com",
            status: "Đã duyệt",
            createdAt: "1/1/2025",
            approvedAt: "1/1/2025",
        },
        {
            fullname: "Nguyễn Tấn Dark",
            email: "darkbrunlmao@gmail.com",
            status: "Đã duyệt",
            createdAt: "1/1/2025",
            approvedAt: "1/1/2025",
        },
    ];

    const totalPages = Math.ceil(requests.length / rowsPerPage);
    const paginatedData = requests.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const renderStatusBadge = (status) => {
        switch (status) {
            case "Từ chối":
                return (
                    <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill">
                        Từ chối
                    </span>
                );
            case "Chờ duyệt":
                return (
                    <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill">
                        Chờ duyệt
                    </span>
                );
            case "Đã duyệt":
                return (
                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                        Đã duyệt
                    </span>
                );
            default:
                return <span className="badge bg-secondary">Không rõ</span>;
        }
    };

    const renderActionButton = (status) => {
        if (status === "Chờ duyệt") {
            return (
                <button className="btn btn-success btn-sm px-3">Duyệt</button>
            );
        }
        return (
            <button className="btn btn-info btn-sm px-3 w-50 text-white">
                Xem
            </button>
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
                        <th>Ngày tạo</th>
                        <th>Ngày duyệt</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {paginatedData.map((req, idx) => (
                        <tr key={idx} style={{ height: "74px" }}>
                            <td>{req.fullname}</td>
                            <td>{req.email}</td>
                            <td>{renderStatusBadge(req.status)}</td>
                            <td>{req.createdAt}</td>
                            <td>{req.approvedAt}</td>
                            <td>{renderActionButton(req.status)}</td>
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
        </div>
    );
};

export default TableRequest;

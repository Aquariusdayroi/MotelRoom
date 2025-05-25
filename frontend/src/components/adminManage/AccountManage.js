import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import styles from '../../styles/AccountManage.module.css';
import searchIcon from "../../assets/img/search.png";
import filterIcon from "../../assets/img/filter.png";
import ActionDropdown from "./components/AccountDropdown";
import WarningModal from "./components/WarningModal";
import RoleAssignModal from "./components/RoleAssignModal";

const users = [
  { name: "Nguyễn Văn A", email: "anh@gmail.com", role: "Người dùng", status: "Hoạt động" },
  { name: "Trần Thị Mưa", email: "mua@iuh.edu.vn", role: "Người dùng", status: "Bị khóa" },
  { name: "Lê Văn Gió", email: "gio@gmail.nc", role: "Quản trị viên", status: "Vi phạm" },
  { name: "Nguyễn Văn Bảo", email: "baotapnhongba@hihui.com", role: "Người dùng", status: "Đang xử lý" },
];

export default function AccountManagement() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusClass = (status) => {
    if (status === "Hoạt động") return styles["status-active"];
    if (status === "Bị khóa") return styles["status-locked"];
    if (status === "Vi phạm") return styles["status-violate"];
    return styles["status-pending"];
  };

  const handleAction = (action, user) => {
    setSelectedUser(user);
    if (action === "warn") setShowWarningModal(true);
    if (action === "assign") setShowAssignModal(true);
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">Quản lý tài khoản</h4>

      <div className="d-flex align-items-center mb-3" style={{ width: "100%", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <div className={styles["account-search-wrapper"]}>
            <img src={searchIcon} className={styles["search-icon"]} alt="search" />
            <input
              type="text"
              className={`${styles["account-search"]}`}
              placeholder="Tìm kiếm theo tên khách..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles["filter-wrapper"]}>
              <img src={filterIcon} style={{ width: 16, height: 16 }} alt="filter" />
              <span>Bộ lọc</span>
            </div>
          </div>
        </div>

        <Button className={styles["btn-create"]}>+ Tạo tài khoản</Button>
      </div>

      <Table hover responsive bordered className={styles["account-table"]}>
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th style={{ width: "60px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u, idx) => (
            <tr key={idx}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className={`${styles["account-status"]} ${getStatusClass(u.status)}`}>
                  {u.status}
                </span>
              </td>
              <td>
                <ActionDropdown
                  status={u.status}
                  onWarn={() => handleAction("warn", u)}
                  onAssign={() => handleAction("assign", u)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showWarningModal && selectedUser && (
        <WarningModal
          show={showWarningModal}
          onClose={() => setShowWarningModal(false)}
          onSave={(reason) => {
            console.log("Lý do cảnh báo:", reason);
            setShowWarningModal(false);
          }}
          user={selectedUser}
        />
      )}

      {showAssignModal && selectedUser && (
        <RoleAssignModal
          show={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          onSave={(role) => {
            console.log("Vai trò mới:", role);
            setShowAssignModal(false);
          }}
          user={selectedUser}
        />
      )}
    </div>
  );
}

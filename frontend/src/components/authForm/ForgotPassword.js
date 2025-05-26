import React, { useState } from 'react';
import styles from "../../styles/Login.module.css";
import ButtonPrimary from "../buttonUI/ButtonPrimary";
import axiosClient from "../../api/axiosClient";
import NotifyModal from "../modal/NotifyModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword({ onBack, onSwitch }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("error");
  const [modalTitle, setModalTitle] = useState("Lỗi");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosClient.post('/user/api/password-reset/', { email });
      toast.success(res.data?.message || "Đã gửi email đặt lại mật khẩu.");
    } catch (err) {
      setModalMessage(
        err.response?.data?.message ||
        err.response?.data?.errors?.email ||
        "Có lỗi xảy ra"
      );
      setModalType("error");
      setModalTitle("Lỗi");
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.containerForm}>
      <h2 className="text-2xl font-bold text-center mb-4" style={{ fontWeight: 650 }}>
        Quên mật khẩu
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.containerAccount}>
          <span className="material-symbols-outlined">account_circle</span>
          <input
            type="email"
            required
            placeholder="Nhập email để lấy lại mật khẩu"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <ButtonPrimary
          des={isLoading ? "Đang gửi..." : "Gửi mail xác nhận"}
          type="submit"
          className={styles.buttonLoginForm}
          disabled={isLoading}
        />
      </form>
      <div className="text-center mt-3">
        <span
          className="text-primary"
          style={{ cursor: "pointer", textDecoration: "underline", marginRight: 16 }}
          onClick={onBack}
        >
          Quay lại đăng nhập
        </span>
      </div>
      <NotifyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        type={modalType}
        title={modalTitle}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

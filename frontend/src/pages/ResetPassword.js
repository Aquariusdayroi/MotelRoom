// src/pages/ResetPassword.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "../styles/Login.module.css";
import ButtonPrimary from "../components/buttonUI/ButtonPrimary";
import axiosClient from "../api/axiosClient";
import NotifyModal from "../components/modal/NotifyModal";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "../assets/images";
import Footer from "../layout/components/Footer";

export default function ResetPassword() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("error");
  const [modalTitle, setModalTitle] = useState("Lỗi");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const pageVariants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 100,
    },
  };
  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalMessage("");
    setIsLoading(true);
    try {
      const res = await axiosClient.post(`/user/api/password-reset-confirm/${uidb64}/${token}/`, { password, password2 });
      setModalMessage(res.data?.message || "Đặt lại mật khẩu thành công.");
      setModalType("success");
      setModalTitle("Thành công");
      setModalOpen(true);
      if (res.data?.success) setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setModalMessage(
        err.response?.data?.message ||
        err.response?.data?.errors?.password ||
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
    <div>
      <div className={styles.container}>
        <div className={styles.sectionForm}>
          <AnimatePresence mode="wait">
            <motion.div
              key="reset-password"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <div className={styles.containerForm}>
                <h2 className="text-2xl font-bold text-center mb-4" style={{ fontWeight: 650 }}>
                  Đặt lại mật khẩu
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.containerAccount}>
                    <span className="material-symbols-outlined">lock</span>
                    <input
                      type="password"
                      placeholder="Mật khẩu mới"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.containerAccount}>
                    <span className="material-symbols-outlined">lock</span>
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      value={password2}
                      onChange={e => setPassword2(e.target.value)}
                      required
                    />
                  </div>
                  <ButtonPrimary
                    des={isLoading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
                    type="submit"
                    className={styles.buttonLoginForm}
                    disabled={isLoading}
                  />
                </form>
                <NotifyModal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  message={modalMessage}
                  type={modalType}
                  title={modalTitle}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.sectionLogo}>
          <img
            src={images.BackgroundLogin}
            alt="backgroundLogin"
            className={styles.backgroundImage}
          />
          <div className={styles.darkOverlay}></div>{" "}
          {/* Lớp phủ màu đen */}
          <div className={styles.logoOverlay}>
            <img src={images.logo} alt="Logo" />
            <p>Lựa chọn theo cách của bạn</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// nyh44335@toaik.com
import React, { useState } from "react";
import styles from "../../styles/SignIn.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import authApi from "../../api/authApi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NotifyModal from "../modal/NotifyModal";
import { DotLoader } from "react-spinners";
import ButtonPrimary from "../buttonUI/ButtonPrimary";

function SignInForm({ onSwitch }) {
    const [useEmail, setUseEmail] = useState(true);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [preShowPassword, setPreShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("Thông báo");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages({});
        setIsLoading(true);

        if (!agree) {
            setModalTitle("Lỗi đăng ký");
            setModalMessage("Bạn phải đồng ý với điều khoản và chính sách!");
            setModalOpen(true);
            setIsLoading(false);
            return;
        }

        if (!email.trim() || !fullname.trim() || !password.trim()) {
            setModalTitle("Lỗi đăng ký");
            setModalMessage("Vui lòng nhập đầy đủ thông tin!");
            setModalOpen(true);
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setModalTitle("Lỗi đăng ký");
            setModalMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
            setModalOpen(true);
            setIsLoading(false);
            return;
        }

        try {
            // const names = fullname.trim().split(" ");
            const names = fullname.trim();
            // const firstName = names[0];
            // const lastName = names.slice(1).join(" ") || "";

            const payload = {
                email,
                fullname: names,
                password,
                password2: confirmPassword,
            };

            console.log("🔥 Payload gửi đi:", payload);

            const response = await authApi.register(payload);
            console.log("Đăng ký thành công:", response.data);

            toast.success("Đăng ký thành công! Đang chuyển hướng...");

            setModalTitle("Thành công");
            setModalMessage("Hãy kiểm tra email xác nhận đăng ký");
            setModalOpen(true);

            setTimeout(() => {
                onSwitch();
            }, 2400);
        } catch (error) {
            console.log("Error response:", error.response); // Thêm log để debug

            const errors = error.response?.data?.errors;
            let errorMessage = "";

            if (errors) {
                // Kiểm tra lỗi last_name
                if (
                    errors.last_name &&
                    errors.last_name.includes("This field may not be blank.")
                ) {
                    errorMessage +=
                        "Họ và tên phải có đầy đủ họ và tên. Ví dụ 'Nguyễn Văn A'. ";
                }

                // Kiểm tra lỗi password
                if (errors.password) {
                    if (
                        errors.password.includes("This password is too common.")
                    ) {
                        errorMessage += "Mật khẩu quá phổ biến. ";
                    }
                    if (
                        errors.password.includes(
                            "This password is entirely numeric"
                        )
                    ) {
                        errorMessage += "Mật khẩu phải chứa cả chữ và số. ";
                    }
                }

                // Nếu có lỗi email
                if (errors.email) {
                    errorMessage += errors.email.join(". ");
                }
            }

            // Nếu không có errorMessage cụ thể, sử dụng message mặc định
            if (!errorMessage) {
                errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";
            }

            // Set modal state
            setModalTitle("Lỗi đăng ký");
            setModalMessage(errorMessage.trim());
            setModalOpen(true);

            // Log để debug
            console.log("Modal states:", {
                isOpen: modalOpen,
                title: modalTitle,
                message: modalMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className={styles.register_box} onSubmit={handleSubmit}>
                {isLoading && (
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        style={{
                            background: "rgba(255,255,255,0.8)",
                            zIndex: 1000,
                            position: "fixed",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <DotLoader
                            color="var(--primary-color)"
                            size={50}
                            aria-label="Loading Spinner"
                        />
                    </div>
                )}
                <h2 className={styles.title}>Đăng ký</h2>

                <div className={styles.tab_header}>
                    <div
                        className={`${styles.tab} ${
                            useEmail ? styles.active : ""
                        }`}
                        onClick={() => setUseEmail(true)}
                    >
                        Sử dụng địa chỉ email
                    </div>
                    <div
                        className={`${styles.tab} ${
                            !useEmail ? styles.active : ""
                        }`}
                        onClick={() => setUseEmail(false)}
                    >
                        Sử dụng số điện thoại
                    </div>
                </div>

                {/* Input Email */}
                {useEmail ? (
                    <div className={styles.input_group}>
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                ) : (
                    <div className={styles.input_group}>
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                        <input
                            type="tel"
                            placeholder="Số điện thoại của bạn"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                )}

                {/* Input Fullname */}
                <div className={styles.input_group}>
                    <span className="material-symbols-outlined">badge</span>
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                </div>

                {/* Input Password */}
                <div className={styles.input_group}>
                    <span className="material-symbols-outlined">lock</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.btnShowPassword}
                    >
                        {showPassword ? (
                            <AiOutlineEye />
                        ) : (
                            <AiOutlineEyeInvisible />
                        )}
                    </button>
                    {errorMessages.password && (
                        <p style={{ color: "red", fontSize: "0.875rem" }}>
                            {errorMessages.password}
                        </p>
                    )}
                </div>

                {/* Input Confirm Password */}
                <div className={styles.input_group}>
                    <span className="material-symbols-outlined">lock</span>
                    <input
                        type={preShowPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setPreShowPassword(!preShowPassword)}
                        className={styles.btnShowPassword}
                    >
                        {preShowPassword ? (
                            <AiOutlineEye />
                        ) : (
                            <AiOutlineEyeInvisible />
                        )}
                    </button>
                    {errorMessages.password2 && (
                        <p style={{ color: "red", fontSize: "0.875rem" }}>
                            {errorMessages.password2}
                        </p>
                    )}
                </div>

                {/* Checkbox Đồng ý điều khoản */}
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                    />
                    Tôi đồng ý với điều khoản và chính sách của Simi
                </label>

                {/* Nút Submit */}
                <ButtonPrimary
                    type="submit"
                    className={styles.btn_submit}
                    des={isLoading ? "Đang xử lý..." : "ĐĂNG KÝ"}
                    style={{ opacity: isLoading ? 0.7 : 1 }}
                />

                {/* Link chuyển về Login */}
                <div className={styles.login_link}>
                    Đã có tài khoản? trở về{" "}
                    <a href="#" onClick={onSwitch}>
                        Đăng nhập
                    </a>
                </div>
            </form>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />
            <NotifyModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    );
}

export default SignInForm;

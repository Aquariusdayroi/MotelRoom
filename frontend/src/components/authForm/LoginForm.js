import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/Login.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ButtonPrimary from "../buttonUI/ButtonPrimary";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { AuthToken } from "../../authToken";
import NotifyModal from "../modal/NotifyModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm({ onSwitch, onForgot }) {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthToken);
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await login(data);
            toast.success("Đăng nhập thành công!", {
                position: "top-right",
                autoClose: 2000,
            });
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (error) {
            console.error("Đăng nhập thất bại:", error.response?.data || error);
            const message =
                error.response?.data?.message ||
                "Đăng nhập thất bại, vui lòng thử lại.";
            setModalMessage(message);
            setModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = () => {
        console.log("Đăng nhập Google thất bại");
    };

    const handleSuccess = async (credentialResponse) => {
        setIsLoading(true);
        try {
            await login({
                token: credentialResponse.credential,
                provider: "google",
            });
            toast.success("Đăng nhập Google thành công!", {
                position: "top-right",
                autoClose: 2000,
            });
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (error) {
            console.error(
                "Lỗi đăng nhập Google:",
                error.response?.data || error
            );
            setModalMessage(
                error.response?.data?.message ||
                    "Lỗi đăng nhập Google, vui lòng thử lại."
            );
            setModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.containerForm}>
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
            <h2
                className="text-2xl font-bold text-center mb-4"
                style={{ fontWeight: 650 }}
            >
                Đăng nhập
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.containerAccount}>
                    <span className="material-symbols-outlined">
                        account_circle
                    </span>
                    <input
                        type="text"
                        required
                        placeholder="Email hoặc số điện thoại"
                        {...register("email")}
                    />
                </div>
                <div className={styles.containerAccount}>
                    <span className="material-symbols-outlined">lock</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Mật khẩu"
                        {...register("password")}
                        className="w-full pl-10 pr-10 py-2 border rounded-2 focus:outline-blue-500"
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
                </div>

                <div
                    className="d-flex justify-content-between align-items-center w-100"
                    style={{ marginBottom: "20px" }}
                >
                    <label
                        className="d-flex align-items-center"
                        style={{ marginBottom: "0px" }}
                    >
                        <input type="checkbox" className="me-1" /> Nhớ mật khẩu
                    </label>
                    <span
                        className="text-dark fst-italic text-decoration-underline"
                        style={{ cursor: "pointer" }}
                        onClick={onForgot}
                    >
                        Quên mật khẩu?
                    </span>
                </div>

                <ButtonPrimary
                    des={isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                    type="submit"
                    className={styles.buttonLoginForm}
                    disabled={isLoading}
                />
            </form>

            <div className="d-flex align-items-center my-3">
                <div className="flex-grow-1 border-top border-secondary opacity-25"></div>
                <span className="mx-2 text-muted">Hoặc</span>
                <div className="flex-grow-1 border-top border-secondary opacity-25"></div>
            </div>

            <GoogleOAuthProvider clientId="646771638787-s7qgjeuos43n7lqnnl8hic9nr9kg182a.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    width="320px"
                />
            </GoogleOAuthProvider>

            <div className="text-center text-sm mt-4">
                Bạn chưa dùng Simi?{" "}
                <a
                    href="#"
                    className="text-blue text-decoration-none"
                    onClick={onSwitch}
                >
                    Tạo tài khoản
                </a>
            </div>
            <NotifyModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Lỗi đăng nhập"
                message={modalMessage}
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

export default LoginForm;

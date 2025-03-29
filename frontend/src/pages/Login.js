import styles from "../styles/Login.module.css"; // CSS
import logo from "../assets/Logo.png"; // background
import backgroundLogin from "../assets/BackgroundLogin.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Login() {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log("Đăng nhập với:", data);
    };

    return (
        <div>
            <header className={styles.header}>
                <img src={logo} alt="Logo" />
            </header>
            <div className={styles.container}>
                <div className={styles.sectionForm}>
                    <div className={styles.containerForm}>
                        <h2 className="text-2xl font-bold text-center mb-4" style={{ fontWeight: 650 }}>Đăng nhập</h2>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Email hoặc Số điện thoại */}
                            <div className={styles.containerAccount}>
                                <span className="material-symbols-outlined">account_circle</span>
                                <input
                                    type="text"
                                    placeholder="Email hoặc số điện thoại"
                                    {...register("email", { required: true })}
                                />
                            </div>

                            {/* Mật khẩu */}

                            <div className={styles.containerAccount}>
                                <span className="material-symbols-outlined">lock</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mật khẩu"
                                    {...register("password", { required: true })}
                                    className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.btnShowPassword}
                                >
                                    {showPassword ? <AiOutlineEye /> : < AiOutlineEyeInvisible />}
                                </button>
                            </div>


                            {/* Nhớ mật khẩu và Quên mật khẩu */}
                            <div className="d-flex justify-content-between align-items-center w-100" style={{ marginBottom: "20px" }}>
                                <label className="d-flex align-items-center" style={{ marginBottom: "0px" }}>
                                    <input type="checkbox" className="me-1" /> Nhớ mật khẩu
                                </label>
                                <a href="#" className="text-dark fst-italic text-decoration-underline">Quên mật khẩu?</a>
                            </div>

                            {/* Nút Đăng nhập */}
                            <button
                                type="submit"
                                className={styles.btnLogin}>
                                ĐĂNG NHẬP
                            </button>
                        </form>

                        {/* Hoặc đăng nhập bằng */}
                        <div className="d-flex align-items-center my-3">
                            <div className="flex-grow-1 border-top border-secondary opacity-25"></div>
                            <span className="mx-2 text-muted">Hoặc</span>
                            <div className="flex-grow-1 border-top border-secondary opacity-25"></div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button className={styles.btnGoogle}>
                                <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" style={{ height: "80%" }} />
                                Google
                            </button>
                        </div>

                        {/* Đăng ký tài khoản */}
                        <p className="text-center text-sm mt-4">
                            Bạn chưa dùng Simi? <a href="#" className="text-blue text-decoration-none">Tạo tài khoản</a>
                        </p>
                    </div>
                </div>
                <div className={styles.sectionLogo}>
                    <img src={backgroundLogin} alt="backgroundLogin" className={styles.backgroundImage} />
                    <div className={styles.darkOverlay}></div> {/* Lớp phủ màu đen */}
                    <div className={styles.logoOverlay}>
                        <img src={logo} alt="Logo" />
                        <p>Lựa chọn theo cách của bạn</p>
                    </div>
                </div>
            </div>
            <footer>
                <img src={logo} alt="Logo" />
            </footer>
        </div>
    );
}

export default Login;
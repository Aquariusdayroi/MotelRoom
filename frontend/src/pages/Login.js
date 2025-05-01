import styles from "../styles/Login.module.css"; // CSS
import logo from "../assets/Logo.png"; // background
import backgroundLogin from "../assets/BackgroundLogin.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LoginForm from "../components/LoginForm";
import SignInForm from "../components/SignUpForm";
import Footer from "../layout/components/Footer";

function Login() {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log("Đăng nhập với:", data);
    };
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div>
            <header className={styles.header}>
                <img src={logo} alt="Logo" />
            </header>
            <div className={styles.container}>
                <div className={styles.sectionForm}>
                    {isLogin ? (
                        <LoginForm onSwitch={() => setIsLogin(false)} /> // Hiển thị LoginForm
                    ) : (
                        <SignInForm onSwitch={() => setIsLogin(true)} /> // Hiển thị SignInForm
                    )}
                </div>
                <div className={styles.sectionLogo}>
                    <img
                        src={backgroundLogin}
                        alt="backgroundLogin"
                        className={styles.backgroundImage}
                    />
                    <div className={styles.darkOverlay}></div>{" "}
                    {/* Lớp phủ màu đen */}
                    <div className={styles.logoOverlay}>
                        <img src={logo} alt="Logo" />
                        <p>Lựa chọn theo cách của bạn</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;

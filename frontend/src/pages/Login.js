import styles from "../styles/Login.module.css"; // CSS
import logo from "../assets/Logo.png"; // background
import backgroundLogin from "../assets/BackgroundLogin.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LoginForm from "../components/LoginForm";
import SignInForm from "../components/SignInForm";
import Footer from "../layout/components/Footer";
import { images } from "../assets/images";

function Login() {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log("Đăng nhập với:", data);
    };
    const [isLogin, setIsLogin] = useState(true);

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
    return (
        <div>
            <header className={styles.header}>
                <Link to="/home">
                    <img src={images.logo} className={styles.logo} />
                </Link>
            </header>
            <div className={styles.container}>
                <div className={styles.sectionForm}>
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <LoginForm onSwitch={() => setIsLogin(false)} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="register"
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <SignInForm onSwitch={() => setIsLogin(true)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
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

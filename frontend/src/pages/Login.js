import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LoginForm from "../components/authForm/LoginForm";
import SignInForm from "../components/authForm/SignInForm";
import Footer from "../layout/components/Footer";
import { images } from "../assets/images";
import HeaderWhite from "../layout/components/HeaderWhite";
import ForgotPassword from "../components/authForm/ForgotPassword";

function Login() {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);

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
            <div className={styles.container}>
                <div className={styles.sectionForm}>
                    <div className="w-100">
                        <AnimatePresence mode="wait">
                            {isForgot ? (
                                <motion.div
                                    key="forgot"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <ForgotPassword
                                        onBack={() => setIsForgot(false)}
                                    />
                                </motion.div>
                            ) : isLogin ? (
                                <motion.div
                                    key="login"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <LoginForm
                                        onSwitch={() => setIsLogin(false)}
                                        onForgot={() => setIsForgot(true)}
                                    />
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
                                    <SignInForm
                                        onSwitch={() => setIsLogin(true)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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

export default Login;

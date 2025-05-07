import React, { useState } from "react";
import styles from "../styles/modal.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { emailRegex, phoneRegex, passwordRegex } from "../components/validationRegex.js";

function LoginForm({ onSwitch }) {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = (data) => {
        const { email, password } = data;
        if (!emailRegex.test(email) && !phoneRegex.test(email)) {
            setErrorMsg("Email phải có định dạng xxx@gmail.com hoặc là số điện thoại hợp lệ!");
            return;
        }
        if (!passwordRegex.test(password)) {
            setErrorMsg("Mật khẩu phải bắt đầu bằng chữ in hoa và ít nhất 8 ký tự!");
            return;
        }
        setErrorMsg("");
        console.log("Đăng nhập với:", data);
    };

    return (
        <motion.form
            className={`${styles.register_box} animate-fade`}
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className={styles.title}>Đăng nhập</h2>

            {errorMsg && <div style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</div>}

            <div className={styles.input_group}>
                <span className="material-symbols-outlined">account_circle</span>
                <input
                    type="text"
                    placeholder="Email hoặc số điện thoại"
                    {...register("email", { required: true })}
                />
            </div>

            <div className={styles.input_group}>
                <span className="material-symbols-outlined">lock</span>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    {...register("password", { required: true })}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.btnShowPassword}
                >
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
            </div>

            <div className="d-flex justify-content-between align-items-center w-100 mb-3" style={{ fontSize: "14px" }}>
                <label className="d-flex align-items-center">
                    <input type="checkbox" className="me-1" /> Nhớ mật khẩu
                </label>
                <a className="text-dark fst-italic text-decoration-underline" style={{ cursor: "pointer" }}>
                    Quên mật khẩu?
                </a>
            </div>

            <button type="submit" className={styles.btn_submit}>ĐĂNG NHẬP</button>

            <div className="d-flex justify-content-center">
                <p className={styles.login_link}>
                    Bạn chưa dùng Simi?{" "}
                    <a href="#" onClick={onSwitch}>
                        Tạo tài khoản
                    </a>
                </p>
            </div>
            <div className="d-flex align-items-center my-3">
                <div className="flex-grow-1 border-top border-secondary opacity-25"></div>
                <span className="mx-2 text-muted">Hoặc</span>
                <div className="flex-grow-1 border-top border-secondary opacity-25"></div>
            </div>

            <div className="d-flex justify-content-center">
                <button className={styles.btnGoogle}>
                    <img src={require("../assets/iconGoogle.png")} alt="Google" style={{ width: 20, marginRight: 8 }} />
                    Google
                </button>
            </div>

        </motion.form>
    );
}

export default LoginForm;

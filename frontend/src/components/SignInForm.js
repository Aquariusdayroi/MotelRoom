import React, { useState } from "react";
import styles from "../styles/modal.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { emailRegex, passwordRegex, nameRegex } from "../components/validationRegex";

function SignUpForm({ onSwitch }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [preShowPassword, setPreShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nameRegex.test(name)) {
            setErrorMsg("Tên người dùng phải có 2 từ trở lên và viết hoa chữ cái đầu, không chứa chữ số!");
            return;
        }
        if (!emailRegex.test(email)) {
            setErrorMsg("Email phải được nhập theo định dạng XXX@gmail.com");
            return;
        }
        if (!passwordRegex.test(password)) {
            setErrorMsg("Mật khẩu phải bắt đầu bằng chữ in hoa và có độ dài ít nhất là 8 ký tự!");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMsg("Mật khẩu nhập lại không khớp!");
            return;
        }
        if (!agree) {
            setErrorMsg("Bạn cần đồng ý với điều khoản!");
            return;
        }

        setErrorMsg("");
    };

    return (
        <motion.form
            className={`${styles.register_box} animate-fade`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className={styles.title_re}>Đăng ký</h2>

            <div style={{ minHeight: "24px" }}>
                {errorMsg && <div style={{ color: "red", fontSize: "0.9rem" }}>{errorMsg}</div>}
            </div>

            <div className={styles.input_group}>
                <span className="material-symbols-outlined">badge</span>
                <input
                    type="text"
                    placeholder="Họ tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.input_group}>
                <span className="material-symbols-outlined">mail</span>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.input_group}>
                <span className="material-symbols-outlined">lock</span>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.btnShowPassword}>
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
            </div>

            <div className={styles.input_group}>
                <span className="material-symbols-outlined">lock</span>
                <input
                    type={preShowPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" onClick={() => setPreShowPassword(!preShowPassword)} className={styles.btnShowPassword}>
                    {preShowPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
            </div>

            <label className={styles.checkbox}>
                <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} /> Tôi đồng ý với điều khoản và chính sách của Simi
            </label>

            <button type="submit" className={styles.btn_submit}>ĐĂNG KÝ</button>

            <div className="d-flex justify-content-center mt-3">
                <p className={styles.login_link}>
                    Đã có tài khoản? trở về <a href="#" onClick={onSwitch}>Đăng nhập</a>
                </p>
            </div>
        </motion.form>
    );
}

export default SignUpForm;

import React, { useState } from "react";
import styles from "../styles/modal.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { emailRegex, passwordRegex, nameRegex } from "./validationRegex";

function SignUpForm({ onSwitch }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [preShowPassword, setPreShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agree: ""
        };

        if (!name) newErrors.name = "Vui lòng nhập họ tên!";
        else if (!nameRegex.test(name)) newErrors.name = "Tên phải có 2 từ viết hoa chữ cái đầu, không chứa số!";

        if (!email) newErrors.email = "Vui lòng nhập email!";
        else if (!emailRegex.test(email)) newErrors.email = "Email không đúng định dạng!";

        if (!password) newErrors.password = "Vui lòng nhập mật khẩu!";
        else if (!passwordRegex.test(password)) newErrors.password = "Mật khẩu phải bắt đầu bằng chữ in hoa và ít nhất 8 ký tự!";

        if (!confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu!";
        else if (password !== confirmPassword) newErrors.confirmPassword = "Mật khẩu nhập lại không khớp!";

        if (!agree) newErrors.agree = "Bạn cần đồng ý với điều khoản!";

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((msg) => msg !== "");
        if (!hasError) {
            console.log("Form hợp lệ!");
            // Thực hiện gửi dữ liệu hoặc gọi API tại đây
        }
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

            <div className={styles.input_group}>
                <span className="material-symbols-outlined">badge</span>
                <input
                    type="text"
                    placeholder="Họ tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            <div className={styles.input_group}>
                <span className="material-symbols-outlined">mail</span>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
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
                {errors.password && <p className={styles.error}>{errors.password}</p>}
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
                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
            </div>

            <label className={styles.checkbox}>
                <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} /> Tôi đồng ý với điều khoản và chính sách của Simi
            </label>
            {errors.agree && <p className={styles.error} style={{ marginTop: "4px" }}>{errors.agree}</p>}

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

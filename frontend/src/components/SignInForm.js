import React, { useState } from "react";
import styles from "../styles/SignIn.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function SignInForm({ onSwitch }) {
    const [useEmail, setUseEmail] = useState(true);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [preShowPassword, setPreShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic đăng ký ở đây
        console.log({
            email,
            phone,
            password,
            confirmPassword,
            agree,
        });
    };

    return (
        <form className={styles.register_box} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Đăng ký</h2>

            <div className={styles.tab_header}>
                <div
                    className={`${styles.tab} ${useEmail ? styles.active : ""}`}
                    onClick={() => setUseEmail(true)}
                >
                    Sử dụng địa chỉ email
                </div>
                <div
                    className={`${styles.tab} ${!useEmail ? styles.active : ""}`}
                    onClick={() => setUseEmail(false)}
                >
                    Sử dụng số điện thoại
                </div>
            </div>

            {useEmail ? (
                <div className={styles.input_group}>
                    <span className="material-symbols-outlined">account_circle</span>
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
                    <span className="material-symbols-outlined">account_circle</span>
                    <input
                        type="tel"
                        placeholder="Số điện thoại của bạn"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
            )}

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
                    required
                />
                <button
                    type="button"
                    onClick={() => setPreShowPassword(!preShowPassword)}
                    className={styles.btnShowPassword}
                >
                    {preShowPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
            </div>

            <label className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                />
                Tôi đồng ý với điều khoản và chính sách của Simi
            </label>

            <button type="submit" className={styles.btn_submit}>
                ĐĂNG KÝ
            </button>

            <p className={styles.login_link}>
                Đã có tài khoản? trở về <a href="#" onClick={onSwitch}>Đăng nhập</a>
            </p>
        </form>
    );
}

export default SignInForm;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/Login.module.css";
import iconGoogle from "../assets/iconGoogle.png";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

function LoginForm({ onSwitch }) {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log("Đăng nhập với:", data);
    };

    const handleError = () => {
        console.log("Đăng nhập thất bại");
    };

    const handleSuccess = async (credentialResponse) => {
        console.log(credentialResponse.credential)
        try {
          const response = await axios.post("http://localhost:8000/user/api/login/google", {
            token: credentialResponse.credential,
          });
    
          console.log("Đăng nhập thành công:", response.data);
          // Lưu token hoặc chuyển trang...
        } catch (error) {
          console.error("Lỗi đăng nhập:", error.response?.data || error);
        }
    };

    return (
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
                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
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


            {/* google button */}
            <GoogleOAuthProvider clientId="646771638787-s7qgjeuos43n7lqnnl8hic9nr9kg182a.apps.googleusercontent.com">
                <div className="flex justify-center space-x-4">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                    
                    {/* <button className={styles.btnGoogle}>
                        <img src={iconGoogle} alt="Google" style={{ height: "80%" }} />
                        Google
                    </button> */}
                </div>
            </GoogleOAuthProvider>
            {/* Đăng ký tài khoản */}
            <p className="text-center text-sm mt-4">
                Bạn chưa dùng Simi? <a href="#" className="text-blue text-decoration-none" onClick={onSwitch}>Tạo tài khoản</a>
            </p>
        </div>
    );
}

export default LoginForm;
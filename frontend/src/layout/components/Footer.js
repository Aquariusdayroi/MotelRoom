import styles from "../../styles/Footer.module.css";
import { images } from "../../assets/images";
import { useNavigate } from "react-router-dom";
const Footer = () => {
    const handleSocialClick = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <footer className={styles.footer}>
                <div className={styles.footerLeft}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img src={images.logo} className={styles.logo} />
                    <div className={styles.description}>
                        Sứ mệnh của chúng tôi là mang đến trải nghiệm tốt nhất
                        cho khách hàng, hỗ trợ khách hàng tìm được trọ đúng với
                        nhu cầu của mình
                    </div>
                    <div className={styles.social}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            onClick={() =>
                                handleSocialClick("https://www.facebook.com")
                            }
                        >
                            <path
                                fill="#3F51B5"
                                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                            ></path>
                            <path
                                fill="#FFF"
                                d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                            ></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="180"
                            height="180"
                            viewBox="0 0 48 48"
                            onClick={() =>
                                handleSocialClick("https://www.instagram.com")
                            }
                        >
                            <radialGradient
                                id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                                cx="19.38"
                                cy="42.035"
                                r="44.899"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#fd5"></stop>
                                <stop offset=".328" stop-color="#ff543f"></stop>
                                <stop offset=".348" stop-color="#fc5245"></stop>
                                <stop offset=".504" stop-color="#e64771"></stop>
                                <stop offset=".643" stop-color="#d53e91"></stop>
                                <stop offset=".761" stop-color="#cc39a4"></stop>
                                <stop offset=".841" stop-color="#c837ab"></stop>
                            </radialGradient>
                            <path
                                fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                            ></path>
                            <radialGradient
                                id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                                cx="11.786"
                                cy="5.54"
                                r="29.813"
                                gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#4168c9"></stop>
                                <stop
                                    offset=".999"
                                    stop-color="#4168c9"
                                    stop-opacity="0"
                                ></stop>
                            </radialGradient>
                            <path
                                fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                            ></path>
                            <path
                                fill="#fff"
                                d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                            ></path>
                            <circle
                                cx="31.5"
                                cy="16.5"
                                r="1.5"
                                fill="#fff"
                            ></circle>
                            <path
                                fill="#fff"
                                d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                            ></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            onClick={() =>
                                handleSocialClick("https://www.linkedin.com")
                            }
                        >
                            <path
                                fill="#0288D1"
                                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                            ></path>
                            <path
                                fill="#FFF"
                                d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    <div>
                        <h2>Quy định</h2>
                        <div
                            onClick={() => navigate("/post-rules")}
                            style={{ cursor: "pointer" }}
                        >
                            Quy định đăng tin
                        </div>
                        <div
                            onClick={() => navigate("/privacy-policy")}
                            style={{ cursor: "pointer" }}
                        >
                            Chính sách bảo mật
                        </div>
                        <div
                            onClick={() => navigate("/terms-of-use")}
                            style={{ cursor: "pointer" }}
                        >
                            Điều khoản sử dụng
                        </div>
                        <div
                            onClick={() => navigate("/complaint-resolution")}
                            style={{ cursor: "pointer" }}
                        >
                            Giải quyết kiếu nại
                        </div>
                        <div
                            onClick={() => navigate("/user-agreement")}
                            style={{ cursor: "pointer" }}
                        >
                            Thỏa thuận người dùng
                        </div>
                    </div>
                    <div>
                        <h2>Quy định danh mục cho thuê</h2>
                        <div
                            onClick={() => navigate("/rental-category-rules")}
                            style={{ cursor: "pointer" }}
                        >
                            Nhà cho thuê
                        </div>
                        <div
                            onClick={() => navigate("/room-rental-rules")}
                            style={{ cursor: "pointer" }}
                        >
                            Phòng cho thuê
                        </div>
                        <div
                            onClick={() => navigate("/apartment-rental-rules")}
                            style={{ cursor: "pointer" }}
                        >
                            Nhà chung cư cho thuê
                        </div>
                    </div>
                    <div>
                        <h2>Về Simi</h2>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                width="22px"
                                height="22px"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                />
                            </svg>
                            +8491238012
                        </div>
                        <div className={styles.groupContact}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                width="22px"
                                height="22px"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                />
                            </svg>
                            simi.contact@gmail.com
                        </div>
                    </div>
                </div>
            </footer>
            <div className={styles.copyright}>
                © Bản quyền thuộc về Simi Việt Nam
            </div>
        </div>
    );
};
export default Footer;

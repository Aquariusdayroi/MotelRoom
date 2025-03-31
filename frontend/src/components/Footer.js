import styles from "../styles/Footer.module.css";
import { images } from "../assets/images";
const Footer = () => {
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
                            viewBox="0 0 50 50"
                        >
                            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
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
                        <div>Quy định đăng tin </div>
                        <div>Chính sách bảo mật</div>
                        <div>Điều khoản sử dụng</div>
                        <div>Giải quyết kiếu nại</div>
                        <div>Thỏa thuận người dùng</div>
                    </div>
                    <div>
                        <h2>Quy địnhDanh mục cho thuê</h2>
                        <div>Nhà cho thuê</div>
                        <div>Phòng cho thuê</div>
                        <div>Nhà chung cư cho thuê</div>
                        <div>Ký túc xá</div>
                        <div>Sleep box cho thuê</div>
                    </div>
                    <div>
                        <h2>Về Simi</h2>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                width="22px"
                                height="22px"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
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
                                stroke-width="1.5"
                                stroke="currentColor"
                                width="22px"
                                height="22px"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
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

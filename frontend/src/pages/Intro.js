import styles from "../styles/Intro.module.css";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { images } from "../assets/images";

function Intro({ onStart }) {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/home");
    };
    return (
        <div>
            <motion.div
                className={styles.container}
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100vh" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                onClick={handleStart}
            >
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.5 }}
                    src={images.logo}
                    alt="Logo"
                    style={{
                        height: "66px",
                        width: "138.58px",
                    }}
                />

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.5 }}
                >
                    Easy Way To Find
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.5 }}
                >
                    Your Perfect Property
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.5 }}
                >
                    Simi là dịch vụ hỗ trợ bạn tìm trọ phù hợp với nhu cầu nhanh
                    chóng, hiệu quả uy tín hàng đầu thế giới, là cầu nối giữa
                    khách hàng với người cho thuê. Hiện nay chúng tôi là đối tác
                    với hơn một triệu khách hàng và không ngừng lớn mạnh hơn
                    nữa, luôn lắng nghe ý kiến từ người dùng để mang đến sự phục
                    vụ tốt nhất.
                </motion.p>

                <motion.button
                    className={styles.button}
                    initial={{ opacity: 0, x: -200 }} // Bắt đầu từ bên trái ngoài màn hình
                    animate={{ opacity: 1, x: 0 }} // Di chuyển vào vị trí ban đầu
                    transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                    onClick={handleStart}
                >
                    Bắt đầu ngay
                </motion.button>
            </motion.div>
        </div>
    );
}

export default Intro;

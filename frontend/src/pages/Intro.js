
import styles from "../styles/Intro.module.css"; // CSS
import background from "../assets/background.png"; // background

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";


function Intro({ onStart }) {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/home"); // Điều hướng sang trang Home
    };
    return (
        <motion.div
          className={styles.container}
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100vh" }} // Hiệu ứng cuộn lên khi rời đi
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.2 }}
          >
            Chào mừng đến với ứng dụng của chúng tôi!
          </motion.h1>
    
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.2 }}
          >
            Khám phá thế giới phim ảnh theo sở thích của bạn.
          </motion.p>
    
          <motion.button
            className={styles.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.2, ease: "easeOut" }}
            onClick={handleStart}
          >
            Bắt đầu ngay
          </motion.button>
        </motion.div>
      );
}

export default Intro;





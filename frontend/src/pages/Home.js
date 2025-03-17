
import styles from "../styles/Intro.module.css"; // CSS
import background from "../assets/background.png"; // background

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";



function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ padding: "20px", textAlign: "center" }}
    >
      <h1>Trang chủ</h1>
      <p>Chào mừng bạn đến với thế giới phim ảnh!</p>
    </motion.div>
  );
}

export default Home;






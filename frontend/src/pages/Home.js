import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";

function Home() {
    return (
        <div>
            <Header />
            <Search />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ padding: "20px", textAlign: "center" }}
            >
                <h1>Trang chủ</h1>
                <p>Chào mừng bạn đến với thế giới phim ảnh!</p>
            </motion.div>
            <Footer />
        </div>
    );
}

export default Home;

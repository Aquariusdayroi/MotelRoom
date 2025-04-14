import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import RoomCard from "../components/RoomCard";
import { images } from "../assets/images";

function Home() {
    const rooms = [
        {
            id: 1,
            images: [
                images.background,
                images.Header || images.background,
                images.logo || images.background,
            ],
            address: "Nhà trọ số 67/4 Cao Thắng, Phường 3",
            location:
                "Quận 3, Thành phố Hồ Chí Minh Quận 3, Thành phố Hồ Chí Minh",
            owner: "Tấn Đạt",
            price: "3.5 triệu",
            type: "Căn hộ, chung cư",
            area: "70m²",
            isNew: true,
        },
    ];

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className={styles.container}>
                    <div className={styles.title}>Danh sách đề cử hàng đầu</div>
                    <div className={styles.grid}>
                        {rooms.map((room) => (
                            <RoomCard key={room.id} {...room} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Home;

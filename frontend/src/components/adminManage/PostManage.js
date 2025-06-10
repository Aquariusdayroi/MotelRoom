
import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import RoomCard from "../rooms/RoomCard";
import styles from "../../styles/OwnerManagement.module.css";
import avatar from "../../assets/img/avt-dat.png";

export default function OwnerPostManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("oldest");

    const [rooms, setRooms] = useState([
        {
            id: 1,
            title: "Phòng trọ quận 1",
            address: { address_name: "123 Đường A, Q1" },
            price: 2500000,
            home_type: "Phòng trọ",
            acreage: 30,
            user: { fullname: "Thịnh", avatar },
            images: [{ image_url: "/img/room1.jpg" }],
            is_favorite: false,
        },
        {
            id: 2,
            title: "Căn hộ mini Bình Thạnh",
            address: { address_name: "456 Đường B, Bình Thạnh" },
            price: 3800000,
            home_type: "Căn hộ mini",
            acreage: 28,
            user: { fullname: "Minh", avatar },
            images: [{ image_url: "/img/room2.jpg" }],
            is_favorite: false,
        },
    ]);

    const toggleFavorite = (id, newValue) => {
        setRooms((prev) =>
            prev.map((room) =>
                room.id === id ? { ...room, is_favorite: newValue } : room
            )
        );
    };

    return (
        <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className={styles.container}>
                    <div className={`${styles.searchBarGroup} mb-3`}>
                        <div className={`d-flex align-items-center ${styles.searchLeft}`} style={{ flex: 1, gap: "10px" }}>
                            <input
                                type="text"
                                className={`form-control ${styles.searchInput}`}
                                placeholder="Tìm theo tên hoặc địa chỉ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button className={styles.btnFind}>Tìm</Button>
                        </div>

                        <div className={`d-flex align-items-center ${styles.searchRight}`} style={{ gap: "10px" }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" className={styles.sortButton}>
                                    Ngày đăng{" "}
                                    {sortOrder === "newest" ? (
                                        <FaChevronUp className={styles.arrow} />
                                    ) : (
                                        <FaChevronDown className={styles.arrow} />
                                    )}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSortOrder("newest")}>Ngày đăng gần đây</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortOrder("oldest")}>Ngày đăng cũ nhất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button className={styles.btnCreatePost}>
                                <FaPlus className="me-1" /> Tạo bài đăng
                            </Button>
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                {...room}
                                isOwnerView={true}
                                onFavoriteToggle={toggleFavorite}
                                onClick={() => {}}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="mt-4 d-flex justify-content-center">
                <Pagination totalPages={2} />
            </div>
        </div>
    );
}

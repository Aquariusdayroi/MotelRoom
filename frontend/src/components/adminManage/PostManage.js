import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import RoomCard from "../rooms/RoomCard";
import styles from "../../styles/PostManage.module.css";
import { useState } from "react";
import avt from "../../assets/img/avt-dat.png"

const OwnerPostManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("oldest");

    // Dummy data (cứng)
    const roomsData = [
        {
            id: 1,
            title: "Phòng trọ quận 1",
            address: { address_name: "123 Đường A, Q1" },
            price: 2500000,
            home_type: "Phòng trọ",
            acreage: 30,
            user: { fullname: "Thịnh", avatar: "/img/avt-dat.png" },
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
            user: { fullname: "Minh", avatar: "/img/avt-dat.png" },
            images: [{ image_url: "/img/room2.jpg" }],
            is_favorite: false,
        },
    ];

    const [data, setData] = useState({ results: roomsData, total_pages: 1 });

    const handleSearchClick = () => {
        // Giả lập chức năng tìm kiếm theo từ khoá
        const filteredData = roomsData.filter(
            (room) =>
                room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.address.address_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setData({ results: filteredData, total_pages: 1 });
    };

    const handleSort = (order) => {
        const sortedData =
            order === "asc"
                ? [...data.results].sort((a, b) => a.price - b.price)
                : [...data.results].sort((a, b) => b.price - a.price);

        setSortOrder(order === "asc" ? "newest" : "oldest");
        setData({ results: sortedData, total_pages: 1 });
    };

    // Dummy function to handle Edit and Delete actions
    const handleEdit = (post) => {
        alert(`Editing post: ${post.title}`);
    };

    const handleDelete = (id) => {
        alert(`Deleting post with ID: ${id}`);
        const updatedRooms = data.results.filter((room) => room.id !== id);
        setData({ results: updatedRooms, total_pages: 1 });
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.container}>
                    <div className={`${styles.searchBarGroup} mb-3`}>
                        <div
                            className={`d-flex align-items-center ${styles.searchLeft}`}
                            style={{ flex: 1, gap: "10px" }}
                        >
                            <div
                                className="position-relative"
                                style={{ flex: 1 }}
                            >
                                <input
                                    type="text"
                                    className={`form-control ${styles.searchInput}`}
                                    placeholder="Tìm theo tên hoặc địa chỉ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSearchClick();
                                    }}
                                />
                            </div>
                            <Button
                                className={styles.btnFind}
                                onClick={handleSearchClick}
                            >
                                Tìm
                            </Button>
                        </div>
                        <div
                            className={`d-flex align-items-center ${styles.searchRight}`}
                            style={{ gap: "10px" }}
                        >
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="outline-secondary"
                                    className={styles.sortButton}
                                >
                                    Ngày đăng{" "}
                                    {sortOrder === "newest" ? (
                                        <FaChevronUp className={styles.arrow} />
                                    ) : (
                                        <FaChevronDown className={styles.arrow} />
                                    )}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => handleSort("asc")}
                                    >
                                        Giá thấp đến cao
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handleSort("desc")}
                                    >
                                        Giá cao đến thấp
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button className={styles.btnCreatePost}>
                                <FaPlus className="me-1" /> Tạo bài đăng
                            </Button>
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {Array.isArray(data?.results) &&
                        data.results.length > 0 ? (
                            data.results.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    {...room}
                                    isOwnerView={true}
                                    onClick={() => alert(`View ${room.title}`)}
                                    onDelete={() => handleDelete(room.id)}
                                    onEdit={() => handleEdit(room)}
                                />
                            ))
                        ) : (
                            <div className="text-center w-100 p-5">
                                Không có bài đăng nào
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            <Pagination totalPages={data?.total_pages} />
        </div>
    );
};

export default OwnerPostManagement;

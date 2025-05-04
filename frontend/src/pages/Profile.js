import { Link } from "react-router-dom";
import Footer from "../layout/components/Footer";
import logo from "../assets/img/logo.png";
import styles from "../styles/Profile.module.css";
import IconAvatarButton from "../components/buttonUI/IconAvatarButton";
import ProfileMenu from "../components/modal/ProfileMenu";
import UserCard from "../components/UserCard";
import RoomCard from "../components/RoomCard";
import { images } from "../assets/images";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCard from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/buttonUI/ButtonPrimary";
import { AlignJustify } from "lucide-react";
function Profile() {
    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate("/home");
    };
    const roomList = [
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
            price: "1.5 triệu",
            type: "Căn hộ, chung cư",
            area: "70m²",
            isNew: true,
        },
        {
            id: 2,
            images: [
                images.background,
                images.Header || images.background,
                images.logo || images.background,
            ],
            address: "Nhà trọ số 67/4 Cao Thắng, Phường 3",
            location:
                "Quận 3, Thành phố Hồ Chí Minh Quận 3, Thành phố Hồ Chí Minh",
            owner: "Tấn Đạt",
            price: "2.5 triệu",
            type: "Căn hộ, chung cư",
            area: "70m²",
            isNew: true,
        },
        {
            id: 3,
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
        {
            id: 4,
            images: [
                images.background,
                images.Header || images.background,
                images.logo || images.background,
            ],
            address: "Nhà trọ số 67/4 Cao Thắng, Phường 3",
            location:
                "Quận 3, Thành phố Hồ Chí Minh Quận 3, Thành phố Hồ Chí Minh",
            owner: "Tấn Đạt",
            price: "4.5 triệu",
            type: "Căn hộ, chung cư",
            area: "70m²",
            isNew: true,
        },
    ];
    const reviews = [
        {
            rating: 1,
            date: "2025-08-16",
            time: "01:11",
            content:
                "Trọ như cức, chủ trọ như cức, làm ăn gian dối. Sớm trả nghiệp, nhắm giữ được cọc thì giữ...",
            location: ".........",
        },
        {
            rating: 1,
            date: "2025-08-16",
            time: "01:11",
            content:
                "Trọ như cức, chủ trọ như cức, làm ăn gian dối. Sớm trả nghiệp, nhắm giữ được cọc thì giữ...",
            location: ".........",
        },
        {
            rating: 1,
            date: "2025-08-16",
            time: "01:11",
            content:
                "Trọ như cức, chủ trọ như cức, làm ăn gian dối. Sớm trả nghiệp, nhắm giữ được cọc thì giữ...",
            location: ".........",
        },
        {
            rating: 1,
            date: "2025-08-16",
            time: "01:11",
            content:
                "Trọ như cức, chủ trọ như cức, làm ăn gian dối. Sớm trả nghiệp, nhắm giữ được cọc thì giữ...",
            location: ".........",
        },
    ];
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 2;
    const [direction, setDirection] = useState(1);
    const handlePrev = () => {
        setStartIndex((prev) =>
            prev - itemsPerPage < 0
                ? roomList.length - itemsPerPage
                : prev - itemsPerPage
        );
    };
    const [showAllReviews, setShowAllReviews] = useState(false); // State để kiểm soát hiển thị review

    const toggleReviews = () => {
        setShowAllReviews((prev) => !prev); // Đảo ngược trạng thái
    };
    const reviewsToDisplay = showAllReviews ? reviews : reviews.slice(0, 3); // Hiển thị tất cả hoặc chỉ 3 review

    const handleNext = () => {
        setStartIndex((prev) => (prev + itemsPerPage) % roomList.length);
    };
    const visibleRooms = roomList.slice(startIndex, startIndex + itemsPerPage);
    const displayRooms =
        visibleRooms.length < itemsPerPage
            ? [
                  ...visibleRooms,
                  ...roomList.slice(0, itemsPerPage - visibleRooms.length),
              ]
            : visibleRooms;
    return (
        <div>
            <header className={styles.header}>
                <Link to="/home" className="logo">
                    <img src={logo} alt="Logo" />
                </Link>
                {/* <ProfileMenu
                    button={
                        <IconAvatarButton
                            icon={true}
                            avatar={logo}
                            onClick={() => console.log("Button clicked!")}
                        />
                    }
                >
                    <ul className={styles.menuList}>
                        <li>Tài khoản</li>
                        <li>Thông báo</li>
                        <li>Tin nhắn</li>
                        <li>Yêu thích</li>
                        <li>Đối tác</li>
                        <hr className="bg-white" style={{ height: "2px" }} />
                        <li>Tìm phòng</li>
                        <li>Điều khoản</li>
                        <li>Chính sách</li>
                        <li>Liên hệ</li>
                    </ul>
                </ProfileMenu> */}
                <ButtonPrimary
                    icon={<AlignJustify size={34} />}
                    avatar={true}
                    className={`${styles.buttonAvatar}`}
                />
            </header>
            <div className={styles.profileContainer}>
                <div className={styles.profileContent}>
                    <UserCard></UserCard>
                    <div className="p-3 rounded mt-3">
                        <h5 className="fw-bold mb-3">Thông tin về Đất</h5>
                        <p
                            style={{
                                whiteSpace: "pre-wrap",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                marginBottom: "1rem",
                                height: "100%",
                            }}
                        >
                            Phần{"\n"}này{"\n"}tự{"\n"}mô{"\n"}tả{"\n"}bản{"\n"}
                            thân
                        </p>
                        <div className="d-flex gap-2">
                            <button className="btn btn-info text-white">
                                Nhắn tin
                            </button>
                            <button className="btn btn-danger">Báo cáo</button>
                        </div>
                    </div>
                </div>
                <div className={styles.rentalSection}>
                    <div
                        className="d-flex align-items-center justify-content-between mb-3 px-3"
                        style={{ gap: "1rem" }}
                    >
                        <h5 className="fw-bold m-0">Mục cho thuê của Đắt</h5>
                        <motion.button
                            className="btn btn-info text-white px-3"
                            transition={{
                                duration: 0.5,
                                delay: 0.8,
                                ease: "easeOut",
                            }}
                            onClick={handleBackToHome}
                        >
                            Đến trang quản lý
                        </motion.button>
                        <div
                            className="d-flex align-items-center"
                            style={{ gap: "0.5rem" }}
                        >
                            <button
                                className="btn btn-outline-dark rounded-circle p-2 d-flex align-items-center justify-content-center"
                                style={{ width: "36px", height: "36px" }}
                                onClick={handlePrev}
                            >
                                <FaChevronLeft size={14} />
                            </button>

                            <button
                                className="btn btn-outline-dark rounded-circle p-2 d-flex align-items-center justify-content-center"
                                style={{ width: "36px", height: "36px" }}
                                onClick={handleNext}
                            >
                                <FaChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column">
                        <div className={styles.sliderWrapper}>
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={startIndex}
                                    className={styles.motionWrapper}
                                    initial={{
                                        opacity: 0,
                                        x: direction > 0 ? 100 : -100,
                                    }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{
                                        opacity: 0,
                                        x: direction > 0 ? -100 : 100,
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {displayRooms.map((room) => (
                                        <div
                                            className={styles.cardWrapper}
                                            key={room.id}
                                        >
                                            <RoomCard {...room} />
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="d-flex align-items-center"
                style={{ padding: "0 2%" }}
            >
                <h5 className="fw-bold text-dark m-0">Đánh giá về Đắt</h5>
                <span
                    className="fst-italic text-dark ms-3"
                    style={{ cursor: "pointer" }}
                    onClick={toggleReviews} // Gắn sự kiện click
                >
                    {showAllReviews ? "Thu gọn" : "Xem toàn bộ"}
                </span>
            </div>
            <div
                className="d-flex"
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    alignItems: "stretch",
                    gap: "16px",
                    margin: "16px",
                    flexWrap: "wrap",
                }}
            >
                {reviewsToDisplay.map((review, index) => (
                    <div
                        key={index}
                        style={{
                            flex: "1 1 calc(33.333% - 16px)",
                            minWidth: "250px", // Giới hạn tối đa 500px
                            wordWrap: "break-word",
                            maxWidth: "calc(33.333% - 16px)",
                            whiteSpace: "pre-wrap",
                            overflowWrap: "break-word",
                            borderRadius: "8px",
                            padding: "12px",
                        }}
                    >
                        <ReviewCard {...review} />
                    </div>
                ))}
            </div>

            <Footer></Footer>
        </div>
    );
}

export default Profile;

import Footer from "../layout/components/Footer";
import styles from "../styles/Profile.module.css";
import UserCard from "../components/UserCard";
import RoomCard from "../components/rooms/RoomCard";
import { images } from "../assets/images";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCard from "../components/reviews/ReviewCard";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/buttonUI/ButtonPrimary";
import { AuthToken } from "../authToken";
import axiosClient from "../api/axiosClient";
import RoomProfile from "../components/rooms/RoomProfile";

function Profile() {
    const { role } = useContext(AuthToken);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate("/post");
    };
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
                ? rooms.length - itemsPerPage
                : prev - itemsPerPage
        );
    };
    const [showAllReviews, setShowAllReviews] = useState(false); // State để kiểm soát hiển thị review

    const toggleReviews = () => {
        setShowAllReviews((prev) => !prev); // Đảo ngược trạng thái
    };
    const reviewsToDisplay = showAllReviews ? reviews : reviews.slice(0, 3); // Hiển thị tất cả hoặc chỉ 3 review

    const handleNext = () => {
        setStartIndex((prev) => (prev + itemsPerPage) % rooms.length);
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                let response;
                if (role === "user") {
                    response = await axiosClient.get("/user/api/my-favorite/");
                    setRooms(response.data.results);
                } else if (role === "owner") {
                    // có api thì đổi lại
                    response = await axiosClient.get("/owner/api/my-posts/");
                    setRooms(response.data.results);
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (role) {
            fetchRooms();
        }
    }, [role]);

    const renderContent = () => (
        <RoomProfile
            loading={loading}
            error={error}
            rooms={rooms}
            role={role}
            startIndex={startIndex}
            direction={direction}
        />
    );

    return (
        <div>
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
                        {role === "owner" ? (
                            <>
                                <h5 className="fw-bold m-0">
                                    Mục cho thuê của bạn
                                </h5>
                                <ButtonPrimary
                                    des="Đến trang quản lý"
                                    className={styles.buttonManage}
                                    onClick={handleBackToHome}
                                />
                            </>
                        ) : role === "user" ? (
                            <h5 className="fw-bold m-0">
                                Các mục yêu thích của bạn
                            </h5>
                        ) : null}

                        {rooms.length > 0 && (
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
                        )}
                    </div>
                    {renderContent()}
                </div>
            </div>
            <div
                className="d-flex align-items-center"
                style={{ padding: "0 2%" }}
            >
                <h5 className="fw-bold text-dark m-0">
                    {role === "user"
                        ? "Đánh giá của tôi"
                        : role === "owner"
                        ? "Đánh giá bài viết của tôi"
                        : "Đánh giá về Đắt"}
                </h5>
                <span
                    className="fst-italic text-dark ms-3"
                    style={{ cursor: "pointer" }}
                    onClick={toggleReviews}
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
                            minWidth: "250px",
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

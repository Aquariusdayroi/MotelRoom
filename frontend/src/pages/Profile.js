import styles from "../styles/Profile.module.css";
import UserCard from "../components/UserCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import ReviewCard from "../components/reviews/ReviewCard";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/buttonUI/ButtonPrimary";
import { AuthToken } from "../authToken";
import axiosClient from "../api/axiosClient";
import RoomProfile from "../components/rooms/RoomProfile";
import {
    CalendarDate,
    EnvelopeFill,
    GeoAltFill,
    Pencil,
    PersonCircle,
    PersonFill,
    PhoneFill,
    SignpostSplitFill,
    TelephoneInboundFill,
} from "react-bootstrap-icons";
import { Building } from "lucide-react";
import decodeJwtPayload from "../until/decodeJwt";
import { getUserInfoById } from "../api/userApi/getUserInfoById";
import SettingProfileModal from "../components/modal/SettingProfileModal";

function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const { role } = useContext(AuthToken);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthToken);
    const [showEditModal, setShowEditModal] = useState(false);
    const handleOpenModal = () => setShowEditModal(true);
    const handleCloseModal = () => setShowEditModal(false);

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
    const [showAllReviews, setShowAllReviews] = useState(false);

    const toggleReviews = () => {
        setShowAllReviews((prev) => !prev);
    };
    const reviewsToDisplay = showAllReviews ? reviews : reviews.slice(0, 3);

    const handleNext = () => {
        setStartIndex((prev) => (prev + itemsPerPage) % rooms.length);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "Chưa cập nhật";
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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
                    // response = await axiosClient.get("/owner/api/my-posts/");
                    // setRooms(response.data.results);
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

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user) {
                try {
                    const decoded = decodeJwtPayload(user);
                    const info = await getUserInfoById(decoded.user_id);
                    setUserInfo(info);
                    console.log(info);
                } catch (error) {
                    console.error("Không thể lấy thông tin người dùng:", error);
                }
            }
        };

        fetchUserInfo();
    }, [user]);

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
                    <UserCard
                        avatar={userInfo?.avatar}
                        name={userInfo?.fullname}
                        start={"2.4"}
                        totalComment={"12 đánh giá"}
                        year={"2"}
                    ></UserCard>
                    <div className="p-3 rounded mt-3">
                        <div className=" ">
                            <div className={`${styles.groupHover} d-flex`}>
                                <h5
                                    className="fw-bold mb-3 d-flex align-items-center"
                                    style={{
                                        color: "var(--text-primary-color)",
                                        cursor: "pointer",
                                    }}
                                >
                                    <PersonCircle className="me-2 " /> Thông tin
                                    cá nhân
                                </h5>
                                <div
                                    className={styles.hoverIcon}
                                    style={{
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Pencil onClick={handleOpenModal} />
                                </div>
                            </div>
                            <ul className="list-unstyled mb-4 ps-3">
                                <li className="mb-2 d-flex align-items-center">
                                    <PersonFill className="me-2 text-secondary" />
                                    <b>Họ và tên:</b>
                                    {userInfo?.fullname || "Chưa cập nhật"}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <GeoAltFill className="me-2 text-secondary" />
                                    <b>Địa chỉ: </b>
                                    {userInfo?.address_name || "Chưa cập nhật"}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <SignpostSplitFill className="me-2 text-secondary" />
                                    <b>Tên đường:</b>
                                    {userInfo?.district_name || "Chưa cập nhật"}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <Building className="me-2 text-secondary" />
                                    <b>Thành phố:</b>
                                    {userInfo?.city_name || "Chưa cập nhật"}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <CalendarDate className="me-2 text-secondary" />
                                    <b>Sinh nhật:</b>{" "}
                                    {formatDate(userInfo?.birthday)}
                                </li>
                            </ul>

                            <div className={`${styles.groupHover} d-flex`}>
                                <h5
                                    className="fw-bold mb-3 d-flex align-items-center"
                                    style={{
                                        color: "var(--text-primary-color)",
                                        cursor: "pointer",
                                    }}
                                >
                                    <TelephoneInboundFill className="me-2" />
                                    Thông tin liên hệ
                                </h5>
                                <div
                                    className={styles.hoverIcon}
                                    style={{
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Pencil onClick={handleOpenModal} />
                                </div>
                            </div>
                            <ul className="list-unstyled ps-3">
                                <li className="mb-2 d-flex align-items-center">
                                    <EnvelopeFill className="me-2 text-secondary" />
                                    <b>Email:</b>
                                    {userInfo?.email}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <PhoneFill className="me-2 text-secondary" />
                                    <b>SĐT:</b>
                                    {userInfo?.phone_number || "Chưa cập nhật"}
                                </li>
                            </ul>
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
                style={{ padding: "30px 2%" }}
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
            <SettingProfileModal
                show={showEditModal}
                onHide={handleCloseModal}
                userInfo={userInfo}
            />
        </div>
    );
}

export default Profile;

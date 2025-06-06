import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoomCard from "../rooms/RoomCard";
import styles from "../../styles/Profile.module.css";
import { images } from "../../assets/images";
import { useNavigate } from "react-router-dom";

const RoomProfile = ({
    loading,
    error,
    rooms,
    role,
    startIndex,
    direction,
}) => {
    console.log("Rooms received:", rooms);
    const navigate = useNavigate();

    const handleCardClick = (roomId) => {
        navigate(`/detail/${roomId}`);
    };
    if (loading) {
        return (
            <div className="text-center p-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!Array.isArray(rooms) || rooms.length === 0) {
        return (
            <div className="text-center">
                <h6 className="text-muted">
                    {role === "user" ? (
                        <div
                            className="d-flex flex-column align-items-center justify-content-center w-100"
                            style={{
                                backgroundColor: "#ECECEC",
                                borderRadius: "12px",
                                height: "500px",
                            }}
                        >
                            <img
                                src={images.noRentalPost}
                                alt="No favorite posts"
                                className="mb-3"
                            />
                            <p className="mb-0 fw-semibold text-muted d-flex justify-content-center align-items-center">
                                Bạn chưa có bài yêu thích nào
                            </p>
                        </div>
                    ) : (
                        <div
                            className="d-flex flex-column align-items-center justify-content-center w-100"
                            style={{
                                backgroundColor: "#ECECEC",
                                borderRadius: "12px",
                                height: "500px",
                            }}
                        >
                            <img
                                src={images.noRentalPost}
                                alt="No favorite posts"
                                className="mb-3"
                            />
                            <p className="mb-0 fw-semibold text-muted d-flex justify-content-center align-items-center">
                                Bạn chưa có bài đăng nào
                            </p>
                        </div>
                    )}
                </h6>
            </div>
        );
    }

    return (
        <div className="container-fluid p-0">
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
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {rooms.map((room) => (
                                <div className="col" key={room.id}>
                                    <div className={styles.cardWrapper}>
                                        <RoomCard
                                            id={room.id}
                                            title={room.title}
                                            address={room.address}
                                            user={room.user}
                                            price={room.price}
                                            home_type={room.home_type}
                                            acreage={room.acreage}
                                            images={room.images}
                                            is_favorite={room.is_favorite}
                                            onClick={() =>
                                                handleCardClick(room.id)
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RoomProfile;

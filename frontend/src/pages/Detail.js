import { useEffect, useState } from "react";
import styles from "../styles/Detail.module.css";
import { useParams } from "react-router-dom";
import Reviews from "../components/reviews/Reviews";
import axiosClient from "../api/axiosClient";
import RoomDetail from "../components/RoomDetail";

function Detail({ roomData = null, showAction = true, showReviews = true }) {
    const { roomId } = useParams();
    const [room, setRoom] = useState(roomData || {});
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(!roomData);

    useEffect(() => {
        if (roomData) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const roomRes = await axiosClient.get(
                    `/rental_post/api/${roomId}/`
                );
                const reviewsRes = await axiosClient.get(
                    `/rental_post/api/by-posts/${roomId}/reviews/`
                );

                setRoom(roomRes.data.data);
                setReviews(reviewsRes.data.data);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết phòng:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [roomId, roomData]);

    return (
        <div className={styles.container}>
            {!loading && (
                <>
                    <RoomDetail
                        room={room}
                        reviews={reviews}
                        showAction={showAction}
                    />
                    {showReviews && (
                        <div className="row">
                            <div className="col-6">
                                <Reviews data={reviews} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Detail;

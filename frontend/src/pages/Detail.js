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
    const [myReview, setMyReview] = useState(null);
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
                let myReviewRes = null;
                try {
                    myReviewRes = await axiosClient.get(
                        `/rental_post/api/by-posts/${roomId}/review/`
                    );
                } catch (e) {
                    myReviewRes = null;
                }
                setRoom(roomRes.data.data);
                setReviews(reviewsRes.data.data);
                setMyReview(myReviewRes?.data?.data || null);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết phòng:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [roomId, roomData]);

    const handleReviewSubmit = async ({ rating, comment }) => {
        try {
            if (myReview) {
                // update
                await axiosClient.put(`/rental_post/api/by-posts/${roomId}/review/`, { rating, comment });
            } else {
                // create
                await axiosClient.post(`/rental_post/api/by-posts/${roomId}/review/`, { rating, comment });
            }
            // reload reviews
            const reviewsRes = await axiosClient.get(`/rental_post/api/by-posts/${roomId}/reviews/`);
            const myReviewRes = await axiosClient.get(`/rental_post/api/by-posts/${roomId}/review/`);
            setReviews(reviewsRes.data.data);
            setMyReview(myReviewRes.data.data);
        } catch (e) {
            alert("Có lỗi khi gửi đánh giá!");
        }
    };

    const handleReviewDelete = async () => {
        try {
            await axiosClient.delete(`/rental_post/api/by-posts/${roomId}/review/`);
            // reload reviews
            const reviewsRes = await axiosClient.get(`/rental_post/api/by-posts/${roomId}/reviews/`);
            setReviews(reviewsRes.data.data);
            setMyReview(null);
        } catch (e) {
            alert('Có lỗi khi xóa đánh giá!');
        }
    };

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
                            <div className="col-lg-6 col-md-12">
                                <Reviews data={reviews} myReview={myReview} onReviewSubmit={handleReviewSubmit} onReviewDelete={handleReviewDelete} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Detail;

import Comment from "./Comment";
import React, { useState } from "react";

function Reviews({ data }) {
    const [showAll, setShowAll] = useState(false);
    const initialCommentCount = 2;

    if (!data || data.length === 0) {
        return (
            <div className="my-3">
                <h5 className="mb-3">Đánh giá</h5>
                <p>Chưa có đánh giá nào.</p>
            </div>
        );
    }

    const commentsToShow = showAll ? data : data.slice(0, initialCommentCount);

    return (
        <div className="my-3">
            <h5 className="mb-3">Đánh giá</h5>
            {commentsToShow.map((item, index) => (
                <Comment key={index} comment={item} />
            ))}

            {data.length > initialCommentCount && (
                <button
                    className="btn btn-outline-primary d-block mt-4"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Ẩn bớt đánh giá" : `Hiển thị tất cả đánh giá`}
                </button>
            )}
        </div>
    );
}

export default Reviews;

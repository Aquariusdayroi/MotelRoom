import Comment from './Comment';
import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

function Reviews({ data, myReview, onReviewSubmit }) {
    const [showAll, setShowAll] = useState(false);
    const initialCommentCount = 2;

    return (
        <div className="my-3">
            <h5 className="mb-3">Đánh giá</h5>
            <ReviewForm myReview={myReview} onReviewSubmit={onReviewSubmit} />
            {(!data || data.length === 0) ? (
                <p>Chưa có đánh giá nào.</p>
            ) : (
                <>
                    {(showAll ? data : data.slice(0, initialCommentCount)).map((item) => (
                        <Comment key={item.id} comment={item} />
                    ))}
                    {data.length > initialCommentCount && (
                        <button className="btn btn-outline-primary d-block mt-4" onClick={() => setShowAll(!showAll)}>
                            {showAll ? 'Ẩn bớt đánh giá' : `Hiển thị tất cả đánh giá`}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default Reviews;

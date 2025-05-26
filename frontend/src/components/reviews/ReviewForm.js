import React, { useState } from 'react';
import { Rating, TextField, Button } from '@mui/material';

function ReviewForm({ myReview, onReviewSubmit, onDelete }) {
    const [rating, setRating] = useState(myReview ? myReview.rating : 0);
    const [comment, setComment] = useState(myReview ? myReview.comment : '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !comment) return;
        setLoading(true);
        await onReviewSubmit({ rating, comment });
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
            <div className="mb-2">
                <span className="me-2">Chọn mức đánh giá:</span>
                <Rating
                    name="rating"
                    value={Number(rating)}
                    precision={0.5}
                    onChange={(_, value) => setRating(value)}
                />
            </div>
            <div className="mb-2">
                <TextField
                    label="Tiêu đề đánh giá"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={4}
                />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || !rating || !comment}
                >
                    {myReview ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}
                </Button>
                {myReview && onDelete && (
                    <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        disabled={loading}
                        onClick={onDelete}
                    >
                        Xóa đánh giá
                    </Button>
                )}
            </div>
        </form>
    );
}

export default ReviewForm; 
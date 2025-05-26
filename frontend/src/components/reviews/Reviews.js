import Comment from './Comment';
import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Reviews({ data, myReview, onReviewSubmit, onReviewDelete }) {
    const [showAll, setShowAll] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const initialCommentCount = 2;

    const displayReviews = myReview ? [myReview, ...data] : data;

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    return (
        <div className="my-3">
            <div className="d-flex align-items-center justify-content">
                <h5 className="mb-0">Đánh giá</h5>
                {myReview && !showEditForm && (
                    <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() => setShowEditForm(true)}
                    >
                        Đánh giá của tôi
                    </button>
                )}
            </div>
            {!myReview && <ReviewForm myReview={null} onReviewSubmit={onReviewSubmit} />}
            {myReview && showEditForm && (
                <div className="mb-2">
                    <ReviewForm
                        myReview={myReview}
                        onReviewSubmit={async (data) => {
                            await onReviewSubmit(data);
                            setShowEditForm(false);
                        }}
                        onDelete={async () => {
                            if (window.confirm('Bạn có chắc muốn xóa đánh giá của mình?')) {
                                try {
                                    await onReviewDelete();
                                    setShowEditForm(false);
                                    showSnackbar('Xóa đánh giá thành công!', 'success');
                                } catch (e) {
                                    showSnackbar('Xóa đánh giá thất bại!', 'error');
                                }
                            }
                        }}
                    />
                    <button
                        className="btn btn-link p-0 mt-2"
                        onClick={() => setShowEditForm(false)}
                    >
                        Hủy
                    </button>
                </div>
            )}
            {(!displayReviews || displayReviews.length === 0) ? (
                <p>Chưa có đánh giá nào.</p>
            ) : (
                <>
                    {(showAll ? displayReviews : displayReviews.slice(0, initialCommentCount)).map((item) => (
                        <Comment key={item.id} comment={item} />
                    ))}
                    {displayReviews.length > initialCommentCount && (
                        <button className="btn btn-outline-primary d-block mt-4" onClick={() => setShowAll(!showAll)}>
                            {showAll ? 'Ẩn bớt đánh giá' : `Hiển thị tất cả đánh giá`}
                        </button>
                    )}
                </>
            )}
            {/* Snackbar thông báo */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={2000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default Reviews;

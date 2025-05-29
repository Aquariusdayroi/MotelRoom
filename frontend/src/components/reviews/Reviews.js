import Comment from './Comment';
import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

function Reviews({ data, myReview, onReviewSubmit, onReviewDelete }) {
    const [showAll, setShowAll] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const initialCommentCount = 2;

    const displayReviews = myReview ? [myReview, ...data] : data;

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
                    <ReviewForm myReview={myReview} onReviewSubmit={async (data) => {
                        await onReviewSubmit(data);
                        setShowEditForm(false);
                    }} onDelete={() => setOpenDeleteDialog(true)} />
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
            {/* Dialog xác nhận xóa đánh giá */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>Xác nhận xóa đánh giá</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa đánh giá của mình không? Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Hủy
                    </Button>
                    <Button
                        onClick={async () => {
                            try {
                                await onReviewDelete();
                                setShowEditForm(false);
                                setOpenDeleteDialog(false);
                                toast.success('Xóa đánh giá thành công!');
                            } catch (e) {
                                toast.error('Xóa đánh giá thất bại!');
                            }
                        }}
                        color="error"
                        variant="contained"
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Reviews;

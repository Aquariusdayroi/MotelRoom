import { Rating } from '@mui/material';
import Avatar from '../Avatar';
import { useState } from 'react';

function Comment({ comment }) {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 180;
    const commentText = comment.comment || '';
    const isLongComment = commentText.length > maxLength;

    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <div className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-2">
                <Avatar src={comment.user?.avatar} />
                <div>
                    <div className="fw-semibold">{comment.user}</div>
                    <Rating name="read-only" size="small" value={comment.rating} precision={0.5} readOnly />
                    <div className="text-muted lh-1" style={{ fontSize: '12px' }}>
                        {new Date(comment.time).toLocaleString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>
                </div>
            </div>
            <div className="text-muted mb-2">
                {isLongComment && !expanded ? commentText.substring(0, maxLength) + '...' : commentText}
                {isLongComment && (
                    <button className="btn btn-link btn-sm p-0 d-block text-black mt-1" onClick={toggleExpanded}>
                        {expanded ? 'Ẩn bớt' : 'Hiển thị thêm'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Comment;

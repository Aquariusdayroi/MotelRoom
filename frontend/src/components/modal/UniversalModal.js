const icons = {
    success: (
        <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="32" fill="#28d17c" opacity="0.2" />
            <circle cx="32" cy="32" r="28" fill="#28d17c" />
            <path d="M20 34l8 8 16-16" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    error: (
        <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="32" fill="#f53d3d" opacity="0.15" />
            <circle cx="32" cy="32" r="28" fill="#f53d3d" />
            <path d="M24 24l16 16M40 24L24 40" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
    ),
};

const bgColors = {
    success: '#28d17c',
    error: '#f53d3d',
};

function UniversalModal({
    show,
    onClose,
    type = 'success', // "success" or "error"
    title,
    message,
    buttonText,
}) {
    // Default texts
    const defaultTitles = {
        success: 'Thành công!',
        error: 'Lỗi!',
    };

    const defaultMessages = {
        success: 'Thao tác đã hoàn tất.',
        error: 'Đã xảy ra lỗi, vui lòng thử lại.',
    };

    const defaultBtn = {
        success: 'Đóng',
        error: 'Đã hiểu',
    };

    return (
        <div
            className={`modal fade ${show ? 'show d-block' : ''}`}
            tabIndex="-1"
            style={{
                background: show ? 'rgba(0,0,0,0.4)' : 'transparent',
                transition: 'background 0.3s',
            }}
            onClick={onClose}
        >
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content border-0 shadow rounded-4">
                    <div className="modal-body text-center p-5">
                        <div className="mb-4">{icons[type]}</div>
                        <h4 className="mb-2" style={{ color: bgColors[type] }}>
                            {title || defaultTitles[type]}
                        </h4>
                        <div className="text-muted mb-4">{message || defaultMessages[type]}</div>
                        <button
                            className={`btn rounded-pill px-4 py-2 m-0 lh-1`}
                            style={{
                                background: bgColors[type],
                                color: '#fff',
                                minWidth: 100,
                            }}
                            onClick={onClose}
                        >
                            {buttonText || defaultBtn[type]}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UniversalModal;

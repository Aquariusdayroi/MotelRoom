import { images } from "../../assets/images";
import styles from "../../styles/Login.module.css";

const NotifyModal = ({
    isOpen,
    onClose,
    title = "Thông báo",
    message = "",
}) => {
    if (!isOpen) return null;

    return (
        <div
            className={`${styles.modal} modal show d-block`}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className={`${styles.modalContent} modal-content`}>
                    <div className="modal-header border-bottom-0">
                        <h5
                            className="modal-title fw-bold"
                            style={{ color: "var(--text-primary-color)" }}
                        >
                            {title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center py-4">
                        <div className="mb-4">
                            <i
                                className="bi bi-exclamation-circle text-danger"
                                style={{ fontSize: "3rem" }}
                            ></i>
                        </div>
                        <img
                            src={images.notFound}
                            alt="Notification"
                            className="mb-4 w-50"
                        />
                        <div className="mb-0">{message}</div>
                    </div>
                    <div className="modal-footer border-top-0 justify-content-center">
                        <button
                            type="button"
                            className="btn btn-danger px-4 py-2 rounded-5"
                            onClick={onClose}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotifyModal;

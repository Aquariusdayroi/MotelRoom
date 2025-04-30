import styles from '../styles/ContactCard.module.css';
import callIcon from '../assets/img/call_icon.png';
import zaloIcon from '../assets/img/zalo_icon.png';
import mapsIcon from '../assets/img/maps_icon.png';

function ContactCard({ price, onCall, onZalo, onMaps }) {
    return (
        <div className={`${styles.wrapper} rounded-4 border shadow-sm p-4 text-center`}>
            <div className="d-flex flex-column align-items-center gap-3">
                <div className="mb-2">
                    Giá chỉ từ: <span className="fw-bold fs-4">{price / 1000000} triệu / tháng</span>
                </div>
                <button
                    type="button"
                    className={`${styles.call} d-flex align-items-center justify-content-center gap-2 rounded-5 w-100`}
                    onClick={onCall}
                >
                    <img src={callIcon} alt="Call" />
                    <span>Liên hệ chủ trọ</span>
                </button>
                <button
                    type="button"
                    className={`${styles.zalo} d-flex align-items-center justify-content-center gap-2 rounded-5 w-100`}
                    onClick={onZalo}
                >
                    <img src={zaloIcon} alt="Zalo" />
                    <span>Liên hệ qua Zalo</span>
                </button>
                <button
                    type="button"
                    className={`${styles.maps} d-flex align-items-center justify-content-center gap-2 rounded-5 w-100`}
                    onClick={onMaps}
                >
                    <img src={mapsIcon} alt="Google Maps" />
                    <span>Xem trên Google Maps</span>
                </button>
            </div>
        </div>
    );
}

export default ContactCard;

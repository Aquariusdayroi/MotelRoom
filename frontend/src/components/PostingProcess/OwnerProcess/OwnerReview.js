import styles from '../../../styles/OwnerReview.module.css';
import { images } from '../../../assets/images';
import RoomCard from '../../rooms/RoomCard';
import { Link } from 'react-router-dom';

function OwnerReview({ data }) {
    return (
        <>
            <div className="row g-5 py-5">
                <div className="col-6 border-end" style={{ paddingRight: '80px' }}>
                    <h3 className="fw-bold mb-5 text-center">Hồ sơ của bạn đang được duyệt</h3>
                    <div className={styles.pendingImage}>
                        <img
                            src={images.profilePending}
                            alt="profile_pending"
                            className="img-fluid"
                            style={{ width: '55%' }}
                        />
                    </div>
                    <p className="w-100 m-0 mt-4 fs-5 text-center">
                        Hồ sơ của bạn sẽ được duyệt trong <span className="fw-bold">1-3 ngày</span>. Vui lòng đợi thông
                        báo qua qua email hoặc trên trang web.
                    </p>
                </div>
                <div className="col-6" style={{ paddingLeft: '80px' }}>
                    <h5 className="fw-bold mb-5">
                        Bài đăng của bạn sẽ được hiển thị ngay sau khi hồ sơ của bạn được duyệt
                    </h5>
                    <div style={{ maxWidth: '300px' }}>
                        <RoomCard {...data} showFavoriteButton={false} />
                    </div>
                </div>
            </div>
            <div className="d-flex aling-items-center justify-content-end my-5">
                <Link to="/home" className="text-decoration-none">
                    <button type="button" className="next-btn">
                        Quay về trang chủ
                    </button>
                </Link>
            </div>
        </>
    );
}

export default OwnerReview;

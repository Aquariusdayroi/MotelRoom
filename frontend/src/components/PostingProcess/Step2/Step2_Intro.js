import '../../../styles/Step1_Intro.css';
import room from '../../../assets/img/room.png';
import ProgressBar from '../ProgressBar';

function Step2_UploadImages({ onNext, onBack }) {
    return (
        <div className="basic-info-form">
            <ProgressBar currentStep={2} />

            <div className="content">
                <div className="box-content">
                    <h2>Bước 2</h2>
                    <h1>Thêm ảnh cho chỗ ở của bạn</h1>
                    <p>
                        Ở bước này, bạn cần cung cấp các hình ảnh hoặc video giúp cung cấp cái nhìn trực quan cho khách
                        hàng về chỗ ở của bạn.
                    </p>
                </div>
                <div className="box-img w-100">
                    <img src={room} alt="room" className="img-fluid w-100" />
                </div>
            </div>
            <div className="buttons">
                <button className="back-btn" onClick={() => onBack({})}>
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                </button>
                <button className="ms-auto next-btn" onClick={() => onNext({})}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step2_UploadImages;

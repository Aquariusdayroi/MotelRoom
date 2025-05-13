import room from '../../../assets/img/room.png';
import ProgressBar from '../ProgressBar';

function Step4_Intro({ onNext, onBack }) {
    return (
        <div>
            <ProgressBar currentStep={4} />

            <div className="row g-5">
                <div className="col-6">
                    <h3 className="fw-medium mb-3">Bước 4</h3>
                    <h2 className="fw-bold mb-4">Xem lại bài đăng của bạn</h2>
                    <p className="w-100">Xem lại bài đăng của bạn để đảm bảo không có sai sót hay nhầm lẫn.</p>
                </div>
                <div className="col-6">
                    <div className="w-100" style={{ aspectRatio: '4/3' }}>
                        <img src={room} alt="Room preview" className="img-fluid w-100 h-100" />
                    </div>
                </div>
            </div>

            <div className="d-flex aling-items-center justify-content-between my-5">
                <button className="back-btn" onClick={onBack}>
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                </button>
                <button className="next-btn" onClick={onNext}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step4_Intro;

import '../../../styles/Step1_Intro.css';
import room from '../../../assets/img/room.png';
import ProgressBar from '../ProgressBar';

function Step4_Intro({ onNext, onBack }) {
    return (
        <div className="basic-info-form">
            <ProgressBar currentStep={4} />

            <div className="content">
                <div className="box-content">
                    <h2>Bước 4</h2>
                    <h1>Xem lại bài đăng của bạn</h1>
                    <p>Xem lại bài đăng của bạn để đảm bảo không có sai sót hay nhầm lẫn.</p>
                </div>
                <div className="box-img w-100">
                    <img src={room} alt="room" className="img-fluid w-100" />
                </div>
            </div>
            <div className="buttons">
                <button className="back-btn" onClick={() => onBack({})}>
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                </button>
                <button className="next-btn" onClick={() => onNext({})}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step4_Intro;

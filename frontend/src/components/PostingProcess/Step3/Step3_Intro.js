import '../../../styles/Step1_Intro.css';
import room from '../../../assets/img/room.png';
import ProgressBar from '../ProgressBar';

function Step3_Intro({ onNext, onBack }) {
    return (
        <div className="basic-info-form">
            <ProgressBar currentStep={3} />

            <div className="content">
                <div className="box-content">
                    <h2>Bước 3</h2>
                    <h1>Làm cho chỗ ở của bạn trở nên nổi bật</h1>
                    <p>
                        Ở bước này, bạn sẽ thêm một số tiện nghi được cung cấp tại chỗ ở của bạn, cùng với 5 bức ảnh
                        lớn. Sau đó, bạn sẽ soạn tiêu đề, nội dung mô tả và mức giá mong muốn cho chỗ ở của bạn.
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
                <button className="next-btn" onClick={() => onNext({})}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step3_Intro;

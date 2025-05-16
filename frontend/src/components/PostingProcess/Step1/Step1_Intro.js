import room from '../../../assets/img/room.png';
import '../../../styles/Step1_Intro.css';
import ProgressBar from '../ProgressBar';

function Step1_Intro({ onNext }) {
    return (
        <div className="basic-info-form">
            <ProgressBar currentStep={1} />

            <div className="content">
                <div className="box-content">
                    <h2>Bước 1</h2>
                    <h1>Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi</h1>
                    <p>
                        Trong bước này, chúng tôi sẽ hỏi xem bạn cho thuê loại chỗ ở nào và bạn muốn cho khách đặt toàn
                        bộ nhà hay chỉ một phòng cụ thể. Sau đó, hãy cho chúng tôi biết vị trí và số lượng khách có thể
                        ở tại đó.
                    </p>
                </div>
                <div className="box-img w-100">
                    <img src={room} alt="room" className="img-fluid w-100" />
                </div>
            </div>
            <div className="buttons">
                <button className="ms-auto next-btn" onClick={() => onNext({})}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step1_Intro;

import RoomDetail from '../../RoomDetail';
import ProgressBar from '../ProgressBar';

function Step4_ReviewAndSubmit({ data, onBack, onSubmit }) {
    return (
        <div>
            <ProgressBar currentStep={4} />
            <div className="mb-5">
                <h4 className="text-center fw-bold">Xem trước bài viết</h4>
                <p className="text-center w-100 text-muted">
                    Xem lại bài đăng của bạn để đảm bảo không có sai sót hay nhầm lẫn. Nếu bạn thấy hài lòng với bài
                    đăng này, hãy nhấn nút "Hoàn thành" để gửi bài đăng của bạn.
                </p>
            </div>
            <RoomDetail room={data} isCall={false} showAction={false} />
            <div className="d-flex aling-items-center justify-content-between my-5">
                <button className="back-btn" onClick={onBack}>
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                </button>
                <button className="next-btn" onClick={onSubmit}>
                    Hoàn thành
                </button>
            </div>
        </div>
    );
}

export default Step4_ReviewAndSubmit;

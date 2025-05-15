import React from 'react';
import "../../../styles/Step3_Intro.css";
import "../../../styles/Step1_Intro.css";
import room from "../../../assets/img/room.png";
import ProgressBar from '../ProgressBar';

function Step3_Intro({ onNext, onBack, totalSteps }) {
    return (
        <div className="step3-container">
            <ProgressBar currentStep={3} totalSteps={totalSteps} />

            <div className="step3-content">
                <div className="text-section">
                    <h2>Bước 3</h2>
                    <h1>Làm cho chỗ ở của bạn trở nên nổi bật</h1>
                    <p>
                        Ở bước này, bạn sẽ thêm một số tiện nghi được cung cấp tại chỗ ở của bạn, cùng với 5 bức ảnh lớn. 
                        Sau đó, bạn sẽ soạn tiêu đề, nội dung mô tả và mức giá mong muốn cho chỗ ở của bạn.
                    </p>
                </div>

                <div className="image-section">
                    <img src={room} alt="Room preview" />
                </div>
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={onBack}>
                    <span style={{ transform: "rotate(180deg)", display: "inline-block" }}>➔</span> Quay lại
                </button>
                <button className="next-btn" onClick={onNext}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step3_Intro;
import React from 'react';
import "../../../styles/Step2_Intro.css";
import "../../../styles/Step1_Intro.css";
import room from "../../../assets/img/room.png";
import ProgressBar from '../ProgressBar';

function Step2_UploadImages({ onNext, onBack, currentStep, totalSteps }) {
    return (
        <div className="step-container">
            <ProgressBar currentStep={2} totalSteps={totalSteps} />
            
            <div className='d-flex'>
                <div className='content-box'>
                    <h2>Bước 2</h2>
                    <h1>Thêm ảnh cho chỗ ở của bạn</h1>
                    <p>
                        Ở bước này, bạn cần cung cấp các hình ảnh hoặc video giúp cung cấp cái nhìn trực quan cho khách hàng về chỗ ở của bạn.
                    </p>
                </div>
                <div className="image-preview">
                    <img src={room} alt="Room preview" className="room-preview" />
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

export default Step2_UploadImages;

import React, { useState } from "react";
import "../../../styles/Step2_UploadImage.css";
import "../../../styles/Step1_Intro.css";
import camera from "../../../assets/img/camera.png";
import ProgressBar from "../ProgressBar";

function Step2_UploadImages({ onNext, onBack, totalSteps }) {
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    return (
        <div className="upload-container">
            <ProgressBar currentStep={2} totalSteps={totalSteps} />

            <h2>Bổ sung một số bức ảnh chụp chỗ ở của bạn</h2>
            <p>
                Bạn sẽ cần 5 bức ảnh để bắt đầu. Về sau, bạn vẫn có thể đăng thêm hoặc thay đổi ảnh.
            </p>
            <div className="upload-area">
                <label className="upload-box">
                    <img src={camera} alt="Thêm ảnh" className="camera-icon" />
                    <span>Thêm ảnh</span>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                </label>
            </div>
            <div className="buttons">
                <button className="back-btn" onClick={onBack}>
                    <span style={{ transform: "rotate(180deg)", display: "inline-block" }}>➔</span> Quay lại
                </button>
                <button 
                    className={`next-btn ${images.length < 5 ? "disabled" : ""}`}
                    onClick={onNext} 
                    disabled={images.length < 5}
                >
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step2_UploadImages;

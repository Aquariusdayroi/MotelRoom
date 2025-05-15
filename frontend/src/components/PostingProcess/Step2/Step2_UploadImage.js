import React, { useState } from "react";
import "../../../styles/Step2_UploadImage.css";
import "../../../styles/Step1_Intro.css";
import camera from "../../../assets/img/camera.png";
import plusIcon from "../../../assets/img/plus.png";
import ProgressBar from "../ProgressBar";

function Step2_UploadImages({ onNext, onBack, totalSteps }) {
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    return (
        <div className="step2-container">
            <ProgressBar currentStep={2} totalSteps={totalSteps} />

            <div className="step2-content-container">
                <div className="step2-content">
                    <h2>Bổ sung một số bức ảnh chụp chỗ ở của bạn</h2>
                    <p>
                        Bạn sẽ cần 5 bức ảnh để bắt đầu, sắp xếp thứ tự các ảnh theo mong muốn của bạn.
                    </p>
                </div>
            </div>

            <div className={`step2-gallery-container ${images.length > 0 ? 'has-images' : ''}`}>
                <label className={`step2-upload-box ${images.length > 0 ? 'small' : 'center'}`}>
                    <img 
                        src={images.length > 0 ? plusIcon : camera} 
                        alt="Thêm ảnh" 
                        className={`step2-icon ${images.length > 0 ? 'small' : ''}`} 
                    />
                    <span className={images.length > 0 ? 'small-label' : ''}>Thêm ảnh</span>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="step2-file-input"
                    />
                </label>

                {images.length > 0 && (
                    <div className="step2-gallery">
                        {images.map((file, index) => (
                            <div key={index} className="step2-image-wrapper">
                                <img src={URL.createObjectURL(file)} alt={file.name} className="step2-image" />
                                <div className="step2-overlay">
                                    <button className="step2-remove-btn" onClick={() => handleRemoveImage(index)}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

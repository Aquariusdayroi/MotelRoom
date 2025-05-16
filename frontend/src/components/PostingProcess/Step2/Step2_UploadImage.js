import { useState } from 'react';
import '../../../styles/Step2_UploadImage.css';
import '../../../styles/Step1_Intro.css';
import camera from '../../../assets/img/camera.png';
import plusIcon from '../../../assets/img/plus.png';
import ProgressBar from '../ProgressBar';

function Step2_UploadImages({ data, onNext, onBack }) {
    const [images, setImages] = useState(data.images || []);
    const [inputKey, setInputKey] = useState(Date.now());

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
        setInputKey(Date.now());
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    return (
        <div className="step2-container">
            <ProgressBar currentStep={2} />

            <div className="step2-content-container">
                <div className="step2-content">
                    <h2>Bổ sung một số bức ảnh chụp chỗ ở của bạn</h2>
                    <p className="text-muted w-100 h-auto">
                        Bạn sẽ cần tối thiểu 2 bức ảnh để bắt đầu, sắp xếp thứ tự các ảnh theo mong muốn của bạn.
                    </p>
                </div>
            </div>

            <div className={`step2-gallery-container ${images.length > 0 ? 'has-images' : ''}`}>
                <label className={`step2-upload-box m-0 ${images.length > 0 ? 'small' : 'center'}`}>
                    <img
                        src={images.length > 0 ? plusIcon : camera}
                        alt="Thêm ảnh"
                        className={`step2-icon ${images.length > 0 ? 'small' : ''}`}
                    />
                    <button
                        type="button"
                        className={`${images.length > 0 ? 'small-label' : ''} btn btn-outline-secondary rounded-3 m-0`}
                    >
                        Thêm ảnh
                    </button>
                    <input
                        key={inputKey}
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
                                <div className="step2-overlay" onClick={() => handleRemoveImage(index)}>
                                    <button className="step2-remove-btn">X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={() => onBack({ images })}>
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                </button>
                <button className="next-btn" onClick={() => onNext({ images })} disabled={images.length < 2}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step2_UploadImages;

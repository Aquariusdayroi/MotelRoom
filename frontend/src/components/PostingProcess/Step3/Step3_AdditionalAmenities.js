import React, { useState } from "react";
import "../../../styles/Step3_AdditionalAmenities.css";
import "../../../styles/Step1_Intro.css"
import ProgressBar from "../ProgressBar";
import extractorIcon from "../../../assets/img/extractor.png";
import bathtubIcon from "../../../assets/img/bathtub.png";
import balconyIcon from "../../../assets/img/balcony.png";
import elevatorIcon from "../../../assets/img/elevator.png";
import microwaveIcon from "../../../assets/img/microwave.png";
import securityIcon from "../../../assets/img/security.png";
import firstAidIcon from "../../../assets/img/first-aid.png";
import fingerprintIcon from "../../../assets/img/fingerprint.png";

const MAIN_AMENITIES = [
    { label: "Máy hút ẩm", icon: extractorIcon },
    { label: "Bồn tắm nước nóng", icon: bathtubIcon },
    { label: "Ban công", icon: balconyIcon },
    { label: "Thang máy", icon: elevatorIcon },
    { label: "Lò vi sóng", icon: microwaveIcon },
];

const SAFETY_AMENITIES = [
    { label: "Camera an ninh", icon: securityIcon },
    { label: "Bộ sơ cứu", icon: firstAidIcon },
    { label: "Khóa vân tay", icon: fingerprintIcon },
];

function Step3_AdditionalAmenities({ onNext, onBack, totalSteps }) {
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const handleSelectAmenity = (label) => {
        if (selectedAmenities.includes(label)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== label));
        } else {
            setSelectedAmenities([...selectedAmenities, label]);
        }
    };

    return (
        <div className="additional-amenities-container">
            <ProgressBar currentStep={3} totalSteps={totalSteps} />

            <div className="additional-amenities-content">
                <h2>Những tiện nghi bổ sung cho chỗ ở của bạn</h2>
                <p>Các tiện nghi nổi bật khác có sẵn tại chỗ ở của bạn</p>

                <div className="additional-amenities-grid">
                    {MAIN_AMENITIES.map((amenity) => (
                        <button
                            key={amenity.label}
                            className={`additional-amenity-item ${selectedAmenities.includes(amenity.label) ? 'active' : ''}`}
                            onClick={() => handleSelectAmenity(amenity.label)}
                        >
                            <img src={amenity.icon} alt={amenity.label} />
                            <span>{amenity.label}</span>
                        </button>
                    ))}
                </div>

                <h3>Những tiện ích an toàn được trang bị để bạn yên tâm hơn khi lưu trú</h3>
                <div className="additional-safety-grid">
                    {SAFETY_AMENITIES.map((amenity) => (
                        <button
                            key={amenity.label}
                            className={`additional-amenity-item ${selectedAmenities.includes(amenity.label) ? 'active' : ''}`}
                            onClick={() => handleSelectAmenity(amenity.label)}
                        >
                            <img src={amenity.icon} alt={amenity.label} />
                            <span>{amenity.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={onBack}>
                    <span style={{ transform: "rotate(180deg)", display: "inline-block" }}>➔</span> Quay lại
                </button>
                <button 
                    className="next-btn" 
                    onClick={onNext} 
                    disabled={selectedAmenities.length === 0}
                >
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step3_AdditionalAmenities;

import { useState } from 'react';
import "../../../styles/Step1_Intro.css";
import "../../../styles/Step1_SelectType.css";
import ProgressBar from '../ProgressBar';

import home from "../../../assets/img/home.png";
import apartment from "../../../assets/img/apartment.png";
import tro from "../../../assets/img/tro.png";
import house_small from "../../../assets/img/house_small.png";

const TYPES = [
    { label: "Nhà nguyên căn", icon: home },
    { label: "Căn hộ", icon: apartment },
    { label: "Phòng trọ", icon: tro },
    { label: "Nhà nhỏ", icon: house_small }
];

function Step1_SelectType({ data = {}, onNext, onBack, currentStep, totalSteps }) {
    const [type, setType] = useState(data.type || '');
    const [roomCount, setRoomCount] = useState(data.roomCount || 0);
    const [area, setArea] = useState(data.area || '');

    const handleRoomCountChange = (amount) => {
        const newCount = roomCount + amount;
        if (newCount >= 0) {
            setRoomCount(newCount);
        }
    };

    const handleNext = () => {
        onNext({ type, roomCount, area });
    };

    return (
        <div className="selec-container">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            <div className='title_1'><h4 style={{fontWeight:"bold"}}>Loại hình nào sau đây liên quan đến chỗ ở của bạn?</h4></div>
            <div className="type-options">
                {TYPES.map((option) => (
                    <button
                        key={option.label}
                        className={`type-button ${type === option.label ? 'active' : ''}`}
                        onClick={() => setType(option.label)}
                    >
                        <img src={option.icon} alt={option.label} className="type-icon" />
                        <div className="label">{option.label}</div>
                    </button>
                ))}
            </div>
            <div className='title_1'><h4 style={{fontWeight:"bold"}}>Cho khách hàng biết một số thông tin cơ bản</h4></div>
            <div className="basic-info">
                <div className="input-group">
                    <label className='counter'>Số phòng</label>
                    <div className="counter">
                        <button onClick={() => handleRoomCountChange(-1)} className='btn btn-info'>-</button>
                        <span>{roomCount}</span>
                        <button onClick={() => handleRoomCountChange(1)} className='btn btn-info'>+</button>
                    </div>
                </div>

                <div className="input-group">
                    <label className='input-with-unit'>Diện tích chung</label>
                    <div className="input-with-unit">
                        <input 
                            value={area} 
                            onChange={(e) => setArea(e.target.value)} 
                        />
                        <span>m²</span>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={onBack}>
                    <span style={{ transform: "rotate(180deg)", display: "inline-block" }}>➔</span> Quay lại
            </button>
                <button className="next-btn" onClick={handleNext} disabled={!type}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step1_SelectType;

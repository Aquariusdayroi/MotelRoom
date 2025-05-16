import { useState } from 'react';
import '../../../styles/Step1_Intro.css';
import '../../../styles/Step1_SelectType.css';
import ProgressBar from '../ProgressBar';

import home from '../../../assets/img/home.png';
import apartment from '../../../assets/img/apartment.png';
import tro from '../../../assets/img/tro.png';
import house_small from '../../../assets/img/house_small.png';

const TYPES = [
    { label: 'Nhà nguyên căn', icon: home },
    { label: 'Căn hộ', icon: apartment },
    { label: 'Phòng trọ', icon: tro },
    { label: 'Nhà nhỏ', icon: house_small },
];

function Step1_SelectType({ data, onNext, onBack }) {
    const [type, setType] = useState(data.type || '');
    const [roomCount, setRoomCount] = useState(data.roomCount || 0);
    const [area, setArea] = useState(data.area || '');

    const handleRoomCountChange = (amount) => {
        const newCount = roomCount + amount;
        if (newCount >= 0) {
            setRoomCount(newCount);
        }
    };

    return (
        <div className="basic-info-form">
            <ProgressBar currentStep={1} />

            <div style={{ marginBottom: '50px' }}>
                <div className="title_1">
                    <h4 style={{ fontWeight: 'bold' }}>Loại hình nào sau đây liên quan đến chỗ ở của bạn?</h4>
                </div>
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
                <div className="title_1">
                    <h4 style={{ fontWeight: 'bold' }}>Cho khách hàng biết một số thông tin cơ bản</h4>
                </div>
                <div className="basic-info">
                    <div className="input-groupa mb-0 d-flex align-items-center gap-4">
                        <label className="counter m-0">Số phòng</label>
                        <div className="counter ms-3">
                            <button
                                onClick={() => handleRoomCountChange(-1)}
                                className="next-btn m-0 rounded-5 d-flex align-items-center justify-content-center"
                                style={{ width: '45px', height: '45px' }}
                                disabled={roomCount <= 0}
                            >
                                -
                            </button>
                            <span>{roomCount}</span>
                            <button
                                onClick={() => handleRoomCountChange(1)}
                                className="next-btn m-0 rounded-5 d-flex align-items-center justify-content-center"
                                style={{ width: '45px', height: '45px' }}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="input-group mb-0 d-flex align-items-center gap-4">
                        <label className="input-with-unit m-0">Diện tích chung</label>
                        <div className="input-with-unit m-0">
                            <input value={area} onChange={(e) => setArea(e.target.value)} />
                            <span className="ms-2">m²</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={() => onBack({ type, roomCount, area })}>
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                </button>
                <button
                    className="next-btn"
                    onClick={() => onNext({ type, roomCount, area })}
                    disabled={!type || !roomCount || !area}
                >
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step1_SelectType;

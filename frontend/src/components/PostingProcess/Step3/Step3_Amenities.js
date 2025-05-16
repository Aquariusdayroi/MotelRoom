import React, { useState } from 'react';
import '../../../styles/Step3_Amenities.css';
import '../../../styles/Step1_Intro.css';
import ProgressBar from '../ProgressBar';
import wifiIcon from '../../../assets/img/wifi.png';
import tvIcon from '../../../assets/img/tv.png';
import kitchenIcon from '../../../assets/img/kitchen.png';
import washingMachineIcon from '../../../assets/img/washing-machine.png';
import parkingIcon from '../../../assets/img/parking.png';
import fridgeIcon from '../../../assets/img/fridge.png';
import airConditionerIcon from '../../../assets/img/air-conditioner.png';
import terraceIcon from '../../../assets/img/terrace.png';
import waterHeaterIcon from '../../../assets/img/water-heater.png';

const AMENITIES = [
    { label: 'Wifi', icon: wifiIcon },
    { label: 'Tivi', icon: tvIcon },
    { label: 'Bếp', icon: kitchenIcon },
    { label: 'Máy giặt', icon: washingMachineIcon },
    { label: 'Chỗ đỗ xe', icon: parkingIcon },
    { label: 'Tủ lạnh', icon: fridgeIcon },
    { label: 'Máy lạnh', icon: airConditionerIcon },
    { label: 'Gác mái', icon: terraceIcon },
    { label: 'Máy nước nóng', icon: waterHeaterIcon },
];

function Step3_Amenities({ data, onNext, onBack }) {
    const [selectedAmenities, setSelectedAmenities] = useState(data.amenity || []);

    const handleSelectAmenity = (label) => {
        if (selectedAmenities.includes(label)) {
            setSelectedAmenities(selectedAmenities.filter((item) => item !== label));
        } else {
            setSelectedAmenities([...selectedAmenities, label]);
        }
    };

    return (
        <div className="amenities-container">
            <ProgressBar currentStep={3} />

            <div className="amenities-content">
                <h2>Những tiện nghi mà chỗ ở của bạn hỗ trợ</h2>
                <p className="w-100 text-muted">Thêm tiện nghi để cho khách biết chỗ bạn có những hỗ trợ nào</p>

                <div className="amenities-grid">
                    {AMENITIES.map((amenity) => (
                        <button
                            key={amenity.label}
                            className={`amenity-item ${selectedAmenities.includes(amenity.label) ? 'active' : ''}`}
                            onClick={() => handleSelectAmenity(amenity.label)}
                        >
                            <img src={amenity.icon} alt={amenity.label} />
                            <span>{amenity.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={() => onBack({ amenity: selectedAmenities })}>
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                </button>
                <button
                    className="next-btn"
                    onClick={() => onNext({ amenity: selectedAmenities })}
                    disabled={selectedAmenities.length === 0}
                >
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step3_Amenities;

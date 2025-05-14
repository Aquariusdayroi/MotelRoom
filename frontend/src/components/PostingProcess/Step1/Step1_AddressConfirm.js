import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import map from "../../../assets/img/map-demo.png";
import send from "../../../assets/img/send.png"
import "../../../styles/Step1_AddressConfirm.css";
import "../../../styles/Step1_Intro.css";

function Step1_AddressConfirm({ onNext, onBack, currentStep, totalSteps }) {
    const [address, setAddress] = useState({
        place: "",
        building: "",
        street: "",
        city: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleNext = () => {
        onNext(address);
    };

    return (
        <div className="step-container">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            <h4>Xác nhận địa chỉ của bạn</h4>

            <div className="address-section">
                <div className="map-container">
                    <img src={map} alt="Bản đồ" />
                    <div className="search-box">
                        <img src={send} style={{width:"20px"}}></img>
                        <input 
                            type="text" 
                            placeholder="Sử dụng vị trí của bạn" 
                            value={address.place} 
                            name="place" 
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="address-inputs">
                    <input 
                        type="text" 
                        placeholder="Căn hộ, tầng, v.v. (nếu có)" 
                        value={address.building} 
                        name="building" 
                        onChange={handleInputChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Tòa nhà (nếu có)" 
                        value={address.street} 
                        name="street" 
                        onChange={handleInputChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Địa chỉ đường/phố" 
                        name="street" 
                        onChange={handleInputChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Thành phố/quận/thị xã" 
                        name="city" 
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={onBack}>
                    <span style={{ transform: "rotate(180deg)", display: "inline-block" }}>➔</span>Quay lại
                </button>
                <button className="next-btn" onClick={handleNext} disabled={!address.place}>
                    Tiếp tục ➔
                </button>

            </div>
        </div>
    );
}

export default Step1_AddressConfirm;

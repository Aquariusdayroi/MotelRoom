import { useState } from 'react';
import ProgressBar from '../ProgressBar';
import map from '../../../assets/img/map-demo.png';
import send from '../../../assets/img/send.png';
import '../../../styles/Step1_AddressConfirm.css';
import '../../../styles/Step1_Intro.css';

function Step1_AddressConfirm({ data, onNext, onBack }) {
    const [address, setAddress] = useState(
        data.address || {
            place: '',
            building: '',
            street: '',
            city: '',
            detail: '',
        },
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="basic-info-form">
            <ProgressBar currentStep={1} />

            <h4 className="fw-bold mb-4">Xác nhận địa chỉ của bạn</h4>

            <div className="address-section">
                <div className="map-container">
                    <img src={map} alt="Bản đồ" />
                    <div className="search-box">
                        <img src={send} alt="" style={{ width: '20px' }}></img>
                        <input
                            type="text"
                            placeholder="Sử dụng vị trí của bạn"
                            value={address.detail}
                            name="detail"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="address-inputs">
                    <input
                        type="text"
                        placeholder="Căn hộ, tầng, v.v. (nếu có)"
                        value={address.place}
                        name="place"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Tòa nhà (nếu có)"
                        value={address.building}
                        name="building"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ đường/phố"
                        value={address.street}
                        name="street"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Thành phố/quận/thị xã"
                        value={address.city}
                        name="city"
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={() => onBack({ address })}>
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span>Quay lại
                </button>
                <button className="next-btn" onClick={() => onNext({ address })} disabled={!address.detail}>
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step1_AddressConfirm;

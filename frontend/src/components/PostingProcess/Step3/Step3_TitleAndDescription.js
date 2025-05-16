import React, { useState } from 'react';
import '../../../styles/Step3_TitleAndDescription.css';
import '../../../styles/Step1_Intro.css';
import ProgressBar from '../ProgressBar';

function Step4_TitleAndDescription({ data, onNext, onBack }) {
    const [title, setTitle] = useState(data.title || '');
    const [description, setDescription] = useState(data.description || '');
    const [priceDisplay, setPriceDisplay] = useState(data.priceDisplay || '');
    const [priceRaw, setPriceRaw] = useState(data.price || null);

    const formatDisplay = (num) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const handleChangePrice = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        if (raw === '') {
            setPriceDisplay('');
            setPriceRaw(null);
            return;
        }

        const number = parseInt(raw, 10);
        setPriceDisplay(formatDisplay(number));
        setPriceRaw(number);
    };

    return (
        <div className="title-description-container">
            <ProgressBar currentStep={3} />

            <div className="title-description-content">
                <h2>Hãy đặt tiêu đề và mô tả cho chỗ ở của bạn</h2>
                <p className="text-muted w-100">
                    Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi tiêu đề sau
                </p>

                <div className="input-groupa">
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={64}
                    />
                    <div className="char-counter">{title.length}/64</div>
                </div>
                <div className="input-groupa">
                    <textarea
                        placeholder="Tạo mô tả để chia sẻ những điều tạo nên nét đặc biệt cho chỗ ở của bạn."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={500}
                        rows={5}
                    ></textarea>
                    <div className="char-counter">{description.length}/500</div>
                </div>

                <div className="price-container">
                    <label className="price-display m-0 me-3">Mức giá mong muốn:</label>
                    <input
                        type="text"
                        className="form-control p-0 pb-1 d-inline-block text-end price-display border-0 border-bottom rounded-0 border-black"
                        style={{ width: '160px' }}
                        value={priceDisplay}
                        onChange={handleChangePrice}
                    />
                    <span className="price-display ms-2">VND</span>
                </div>
            </div>

            <div className="buttons">
                <button
                    className="back-btn"
                    onClick={() => onBack({ title, description, priceDisplay, price: priceRaw })}
                >
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                </button>
                <button
                    className="next-btn"
                    onClick={() => onNext({ title, description, priceDisplay, price: priceRaw })}
                    disabled={!title || !description || !priceRaw}
                >
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step4_TitleAndDescription;

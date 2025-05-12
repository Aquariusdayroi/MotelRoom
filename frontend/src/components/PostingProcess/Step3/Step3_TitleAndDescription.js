import React, { useState } from "react";
import "../../../styles/Step4_TitleAndDescription.css";
import "../../../styles/Step1_Intro.css"
import ProgressBar from "../ProgressBar";

function Step4_TitleAndDescription({ onNext, onBack, totalSteps }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("5,000,000");

    return (
        <div className="title-description-container">
            <ProgressBar currentStep={3} totalSteps={totalSteps} />

            <div className="title-description-content">
                <h2>Hãy đặt tiêu đề và mô tả cho chỗ ở của bạn</h2>
                <p>Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi tiêu đề sau.</p>

                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Nhập tiêu đề..." 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={32}
                    />
                    <div className="char-counter">{title.length}/32</div>
                </div>
                <div className="input-group">
                    <textarea 
                        placeholder="Tạo mô tả để chia sẻ những điều tạo nên nét đặc biệt cho chỗ ở của bạn." 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={500}
                    ></textarea>
                    <div className="char-counter">{description.length}/500</div>
                </div>

                <div className="price-container">
                    <label className="price-display">Mức giá mong muốn:</label>
                    <span className="price-display">{price} VND</span>
                </div>
            </div>

            <div className="buttons">
                <button className="back-btn" onClick={onBack}>
                    <span style={{ transform: "rotate(180deg)", display: "inline-block" }}>➔</span> Quay lại
                </button>
                <button 
                    className="next-btn" 
                    onClick={onNext} 
                    disabled={title.length === 0 || description.length === 0}
                >
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step4_TitleAndDescription;

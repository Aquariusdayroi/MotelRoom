import React from "react";
import "../../styles/ProgressBar.css";

const steps = [
    { number: 1, label: "Thông tin cơ bản" },
    { number: 2, label: "Ảnh và video" },
    { number: 3, label: "Tiện nghi & mô tả" },
    { number: 4, label: "Xem lại bài đăng" },
];

export default function ProgressBar({ currentStep = 1 }) {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div className="box-progress">
                    {steps.map((step, index) => (
                        <div key={index} className="step-container">
                            <div
                                className={`step-circle ${
                                    step.number === currentStep ? "active" : ""
                                }`}
                            >
                                {step.number}
                            </div>
                            
                            {index < steps.length - 1 && (
                                <div className="step-line"></div>
                            )}
                            
                            <span
                                className={`step-label ${
                                    step.number === currentStep ? "active-label" : ""
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';

function Step1_SelectType({ data, onNext }) {
    const [type, setType] = useState(data.type || '');

    return (
        <div>
            <h4>1. Chọn loại hình phòng trọ</h4>
            <div className="d-flex gap-3 flex-wrap">
                {['Phòng trọ', 'Chung cư', 'Nhà nguyên căn'].map((option) => (
                    <button
                        key={option}
                        className={`btn ${type === option ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setType(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <button className="btn btn-success" onClick={() => onNext({ type })} disabled={!type}>
                    Tiếp tục
                </button>
            </div>
        </div>
    );
}

export default Step1_SelectType;

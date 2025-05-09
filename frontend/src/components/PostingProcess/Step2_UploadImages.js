import { useState } from 'react';

function Step2_UploadImages({ data, onNext, onBack }) {
    const [images, setImages] = useState(data.images || []);

    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    return (
        <div>
            <h4>2. Tải ảnh phòng trọ</h4>
            <input type="file" multiple className="form-control" onChange={handleChange} />
            <div className="my-3">
                {images.length > 0 && (
                    <ul>
                        {images.map((file, i) => (
                            <li key={i}>{file.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={onBack}>
                    Quay lại
                </button>
                <button className="btn btn-success" onClick={() => onNext({ images })} disabled={images.length === 0}>
                    Tiếp tục
                </button>
            </div>
        </div>
    );
}

export default Step2_UploadImages;

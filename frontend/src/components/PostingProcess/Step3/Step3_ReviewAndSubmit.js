function Step3_ReviewAndSubmit({ data, onBack, onSubmit }) {
    return (
        <div>
            <h4>3. Xem lại và gửi bài đăng</h4>
            <ul>
                <li>
                    <strong>Loại hình:</strong> {data.type}
                </li>
                <li>
                    <strong>Ảnh đã chọn:</strong>
                    <ul>{data.images && data.images.map((img, i) => <li key={i}>{img.name}</li>)}</ul>
                </li>
            </ul>
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" onClick={onBack}>
                    Quay lại
                </button>
                <button className="btn btn-primary" onClick={onSubmit}>
                    Gửi bài đăng
                </button>
            </div>
        </div>
    );
}

export default Step3_ReviewAndSubmit;

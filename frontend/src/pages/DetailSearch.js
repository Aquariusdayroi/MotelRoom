import styles from "../styles/DetailSearch.module.css";
import RoomCard from "../components/RoomCard";
import { images } from "../assets/images";

const DetailSearch = () => {
    // Dữ liệu mẫu cho các phòng
    const roomData = [
        {
            images: [images.background, images.background],
            address: "Phòng trọ Quận 1",
            location:
                "12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh, Việt Nam",
            owner: "Nguyễn Văn A",
            price: "3.000.000đ",
            type: "Phòng trọ",
            area: "25m²",
            isNew: true,
        },
        {
            images: [images.background],
            address: "Phòng trọ Quận 2",
            location:
                "366 Đ. Phan Văn Trị, Phường 5, Gò Vấp, Hồ Chí Minh, Việt Nam",
            owner: "Trần Thị B",
            price: "2.500.000đ",
            type: "Phòng trọ",
            area: "20m²",
            isNew: false,
        },
        {
            images: [images.background],
            address: "Phòng trọ Quận 3",
            location:
                "12 Đ. Phan Văn Trị, Phường 7, Gò Vấp, Hồ Chí Minh, Việt Nam",
            owner: "Lê Văn C",
            price: "4.000.000đ",
            type: "Phòng trọ",
            area: "30m²",
            isNew: true,
        },
    ];

    return (
        <div className={styles.container}>
            <div className="row">
                <div className="col-md-9">
                    <div className="pt-5 pb-2 fs-4 fw-bold">
                        Hơn 1.000 chỗ ở
                    </div>
                    <div className="row g-4">
                        {roomData.map((room, index) => (
                            <div key={index} className="col-md-4">
                                <RoomCard {...room} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-3">
                    <div>map</div>
                    <div>cc</div>
                </div>
            </div>
        </div>
    );
};

export default DetailSearch;

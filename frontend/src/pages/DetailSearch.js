import styles from "../styles/DetailSearch.module.css";
import RoomCard from "../components/RoomCard"; // Đảm bảo đã import RoomCard đúng cách
import { images } from "../assets/images";
import { useState } from "react";
const DetailSearch = () => {
    const roomData = [
        {
            id: 1,
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
            id: 2,
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
            id: 3,
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

    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleRoomClick = (id) => {
        setSelectedRoomId(id);
        const selectedRoom = roomData.find((room) => room.id === id);
        setSelectedLocation(selectedRoom.location);
    };

    return (
        <div className={styles.container}>
            <div className="row">
                <div className="col-md-9">
                    <div className="pt-5 pb-2 fs-4 fw-bold">
                        Hơn 1.000 chỗ ở
                    </div>
                    <div className="row g-4">
                        {roomData.map((room) => (
                            <div key={room.id} className="col-md-4">
                                <RoomCard
                                    {...room}
                                    onClick={() => handleRoomClick(room.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-3">cc</div>
            </div>
        </div>
    );
};

export default DetailSearch;

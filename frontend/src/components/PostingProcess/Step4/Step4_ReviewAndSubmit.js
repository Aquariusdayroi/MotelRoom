import { useContext, useEffect, useState } from "react";
import RoomDetail from "../../RoomDetail";
import ProgressBar from "../ProgressBar";
import { AuthToken } from "../../../authToken";
import { getMyProfile } from "../../../api/userApi/updateUserProfile";

function Step4_ReviewAndSubmit({ data, onBack, onSubmit }) {
    const { user } = useContext(AuthToken);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user) return;

            try {
                const info = await getMyProfile();
                setUserInfo(info);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, [user]);

    const room = {
        user: {
            id: userInfo.id,
            fullname: userInfo.fullname,
            avatar: userInfo.avatar,
        },
        fullname: userInfo.fullname,
        avatar: userInfo.avatar,
        home_type: data.type,
        title: data.title,
        information_detail: data.description,
        address: {
            city: 1,
            district: 2,
            description: data.address.detail,
            address_name: data.address.detail,
            latitude: data.address.latitude,
            longitude: data.address.longitude,
        },
        total_occupancy: data.roomCount,
        acreage: data.area,
        price: data.price,
        images: data.images.map((image) => {
            // create URL object from image URL
            let imageUrl = URL.createObjectURL(image);
            return {
                image_url: imageUrl.replace("http://localhost:8000", ""),
            };
        }),
        images_rental_post: data.images,
        has_wifi: data.amenity.includes("Wifi"),
        has_tv: data.amenity.includes("Tivi"),
        has_kitchen: data.amenity.includes("Bếp"),
        has_washing_machine: data.amenity.includes("Máy giặt"),
        has_parking: data.amenity.includes("Chỗ đỗ xe"),
        has_fridge: data.amenity.includes("Tủ lạnh"),
        has_air_conditioner: data.amenity.includes("Máy lạnh"),
        has_attic: data.amenity.includes("Gác mái"),
        has_water_heater: data.amenity.includes("Máy nước nóng"),
        has_dehumidifier: data.add_amenity.includes("Máy hút ẩm"),
        has_hot_tub: data.add_amenity.includes("Bồn tắm nước nóng"),
        has_balcony: data.add_amenity.includes("Ban công"),
        has_elevator: data.add_amenity.includes("Thang máy"),
        has_microwave: data.add_amenity.includes("Lò vi sóng"),
        has_security_camera: data.add_amenity.includes("Camera an ninh"),
        has_first_aid_kit: data.add_amenity.includes("Bộ sơ cứu"),
        has_fingerprint_lock: data.add_amenity.includes("Khóa vân tay"),
    };

    return (
        <div>
            <ProgressBar currentStep={4} />
            <div className="mb-5">
                <h4 className="text-center fw-bold">Xem trước bài viết</h4>
                <p className="text-center w-100 text-muted">
                    Xem lại bài đăng của bạn để đảm bảo không có sai sót hay
                    nhầm lẫn. Nếu bạn thấy hài lòng với bài đăng này, hãy nhấn
                    nút "Hoàn thành" để gửi bài đăng của bạn.
                </p>
            </div>
            <RoomDetail
                room={room}
                isCall={false}
                showAction={false}
                isSmall={true}
            />
            <div className="d-flex aling-items-center justify-content-between my-5">
                <button className="back-btn" onClick={() => onBack({})}>
                    <span
                        style={{
                            transform: "rotate(180deg)",
                            display: "inline-block",
                        }}
                    >
                        ➔
                    </span>{" "}
                    Quay lại
                </button>
                <button className="next-btn" onClick={() => onSubmit(room)}>
                    Hoàn thành
                </button>
            </div>
        </div>
    );
}

export default Step4_ReviewAndSubmit;

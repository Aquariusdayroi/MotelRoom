import ButtonAction from "../components/buttonUI/ButtonAction";
import styles from "../styles/Detail.module.css";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RoomImageGallery from "../components/rooms/RoomImageGallery";
import StarIcon from "@mui/icons-material/Star";
import { useContext, useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import ContactCard from "../components/ContactCard";
import axiosClient from "../api/axiosClient";
import { Modal, Button } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import BalconyOutlinedIcon from "@mui/icons-material/BalconyOutlined";
import ElevatorOutlinedIcon from "@mui/icons-material/ElevatorOutlined";
import MicrowaveOutlinedIcon from "@mui/icons-material/MicrowaveOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AreaChartOutlinedIcon from "@mui/icons-material/AreaChartOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HotTubOutlinedIcon from "@mui/icons-material/HotTubOutlined";
import ShareModal from "../components/ShareModal";
import { AuthToken } from "../authToken";
import MapModal from "../components/modal/MapModal";

function BasicInfo({ data }) {
    const mapping = {
        true: "Có",
        false: "Không",
    };

    const info = [
        {
            title: "Loại hình",
            value: data?.type,
            icon: <CategoryOutlinedIcon />,
        },
        {
            title: "Diện tích",
            value: data?.area,
            icon: <AreaChartOutlinedIcon />,
        },
        {
            title: "Số người ở",
            value: data?.max_people,
            icon: <GroupOutlinedIcon />,
        },
        {
            title: "Wi-Fi",
            value: mapping[data?.has_wifi],
            icon: <WifiOutlinedIcon />,
        },
        {
            title: "TV",
            value: mapping[data?.has_tv],
            icon: <TvOutlinedIcon />,
        },
        {
            title: "Bếp",
            value: mapping[data?.has_kitchen],
            icon: <KitchenOutlinedIcon />,
        },
        {
            title: "Máy giặt",
            value: mapping[data?.has_washing_machine],
            icon: <LocalLaundryServiceOutlinedIcon />,
        },
        {
            title: "Chỗ đậu xe",
            value: mapping[data?.has_parking],
            icon: <LocalParkingOutlinedIcon />,
        },
        {
            title: "Tủ lạnh",
            value: mapping[data?.has_fridge],
            icon: <KitchenOutlinedIcon />,
        },
        {
            title: "Máy lạnh",
            value: mapping[data?.has_air_conditioner],
            icon: <AcUnitOutlinedIcon />,
        },
        {
            title: "Gác lửng",
            value: mapping[data?.has_attic],
            icon: <HomeOutlinedIcon />,
        },
        {
            title: "Nước nóng",
            value: mapping[data?.has_water_heater],
            icon: <OpacityOutlinedIcon />,
        },
        {
            title: "Máy hút ẩm",
            value: mapping[data?.has_dehumidifier],
            icon: <SpaOutlinedIcon />,
        },
        {
            title: "Bồn tắm nóng",
            value: mapping[data?.has_hot_tub],
            icon: <HotTubOutlinedIcon />,
        },
        {
            title: "Ban công",
            value: mapping[data?.has_balcony],
            icon: <BalconyOutlinedIcon />,
        },
        {
            title: "Thang máy",
            value: mapping[data?.has_elevator],
            icon: <ElevatorOutlinedIcon />,
        },
        {
            title: "Lò vi sóng",
            value: mapping[data?.has_microwave],
            icon: <MicrowaveOutlinedIcon />,
        },
        {
            title: "Camera an ninh",
            value: mapping[data?.has_security_camera],
            icon: <VideocamOutlinedIcon />,
        },
        {
            title: "Bộ sơ cứu",
            value: mapping[data?.has_first_aid_kit],
            icon: <MedicalServicesOutlinedIcon />,
        },
        {
            title: "Khóa vân tay",
            value: mapping[data?.has_fingerprint_lock],
            icon: <FingerprintOutlinedIcon />,
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className="my-3">
            <h5 className="mb-3">Thông tin cơ bản</h5>
            {info.slice(0, 5)?.map((item, index) => (
                <div
                    className="d-flex align-items-center justify-content-between border"
                    key={index}
                >
                    <div className="w-50 text-start px-3">
                        <div className="d-flex align-items-center gap-2">
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                    </div>
                    <div className="w-50 text-start fw-semibold px-3 py-2 border-start">
                        {item.value}
                    </div>
                </div>
            ))}

            <ButtonAction
                text="Hiển thị tất cả"
                onClick={handleShow}
                className="mt-2"
            />

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Body>
                    {info.map((item, index) => (
                        <div
                            className="d-flex align-items-center justify-content-between border-bottom py-2"
                            key={index}
                        >
                            <div className="d-flex align-items-center gap-2">
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            <div className="fw-semibold">{item.value}</div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function Desciption({ text }) {
    return (
        <div className="my-3">
            <h5 className="mb-3">Mô tả chi tiết</h5>
            <div style={{ whiteSpace: "pre-line" }} className="p-3 border">
                {text}
            </div>
        </div>
    );
}

function RoomDetail({
    room,
    reviews,
    isCall = true,
    showAction = true,
    isSmall = false,
}) {
    let { user } = useContext(AuthToken);
    const [isFavorite, setIsFavorite] = useState(room.is_favorite);
    const [showMapModal, setShowMapModal] = useState(false);
    useEffect(() => {}, [room]);

    const handleSetFavorite = async (e) => {
        e.preventDefault();

        try {
            if (isFavorite) {
                await axiosClient.delete(`/favorite/api/delete/${room.id}/`);
            } else {
                await axiosClient.post(`/favorite/api/add/${room.id}/`);
            }

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error(error);
        }
    };

    const rating =
        reviews?.reduce((acc, review) => acc + Number(review.rating), 0) /
            reviews?.length || 0;

    const basicInfo = {
        type: room?.home_type,
        area: `${Number(room?.acreage).toFixed(0)} m²`,
        max_people: room?.total_occupancy,
        has_wifi: room?.has_wifi,
        has_tv: room?.has_tv,
        has_kitchen: room?.has_kitchen,
        has_washing_machine: room?.has_washing_machine,
        has_parking: room?.has_parking,
        has_fridge: room?.has_fridge,
        has_air_conditioner: room?.has_air_conditioner,
        has_attic: room?.has_attic,
        has_water_heater: room?.has_water_heater,
        has_dehumidifier: room?.has_dehumidifier,
        has_hot_tub: room?.has_hot_tub,
        has_balcony: room?.has_balcony,
        has_elevator: room?.has_elevator,
        has_microwave: room?.has_microwave,
        has_security_camera: room?.has_security_camera,
        has_first_aid_kit: room?.has_first_aid_kit,
        has_fingerprint_lock: room?.has_fingerprint_lock,
    };

    const [showShare, setShowShare] = useState(false);

    return (
        <div style={{ padding: `0 ${!isSmall ? "0" : "160px"}` }}>
            <div className="d-block d-md-flex align-items-center justify-content-between mb-2">
                <h3 className={styles.title}>{room?.title}</h3>
                {showAction && (
                    <div
                        className="d-flex align-items-center justify-content-end gap-1"
                        style={{ width: "300px" }}
                    >
                        <ButtonAction
                            icon={<IosShareOutlinedIcon />}
                            text="Chia sẻ"
                            onClick={() => setShowShare(true)}
                        />
                        <ShareModal
                            show={showShare}
                            handleClose={() => setShowShare(false)}
                        />
                        {user && (
                            <ButtonAction
                                icon={
                                    !isFavorite ? (
                                        <FavoriteBorderOutlinedIcon />
                                    ) : (
                                        <FavoriteIcon sx={{ color: "red" }} />
                                    )
                                }
                                text="Lưu"
                                onClick={handleSetFavorite}
                            />
                        )}
                    </div>
                )}
            </div>
            <RoomImageGallery
                gallery={room?.images?.map((img) => ({
                    ...img,
                    image: `http://127.0.0.1:8000${img.image}`,
                }))}
            />

            <div className="row mt-4">
                <div className="col-lg-7 col-md-12">
                    <div className={styles.address}>{room?.address?.address_name}</div>
                    <div className="text-muted d-flex align-items-center gap-1 mb-4">
                        <StarIcon className="text-warning" />
                        {reviews?.length ? (
                            <>
                                <span>{rating.toFixed(1)}</span>
                                <span>/</span>
                                <span>{reviews?.length} đánh giá</span>
                            </>
                        ) : (
                            "Chưa có đánh giá"
                        )}
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-4 py-3 border-top border-bottom">
                        <Avatar src={room?.avatar} className="shadow-sm" />
                        <div>Chủ nhà/Người đăng bài: {room?.fullname}</div>
                    </div>

                    <BasicInfo data={basicInfo} />
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end mt-4">
                        <ContactCard
                            price={room?.price}
                            onCall={room?.user}
                            isCall={isCall}
                            isSmall={isSmall}
                            onMaps={() => setShowMapModal(true)}
                        />
                    </div>
                </div>
            </div>
            <Desciption text={room?.information_detail} />
            <MapModal
                show={showMapModal}
                onHide={() => setShowMapModal(false)}
                latitude={room?.address?.latitude}
                longitude={room?.address?.longitude}
            />
        </div>
    );
}

export default RoomDetail;

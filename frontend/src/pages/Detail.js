import ButtonAction from '../components/buttonUI/ButtonAction';
import styles from '../styles/Detail.module.css';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RoomImageGallery from '../components/RoomImageGallery';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../components/Avatar';
import ContactCard from '../components/ContactCard';
import Reviews from '../components/Reviews';

function getRoom() {
    const room = {
        id: '111111',
        title: 'Nhà trọ 39/8, Thủ Đức, Thành phố Hồ Chí Minh',
        address: '26A đường 34 Kha Vạn Cân, Linh Đông, Thủ Đức, Hồ Chí Minh',
        price: 3500000,
        price_text: '3.5 triệu / tháng',
        images: [
            'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg',
            'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg',
            'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg',
            'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg',
            'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg',
        ],
        rating: 4.9,
        review_count: 52,
        posted_by: {
            name: 'Khánh Ender',
            avatar: '',
        },
        basic_info: {
            type: 'Nhà trọ, phòng trọ - Chủ quản',
            area: '15m²',
            max_people: '2-3',
            toilet: 'Chung/Riêng',
            wifi: 'Có',
        },
        description:
            'PHÒNG CHỈ CHO NỮ THUÊ TẠI QUẬN 10 GẦN HUFILT\nDt: 15m2\nGiá từ 3 triệu - 3 triệu 5. Hiện đang trống 2 phòng có gác giá 3 triệu và 1 phòng không gác giá 3,5 triệu\n- Trọ nằm mặt tiền đường lớn\n- Nội thất cơ bản: tủ lạnh, máy lạnh, tủ quần áo, giường nệm, bình nóng lạnh, kệ bếp, máy nước uống nóng lạnh, máy giặt chung\n- Toilet dùng chung (3p / 1 toilet / tầng) => Trọ này chỉ cho nữ thuê\n- Bãi giữ xe cách 20m\n- Phía dưới là siêu thị trái cây, đủ các loại trái cây tươi ngon, sinh tố, nước ép,…\n- Có thể ghép 2 hoặc 3 người',
        map_url: 'https://maps.google.com?q=26A%20Kha%20Van%20Can%20Thu%20Duc',
        contact: {
            phone: '0123456789',
            zalo: 'https://zalo.me/0123456789',
        },
        reviews: [
            {
                user: {
                    name: 'Aquafina',
                    avatar: '',
                },
                rating: 5,
                date: '2025-04-16T01:11:00+07:00',
                comment:
                    'Chỗ ở sạch sẽ, không xa Quận 1, rất dễ tiếp cận và rất thuận tiện để nhận phòng. Chủ nhà cũng phản ứng rất tích cực. Tuy nhiên , căn phòng hoàn toàn không như các bức ảnh.',
            },
            {
                user: {
                    name: 'Ton Dark',
                    avatar: '',
                },
                rating: 1,
                date: '2025-04-16T01:11:00+07:00',
                comment:
                    'Trọ như cứt, chủ trọ như cáo, làm ăn gian dối. Sớm trả nghiệp, nhắm gửi được cọc thì giữ luôn đi, fuck you khanhender <3',
            },
            {
                user: {
                    name: 'KhangKoii',
                    avatar: '',
                },
                rating: 4.5,
                date: '2025-06-23T14:05:00+07:00',
                comment:
                    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat aliquam pariatur, consequatur nam quidemfuga, magnam ratione, harum vitae minima veritatis possimus eaque qui voluptate impedit. Aliquid in eumvitae. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat aliquam pariatur, consequatur nam quidemfuga, magnam ratione, harum vitae minima veritatis possimus eaque qui voluptate impedit. Aliquid in eumvitae.',
            },
            {
                user: {
                    name: 'TuitenMinh',
                    avatar: '',
                },
                rating: 3,
                date: '2025-06-14T11:05:00+07:00',
                comment:
                    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat aliquam pariatur, consequatur nam quidemfuga, magnam ratione, harum vitae minima veritatis possimus eaque qui voluptate impedit. Aliquid in eumvitae. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat aliquam pariatur, consequatur nam quidemfuga, magnam ratione, harum vitae minima veritatis possimus eaque qui voluptate impedit. Aliquid in eumvitae.',
            },
        ],
    };
    return room;
}

function BasicInfo({ data }) {
    const info = [
        {
            title: 'Loại hình',
            value: data?.type,
        },
        {
            title: 'Diện tích',
            value: data?.area,
        },
        {
            title: 'Số người ở',
            value: data?.max_people,
        },
        {
            title: 'Toilet',
            value: data?.toilet,
        },
        {
            title: 'Wi-Fi',
            value: data?.wifi,
        },
    ];

    return (
        <div className="my-3">
            <h5 className="mb-3">Thông tin cơ bản</h5>
            {info.map((item, index) => (
                <div className="d-flex align-items-center justify-content-between border" key={index}>
                    <div className="w-50 text-start px-3">{item.title}</div>
                    <div className="w-50 text-start fw-semibold px-3 py-2 border-start">{item.value}</div>
                </div>
            ))}
        </div>
    );
}

function Desciption({ text }) {
    return (
        <div className="my-3">
            <h5 className="mb-3">Thông tin chi tiết</h5>
            <div style={{ whiteSpace: 'pre-line' }} className="p-3 border">
                {text}
            </div>
        </div>
    );
}

function Detail() {
    const { roomId } = useParams();
    const [room, setRoom] = useState({});

    const fetchData = async () => {
        try {
            // const res = axios...
            const res = getRoom();
            setRoom(res);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchData();
    }, [roomId]);

    return (
        <div className={styles.container}>
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h3>{room.title}</h3>
                <div className="d-flex align-items-center gap-1">
                    <ButtonAction icon={<IosShareOutlinedIcon />} text="Chia sẻ" />
                    <ButtonAction icon={<FavoriteBorderOutlinedIcon />} text="Lưu" />
                </div>
            </div>
            <RoomImageGallery gallery={room.images} />
            <div className="row mt-4">
                <div className="col-7">
                    <div className="fs-5">{room.address}</div>
                    <div className="text-muted d-flex align-items-center gap-1 mb-4">
                        <StarIcon className="text-warning" />
                        <span>{room.rating}</span>
                        <span>/</span>
                        <span className="text-decoration-underline">{room.review_count} đánh giá</span>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-4 py-3 border-top border-bottom">
                        <Avatar src={room.posted_by?.avatar} className="shadow-sm" />
                        <div>Chủ nhà/Người đăng bài: {room.posted_by?.name}</div>
                    </div>

                    <BasicInfo data={room.basic_info} />
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end mt-4">
                        <ContactCard price={room.price} />
                    </div>
                </div>
            </div>
            <Desciption text={room.description} />
            <div className="row">
                <div className="col-6">
                    <Reviews data={room.reviews} />
                </div>
            </div>
        </div>
    );
}

export default Detail;

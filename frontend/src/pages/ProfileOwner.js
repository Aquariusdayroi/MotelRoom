import styles from "../styles/Profile.module.css";
import UserCard from "../components/UserCard";
import RoomProfile from "../components/rooms/RoomProfile";

import {
    CalendarDate,
    EnvelopeFill,
    GeoAltFill,
    PersonCircle,
    PersonFill,
    PhoneFill,
    SignpostSplitFill,
    TelephoneInboundFill,
} from "react-bootstrap-icons";
import { Building } from "lucide-react";
import { useParams } from "react-router-dom";
import getInfoOwner from "../api/userApi/getInfoOwner";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import ButtonPrimary from "../components/buttonUI/ButtonPrimary";

function ProfileOwner() {
    const { postId } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 2;

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(rooms.length / roomsPerPage);
    useEffect(() => {
        const fetchOwnerInfo = async () => {
            try {
                setLoading(true);
                const user = await getInfoOwner.getUserInfoByPostId(postId);
                setUserInfo(user);

                if (user?.id) {
                    const response = await axiosClient.get(
                        `/rental_post/api/by-user/${user.id}/`
                    );

                    setRooms(response.data.results || []);
                }
            } catch (err) {
                console.error(
                    "Không thể lấy thông tin chủ nhà hoặc phòng:",
                    err
                );
                setError("Không thể tải thông tin.");
            } finally {
                setLoading(false);
            }
        };

        if (postId) fetchOwnerInfo();
    }, [postId]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "Chưa cập nhật";
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (loading)
        return <div className="text-center p-5">Đang tải thông tin...</div>;
    if (error)
        return <div className="text-danger text-center p-5">{error}</div>;

    return (
        <div>
            <div className={styles.profileContainer}>
                <div className={styles.profileContent}>
                    <UserCard
                        avatar={userInfo?.avatar}
                        name={userInfo?.fullname}
                        start={"2.4"}
                        totalComment={"12 đánh giá"}
                        year={"2"}
                        canEditAvatar={false}
                    />
                    <div className="p-3 rounded mt-3">
                        <div>
                            <div className={`${styles.groupHover} d-flex`}>
                                <h5
                                    className="fw-bold mb-3 d-flex align-items-center"
                                    style={{
                                        color: "var(--text-primary-color)",
                                    }}
                                >
                                    <PersonCircle className="me-2" /> Thông tin
                                    cá nhân chủ trọ
                                </h5>
                            </div>
                            <ul className="list-unstyled mb-4 ps-3">
                                <li className="mb-2 d-flex align-items-center">
                                    <PersonFill className="me-2 text-secondary" />
                                    <b>Họ và tên:</b>{" "}
                                    {userInfo?.fullname || "Chưa cập nhật"}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <GeoAltFill className="me-2 text-secondary" />
                                    <b>Địa chỉ:</b>{" "}
                                    {userInfo?.address?.address_name ||
                                        "Chưa cập nhật"}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <SignpostSplitFill className="me-2 text-secondary" />
                                    <b>Tên đường:</b>{" "}
                                    {userInfo?.address?.district_name ||
                                        "Chưa cập nhật"}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <Building
                                        className="me-2 text-secondary"
                                        style={{ width: "1.2em" }}
                                    />
                                    <b>Thành phố:</b>{" "}
                                    {userInfo?.address?.city_name ||
                                        "Chưa cập nhật"}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <CalendarDate className="me-2 text-secondary" />
                                    <b>Sinh nhật:</b>{" "}
                                    {formatDate(userInfo?.birthday)}
                                </li>
                            </ul>

                            <div className={`${styles.groupHover} d-flex`}>
                                <h5
                                    className="fw-bold mb-3 d-flex align-items-center"
                                    style={{
                                        color: "var(--text-primary-color)",
                                    }}
                                >
                                    <TelephoneInboundFill className="me-2" />{" "}
                                    Thông tin liên hệ
                                </h5>
                            </div>
                            <ul className="list-unstyled ps-3">
                                <li className="mb-2 d-flex align-items-center">
                                    <EnvelopeFill className="me-2 text-secondary" />
                                    <b>Email:</b> {userInfo?.email}
                                </li>
                                <li className="mb-2 d-flex align-items-center">
                                    <PhoneFill className="me-2 text-secondary" />
                                    <b>SĐT:</b>{" "}
                                    {userInfo?.phone_number || "Chưa cập nhật"}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" w-100 m-5 mt-0">
                    <h5
                        className="fw-bold mb-3"
                        style={{ color: "var(--text-primary-color)" }}
                    >
                        Các phòng đã đăng
                    </h5>
                    <RoomProfile
                        loading={loading}
                        error={error}
                        rooms={currentRooms}
                        role="owner"
                        startIndex={0}
                        direction={0}
                    />
                    {rooms.length > roomsPerPage && (
                        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                            <ButtonPrimary
                                des={"Trang trước"}
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                            />
                            <span>
                                Trang {currentPage} / {totalPages}
                            </span>
                            <ButtonPrimary
                                des={"Trang sau"}
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileOwner;

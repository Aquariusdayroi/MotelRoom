import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/AreaModal.module.css"; // Có thể tái sử dụng styles
import roomTypeApi from "../../api/searchApi/roomTypeApi";

const RoomTypeModal = ({
    open,
    onClose,
    anchorEl,
    filteredRoomTypes = [],
    isHeaderSearch,
    onSelect,
}) => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const modalRef = useRef(null);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            setLoading(true);
            try {
                const response = await roomTypeApi.getAll();
                const data = response.data;
                // Extract unique home types and create roomTypes array
                const uniqueHomeTypes = [
                    ...new Set(data.results.map((item) => item.home_type)),
                ];
                const formattedRoomTypes = uniqueHomeTypes.map(
                    (type, index) => ({
                        name: type,
                        description: getDescription(type),
                        color: getColor(index),
                    })
                );

                setRoomTypes(formattedRoomTypes);
            } catch (err) {
                setError("Không thể tải danh sách loại phòng");
                console.error("Error fetching room types:", err);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchRoomTypes();
        }
    }, [open]);

    const getDescription = (type) => {
        const descriptions = {
            "Phòng trọ": "Phòng đơn giản, giá cả phải chăng",
            "Căn hộ Studio": "Căn hộ nhỏ gọn, đầy đủ tiện nghi",
            "Căn hộ Mini": "Căn hộ có không gian riêng tư",
            "Nhà nguyên căn": "Nhà riêng biệt, phù hợp gia đình",
            Homestay: "Không gian sống độc đáo, tiện nghi",
        };
        return descriptions[type] || "Chưa có mô tả";
    };
    const getColor = (index) => {
        const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];
        return colors[index % colors.length];
    };
    const displayRoomTypes =
        filteredRoomTypes.length > 0 ? filteredRoomTypes : roomTypes;

    useEffect(() => {
        if (open && anchorEl) {
            const updatePosition = () => {
                const rect = anchorEl.getBoundingClientRect();
                const modalWidth = 400;
                let left = rect.left;

                if (left + modalWidth > window.innerWidth) {
                    left = window.innerWidth - modalWidth - 10;
                }

                setPosition({
                    top: rect.bottom - (isHeaderSearch ? 58 : 0),
                    left: left,
                    width: modalWidth,
                });
            };

            updatePosition();
            window.addEventListener("scroll", updatePosition);
            window.addEventListener("resize", updatePosition);

            return () => {
                window.removeEventListener("scroll", updatePosition);
                window.removeEventListener("resize", updatePosition);
            };
        }
    }, [open, anchorEl, isHeaderSearch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                anchorEl &&
                !anchorEl.contains(event.target)
            ) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, anchorEl, onClose]);

    if (!open || !anchorEl || !position) return null;

    return (
        <div
            ref={modalRef}
            className={styles.modal}
            style={{
                top: position?.top ?? 0,
                left: position?.left ?? 0,
                width: position?.width ?? "auto",
                opacity: position ? 1 : 0,
                visibility: position ? "visible" : "hidden",
                transition:
                    "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
            }}
        >
            <div className={styles.modalHeader}>
                <span>
                    {filteredRoomTypes.length > 0
                        ? "Kết quả tìm kiếm"
                        : "Loại phòng phổ biến"}
                </span>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    ×
                </button>
            </div>

            {loading && <div className={styles.loading}>Đang tải...</div>}
            {error && <div className={styles.error}>{error}</div>}

            {!loading && !error && (
                <ul className={styles.list}>
                    {displayRoomTypes.map((roomType, index) => (
                        <li
                            key={index}
                            className={styles.listItem}
                            onClick={() => {
                                onSelect(roomType.name);
                                onClose();
                            }}
                        >
                            <div className={styles.listItemIcon}>
                                <div
                                    className={styles.dot}
                                    style={{ backgroundColor: roomType.color }}
                                />
                            </div>
                            <div className={styles.listItemContent}>
                                <h3 className={styles.listItemTitle}>
                                    {roomType.name}
                                </h3>
                                <p className={styles.listItemDescription}>
                                    {roomType.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoomTypeModal;

import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/AreaModal.module.css"; // Có thể tái sử dụng styles

export const roomTypes = [
    {
        name: "Phòng trọ",
        description: "Phòng đơn giản, giá cả phải chăng",
        color: "#f44336",
    },
    {
        name: "Căn hộ Studio",
        description: "Căn hộ nhỏ gọn, đầy đủ tiện nghi",
        color: "#2196f3",
    },
    {
        name: "Căn hộ Mini",
        description: "Căn hộ có không gian riêng tư",
        color: "#4caf50",
    },
    {
        name: "Nhà nguyên căn",
        description: "Nhà riêng biệt, phù hợp gia đình",
        color: "#ff9800",
    },
    {
        name: "Homestay",
        description: "Không gian sống độc đáo, tiện nghi",
        color: "#9c27b0",
    },
];

const RoomTypeModal = ({
    open,
    onClose,
    anchorEl,
    filteredRoomTypes = [],
    isHeaderSearch,
    onSelect,
}) => {
    const [position, setPosition] = useState(null);
    const modalRef = useRef(null);
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
            onClick={(e) => e.stopPropagation()}
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
            <ul className={styles.list}>
                {displayRoomTypes.map((roomType, index) => (
                    <li
                        key={index}
                        className={styles.listItem}
                        onClick={() => {
                            onSelect(roomType.name); // Thêm onSelect handler
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
        </div>
    );
};

export default RoomTypeModal;

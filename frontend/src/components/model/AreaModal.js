import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/AreaModal.module.css";

export const destinations = [
    {
        name: "Hà Nội",
        description: "Có các thắng cảnh như Nhà hát lớn Hà Nội",
        color: "#f44336",
    },
    {
        name: "Vũng Tàu, Bà Rịa - Vũng Tàu",
        description: "Có đường bờ biển tuyệt đẹp",
        color: "#2196f3",
    },
    {
        name: "Đà Lạt, Lâm Đồng",
        description: "Phù hợp cho người yêu thiên nhiên",
        color: "#4caf50",
    },
    {
        name: "Bangkok, Thái Lan",
        description: "Có cuộc sống về đêm náo nhiệt",
        color: "#ff9800",
    },
    {
        name: "Nha Trang, Khánh Hòa",
        description: "Có các thắng cảnh như Chùa Ponagar",
        color: "#2196f3",
    },
    {
        name: "Đà Nẵng, Đà Nẵng",
        description: "Điểm đến có bãi biển được ưa chuộng",
        color: "#2196f3",
    },
];

const AreaModal = ({
    open,
    onClose,
    anchorEl,
    filteredDestinations = [],
    isHeaderSearch,
    onSelect,
}) => {
    const [position, setPosition] = useState(null); // Thay đổi giá trị khởi tạo
    const modalRef = useRef(null);
    const displayDestinations =
        filteredDestinations.length > 0 ? filteredDestinations : destinations;

    useEffect(() => {
        if (open && anchorEl) {
            const updatePosition = () => {
                const rect = anchorEl.getBoundingClientRect();
                const modalWidth = 400;
                let left = rect.left;

                if (left + modalWidth > window.innerWidth) {
                    left = window.innerWidth - modalWidth - 10;
                }

                // Điều chỉnh top giảm 58px tại đây
                setPosition({
                    // Chỉ giảm top 58px khi là header search
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
                    {filteredDestinations.length > 0
                        ? "Kết quả tìm kiếm"
                        : "Khu vực được đề xuất"}
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
                {displayDestinations.map((destination, index) => (
                    <li
                        key={index}
                        className={styles.listItem}
                        onClick={() => {
                            onSelect(destination.name); // Thêm onSelect handler
                            onClose();
                        }}
                    >
                        <div className={styles.listItemIcon}>
                            <div
                                className={styles.dot}
                                style={{ backgroundColor: destination.color }}
                            />
                        </div>
                        <div className={styles.listItemContent}>
                            <h3 className={styles.listItemTitle}>
                                {destination.name}
                            </h3>
                            <p className={styles.listItemDescription}>
                                {destination.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AreaModal;

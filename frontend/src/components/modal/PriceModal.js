import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/AreaModal.module.css";

export const priceRanges = [
    {
        from: 500000,
        to: 1000000,
        description: "Phù hợp sinh viên",
        color: "#f44336",
    },
    {
        from: 1000000,
        to: 2000000,
        description: "Phòng tiết kiệm",
        color: "#2196f3",
    },
    {
        from: 2000000,
        to: 3000000,
        description: "Phòng tiện nghi cơ bản",
        color: "#4caf50",
    },
    {
        from: 3000000,
        to: 5000000,
        description: "Phòng đầy đủ tiện nghi",
        color: "#ff9800",
    },
    {
        from: 5000000,
        to: 10000000,
        description: "Căn hộ cao cấp",
        color: "#9c27b0",
    },
    {
        from: 10000000,
        to: 20000000,
        description: "Penthouse/Villa",
        color: "#795548",
    },
];

const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const PriceModal = ({
    open,
    onClose,
    anchorEl,
    isHeaderSearch,
    onPriceSelect,
    isFromPrice = true,
}) => {
    const [position, setPosition] = useState(null);
    const modalRef = useRef(null);

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
                <span>{isFromPrice ? "Giá từ" : "Đến giá"}</span>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    ×
                </button>
            </div>
            <ul className={styles.list}>
                {priceRanges.map((range, index) => (
                    <li
                        key={index}
                        className={styles.listItem}
                        onClick={() => {
                            onPriceSelect(isFromPrice ? range.from : range.to);
                            onClose();
                        }}
                    >
                        <div className={styles.listItemIcon}>
                            <div
                                className={styles.dot}
                                style={{ backgroundColor: range.color }}
                            />
                        </div>
                        <div className={styles.listItemContent}>
                            <h3 className={styles.listItemTitle}>
                                {isFromPrice
                                    ? `Từ ${formatPrice(range.from)}`
                                    : `Đến ${formatPrice(range.to)}`}
                            </h3>
                            <p className={styles.listItemDescription}>
                                {range.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PriceModal;

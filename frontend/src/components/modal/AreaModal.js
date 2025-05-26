import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/AreaModal.module.css";
import areaApi from "../../api/searchApi/areaApi";
const AreaModal = ({
    open,
    onClose,
    anchorEl,
    isHeaderSearch,
    onSelect,
    filteredDestinations,
}) => {
    const [position, setPosition] = useState(null);
    const [apiResults, setApiResults] = useState([]);
    const modalRef = useRef(null);
    const [currentLat, setCurrentLat] = useState(10.822401263655559);
    const [currentLng, setCurrentLng] = useState(106.687317464751);

    useEffect(() => {
        if (filteredDestinations && filteredDestinations.length > 0) {
            setApiResults(filteredDestinations);
        }
    }, [filteredDestinations]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLat(position.coords.latitude);
                setCurrentLng(position.coords.longitude);
            });
        }
    }, []);

    useEffect(() => {
        if (open && currentLat && currentLng) {
            areaApi(currentLat, currentLng).then((results) => {
                console.log("API Responsexxx:", results);
                setApiResults(
                    results.map((item) => ({
                        id: item.id,
                        name: item.address?.address_name,
                        description: item.title,
                        color: "#2196f3",
                        coordinates: {
                            lat: item.address.latitude, // Lấy từ item.address
                            lng: item.address.longitude, // Lấy từ item.address
                        },
                    }))
                );
            });
        }
    }, [open, currentLat, currentLng]);

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

    const hasCoordinates = (destination) => {
        return (
            destination.coordinates &&
            destination.coordinates.lat &&
            destination.coordinates.lng
        );
    };

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
                    {apiResults.length > 0
                        ? "Kết quả khu vực gợi ý"
                        : "Đang tải dữ liệu..."}
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
                {apiResults.map((destination) => (
                    <li
                        key={destination.id}
                        className={styles.listItem}
                        onClick={() => {
                            if (hasCoordinates(destination)) {
                                // Trường hợp 1: Có tọa độ sẵn từ backend
                                console.log(
                                    "Using existing coordinates:",
                                    destination.coordinates
                                );
                                onSelect({
                                    id: destination.id,
                                    name: destination.name,
                                    coordinates: {
                                        lat: parseFloat(
                                            destination.coordinates.lat
                                        ),
                                        lng: parseFloat(
                                            destination.coordinates.lng
                                        ),
                                    },
                                });
                            } else {
                                // Trường hợp 2: Địa điểm người dùng nhập, cần search từ Mapbox
                                console.log(
                                    "Searching coordinates for:",
                                    destination.name
                                );
                                onSelect({
                                    id: destination.id,
                                    name: destination.name,
                                    needGeocoding: true, // Flag để component cha biết cần tìm tọa độ
                                });
                            }
                            onClose();
                        }}
                    >
                        <div className={styles.listItemIcon}>
                            <div
                                className={styles.dot}
                                style={{ backgroundColor: destination.color }}
                            />
                        </div>
                        <div className={styles.locationInfo}>
                            <div className={styles.name}>
                                {destination.name}
                            </div>
                            <div className={styles.description}>
                                {destination.description}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AreaModal;

import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "../styles/Search.module.css";
import ButtonPrimary from "./buttonUI/ButtonPrimary";
import ItemSearch from "./inputUI/ItemSearch";
import AreaModal from "./modal/AreaModal";
import RoomTypeModal from "./modal/RoomTypeModal";
import PriceModal from "./modal/PriceModal";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import roomTypeApi from "../api/searchApi/roomTypeApi";
import mapboxApi from "../api/mapboxApi";

const DEBOUNCE_DELAY = 500;

const SearchBar = ({
    inHeader = false,
    onExpandChange,
    isHeaderSearch = false,
}) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const inputRef = useRef(null);
    const [isRoomTypeModalOpen, setIsRoomTypeModalOpen] = useState(false);
    const [roomTypeAnchorEl, setRoomTypeAnchorEl] = useState(null);
    const [isPriceFromModalOpen, setIsPriceFromModalOpen] = useState(false);
    const [isPriceToModalOpen, setIsPriceToModalOpen] = useState(false);
    const [priceFromAnchorEl, setPriceFromAnchorEl] = useState(null);
    const [priceToAnchorEl, setPriceToAnchorEl] = useState(null);

    const [selectedArea, setSelectedArea] = useState({
        name: "",
        lat: null,
        lng: null,
    });

    const [area, setArea] = useState("");
    const [roomType, setRoomType] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
    const searchRef = useRef(null);

    const closeAllModals = () => {
        setIsModalOpen(false);
        setIsRoomTypeModalOpen(false);
        setIsPriceFromModalOpen(false);
        setIsPriceToModalOpen(false);
        setAnchorEl(null);
        setRoomTypeAnchorEl(null);
        setPriceFromAnchorEl(null);
        setPriceToAnchorEl(null);
    };

    const handleOpenModal = (event) => {
        closeAllModals();
        setAnchorEl(event.currentTarget);
        setIsExpanded(true);
        if (onExpandChange) {
            onExpandChange(true);
        }
        setTimeout(() => {
            setIsModalOpen(true);
            setIsAnyModalOpen(true);
        }, 290);
    };

    const handleCloseModal = () => {
        setAnchorEl(null);
        setIsModalOpen(false);
        if (!isAnyModalOpen) {
            setIsExpanded(false);
            if (onExpandChange) {
                onExpandChange(false);
            }
        }
    };

    const handleAreaChange = async (e) => {
        const value = e.target.value;
        setArea(value); // Chỉ cập nhật giá trị hiển thị

        if (!value.trim()) {
            setFilteredDestinations([]);
            return;
        }

        // Chỉ gọi hàm debounced để xử lý tìm kiếm
        debouncedLocationSearch(value);
    };

    const handleAreaSelect = async (suggestion) => {
        if (!suggestion) return;
        console.log("Selected suggestion:", suggestion);

        try {
            if (suggestion.coordinates) {
                console.log(
                    "Using existing coordinates:",
                    suggestion.coordinates
                );
                setArea(suggestion.name);
                setSelectedArea({
                    name: suggestion.name,
                    lat: parseFloat(suggestion.coordinates.lat),
                    lng: parseFloat(suggestion.coordinates.lng),
                });
            } else {
                try {
                    const locationDetails = await mapboxApi.retrieveLocation(
                        suggestion.id
                    );

                    if (locationDetails && locationDetails.coordinates) {
                        console.log(
                            "Retrieved coordinates from Search API:",
                            locationDetails.coordinates
                        );
                        setArea(suggestion.name);
                        setSelectedArea({
                            name: suggestion.name,
                            ...locationDetails.coordinates,
                        });
                    } else {
                        console.log("Falling back to Geocoding API");
                        const response = await fetch(
                            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                                suggestion.name
                            )}.json?access_token=${
                                process.env.REACT_APP_MAPBOX_TOKEN
                            }`
                        );
                        const data = await response.json();

                        if (data.features && data.features[0]) {
                            const coordinates = data.features[0].center;
                            setArea(suggestion.name);
                            setSelectedArea({
                                name: suggestion.name,
                                lng: coordinates[0],
                                lat: coordinates[1],
                            });
                        } else {
                            console.warn(
                                "No coordinates found for:",
                                suggestion.name
                            );
                        }
                    }
                } catch (error) {
                    console.error("Error getting coordinates:", error);
                }
            }

            if (window.map && selectedArea.lat && selectedArea.lng) {
                window.map.flyTo({
                    center: [selectedArea.lng, selectedArea.lat],
                    zoom: 15,
                });
            }

            handleCloseModal();
        } catch (error) {
            console.error("Error in handleAreaSelect:", error);
        }
    };

    const handleOpenRoomTypeModal = (event) => {
        closeAllModals();
        setRoomTypeAnchorEl(event.currentTarget);
        setIsExpanded(true);
        if (onExpandChange) {
            onExpandChange(true);
        }
        setTimeout(() => {
            setIsRoomTypeModalOpen(true);
            setIsAnyModalOpen(true);
        }, 290);
    };

    const handleCloseRoomTypeModal = () => {
        setRoomTypeAnchorEl(null);
        setIsRoomTypeModalOpen(false);
        if (!isAnyModalOpen) {
            setIsExpanded(false);
            if (onExpandChange) {
                onExpandChange(false);
            }
        }
    };
    const handleOpenPriceFromModal = (event) => {
        closeAllModals();
        setPriceFromAnchorEl(event.currentTarget);
        setIsExpanded(true);
        if (onExpandChange) {
            onExpandChange(true);
        }
        setTimeout(() => {
            setIsPriceFromModalOpen(true);
            setIsAnyModalOpen(true);
        }, 290);
    };

    const handleClosePriceFromModal = () => {
        setPriceFromAnchorEl(null);
        setIsPriceFromModalOpen(false);
        if (!isAnyModalOpen) {
            setIsExpanded(false);
            if (onExpandChange) {
                onExpandChange(false);
            }
        }
    };
    const handlePriceFromChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPriceFrom(value);
    };

    const handlePriceToChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPriceTo(value);
    };

    const handleOpenPriceToModal = (event) => {
        closeAllModals();
        setPriceToAnchorEl(event.currentTarget);
        setIsExpanded(true);
        if (onExpandChange) {
            onExpandChange(true);
        }
        setTimeout(() => {
            setIsPriceToModalOpen(true);
            setIsAnyModalOpen(true);
        }, 290);
    };

    const handleClosePriceToModal = () => {
        setPriceToAnchorEl(null);
        setIsPriceToModalOpen(false);
        if (!isAnyModalOpen) {
            setIsExpanded(false);
            if (onExpandChange) {
                onExpandChange(false);
            }
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                closeAllModals();
                setIsExpanded(false);
                setIsAnyModalOpen(false);
                if (onExpandChange) {
                    onExpandChange(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const debouncedLocationSearch = useCallback(
        (() => {
            let timeoutId = null;
            return async (value) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(async () => {
                    if (!value.trim()) {
                        setFilteredDestinations([]);
                        return;
                    }
                    try {
                        const suggestions = await mapboxApi.searchLocation(
                            value
                        );
                        setFilteredDestinations(suggestions);
                    } catch (error) {
                        console.error("Lỗi khi tìm kiếm địa điểm:", error);
                        setFilteredDestinations([]);
                    }
                    timeoutId = null;
                }, DEBOUNCE_DELAY);
            };
        })(),
        []
    );

    const handleSearch = async () => {
        setIsExpanded(false);
        setIsAnyModalOpen(false);
        if (onExpandChange) {
            onExpandChange(false);
        }

        const getNumericPrice = (price) => {
            if (typeof price === "number") return price;
            if (typeof price === "string") {
                return parseInt(price.replace(/[^\d]/g, "")) || undefined;
            }
            return undefined;
        };

        let searchParams = {
            page: 1,
            lat: selectedArea.lat,
            lng: selectedArea.lng,
            home_type: roomType ? roomType.trim() : undefined,
            min_price: getNumericPrice(priceFrom),
            max_price: getNumericPrice(priceTo),
        };

        const finalParams = Object.fromEntries(
            Object.entries(searchParams).filter(([_, v]) => v != null)
        );

        if (Object.keys(finalParams).length <= 1) {
            console.log("No search parameters provided");
            return;
        }

        try {
            console.log("Sending search request with params:", finalParams);
            const response = await roomTypeApi.searchByType(finalParams);

            if (!response.data || !response.data.results) {
                throw new Error("Invalid response format");
            }

            const rooms = response.data.results || [];

            navigate("/detail-search", {
                state: {
                    rooms,
                    searchParams: finalParams,
                    message:
                        rooms.length === 0
                            ? "Không có phòng theo nhu cầu"
                            : null,
                    timestamp: new Date().getTime(),
                },
                replace: true,
            });
        } catch (error) {
            console.error("Search error:", error);
            navigate("/detail-search", {
                state: {
                    message: "Có lỗi xảy ra khi tìm kiếm: " + error.message,
                    searchParams: finalParams,
                    timestamp: new Date().getTime(),
                },
                replace: true,
            });
        }
    };

    return (
        <div
            ref={searchRef}
            className={`${styles.search} ${
                inHeader ? styles.searchInHeader : ""
            } ${inHeader && isExpanded ? styles.expanded : ""}`}
        >
            <div className={styles.container}>
                <div
                    className={`${styles.groupBtn} ${
                        inHeader && !isExpanded ? styles.headerGroupBtn : ""
                    }`}
                >
                    <ItemSearch
                        className={styles.title}
                        title="Khu vực"
                        placeholder="Tìm kiếm khu vực đến"
                        inHeader={inHeader && !isExpanded}
                        onClick={(e) => {
                            e.preventDefault();
                            handleOpenModal(e);
                        }}
                        onChange={(e) => {
                            e.stopPropagation();
                            handleAreaChange(e);
                        }}
                        value={area}
                        ref={inputRef}
                    />
                    <ItemSearch
                        className={styles.title}
                        title="Loại phòng"
                        placeholder="Tìm kiếm loại phòng"
                        inHeader={inHeader && !isExpanded}
                        onClick={handleOpenRoomTypeModal}
                        onChange={(e) => setRoomType(e.target.value)}
                        value={roomType}
                    />
                    <ItemSearch
                        className={styles.title}
                        title="Giá từ"
                        placeholder="Chọn giá từ"
                        inHeader={inHeader && !isExpanded}
                        onClick={handleOpenPriceFromModal}
                        onChange={handlePriceFromChange}
                        value={
                            priceFrom != null && priceFrom !== ""
                                ? Number(priceFrom).toLocaleString("vi-VN")
                                : ""
                        }
                    />

                    <ItemSearch
                        className={styles.title}
                        title="Đến giá"
                        placeholder="Chọn giá đến"
                        inHeader={inHeader && !isExpanded}
                        onClick={handleOpenPriceToModal}
                        onChange={handlePriceToChange}
                        value={
                            priceTo != null && priceTo !== ""
                                ? Number(priceTo).toLocaleString("vi-VN")
                                : ""
                        }
                    />
                    <div>
                        <ButtonPrimary
                            icon={<Search size={30} />}
                            className={styles.searchButton}
                            onClick={handleSearch}
                        />
                    </div>
                </div>
            </div>

            <AreaModal
                open={isModalOpen}
                onClose={handleCloseModal}
                anchorEl={anchorEl}
                filteredDestinations={filteredDestinations}
                isHeaderSearch={isHeaderSearch}
                onSelect={handleAreaSelect}
            />
            <RoomTypeModal
                open={isRoomTypeModalOpen}
                onClose={handleCloseRoomTypeModal}
                anchorEl={roomTypeAnchorEl}
                isHeaderSearch={isHeaderSearch}
                onSelect={(value) => {
                    const roomTypeValue = value.toString();
                    setRoomType(roomTypeValue);
                    console.log(
                        "Selected room type (processed):",
                        roomTypeValue
                    );
                }}
            />
            <PriceModal
                open={isPriceFromModalOpen}
                onClose={handleClosePriceFromModal}
                anchorEl={priceFromAnchorEl}
                isHeaderSearch={isHeaderSearch}
                onPriceSelect={(price) => setPriceFrom(price)}
                isFromPrice={true}
            />

            <PriceModal
                open={isPriceToModalOpen}
                onClose={handleClosePriceToModal}
                anchorEl={priceToAnchorEl}
                isHeaderSearch={isHeaderSearch}
                onPriceSelect={(price) => setPriceTo(price)}
                isFromPrice={false}
            />
        </div>
    );
};

export default SearchBar;

import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Search.module.css";
import ButtonPrimary from "./buttonUI/ButtonPrimary";
import ItemSearch from "./buttonUI/ItemSearch";
import AreaModal, { destinations } from "./modal/AreaModal";
import RoomTypeModal from "./modal/RoomTypeModal";
import PriceModal from "./modal/PriceModal";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import roomTypeApi from "../api/searchApi/roomTypeApi";

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

    const handleAreaChange = (e) => {
        const value = e.target.value;
        setArea(value);
        const filtered = destinations.filter((dest) =>
            dest.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDestinations(filtered);
    };

    const handleAreaFocus = (event) => {
        handleOpenModal(event);
        setFilteredDestinations(destinations);
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

    const handleSearch = async () => {
        // Nếu không có điều kiện tìm kiếm nào, không làm gì cả
        if (!area && !roomType && !priceFrom && !priceTo) {
            return;
        }

        try {
            // Xây dựng object params cho API call
            const searchParams = {};
            if (area) searchParams.area = area;
            if (roomType) searchParams.home_type = roomType;
            if (priceFrom) searchParams.min_price = priceFrom;
            if (priceTo) searchParams.max_price = priceTo;

            // Gọi API search với các params
            const response = await roomTypeApi.searchByType(searchParams);
            const rooms = response.data.results.data;

            // Nếu không có kết quả
            if (!rooms || rooms.length === 0) {
                navigate("/detail-search", {
                    state: {
                        message: "Không có phòng theo nhu cầu",
                        searchParams,
                    },
                });
                return;
            }

            // Chuyển hướng đến trang detail-search với kết quả
            navigate("/detail-search", {
                state: {
                    rooms,
                    searchParams,
                },
            });
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            navigate("/detail-search", {
                state: {
                    message: "Có lỗi xảy ra khi tìm kiếm",
                    // eslint-disable-next-line no-undef
                    searchParams,
                },
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
                        onClick={handleOpenModal}
                        onChange={handleAreaChange}
                        onFocus={handleAreaFocus}
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
                            priceFrom
                                ? new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                  }).format(priceFrom)
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
                            priceTo
                                ? new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                  }).format(priceTo)
                                : ""
                        }
                    />
                    <div>
                        <ButtonPrimary
                            icon={<Search size={30} />}
                            className={styles.searchButton}
                            onClick={() => handleSearch()} // Đơn giản hóa xử lý onClick
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
                onSelect={(value) => setArea(value)}
            />
            <RoomTypeModal
                open={isRoomTypeModalOpen}
                onClose={handleCloseRoomTypeModal}
                anchorEl={roomTypeAnchorEl}
                isHeaderSearch={isHeaderSearch}
                onSelect={(value) => setRoomType(value)}
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

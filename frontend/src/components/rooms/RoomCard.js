import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from '../../styles/RoomCard.module.css';
import { images } from '../../assets/images';
import { AuthToken } from '../../authToken';
import axiosClient from '../../api/axiosClient';

const RoomCard = ({
    id,
    images: imgList,
    title,
    address,  // This is now the address object containing address_name, city_name, district_name
    user: owner,
    price,
    home_type: type,
    acreage: area,
    isNew,
    onClick,
    onLocationClick,
    is_favorite,
    onDelete,
    onEdit,
    isOwnerView,
}) => {
    let { user, role, logout } = useContext(AuthToken);
    const [isFavorite, setIsFavorite] = useState(is_favorite);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const imageList =
        imgList.length > 0
            ? imgList
            : [
                {
                    image_url: images.emptyImg,
                },
            ];

    const nextImage = (e) => {
        e.preventDefault();
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentImageIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
        setCurrentImageIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const previousImage = (e) => {
        e.preventDefault();
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const goToImage = (index) => {
        if (isTransitioning || index === currentImageIndex) return;
        setIsTransitioning(true);
        setCurrentImageIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const handleSetFavorite = async (e) => {
        e.preventDefault();

        try {
            if (isFavorite) {
                await axiosClient.delete(`/favorite/api/delete/${id}/`);
            } else {
                await axiosClient.post(`/favorite/api/add/${id}/`);
            }

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageContainer}>
                <div
                    className={styles.imageSlider}
                    style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                    }}
                >
                    {imageList.map((image, index) => (
                        <div key={index} className={styles.imageWrapper}>                            <img
                            src={image.image_url}
                            alt={`${address?.address_name || ''} - ${index + 1}`}
                            className={styles.image}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = images.emptyImg;
                            }}
                        />
                        </div>
                    ))}
                </div>
                {isNew && <span className={styles.newBadge}>Mới</span>}                {user && (
                    <button className={styles.favoriteButton} onClick={handleSetFavorite}>
                        {isFavorite ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="red"
                                width="20"
                                height="20"
                            >
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                width="20"
                                height="20"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                        )}
                    </button>
                )}
                {imageList.length > 1 && (
                    <>
                        <button
                            className={`${styles.slideButton} ${styles.prevButton}`}
                            onClick={previousImage}
                            disabled={isTransitioning}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                width="20"
                                height="20"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            className={`${styles.slideButton} ${styles.nextButton}`}
                            onClick={nextImage}
                            disabled={isTransitioning}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                width="20"
                                height="20"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                        <div className={styles.dots}>
                            {imageList.map((_, index) => (
                                <span
                                    key={index} className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        goToImage(index);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className={styles.content}>                <h3 className={styles.address}>{title}</h3>
                <div className={`${styles.location} ${styles.clickable}`} onClick={onLocationClick}>
                    <div>                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="18px"
                        height="18px" style={{ marginBottom: '7px' }}
                    >
                        <path
                            fillRule="evenodd"
                            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clipRule="evenodd"
                        />
                    </svg>
                        {address?.address_name}
                    </div>
                </div>
                <div>
                    <div className={styles.owner}>
                        {owner?.avatar && (
                            <img
                                src={`http://localhost:8000${owner.avatar}`}
                                alt={owner.id}
                                className={styles.ownerAvatar}
                            />
                        )}
                        <span>Chủ nhà: {owner?.fullname}</span>
                    </div>                    <div className={styles.details}>
                        <div className={styles.price}>Từ: {price / 1000000} triệu/tháng</div>
                        <div className={styles.infoRow}>
                            <div className={styles.info}>
                                Loại hình: {type}, {Math.floor(area)}m²
                            </div>
                            {isOwnerView && (
                                <div className={styles.menuContainer} ref={menuRef}>
                                    <button
                                        className={styles.menuButton}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsMenuOpen(!isMenuOpen);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="5" cy="12" r="2" />
                                            <circle cx="12" cy="12" r="2" />
                                            <circle cx="19" cy="12" r="2" />
                                        </svg>
                                    </button>                                {isMenuOpen && (<div className={styles.menuDropdown}>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onEdit && onEdit(id);
                                                setIsMenuOpen(false);
                                            }}
                                            className={styles.editButton}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onDelete && onDelete(id);
                                                setIsMenuOpen(false);
                                            }}
                                            className={styles.deleteButton}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;

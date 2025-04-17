import React, { useState, useEffect } from "react";
import styles from "../styles/RoomCard.module.css";
import { images } from "../assets/images";

const RoomCard = ({
    images: imageList = [images.background],
    address,
    location,
    owner,
    price,
    type,
    area,
    isNew,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nextImage = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const previousImage = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
        );
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const goToImage = (index) => {
        if (isTransitioning || index === currentImageIndex) return;
        setIsTransitioning(true);
        setCurrentImageIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <div
                    className={styles.imageSlider}
                    style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                    }}
                >
                    {imageList.map((image, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <img
                                src={image}
                                alt={`${address} - ${index + 1}`}
                                className={styles.image}
                            />
                        </div>
                    ))}
                </div>
                {isNew && <span className={styles.newBadge}>Mới</span>}
                <button
                    className={styles.favoriteButton}
                    onClick={() => setIsFavorite(!isFavorite)}
                >
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                        <div className={styles.dots}>
                            {imageList.map((_, index) => (
                                <span
                                    key={index}
                                    className={`${styles.dot} ${
                                        index === currentImageIndex
                                            ? styles.activeDot
                                            : ""
                                    }`}
                                    onClick={() => goToImage(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.address}>{address}</h3>
                <div className={styles.location}>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="18px"
                            height="18px"
                            style={{ marginBottom: "7px" }}
                        >
                            <path
                                fillRule="evenodd"
                                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {location}
                    </div>
                </div>
                <div className={styles.owner}>
                    <img
                        src={images.Header}
                        alt={owner}
                        className={styles.ownerAvatar}
                    />
                    <span>Chủ nhà: {owner}</span>
                </div>
                <div className={styles.details}>
                    <div className={styles.price}>Từ: {price}/tháng</div>
                    <div className={styles.info}>
                        Loại hình: {type}, {area}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;

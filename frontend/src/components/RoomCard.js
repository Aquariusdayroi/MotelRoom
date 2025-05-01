import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/RoomCard.module.css";
import { images } from "../assets/images";
import room1 from "../assets/management-img/img1.png";
import room2 from "../assets/management-img/img2.jpg";
import room3 from "../assets/management-img/img3.jpg";


const RoomCard = ({
  images: imageList = [images.background],
  title,
  location,
  owner,
  price,
  type,
  area,
  isNew,
  onDelete,
  onEdit,
  onHide,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                alt={`${title} - ${index + 1}`}
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
          {isFavorite ? "❤️" : "🤍"}
        </button>
        {imageList.length > 1 && (
          <>
            <button
              className={`${styles.slideButton} ${styles.prevButton}`}
              onClick={previousImage}
              disabled={isTransitioning}
            >
              ◀
            </button>
            <button
              className={`${styles.slideButton} ${styles.nextButton}`}
              onClick={nextImage}
              disabled={isTransitioning}
            >
              ▶
            </button>
          </>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.address}>{title}</h3>
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
          <div className={styles.info}>Loại hình: {type}, {area}</div>
        </div>

        <div className={styles.menuDots} ref={menuRef}>
          <button
            className={styles.dotsButton}
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋮
          </button>
          {showMenu && (
            <div className={styles.dropdownContent}>
              <button onClick={onHide}>Ẩn</button>
              <button onClick={onEdit}>Chỉnh sửa</button>
              <button onClick={onDelete}>Xóa</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

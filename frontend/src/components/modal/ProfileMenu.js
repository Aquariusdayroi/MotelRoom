import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/ProfileMenu.module.css";

const ProfileMenu = ({ button, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const toggleModal = (event) => {
        event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
        setIsOpen((prev) => !prev); // Đảo trạng thái mở/đóng modal
    };

    const handleClickOutside = (event) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            !event.target.closest(`.${styles.dropdownContainer}`)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.dropdownContainer}>
            {/* Nút để mở/đóng modal */}
            <div onClick={toggleModal}>{button}</div>

            {/* Modal */}
            {isOpen && (
                <div ref={modalRef} className={styles.modal}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
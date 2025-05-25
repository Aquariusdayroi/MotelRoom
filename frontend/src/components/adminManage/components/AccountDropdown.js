import React, { useState, useRef, useEffect } from "react";
import styles from "../../../styles/AccountDropdown.module.css";
import ReactDOM from "react-dom";

export default function AccountDropdown({ status, onWarn, onAssign }) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef();

    const toggle = () => {
        if (!open && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX
        });
        }
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
        if (!triggerRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
        <span ref={triggerRef} className={styles.trigger} onClick={toggle}>...</span>
        {open &&
            ReactDOM.createPortal(
            <div className={styles.dropdown} style={{ top: position.top, left: position.left, position: "absolute" }}>
                <div className={styles.item}>Chi tiết</div>
                <div className={styles.item} onClick={onAssign}>Phân quyền</div>
                <div className={styles.item} onClick={onWarn}>Gửi cảnh báo</div>
                <div className={styles.item}>
                {status === "Bị khóa" ? "Mở tài khoản" : "Khóa tài khoản"}
                </div>
            </div>,
            document.body
            )}
        </>
    );
}

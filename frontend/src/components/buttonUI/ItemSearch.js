import styles from "../../styles/Search.module.css";

const ItemSearch = ({
    title,
    className,
    placeholder,
    inHeader,
    onClick,
    onChange,
    onFocus,
    value,
}) => {
    const handleClick = (e) => {
        e.stopPropagation();
        if (onClick) {
            onClick(e);
        }
    };

    const handleFocus = (e) => {
        e.stopPropagation();
        if (onFocus) {
            onFocus(e);
        }
    };

    return (
        <div
            className={`${inHeader ? styles.itemSearchHeader : ""}`}
            style={{ cursor: "pointer" }}
        >
            <div className={className}>{title}</div>
            <input
                placeholder={placeholder}
                onChange={onChange}
                onFocus={handleFocus}
                onClick={handleClick}
                value={value}
                style={{ zIndex: 2 }}
            />
        </div>
    );
};

export default ItemSearch;

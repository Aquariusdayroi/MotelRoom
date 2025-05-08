import { images } from "../../assets/images";
import styles from "../../styles/ButtonPrimary.module.css";

const ButtonPrimary = ({
    des,
    icon = null,
    avatar = false,
    className,
    onClick,
    disabled,
    avatarUrl,
    isActive = true,
}) => {
    return (
        <button
            className={`${
                isActive ? styles.buttonPrimary : styles.buttonPrimaryInActive
            } ${className} 
                        ${disabled ? styles.buttonPrimaryDisabled : ""}`}
            onClick={onClick}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {des}
            {avatar && (
                <img
                    src={avatarUrl || images.fallbackAvatar}
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                        width: "38px",
                        height: "38px",
                        objectFit: "cover",
                        marginLeft: "6px",
                        border: "2px solid #fff",
                    }}
                />
            )}
        </button>
    );
};
export default ButtonPrimary;

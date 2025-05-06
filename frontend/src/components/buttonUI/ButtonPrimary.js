import { images } from "../../assets/images";
import styles from "../../styles/ButtonPrimary.module.css";

const ButtonPrimary = ({
    des,
    icon = null,
    avatar = false,
    className,
    onClick,
}) => {
    return (
        <button
            className={`${styles.buttonPrimary} ${className}`}
            onClick={onClick}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {des}
            {avatar && (
                <img
                    src={images.background}
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                        width: "44px",
                        height: "44px",
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

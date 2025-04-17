import styles from "../../styles/ButtonPrimary.module.css";

const ButtonPrimary = ({ des, icon = false, className }) => {
    return (
        <button className={`${styles.buttonPrimary} ${className}`}>
            {icon && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    width="34px"
                    height="34px"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            )}
            {des}
        </button>
    );
};

export default ButtonPrimary;

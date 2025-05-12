function ButtonAction({ icon, text, onClick, className }) {
    return (
        <button className={`btn d-flex align-items-center gap-2 m-0 ${className}`} onClick={onClick}>
            {icon}
            <span className="fw-medium text-decoration-underline">{text}</span>
        </button>
    );
}

export default ButtonAction;

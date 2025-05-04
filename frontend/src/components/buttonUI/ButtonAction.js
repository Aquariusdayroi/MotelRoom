function ButtonAction({ icon, text, onClick }) {
    return (
        <button className="btn d-flex align-items-center gap-2" onClick={onClick}>
            {icon}
            <span className="fw-medium text-decoration-underline">{text}</span>
        </button>
    );
}

export default ButtonAction;

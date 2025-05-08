const InforCart = ({ title, totalUser, colorIndex = 0 }) => {
    const colors = ["var(--primary-color)", "#4CD986", "#FFCE5C"];

    return (
        <div className="card w-100">
            <div
                className="card-body"
                style={{
                    height: "130px",
                }}
            >
                <h5
                    className="card-title"
                    style={{
                        color: "var(--text-primary-color)",
                        fontSize: "16px",
                    }}
                >
                    {title}
                </h5>
                <h5
                    className="mt-4 display-6 fw-semibold"
                    style={{ color: colors[colorIndex] }}
                >
                    {totalUser}
                </h5>
            </div>
        </div>
    );
};
export default InforCart;

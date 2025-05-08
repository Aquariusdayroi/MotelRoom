import React from "react";

const ReviewCard = ({ rating, date, time, content, location }) => {
    const stars = Array.from({ length: 5 }, (_, i) => (
        <span
            key={i}
            className={i < rating ? "text-warning" : "text-secondary"}
        >
            ★
        </span>
    ));

    return (
        <div
            className="shadow-sm p-3"
            style={{
                maxHeight: "140px",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                flex: "0 0 auto", // ngăn co giãn bất thường trong flex
            }}
        >
            <div className="d-flex align-items-center flex-wrap">
                {stars}
                <span className="ms-3 text-muted" style={{ fontSize: "14px" }}>
                    {date} &nbsp; {time}
                </span>
            </div>
            <p
                style={{
                    fontSize: "14px",
                    paddingRight: "5rem",
                    margin: 0,
                    height: "50px",
                    width: "100%",
                }}
            >
                {content}
            </p>
            <small className="text-muted d-block">Tại: {location}</small>
        </div>
    );
};

export default ReviewCard;

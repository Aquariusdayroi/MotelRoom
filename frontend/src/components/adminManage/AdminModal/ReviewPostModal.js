import { useState } from "react";
import Detail from "../../../pages/Detail";
import ButtonPrimary from "../../buttonUI/ButtonPrimary";
import RefuseModal from "./RefuseModal";

const styles = {
    btnGray: "btn btn-secondary rounded-5",
};

const ReviewPostModal = ({ request, onNext, onSuccess }) => {
    const [showRefuseModal, setShowRefuseModal] = useState(false);
    return (
        <div>
            <p>
                Duyệt yêu cầu cho: <strong>{request?.fullname}</strong>
            </p>
            <Detail
                showAction={false}
                showReviews={false}
                roomData={request?.rental_post_data}
            />

            <div className="d-flex justify-content-end mt-3 align-items-center">
                <ButtonPrimary
                    des="Từ chối"
                    className={`${styles.btnGray}`}
                    onClick={() => setShowRefuseModal(true)}
                />

                <ButtonPrimary
                    des="Tiếp tục"
                    onClick={() => onNext(request?.id)}
                />
            </div>
            <RefuseModal
                show={showRefuseModal}
                onHide={() => setShowRefuseModal(false)}
                requestId={request.id}
                email={request.email}
                onSuccess={onSuccess}
            />
        </div>
    );
};
export default ReviewPostModal;

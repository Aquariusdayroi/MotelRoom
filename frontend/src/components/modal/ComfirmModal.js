import { Modal } from "react-bootstrap";
import ButtonPrimary from "../buttonUI/ButtonPrimary";
import { images } from "../../assets/images";

const styles = {
    btnGray: "btn btn-secondary rounded-5",
};

const ConfirmModal = ({ title, show, onHide, onConfirm }) => {
    return (
        <>
            {show && (
                <div
                    className="modal-backdrop fade show"
                    style={{
                        zIndex: 1050,
                        backgroundColor: "rgba(26, 26, 26, 0.1)",
                    }}
                ></div>
            )}

            <Modal
                show={show}
                onHide={onHide}
                centered
                backdrop="static"
                style={{ zIndex: 1060 }}
            >
                <Modal.Body className="text-center p-5">
                    <h5 className="mb-5">{title}</h5>
                    <img src={images.comfirm} className="w-50" />
                    <div className="d-flex justify-content-between mt-3 align-items-center gap-2">
                        <ButtonPrimary
                            des="Quay lại"
                            className={styles.btnGray}
                            onClick={onHide}
                        />
                        <ButtonPrimary des="Xác nhận" onClick={onConfirm} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ConfirmModal;

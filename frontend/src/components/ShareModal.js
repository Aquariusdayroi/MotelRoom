import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import CloseIcon from '@mui/icons-material/Close';
import zaloIcon from '../assets/img/zalo_icon.png';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

const ShareModal = ({ show, handleClose, linkToShare }) => {
    const [copied, setCopied] = useState(false);
    const link = linkToShare || window.location.href;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            alert('Trình duyệt không hỗ trợ copy clipboard');
        }
    };

    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    const zaloShareUrl = `https://zalo.me/share?url=${encodeURIComponent(link)}`;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className="d-flex align-items-center justify-content-between">
                <Modal.Title className="d-flex align-items-center gap-2">
                    <IosShareOutlinedIcon />
                    Chia sẻ
                </Modal.Title>
                <Button variant="light" onClick={handleClose} className="border-0 m-0">
                    <CloseIcon />
                </Button>
            </Modal.Header>

            <Modal.Body>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <input type="text" className="form-control" readOnly value={link} onClick={handleCopy} />
                    <Button
                        variant="primary"
                        className="mt-2 w-100 d-flex align-items-center justify-content-center gap-2"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <>
                                <CheckCircleOutlineIcon /> Đã sao chép!
                            </>
                        ) : (
                            <>
                                <ContentCopyIcon /> Sao chép liên kết
                            </>
                        )}
                    </Button>
                </div>

                <hr />

                <div className="d-flex justify-content-around">
                    <a
                        href={fbShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary d-flex align-items-center gap-2 justify-content-center"
                        style={{ textDecoration: 'none', width: '160px' }}
                    >
                        <FacebookIcon /> <span>Facebook</span>
                    </a>

                    <a
                        href={zaloShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary d-flex align-items-center gap-2 justify-content-center"
                        style={{ textDecoration: 'none', width: '160px' }}
                    >
                        <img src={zaloIcon} alt="Zalo" width={20} height={20} />
                        <span>Zalo</span>
                    </a>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ShareModal;

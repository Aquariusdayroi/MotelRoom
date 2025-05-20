import { useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../../styles/CCCDUpload.module.css';
import { images } from '../../../assets/images';

function CCCDUpload({ register, setValue, errors }) {
    const [frontImg, setFrontImg] = useState(null);
    const [backImg, setBackImg] = useState(null);

    const frontInputRef = useRef(null);
    const backInputRef = useRef(null);

    const handleFileChange = (e, side) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            if (side === 'front') {
                setFrontImg(previewUrl);
                setValue('frontCCCD', file, { shouldValidate: true, shouldDirty: true });
            } else {
                setBackImg(previewUrl);
                setValue('backCCCD', file, { shouldValidate: true, shouldDirty: true });
            }
        }
    };

    return (
        <>
            <label className="form-label">Hình ảnh căn cước</label>
            <span className="text-danger ms-1">*</span>
            <div className="d-flex align-items-center gap-5">
                {/* Mặt trước */}
                <div>
                    <label className={styles.label}>Mặt trước</label>
                    <div className={styles.uploadBox} onClick={() => frontInputRef.current?.click()}>
                        <img src={frontImg || images.cccdFront} alt="front" className={styles.imagePreview} />
                        {!frontImg && (
                            <div className={styles.overlay}>
                                <AddIcon fontSize="large" />
                                <span>Thêm ảnh</span>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={frontInputRef}
                        hidden
                        onChange={(e) => handleFileChange(e, 'front')}
                    />

                    <input
                        type="hidden"
                        {...register('frontCCCD', {
                            required: 'Không được để trống',
                        })}
                    />
                    {errors.frontCCCD && <p className="text-danger mt-1 w-100">{errors.frontCCCD.message}</p>}
                </div>

                {/* Mặt sau */}
                <div>
                    <label className={styles.label}>Mặt sau</label>
                    <div className={styles.uploadBox} onClick={() => backInputRef.current?.click()}>
                        <img src={backImg || images.cccdBack} alt="back" className={styles.imagePreview} />
                        {!backImg && (
                            <div className={styles.overlay}>
                                <AddIcon fontSize="large" />
                                <span>Thêm ảnh</span>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={backInputRef}
                        hidden
                        onChange={(e) => handleFileChange(e, 'back')}
                    />

                    <input
                        type="hidden"
                        {...register('backCCCD', {
                            required: 'Không được để trống',
                        })}
                    />
                    {errors.backCCCD && <p className="text-danger mt-1 w-100">{errors.backCCCD.message}</p>}
                </div>
            </div>
        </>
    );
}

export default CCCDUpload;

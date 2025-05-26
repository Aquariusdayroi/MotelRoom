import { useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import styles from '../../../styles/AvatarUpload.module.css';

function AvatarUpload({ register, setValue }) {
    const [avatarImg, setAvatarImg] = useState(null);
    const avatarInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAvatarImg(previewUrl);
            setValue('avatar', file, { shouldValidate: true, shouldDirty: true });
        }
    };

    return (
        <div className="d-flex flex-column align-items-start">
            <label className="form-label">Ảnh đại diện</label>

            <div className={styles.uploadBox} onClick={() => avatarInputRef.current?.click()}>
                {avatarImg ? (
                    <img src={avatarImg} alt="avatar" className={styles.previewImage} />
                ) : (
                    <AddPhotoAlternateOutlinedIcon fontSize="large" />
                )}
            </div>

            <input type="file" accept="image/*" ref={avatarInputRef} hidden onChange={handleFileChange} />
            <input type="hidden" {...register('avatar')} />
        </div>
    );
}

export default AvatarUpload;

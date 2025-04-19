import fallbackAvatar from '../assets/img/fallback_avatar.png';
import styles from '../styles/Avatar.module.css';

function Avatar({ src, alt, className = '' }) {
    return <img src={src || fallbackAvatar} alt={alt || 'avatar'} className={`${styles.avatar} ${className}`} />;
}

export default Avatar;

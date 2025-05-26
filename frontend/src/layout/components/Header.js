import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import styles from "../../styles/Header.module.css";
import ButtonLanguage from "../../components/buttonUI/ButtonLanguage";
import ButtonPrimary from "../../components/buttonUI/ButtonPrimary";
import { AuthToken } from "./../../authToken/index";
import SearchBar from "../../components/SearchBar";
import { AlignJustify } from "lucide-react";
import LoginModal from "../../components/modal/LoginModal";
import { getUserInfoById } from "../../api/userApi/getUserInfoById";
import decodeJwtPayload from "../../until/decodeJwt";

const Header = ({
    enableScroll = true,
    showBigSearch = true,
    enableSearch = true,
}) => {
    const { user, role } = useContext(AuthToken);
    const [isScrolled, setIsScrolled] = useState(!enableScroll);
    const [showContent, setShowContent] = useState(enableScroll);
    const [isInitialized, setIsInitialized] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(images.fallbackAvatar);

    useEffect(() => {
        if (!enableScroll) {
            setIsScrolled(true);
            setShowContent(false);
        }
        setIsInitialized(true);

        const handleScroll = () => {
            if (!enableScroll) return;
            setIsScrolled(window.scrollY > 50);
            setShowContent(window.scrollY <= 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [enableScroll]);

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setShowLoginModal(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => setShowLoginModal(false), 200);
        setTimeoutId(id);
    };

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const decoded = decodeJwtPayload(user);
                const res = await getUserInfoById(decoded.user_id);
                setAvatarUrl(res.avatar || images.fallbackAvatar);
            } catch (err) {
                console.error("Lỗi khi lấy avatar:", err);
                setAvatarUrl(images.fallbackAvatar);
            }
        };

        if (user) fetchAvatar();
    }, [user]);

    if (!isInitialized) return null;

    return (
        <div
            className={`${styles.container} ${
                !showContent ? styles.headerOnly : ""
            } ${isInitialized ? "initialized" : ""}`}
        >
            <header
                className={`${styles.header} ${
                    isScrolled ? styles.headerScrolled : ""
                }`}
            >
                <div className={styles.headerContent}>
                    <div className={styles.logoWrapper}>
                        <Link to="/home">
                            <img src={images.logo} className={styles.logo} />
                        </Link>
                    </div>

                    {isScrolled && enableSearch && (
                        <SearchBar inHeader={true} isHeaderSearch={true} />
                    )}

                    <div className={styles.buttonGroup}>
                        {!isScrolled && (
                            <div className="d-flex items-center gap-2">
                                {user && (
                                    <ButtonLanguage des="Tiếng Việt" icon />
                                )}
                                {role === "owner" && (
                                    <Link to="/owner-manage">
                                        <ButtonLanguage des="Quản lý bài đăng" />
                                    </Link>
                                )}
                                {role === "admin" && (
                                    <Link to="/admin-manage">
                                        <ButtonLanguage des="Quản lý" />
                                    </Link>
                                )}
                                {role === "user" && (
                                    <Link to="/add-post">
                                        <ButtonLanguage des="Cho thuê trọ qua Simi!" />
                                    </Link>
                                )}
                            </div>
                        )}

                        {!user ? (
                            <Link to="/login">
                                <ButtonPrimary des="Đăng nhập" />
                            </Link>
                        ) : (
                            <div
                                className="dropdown"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <ButtonPrimary
                                    icon={<AlignJustify size={34} />}
                                    avatar={true}
                                    avatarUrl={avatarUrl}
                                    className={styles.buttonAvatar}
                                />
                                {showLoginModal && <LoginModal />}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {showContent && showBigSearch && enableSearch && (
                <div className={`${styles.content} ${styles.fadeContent}`}>
                    <div className={styles.title}>
                        Easy Way To Find <br /> Your Perfect Property
                    </div>
                    <div className={styles.description}>
                        Simi là dịch vụ hỗ trợ bạn tìm trọ phù hợp với nhu cầu
                        nhanh chóng, hiệu quả uy tín hàng đầu thế giới, là cầu
                        nối giữa khách hàng với người cho thuê...
                    </div>
                    <ButtonLanguage des="Learn more" icon={false} />
                </div>
            )}

            {!isScrolled && (
                <div style={{ marginTop: "120px" }}>
                    <SearchBar inHeader={false} isHeaderSearch={false} />
                </div>
            )}
        </div>
    );
};

export default Header;

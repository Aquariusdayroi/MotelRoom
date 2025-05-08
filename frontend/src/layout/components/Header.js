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

const Header = ({
    enableScroll = true,
    showBigSearch = true,
    enableSearch = true,
}) => {
    let { user, role, logout } = useContext(AuthToken);
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
            if (!enableScroll) {
                setIsScrolled(true);
                setShowContent(false);
                return;
            }
            setIsScrolled(window.scrollY > 50);
            setShowContent(window.scrollY <= 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [enableScroll]);

    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setShowLoginModal(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setShowLoginModal(false);
        }, 200);
        setTimeoutId(id);
    };
    useEffect(() => {
        const fetchUserAvatar = async () => {
            if (user && user.id) {
                try {
                    // có api thì đổi lại
                    const response = await fetch(
                        `/api/users/${user.id}/avatar`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setAvatarUrl(data.avatarUrl || images.fallbackAvatar);
                    } else {
                        setAvatarUrl(images.fallbackAvatar);
                    }
                } catch (error) {
                    console.error("Error fetching avatar:", error);
                    setAvatarUrl(images.fallbackAvatar);
                }
            }
        };

        fetchUserAvatar();
    }, [user]);

    if (!isInitialized) {
        return null;
    }
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
                                    <ButtonLanguage
                                        des={"Tiếng Việt"}
                                        icon={true}
                                    />
                                )}
                                {role === "owner" ? (
                                    <Link to="/post">
                                        <ButtonLanguage
                                            des="Quản lý bài đăng"
                                            icon={false}
                                        />
                                    </Link>
                                ) : role === "admin" ? (
                                    <Link to="/admin-manage">
                                        <ButtonLanguage
                                            des="Quản lý"
                                            icon={false}
                                        />
                                    </Link>
                                ) : (
                                    <ButtonLanguage
                                        des={
                                            !user
                                                ? "Cho thuê trọ qua Simi"
                                                : role === "user"
                                                ? "Cho thuê trọ qua Simi"
                                                : "Cho thuê trọ qua Simi"
                                        }
                                        icon={false}
                                    />
                                )}
                            </div>
                        )}
                        {!user ? (
                            <Link to={"/login"}>
                                <ButtonPrimary des={"Đăng nhập"} />
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
                                    className={`${styles.buttonAvatar}`}
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
                        Easy Way To Find <br /> Your Perfect Property{" "}
                    </div>
                    <div className={styles.description}>
                        Simi là dịch vụ hỗ trợ bạn tìm trọ phù hợp với nhu cầu
                        nhanh chóng, hiệu quả uy tín hàng đầu thế giới, là cầu
                        nối giữa khách hàng với người cho thuê. Hiện nay chúng
                        tôi là đối tác với hơn một triệu khách hàng và không
                        ngừng lớn mạnh hơn nữa, luôn lắng nghe ý kiến từ người
                        dùng để mang đến sự phục vụ tốt nhất.
                    </div>
                    <ButtonLanguage des={"Learn more"} icon={false} />
                </div>
            )}
            {!isScrolled && (
                <div style={{ marginTop: "80px" }}>
                    <SearchBar inHeader={false} isHeaderSearch={false} />
                </div>
            )}
        </div>
    );
};

export default Header;

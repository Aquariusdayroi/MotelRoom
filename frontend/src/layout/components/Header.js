import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import styles from "../../styles/Header.module.css";
import ButtonLanguage from "../../components/buttonUI/ButtonLanguage";
import ButtonPrimary from "../../components/buttonUI/ButtonPrimary";
import Search from "../../components/Search";

const Header = ({ enableScroll = true, showBigSearch = true }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (!enableScroll) {
                setIsScrolled(true);
                setShowContent(false);
                return;
            }
            setIsScrolled(window.scrollY > 50);
            setShowContent(window.scrollY <= 50);
        };

        if (!enableScroll) {
            setIsScrolled(true);
            setShowContent(false);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [enableScroll]);

    return (
        <div
            className={`${styles.container} ${
                !showContent ? styles.headerOnly : ""
            }`}
        >
            <header
                className={`${styles.header} ${
                    isScrolled ? styles.headerScrolled : ""
                }`}
            >
                <div className={styles.headerContent}>
                    <div>
                        <Link to="/home">
                            <img src={images.logo} className={styles.logo} />
                        </Link>
                    </div>
                    {isScrolled && (
                        <Search inHeader={true} isHeaderSearch={true} />
                    )}
                    <div className={styles.buttonGroup}>
                        <ButtonLanguage
                            des={"Cho thuê trọ qua Simi"}
                            icon={false}
                        />
                        <Link to={"/login"}>
                            <ButtonPrimary des={"Đăng nhập"} />
                        </Link>
                    </div>
                </div>
            </header>
            {showContent && showBigSearch && (
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
                    <Search inHeader={false} isHeaderSearch={false} />
                </div>
            )}
        </div>
    );
};

export default Header;

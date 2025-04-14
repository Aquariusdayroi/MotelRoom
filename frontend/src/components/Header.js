import { images } from "../assets/images";
import styles from "../styles/Header.module.css";
import ButtonLanguage from "./buttonUI/ButtonLanguage";
import ButtonPrimary from "./buttonUI/ButtonPrimary";
const Header = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img src={images.logo} className={styles.logo} />
                </div>
                <div className={styles.buttonGroup}>
                    <ButtonLanguage
                        des={"Cho thuê trọ qua Simi"}
                        icon={false}
                    />
                    <ButtonPrimary des={"Đăng nhập"} />
                </div>
            </header>
            <div className={styles.content}>
                <div className={styles.title}>
                    Easy Way To Find <br /> Your Perfect Property{" "}
                </div>
                <div className={styles.description}>
                    Simi là dịch vụ hỗ trợ bạn tìm trọ phù hợp với nhu cầu nhanh
                    chóng, hiệu quả uy tín hàng đầu thế giới, là cầu nối giữa
                    khách hàng với người cho thuê. Hiện nay chúng tôi là đối tác
                    với hơn một triệu khách hàng và không ngừng lớn mạnh hơn
                    nữa, luôn lắng nghe ý kiến từ người dùng để mang đến sự phục
                    vụ tốt nhất.
                </div>
                <ButtonLanguage des={"Learn more"} icon={false} />
            </div>
        </div>
    );
};
export default Header;

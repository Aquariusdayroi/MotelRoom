import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import { Border } from "react-bootstrap-icons";

const styles = {
    header: {
        padding: "0 5.5vw",
        height: "82px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #E5E5E5",
    },
    logo: {
        height: "57px",
    },
};

const HeaderWhite = () => {
    return (
        <div style={styles.header}>
            <Link to="/home">
                <img src={images.logo} style={styles.logo} alt="logo" />
            </Link>
        </div>
    );
};

export default HeaderWhite;

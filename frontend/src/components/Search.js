import styles from "../styles/Search.module.css";
import ButtonPrimary from "./buttonUI/ButtonPrimary";
import ItemSearch from "./buttonUI/ItemSearch";

const Search = () => {
    return (
        <div className={styles.search}>
            <div className={styles.container}>
                <div className={styles.groupBtn}>
                    <ItemSearch className={styles.title} title="Khu vực" />
                    <ItemSearch className={styles.title} title="Loại phòng" />
                    <ItemSearch className={styles.title} title="Từ" />
                    <ItemSearch className={styles.title} title="Đến" />
                    <div>
                        <ButtonPrimary
                            icon={true}
                            className={styles.searchButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Search;

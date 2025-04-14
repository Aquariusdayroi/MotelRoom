const ItemSearch = ({ title, className }) => {
    return (
        <div>
            <div className={className}>{title}</div>
            <input placeholder="Nhập địa điểm tìm kiếm" />
        </div>
    );
};
export default ItemSearch;

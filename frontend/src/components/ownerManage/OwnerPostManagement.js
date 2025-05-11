import { Button, Dropdown } from 'react-bootstrap';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Pagination from '../Pagination';
import RoomCard from '../rooms/RoomCard';
import styles from '../../styles/OwnerManagement.module.css';
import { useEffect, useState } from "react";
import ownerPostApi from '../../api/ownerPostApi';
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
const OwnerPostManagement = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const [data, setData] = useState({ results: [], total_pages: 0 });

    const handleSort = (order) => {
        setSortOrder(order);
        fetchRooms(page, searchTerm, order);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        fetchRooms(1, searchTerm, sortOrder);
    };

    const handleHidePost = async (id) => {
        try {
            await ownerPostApi.hidePost(id);
            alert('Đã ẩn bài đăng thành công!');
            // Refresh the posts list while maintaining search and sort
            fetchRooms(page, searchTerm, sortOrder);
        } catch (error) {
            console.error('Error hiding post:', error);
            alert('Có lỗi xảy ra khi ẩn bài đăng. Vui lòng thử lại sau!');
        }
    };

    const handleDeletePost = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này? Hành động này không thể hoàn tác.')) {
            try {
                await ownerPostApi.delete(id);
                alert('Xóa bài đăng thành công!');
                // Refresh the posts list while maintaining search and sort
                fetchRooms(page, searchTerm, sortOrder);
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Có lỗi xảy ra khi xóa bài đăng. Vui lòng thử lại sau!');
            }
        }
    };

    const fetchRooms = async (currentPage = page, search = '', sort = sortOrder) => {
        setLoading(true);
        try {
            const response = await axiosClient.get(
                `/rental_post/api/my-posts/?page=${currentPage}&search=${search}&sort=${sort}`
            );
            if (response?.data) {
                setData({
                    results: response.data.results.data,
                    total_pages: Math.ceil(response.data.count / 9),
                });
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms(page, '', sortOrder);
    }, []); // Chỉ chạy 1 lần khi component mount

    if (loading) return <div className="text-center p-5">Đang tải...</div>;
    if (error) return <div className="text-center text-danger p-5">{error}</div>;

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.container}>
                    <div className={`${styles.searchBarGroup} mb-3`}>
                        <div className={`d-flex align-items-center ${styles.searchLeft}`} style={{ flex: 1, gap: '10px' }}>
                            <div className="position-relative" style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    className={`form-control ${styles.searchInput}`}
                                    placeholder="Tìm theo tên hoặc địa chỉ..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchClick();
                                        }
                                    }}
                                />
                            </div>
                            <Button className={styles.btnFind} onClick={handleSearchClick}>
                                Tìm
                            </Button>
                        </div>
                        <div className={`d-flex align-items-center ${styles.searchRight}`} style={{ gap: '10px' }}>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="outline-secondary"
                                    className={styles.sortButton}
                                >
                                    Ngày đăng{' '}
                                    {sortOrder === 'asc' ? (
                                        <FaChevronUp className={styles.arrow} />
                                    ) : (
                                        <FaChevronDown className={styles.arrow} />
                                    )}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleSort('asc')}>
                                        Ngày đăng gần đây
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSort('desc')}>
                                        Ngày đăng xa nhất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button className={styles.btnCreatePost}>
                                <FaPlus className="me-1" /> Tạo bài đăng
                            </Button>
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {Array.isArray(data?.results) && data.results.length > 0 ? (
                            data.results.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    {...room}
                                    isOwnerView={true}
                                    onClick={() => navigate(`/detail/${room.id}`)}
                                    onEdit={(id) => navigate(`/edit-post/${id}`)}
                                    onHide={(id) => handleHidePost(id)}
                                    onDelete={(id) => handleDeletePost(id)}
                                />
                            ))
                        ) : (
                            <div className="text-center w-100 p-5">Không có bài đăng nào</div>
                        )}
                    </div>
                </div>
            </motion.div>
            <Pagination totalPages={data?.total_pages} />
        </div>
    );
};

export default OwnerPostManagement;
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import RoomCard from "../rooms/RoomCard";
import styles from "../../styles/OwnerManagement.module.css";
import { useEffect, useState } from "react";
import ownerPostApi from "../../api/ownerPostApi";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import EditPostModal from "../modal/EditPostModal";
import ConfirmModal from "../modal/ComfirmModal";

const OwnerPostManagement = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [pendingAction, setPendingAction] = useState(null);

    const page = +searchParams.get("page") || 1;
    const keywordParam = searchParams.get("keyword") || "";
    const orderingParam = searchParams.get("ordering") || "oldest";

    const [searchTerm, setSearchTerm] = useState(keywordParam);
    const [sortOrder, setSortOrder] = useState(orderingParam);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({ results: [], total_pages: 0 });
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const fetchRooms = async (currentPage = 1) => {
        setLoading(true);
        try {
            const response = await ownerPostApi.getAll({
                page: currentPage,
            });
            if (response?.data) {
                const rawRooms = response.data.results.data || [];
                const formattedRooms = rawRooms.map((room) => ({
                    ...room,
                }));

                const responseData = {
                    results: formattedRooms,
                    total_pages: Math.ceil(response.data.count / 9) || 1,
                };

                console.log("Data being set:", responseData);
                setData(responseData);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Ban đầu vào trang dùng getAll
        fetchRooms(page);
        setSearchTerm(keywordParam);
        setSortOrder(orderingParam);
    }, [page]);
    const handleSort = (order) => {
        const sortValue = order === "asc" ? "newest" : "oldest";
        setSortOrder(sortValue);
        navigate(`?page=1&keyword=${searchTerm}&ordering=${sortValue}`); // Dùng search API với ordering
        ownerPostApi
            .search({
                page: 1,
                keyword: searchTerm,
                ordering: sortValue,
            })
            .then((response) => {
                if (response?.data) {
                    const formattedResults = response.data.results.map(
                        (room) => ({
                            ...room,
                            user: {
                                fullname: room.fullname,
                                avatar: room.avatar?.replace(
                                    "http://localhost:8000",
                                    ""
                                ),
                            },
                            address: {
                                address_name: room.address_name,
                                city_name: room.city_name,
                                district_name: room.district_name,
                            },
                        })
                    );
                    setData({
                        results: formattedResults,
                        total_pages: response.data.total_pages,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const handleSearchClick = async () => {
        navigate(`?page=1&keyword=${searchTerm}&ordering=${sortOrder}`);
        setLoading(true);
        try {
            const response = await ownerPostApi.search({
                page: 1,
                keyword: searchTerm,
                ordering: sortOrder,
            });
            console.log("Kết quả tìm kiếm:", response.data);
            if (response?.data) {
                const formattedResults = response.data.results.map((room) => ({
                    ...room,
                    user: {
                        fullname: room.fullname,
                        avatar: room.avatar?.replace(
                            "http://localhost:8000",
                            ""
                        ),
                    },
                    address: {
                        address_name: room.address_name,
                        city_name: room.city_name,
                        district_name: room.district_name,
                    },
                }));
                setData({
                    results: formattedResults,
                    total_pages: response.data.total_pages,
                });
            }
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleDeletePost = async (id) => {
        setConfirmMessage(
            "Bạn có chắc chắn muốn xóa bài đăng này? Hành động này không thể hoàn tác."
        );
        const deleteAction = async () => {
            try {
                await ownerPostApi.delete(id);
                await fetchRooms(page);
                return true;
            } catch (error) {
                console.error("Error deleting post:", error);
                setConfirmMessage(
                    "Có lỗi xảy ra khi xóa bài đăng. Vui lòng thử lại sau!"
                );
                return false;
            }
        };
        setPendingAction(() => deleteAction);
        setShowConfirmModal(true);
    };

    const handleEdit = (post) => {
        setSelectedPost(post);
        setShowEditModal(true);
    };
    const handleUpdatePost = async (updatedData) => {
        setConfirmMessage("Bạn có chắc chắn muốn cập nhật bài đăng này?");
        const updateAction = async () => {
            try {
                await ownerPostApi.update(selectedPost.id, updatedData);
                await fetchRooms(page);
                setShowEditModal(false);
                return true;
            } catch (error) {
                console.error("Error updating post:", error);
                setConfirmMessage(
                    "Có lỗi xảy ra khi cập nhật bài đăng. Vui lòng thử lại sau!"
                );
                return false;
            }
        };
        setPendingAction(() => updateAction);
        setShowConfirmModal(true);
    };

    // Component code starts here
    if (loading) return <div className="text-center p-5">Đang tải...</div>;
    if (error)
        return <div className="text-center text-danger p-5">{error}</div>;

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.container}>
                    <div className={`${styles.searchBarGroup} mb-3`}>
                        <div
                            className={`d-flex align-items-center ${styles.searchLeft}`}
                            style={{ flex: 1, gap: "10px" }}
                        >
                            <div
                                className="position-relative"
                                style={{ flex: 1 }}
                            >
                                <input
                                    type="text"
                                    className={`form-control ${styles.searchInput}`}
                                    placeholder="Tìm theo tên hoặc địa chỉ..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                            handleSearchClick();
                                    }}
                                />
                            </div>
                            <Button
                                className={styles.btnFind}
                                onClick={handleSearchClick}
                            >
                                Tìm
                            </Button>
                        </div>{" "}
                        <div
                            className={`d-flex align-items-center ${styles.searchRight}`}
                            style={{ gap: "10px" }}
                        >
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="outline-secondary"
                                    className={styles.sortButton}
                                >
                                    Ngày đăng{" "}
                                    {sortOrder === "newest" ? (
                                        <FaChevronUp className={styles.arrow} />
                                    ) : (
                                        <FaChevronDown
                                            className={styles.arrow}
                                        />
                                    )}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => handleSort("asc")}
                                    >
                                        Ngày đăng gần đây
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handleSort("desc")}
                                    >
                                        Ngày đăng cũ nhất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button
                                className={styles.btnCreatePost}
                                onClick={() => navigate("/add-post")}
                            >
                                <FaPlus className="me-1" /> Tạo bài đăng
                            </Button>
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {Array.isArray(data?.results) &&
                        data.results.length > 0 ? (
                            data.results.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    {...room}
                                    isOwnerView={true}
                                    onClick={() =>
                                        navigate(`/detail/${room.id}`)
                                    }
                                    onDelete={(id) => handleDeletePost(id)}
                                    onEdit={() => handleEdit(room)}
                                />
                            ))
                        ) : (
                            <div className="text-center w-100 p-5">
                                Không có bài đăng nào
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            <Pagination totalPages={data?.total_pages} />{" "}
            <EditPostModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                post={selectedPost}
                onUpdate={handleUpdatePost}
            />{" "}
            <ConfirmModal
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                title={confirmMessage}
                onConfirm={async () => {
                    if (typeof pendingAction === "function") {
                        const success = await pendingAction();
                        if (success) {
                            setShowConfirmModal(false);
                        }
                        setPendingAction(null);
                    }
                }}
            />
        </div>
    );
};

export default OwnerPostManagement;

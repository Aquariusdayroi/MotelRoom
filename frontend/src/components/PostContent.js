import React, { useEffect, useState } from "react";
import RoomCard from "./rooms/RoomCard";
import "../styles/PostManagement.css";
import axiosClient from "../api/axiosClient";

export default function PostContent() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newData, setNewData] = useState({
        price: "",
        address: "",
        owner: "",
        type: "",
        image: "",
    });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosClient.get(
                    "/rental_post/api/my-posts/"
                );
                if (response.data.success) {
                    setPosts(response.data.results.data);
                }
            } catch (error) {
                setError("Failed to fetch posts");
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/rental_post/api/posts/${id}/`);
            setPosts((prev) => prev.filter((post) => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleHide = (id) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === id ? { ...post, hidden: true } : post
            )
        );
    };

    const handleEdit = (id) => {
        const post = posts.find((p) => p.id === id);
        setEditingPost(post);
        setNewData({
            price: post.price,
            address: post.address.description,
            type: post.home_type,
        });
    };

    const saveEdit = async () => {
        try {
            await axiosClient.put(`/rental_post/api/posts/${editingPost.id}/`, {
                price: newData.price,
                address: newData.address,
                home_type: newData.type,
            });

            setPosts((prev) =>
                prev.map((post) =>
                    post.id === editingPost.id ? { ...post, ...newData } : post
                )
            );
            setEditingPost(null);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewData({ ...newData, image: imageUrl });
        }
    };

    return (
        <div className="container-content">
            <div className="head">
                <div className="search-bar">
                    <input
                        className="search-input"
                        placeholder="Tìm trong bài đăng của bạn"
                    />
                    <button
                        className="btn btn-info search-btn"
                        style={{ color: "white" }}
                    >
                        Tìm
                    </button>
                </div>
                <div className="content-bar">
                    <select>
                        <option>Ngày đăng</option>
                        <option>Giá cao đến thấp</option>
                        <option>Giá thấp đến cao</option>
                    </select>
                    <button className="btn btn-info" style={{ color: "white" }}>
                        + Tạo bài đăng
                    </button>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row">
                    {posts
                        .filter((post) => !post.hidden)
                        .map((post) => (
                            <div key={post.id} className="col-12 col-md-4 mb-4">
                                <RoomCard
                                    id={post.id}
                                    title={post.title}
                                    address={post.address.description}
                                    price={post.price}
                                    home_type={post.home_type}
                                    acreage={post.acreage}
                                    user={post.user}
                                    onDelete={() => handleDelete(post.id)}
                                    onEdit={() => handleEdit(post.id)}
                                    onHide={() => handleHide(post.id)}
                                />
                            </div>
                        ))}
                </div>
            </div>

            {editingPost && (
                <div
                    className="modal show fade d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Chỉnh sửa bài đăng
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setEditingPost(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-2">
                                    <label>Giá mới</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newData.price}
                                        onChange={(e) =>
                                            setNewData({
                                                ...newData,
                                                price: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>Địa chỉ mới</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newData.address}
                                        onChange={(e) =>
                                            setNewData({
                                                ...newData,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>Tên chủ nhà mới</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newData.owner}
                                        onChange={(e) =>
                                            setNewData({
                                                ...newData,
                                                owner: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>Loại hình mới</label>
                                    <select
                                        className="form-select"
                                        value={newData.type}
                                        onChange={(e) =>
                                            setNewData({
                                                ...newData,
                                                type: e.target.value,
                                            })
                                        }
                                    >
                                        <option>Chung cư</option>
                                        <option>Phòng trọ</option>
                                        <option>Nhà nguyên căn</option>
                                    </select>
                                </div>
                                <div className="form-group mb-2">
                                    <label>Chọn ảnh mới</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setEditingPost(null)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={saveEdit}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
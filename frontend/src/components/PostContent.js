import React, { useState } from "react";
import RoomCard from "./rooms/RoomCard";
import "../styles/PostManagement.css";

import frame from "../assets/management-img/Frame.png";
import room1 from "../assets/management-img/img1.png";
import room2 from "../assets/management-img/img2.jpg";
import room3 from "../assets/management-img/img3.jpg";

const initialPosts = [
    {
        id: 1,
        title: "Nhà trọ số 67/4 Cao Thắng, Phường 3,...",
        location: "Quận 1, TP.HCM",
        owner: "Ender",
        price: "3 triệu",
        type: "Chung cư",
        area: "30m²",
        isNew: true,
        images: [room1, room2, room3],
    },
    {
        id: 2,
        title: "Nhà trọ số 67/4 Cao Thắng, Phường 3,...",
        address: "Quận 3, Thành phố Hồ Chí Minh",
        price: "4 triệu/tháng",
        type: "Phòng trọ",
        area: "25m²",
        owner: "Ender",
        image: room2,
    },
    {
        id: 3,
        title: "Nhà trọ số 67/4 Cao Thắng, Phường 3,...",
        address: "Quận 5, Thành phố Hồ Chí Minh",
        price: "5 triệu/tháng",
        type: "Nhà nguyên căn",
        area: "50m²",
        owner: "Ender",
        image: room3,
    },
    {
        id: 4,
        title: "Nhà trọ số 67/4 Cao Thắng, Phường 3,...",
        address: "Quận 7, Thành phố Hồ Chí Minh",
        price: "6 triệu/tháng",
        type: "Chung cư",
        area: "40m²",
        owner: "Ender",
        image: room2,
    },
    {
        id: 5,
        title: "Nhà trọ số 67/4 Cao Thắng, Phường 3,...",
        address: "Quận 10, Thành phố Hồ Chí Minh",
        price: "2 triệu/tháng",
        type: "Phòng trọ",
        area: "20m²",
        owner: "Ender",
        image: room1,
    },
    {
        id: 6,
        title: "Nhà trọ số 67/4 Cao Thắng, Phường 3,...",
        address: "Quận 12, Thành phố Hồ Chí Minh",
        price: "7 triệu/tháng",
        type: "Nhà nguyên căn",
        area: "70m²",
        owner: "Ender",
        image: room3,
    },
];

export default function PostContent() {
    const [posts, setPosts] = useState(initialPosts);
    const [editingPost, setEditingPost] = useState(null);
    const [newData, setNewData] = useState({
        price: "",
        address: "",
        owner: "",
        type: "",
        image: "",
    });

    const handleDelete = (id) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
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
            address: post.address,
            owner: post.owner,
            type: post.type,
            image: post.image,
        });
    };

    const saveEdit = () => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === editingPost.id ? { ...post, ...newData } : post
            )
        );
        setEditingPost(null);
    };

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
                        placeholder="Tìm trong bài đăng của Ender"
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
                                    images={post.images || [post.image]}
                                    title={post.title}
                                    location={post.location || post.address}
                                    owner={post.owner}
                                    price={post.price}
                                    type={post.type}
                                    area={post.area}
                                    isNew={post.isNew}
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

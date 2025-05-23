import React, { useEffect, useState, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import axiosClient from "../api/axiosClient";
import { useSearchParams } from "react-router-dom";

const Chat = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [searchParams] = useSearchParams();
    const recenId = searchParams.get("recenId");
    const token = Cookies.get("authToken");
    const socketRef = useRef(null);

    const fetchConversations = async () => {
        try {
            const res = await axiosClient.get("chat/api/conversations/list/");
            console.log(res.data);
            console.log("===");
            setConversations(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách hội thoại:", err);
            setConversations([]);
        }
    };

    useEffect(() => {
        const fetchConversationData = async () => {
            if (!recenId) {
                console.log("Không có recenId trong URL");
                return;
            }
            try {
                const response = await axiosClient.post(
                    `/chat/api/conversations/create/`,
                    { user_two: recenId }
                );
                console.log("Dữ liệu API:", response.data);
                setSelectedConversation(response.data.data);
            } catch (error) {
                console.error("Lỗi khi gọi API tạo cuộc trò chuyện", error);
            }
        };
        fetchConversationData();
    }, [recenId]);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (!token) {
            console.log("Không có token, không tạo kết nối WebSocket");
            return;
        }
        // Đóng kết nối cũ nếu tồn tại
        if (
            socketRef.current &&
            socketRef.current.readyState !== WebSocket.CLOSED
        ) {
            socketRef.current.close();
        }

        // Tạo kết nối WebSocket mới
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/?token=${encodeURIComponent(token)}`
        );
        socket.onopen = () => {
            const pingInterval = setInterval(() => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({ type: "ping" }));
                }
            }, 120000);
            socket.pingInterval = pingInterval;
        };

        socketRef.current = socket;

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("🔍 Dữ liệu WebSocket:", { data });
            console.log("dữ liệu chat.js");
            console.log(data.type);
            if (data.type === "chat_message" || data.type === "read_status") {
                fetchConversations();
                return;
            }
            // return;
            // }
        };

        socket.addEventListener("message", handleMessage);
        // Dọn dẹp khi component unmount hoặc token thay đổi
        return () => {
            if (socket.readyState !== WebSocket.CLOSED) {
                socket.close();
            }
        };
    }, [token]); // Thêm token vào dependency

    // Sử dụng useCallback để ổn định hàm onSelect
    const handleSelectConversation = useCallback((conversation) => {
        setSelectedConversation((prev) => {
            if (prev?.id === conversation.id) return prev;
            return conversation;
        });
    }, []);

    return (
        <div
            className="d-flex flex-column"
            style={{ height: "92vh", backgroundColor: "#f5f5f5" }}
        >
            {/* Main Grid */}
            <div className="d-flex flex-grow-1 overflow-hidden">
                {/* Sidebar: Conversation List */}
                <div
                    className="col-xl-3 col-sm-3 col-3 p-0 border-right"
                    style={{
                        backgroundColor: "white",
                        overflowY: "auto",
                        height: "100%",
                        boxShadow: "1.5px 0px 5px rgba(0, 0, 0, 0.1)",
                        zIndex: 1,
                    }}
                >
                    <ConversationList
                        socket={socketRef.current}
                        onSelect={handleSelectConversation}
                        selectedId={selectedConversation?.id}
                        conversations={conversations}
                    />
                </div>

                {/* Chat Window */}
                <div
                    className="col-xl-9 col-sm-9 col-9 p-0"
                    style={{ height: "100%" }}
                >
                    {selectedConversation && token ? (
                        <ChatWindow
                            token={token}
                            conversation={selectedConversation}
                            socket={socketRef.current}
                        />
                    ) : (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                height: "100%",
                                backgroundColor: "#fafafa",
                            }}
                        >
                            <p style={{ color: "#757575" }}>
                                Chọn một cuộc trò chuyện để bắt đầu
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;

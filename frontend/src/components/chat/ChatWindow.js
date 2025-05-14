import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axiosClient from "../../api/axiosClient";
import { AuthToken } from "../../authToken";

export default function ChatWindow({ token, conversation, socket }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Connecting");
  const [error, setError] = useState("");
  const { userInfo } = useContext(AuthToken);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loading, setLoading] = useState(false);
  const shouldScrollRef = useRef(false); // không bị reset sau render

  // Refs để scroll và track container
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const isUserNearBottom = useRef(true); // Theo dõi xem người dùng có gần cuối danh sách không

  const receiverInfo =
    userInfo?.fullname === conversation.user_one?.fullname
      ? conversation.user_two
      : conversation.user_one;

  const sendReadStatus = useCallback(
    (message_id) => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "read_message",
            conversation_id: conversation.id,
            message_id,
          })
        );
      }
    },
    [socket, conversation.id]
  );

  const checkOnline = useCallback(() => {
    if (
      socket?.readyState === WebSocket.OPEN &&
      receiverInfo?.id &&
      conversation?.id
    ) {
      socket.send(
        JSON.stringify({
          type: "check_online",
          target_user_id: receiverInfo.id,
          conversation_id: conversation.id,
        })
      );
    }
  }, [socket, receiverInfo?.id, conversation?.id]);

  // --- Hàm load trang đầu tiên ---
  const loadInitialMessages = useCallback(async () => {
    if (!conversation?.id) return;
    setLoading(true);
    try {
      const res = await axiosClient.get("chat/api/messages/", {
        params: { conversation_id: conversation.id, page: 1 },
      });
      const msgs = Array.isArray(res.data.results)
        ? res.data.results.reverse()
        : [];
      setMessages(msgs);
      setCurrentPage(1);
      setHasMoreMessages(res.data.next !== null);
      // Scroll xuống cuối
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      isUserNearBottom.current = true;
    } catch (err) {
      console.error(err);
      setError("Không thể tải tin nhắn");
    } finally {
      setLoading(false);
    }
  }, [conversation?.id]);

  // --- Hàm fetch các trang cũ hơn ---
  const fetchMoreMessages = useCallback(async () => {
    if (loading || !hasMoreMessages || !messagesContainerRef.current) return;
    const container = messagesContainerRef.current;
    const previousHeight = container.scrollHeight;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const res = await axiosClient.get("chat/api/messages/", {
        params: { conversation_id: conversation.id, page: nextPage },
      });
      const newMsgs = Array.isArray(res.data.results)
        ? res.data.results.reverse()
        : [];

      if (newMsgs.length) {
        setMessages((prev) => [...newMsgs, ...prev]);
        setCurrentPage(nextPage);
        setHasMoreMessages(res.data.next !== null);
        // Giữ vị trí scroll
        container.scrollTop = container.scrollHeight - previousHeight;
      } else {
        setHasMoreMessages(false);
      }
    } catch (err) {
      console.error(err);
      setError("Không thể tải thêm tin nhắn");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMoreMessages, currentPage, conversation.id]);

  // Check đăng nhập & online
  useEffect(() => {
    if (!userInfo || !conversation?.id || !receiverInfo?.id) {
      setError("Vui lòng đăng nhập hoặc chọn cuộc trò chuyện");
      return;
    }
    setError("");
    checkOnline();
  }, [userInfo, conversation?.id, receiverInfo?.id, checkOnline]);

  // Load initial messages khi chọn conversation mới
  useEffect(() => {
    setMessages([]);
    setHasMoreMessages(true);
    setCurrentPage(1);
    loadInitialMessages();
  }, [conversation?.id, loadInitialMessages]);

  // Lắng nghe scroll để fetch thêm và theo dõi vị trí
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Kiểm tra nếu kéo lên đầu để tải thêm
      if (container.scrollTop === 0 && hasMoreMessages && !loading) {
        fetchMoreMessages();
      }
      // Kiểm tra xem người dùng có gần cuối danh sách không
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      isUserNearBottom.current = isNearBottom;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchMoreMessages, hasMoreMessages, loading]);

  // WebSocket message handling
  const [loadmessage, setloadmessage] = useState(false)
  useEffect(() => {
    if (!socket) return;
    
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "online_status" && data.user_id === receiverInfo.id) {
        setConnectionStatus(data.online ? "Connected" : "UnConnected");
        return;
      }
      if (data.type === "read_status") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === data.message_id ? { ...msg, status: "read" } : msg
          )
        );
        return;
      }
      if (data.type === "pong") return;

      const formatted = {
        id: data.id || Date.now(),
        sender: data.sender || data.sender_id,
        conversation_id: data.conversation_id,
        content: data.content || data.message,
        create_at: data.create_at || new Date().toISOString(),
        status: data.status || "sent",
        media: data.media || [],
      };
      if (
        formatted.content &&
        formatted.sender &&
        formatted.conversation_id === conversation.id
      ) {
        setMessages((prev) => [...prev, formatted]);
        shouldScrollRef.current = true
        if (formatted.sender !== userInfo?.user_id) {
          axiosClient
            .post("chat/api/messages/update-status/", {
              message_id: formatted.id,
              status: "read",
            })
            .then(() => sendReadStatus(formatted.id))
            .catch((err) => console.error(err));
        }
        // Chỉ scroll xuống nếu người dùng đang ở gần cuối
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        isUserNearBottom.current = true;
      }
    };

    socket.addEventListener("message", handleMessage);
    socket.onerror = () => setConnectionStatus("Disconnected");
    socket.onclose = () => setConnectionStatus("Disconnected");
    return () => socket.removeEventListener("message", handleMessage);
  }, [socket, conversation?.id, receiverInfo.id, userInfo?.user_id, sendReadStatus]);

  // Gửi tin nhắn
  const sendMessage = useCallback(async () => {
    if (!message.trim()) return setError("Tin nhắn không được để trống");
    if (socket?.readyState !== WebSocket.OPEN)
      return setError("Kết nối WebSocket bị ngắt");
    if (!userInfo?.user_id) return setError("Vui lòng đăng nhập");

    socket.send(
      JSON.stringify({
        message,
        sender_id: userInfo.user_id,
        conversation_id: conversation.id,
      })
    );
    setMessage("");
    setError("");
    
    // Scroll xuống cuối khi gửi tin nhắn
    if(loadmessage) {
        
        setloadmessage(false);
    }
    isUserNearBottom.current = true;
  }, [message, socket, userInfo?.user_id, conversation.id]);

    useEffect(() => {
    if (shouldScrollRef.current) {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });    
        shouldScrollRef.current = false;
    }
    }, [messages]);


  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        paddingX: "30px",
      }}
    >
      {/* Header window chat */}
      <Box
        sx={{
          m: 1,
          p: 2,
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid silver",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar
          alt="Avatar"
          src={receiverInfo.avatar}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{receiverInfo.fullname}</Typography>
          <Typography variant="caption">
            <span
              style={{
                color: connectionStatus === "Connected" ? "green" : "gray",
                fontSize: "17px",
              }}
            >
              ●
            </span>{" "}
            {connectionStatus === "Connected"
              ? "Đang hoạt động"
              : "Tạm không hoạt động"}
          </Typography>
        </Box>
      </Box>
      <Divider />

      {error && (
        <Box
          sx={{
            p: 1,
            bgcolor: "#ffebee",
            color: "#d32f2f",
            textAlign: "center",
          }}
        >
          {error}
        </Box>
      )}
      {/* Messages List */}
      <Box ref={messagesContainerRef} sx={{ flex: 1, overflowY: "auto", height:"100%" }}>
        <List>
          {/* Hiệu ứng loading khi kéo lên */}
          {loading && hasMoreMessages && (
            <ListItem sx={{ justifyContent: "center" }}>
              <CircularProgress size={24} />
            </ListItem>
          )}
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg, idx) => (
              <ListItem
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === userInfo?.user_id
                      ? "flex-end"
                      : "flex-start",
                  px: 1,
                  py: 0.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      msg.sender === userInfo?.user_id
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor:
                        msg.sender === userInfo?.user_id
                          ? "#37C5E5"
                          : "#F2F2F2",
                      color:
                        msg.sender === userInfo?.user_id ? "white" : "black",
                      borderRadius:
                        msg.sender === userInfo?.user_id
                          ? "20px 20px 0 20px"
                          : "20px 20px 20px 0",
                      px: 2,
                      py: 1,
                      display: "inline-block",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {msg.content}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#999",
                      fontSize: "11px",
                      mt: 0.5,
                      pr: 1,
                    }}
                  >
                    {msg.sender === userInfo?.user_id &&
                    messages.length - 1 === idx
                      ? msg.status === "read"
                        ? "Đã xem"
                        : "Đã gửi"
                      : ""}
                  </Typography>
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="Chưa có tin nhắn"
                primaryTypographyProps={{
                  color: "text.secondary",
                  textAlign: "center",
                }}
              />
            </ListItem>
          )}
        </List>
        <div ref={messageEndRef} />
      </Box>
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 0.8,
          bgcolor: "#F2F2F2",
          borderRadius: "20px",
          width: "98%",
          margin: "30px auto",
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          fullWidth
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Nhập tin nhắn..."
          sx={{
            borderRadius: "999px",
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiInputBase-root": { border: "none" },
            "& .MuiInputBase-input::placeholder": {
              color: "black",
              opacity: 1,
            },
          }}
          disabled={!userInfo}
        />
        <IconButton
          onClick={sendMessage}
          color="primary"
          sx={{ ml: 1 }}
          disabled={!userInfo}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
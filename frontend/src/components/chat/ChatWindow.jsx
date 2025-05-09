import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, TextField, IconButton, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import axiosClient from '../../api/axiosClient';
import { AuthToken } from '../../authToken';

export default function ChatWindow({ token, conversation }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Connecting');
  const [error, setError] = useState('');
  const socketRef = useRef(null);
  const messageEndRef = useRef(null);
  const { userInfo } = useContext(AuthToken);

  useEffect(() => {
    if (!userInfo) {
      setError('Vui lòng đăng nhập để nhắn tin');
    } else {
      setError('');
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosClient.get('chat/api/messages/', {
          params: { conversation_id: conversation.id },
        });
        console.log('Dữ liệu từ API:', res.data);
        setMessages(Array.isArray(res.data.results) ? res.data.results.reverse() : []);
      } catch (error) {
        console.error('❌ Lỗi khi lấy tin nhắn:', error);
        setMessages([]);
        setError('Không thể tải tin nhắn');
      }
    };

    if (conversation?.id) fetchMessages();

    return () => {
      setMessages([]);
    };
  }, [conversation?.id]);

  useEffect(() => {
    if (!conversation?.id || !token) {
      console.warn('conversation.id hoặc token không hợp lệ:', { conversation, token });
      return;
    }

    console.log('🔍 useEffect WebSocket chạy với conversation.id:', conversation.id);
    console.log('Token gửi qua WebSocket:', token);
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${conversation.id}/?token=${encodeURIComponent(token)}`);

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      setConnectionStatus('Connected');
      setError('');
      const pingInterval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'ping' }));
        }
      }, 120000);
      socketRef.current.pingInterval = pingInterval;
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('🔍 Dữ liệu WebSocket:', data);
      if (data.type === 'pong') {
        console.log('🏓 Nhận pong từ server');
        return;
      }
      const formattedMessage = {
        id: data.id || Date.now(),
        sender: data.sender || data.sender_id,
        content: data.content || data.message,
        create_at: data.create_at || new Date().toISOString(),
        status: data.status || 'sent',
        media: data.media || [],
      };
  
      if (formattedMessage.content && formattedMessage.sender) {
        setMessages((prev) => [...prev, formattedMessage]);
        if (formattedMessage.sender !== userInfo?.user_id && formattedMessage.id) {
          axiosClient.post('chat/api/messages/update-status/', {
            message_id: formattedMessage.id,
            status: 'read',
          }).then(() => {
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === formattedMessage.id ? { ...msg, status: 'read' } : msg
              )
            );
          }).catch((err) => console.error('Lỗi cập nhật trạng thái:', err));          
        }
      } else {
        console.warn('Dữ liệu WebSocket không hợp lệ:', data);
      }
    };

    socket.onerror = (e) => {
      setConnectionStatus('Disconnected');
      setError('Lỗi kết nối WebSocket');
    };

    socket.onclose = (e) => {
      setConnectionStatus('Disconnected');
      setError('Kết nối WebSocket bị ngắt');
      if (socketRef.current) {
        clearInterval(socketRef.current.pingInterval);
      }
    };

    socketRef.current = socket;

    return () => {
      if (socketRef.current) {
        socketRef.current.close(1000, 'Component unmounted');
      }
    };
  }, [conversation?.id, token]);

  const sendMessage = () => {
    if (!message.trim()) {
      setError('Tin nhắn không được để trống');
      return;
    }
    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      setError('Không thể gửi tin nhắn: Kết nối WebSocket bị ngắt');
      return;
    }
    if (!userInfo?.user_id) {
      setError('Không thể gửi tin nhắn: Vui lòng đăng nhập');
      return;
    }

    const payload = {
      message: message,
      sender_id: userInfo.user_id,
    };
    try {
      socketRef.current.send(JSON.stringify(payload));
      setMessage('');
      setError('');
    } catch (err) {
      setError('Không thể gửi tin nhắn');
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      <Box sx={{ p: 2, bgcolor: 'white', color: 'black' }}>
        <Typography variant="h6">
          {conversation.user_two?.fullname || `Cuộc trò chuyện #${conversation.id}`}
        </Typography>
        <Typography variant="caption">
          Trạng thái: {connectionStatus === 'Connected' ? 'Đã kết nối' : 'Hãy kết nối internet'}
        </Typography>
      </Box>
      <Divider />

      {error && (
        <Box sx={{ p: 1, bgcolor: '#ffebee', color: '#d32f2f', textAlign: 'center' }}>
          {error}
        </Box>
      )}

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <List>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg, idx) => (
              <ListItem
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === userInfo?.user_id ? 'flex-end' : 'flex-start',
                  px: 1,
                  py: 0.5,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '60%',
                    bgcolor: msg.sender === userInfo?.user_id ? '#1976d2' : '#e0e0e0',
                    color: msg.sender === userInfo?.user_id ? 'white' : 'black',
                    borderRadius: msg.sender === userInfo?.user_id ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    p: 1.5,
                    mb: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ListItemText
                    primary={msg.content}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: msg.sender === userInfo?.user_id ? '#b3e5fc' : '#616161' }}
                    >
                      {new Date(msg.create_at).toLocaleTimeString()}
                    </Typography>
                    {msg.sender === userInfo?.user_id && (
                      <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                        {msg.status === 'read' ? (
                          <DoneAllIcon sx={{ fontSize: 16, color: '#4fc3f7' }} />
                        ) : msg.status === 'delivered' ? (
                          <DoneAllIcon sx={{ fontSize: 16, color: '#b3e5fc' }} />
                        ) : (
                          <DoneIcon sx={{ fontSize: 16, color: '#b3e5fc' }} />
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="Chưa có tin nhắn"
                primaryTypographyProps={{ color: 'text.secondary', textAlign: 'center' }}
              />
            </ListItem>
          )}
          <div ref={messageEndRef} />
        </List>
      </Box>

      <Box sx={{ display: 'flex', borderTop: '1px solid #ccc', p: 1, bgcolor: '#fafafa' }}>
        <TextField
          fullWidth
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          placeholder="Nhập tin nhắn..."
          variant="outlined"
          disabled={!userInfo}
        />
        <IconButton onClick={sendMessage} color="primary" sx={{ ml: 1 }} disabled={!userInfo}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
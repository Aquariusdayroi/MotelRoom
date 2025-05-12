import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, TextField, IconButton, List, ListItem, ListItemText, Typography, Divider, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
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
  const receiverInfo = userInfo.fullname === conversation.user_one?.fullname 
    ? conversation.user_two 
    : conversation.user_one;

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
        setMessages(Array.isArray(res.data.results) ? res.data.results.reverse() : []);
      } catch (error) {
        setMessages([]);
        setError('Không thể tải tin nhắn');
      }
    };

    if (conversation?.id) fetchMessages();

    return () => {
      setMessages([]);
    };
  }, [conversation?.id]);


const sendReadStatus = (message_id) => {
  if (socketRef.current?.readyState === WebSocket.OPEN) {
    socketRef.current.send(JSON.stringify({
      type: "read_message",
      message_id
    }));
  }
};

  useEffect(() => {
    if (!conversation?.id || !token) {
      console.warn('conversation.id hoặc token không hợp lệ:', { conversation, token });
      return;
    }
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${conversation.id}/?token=${encodeURIComponent(token)}`);


    socket.onopen = () => {
      if(socket.readyState===WebSocket.OPEN) {
        console.log('check')
        socket.send(JSON.stringify({
          type: "check_online",
          target_user_id: receiverInfo.id  
        }));
      }
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
      if (data.type === "online_status") {
        console.log(`User ${data.user_id} is online?`, data.online);
        if (data.online && data.user_id === receiverInfo.id)  {
          setConnectionStatus('Connected');
        }
        else {
          setConnectionStatus('UnConnected');
        }
        return
      }

      if (data.type === "read_status") {
        const message_id = data.message_id
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === message_id ? { ...msg, status: 'read' } : msg
          )
        );
        return;
      }

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
              sendReadStatus(formattedMessage.id);
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white', paddingX: '30px' }}>
      <Box sx={{ m: 1, p: 2, bgcolor: 'white', color: 'black', borderBottom: '1px solid silver', display: 'flex', alignItems: 'center', width: '100%',  }}>

        <Avatar
          alt="Avatar"
          src={receiverInfo.avatar}
          sx={{ width: 56, height: 56, mr: 2 }}
        />  
        <Box sx = {{display: 'flex', flexDirection: 'column'}}>
          <Typography variant="h6">
            {receiverInfo.fullname}
          </Typography>
          <Typography variant="caption">
            <span style={{ color: connectionStatus === 'Connected' ? 'green' : 'gray', fontSize: '17px' }}>●</span> {connectionStatus === 'Connected' ? 'Đang hoạt động' : 'Tạm không hoạt động'}
          </Typography>
        </Box>
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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === userInfo?.user_id ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    bgcolor: msg.sender === userInfo?.user_id ? '#37C5E5' : '#F2F2F2',
                    color: msg.sender === userInfo?.user_id ? 'white' : 'black',
                    borderRadius: msg.sender === userInfo?.user_id ? '20px 20px 0 20px' : '20px 20px 20px 0',
                    px: 2,
                    py: 1,
                    display: 'inline-block', 
                  }}
                >
                  <Typography
                    variant="body2"
                    component="span" 
                    sx={{ wordBreak: 'break-word' }}
                  >
                    {msg.content}
                  </Typography>
                </Box>

                {/* Phần trạng thái */}
                <Typography
                  variant="caption"
                  sx={{
                    color: '#999',
                    fontSize: '11px',
                    mt: 0.5,
                    pr: 1,
                  }}
                >
                  {msg.sender === userInfo?.user_id
                    ? (msg.status === 'read' ? 'Đã xem' : 'Đã gửi')
                    : ''}
                </Typography>
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
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 0.8, 
        bgcolor: '#F2F2F2', 
        borderRadius: '20px',  // Làm cho phần nhập tin nhắn có góc bo tròn hoàn toàn
        width: '98%', // Giảm độ rộng
        margin: '30px auto', // Tạo khoảng cách & căn giữa
        boxShadow: '0px 3px 3px rgba(0,0,0,0.1)' // Tạo hiệu ứng nổi nhẹ
      }}>
        <TextField
          fullWidth
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          placeholder="Nhập tin nhắn..."
          sx={{
            borderRadius: '999px', 
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Xóa viền của outline mặc định
            '& .MuiInputBase-root': { border: 'none' }, // Đảm bảo không có border bên ngoài
            '& .MuiInputBase-input::placeholder': { color: 'black', opacity: 1 } // Đổi màu chữ placeholder thành đen
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
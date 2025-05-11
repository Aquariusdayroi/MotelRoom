import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, Box } from '@mui/material';
import axiosClient from '../../api/axiosClient';
import { AuthToken } from '../../authToken';

export default function ConversationList({ onSelect, selectedId }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthToken);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axiosClient.get('chat/api/conversations/list/');
        setConversations(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách hội thoại:', err);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (conversations.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="textSecondary">Chưa có cuộc trò chuyện nào</Typography>
      </Box>
    );
  }

  return (
    <div className='d-flex flex-column px-4 pt-4'>
      <Typography 
          variant="h4" 
          sx={{ 
             fontSize: '30px', 
            fontWeight: 'bold', 
            fontFamily: '"Noto Sans TC", sans-serif', 
            padding: '10px'
          }}
        >
          Tin nhắn
      </Typography>

      
      <List className='tl-conversation'>
        {conversations.map((conv) => (
          <ListItem
            key={conv.id}
            button
            selected={selectedId === conv.id}
            onClick={() => onSelect(conv)}
            sx={{
              bgcolor: selectedId === conv.id ? '#e3f2fd' : 'white',
              '&:hover': { bgcolor: '#f0f0f0' },
              py: 1.5,
            }}
          >
            <ListItemText
              primary={userInfo.fullname == conv.user_one.fullname ? conv.user_two.fullname : conv.user_one.fullname || `Cuộc trò chuyện #${conv.id}`}
              secondary={
                conv.last_message
                  ? `${conv.last_message.content.slice(0, 30)}${conv.last_message.content.length > 30 ? '...' : ''}`
                  : 'Chưa có tin nhắn'
              }
              primaryTypographyProps={{ fontWeight: selectedId === conv.id ? 'bold' : 'medium' }}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
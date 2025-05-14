import React, { useContext, useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import axiosClient from "../../api/axiosClient";
import { AuthToken } from "../../authToken";

export default function ConversationList({
  onSelect,
  selectedId,
  conversations,
}) {
  const { userInfo } = useContext(AuthToken);

  if (conversations.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="textSecondary">
          Chưa có cuộc trò chuyện nào
        </Typography>
      </Box>
    );
  }

  return (
    <div className="d-flex flex-column  pt-2 ">
      <Typography
        variant="h4"
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          fontFamily: '"Noto Sans TC", sans-serif',
          padding: "20px",
          paddingX: "44px",
        }}
      >
        Tin nhắn
      </Typography>

      <List className="tl-conversation">
        {conversations.map((conv) => {
          const isRead =
            conv?.last_message?.status === "sent" &&
            userInfo.user_id != conv?.last_message?.sender;
          return (
            <ListItem
              key={conv.id}
              button
              selected={selectedId === conv.id}
              onClick={() => onSelect(conv)}
              sx={{
                px: 4.4,
                bgcolor: selectedId === conv.id ? "#e3f2fd" : "white",
                "&:hover": { bgcolor: "#f0f0f0" },
                py: 2,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Avatar
                  alt="Avatar"
                  src={
                    userInfo.fullname === conv.user_one.fullname
                      ? conv.user_two.avatar
                      : conv.user_one.avatar
                  }
                  sx={{ width: 56, height: 56, mr: 2 }}
                />

                <ListItemText
                  primary={
                    userInfo.fullname === conv.user_one.fullname
                      ? conv.user_two.fullname
                      : conv.user_one.fullname || `Cuộc trò chuyện #${conv.id}`
                  }
                  secondary={
                    conv.last_message
                      ? `${conv.last_message.content.slice(0, 30)}${
                          conv.last_message.content.length > 30 ? "..." : ""
                        }`
                      : "Chưa có tin nhắn"
                  }
                  primaryTypographyProps={{
                    fontWeight: selectedId === conv.id ? "bold" : "bold",
                    fontFamily: "Noto Sans, sans-serif",
                  }}
                  secondaryTypographyProps={{
                    fontWeight: isRead ? "bold" : "normal",
                    color: isRead ? 'black' : 'gray',
                    
                    fontFamily: "Noto Sans, sans-serif",
                  }}
                />

                {isRead && <div className="bg-danger rounded-circle" style={{width: '10px', height: '10px'}}></div>}
              </Box>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

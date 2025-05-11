import React, { useState } from 'react';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/ChatWindow';

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const token = Cookies.get('authToken');

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Main Grid */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar: Conversation List */}
        <div
            className="col-xl-3 col-sm-3 col-3 p-0 border-right"
            style={{
              backgroundColor: 'white',
              overflowY: 'auto',
              height: '100%',
              boxShadow: '1.5px 0px 5px rgba(0, 0, 0, 0.1)', 
              zIndex: 1, 
            }}
          >
          <ConversationList
            onSelect={setSelectedConversation}
            selectedId={selectedConversation?.id}
          />
        </div>

        {/* Chat Window */}
        <div className="col-xl-9 col-sm-9 col-9 p-0" style={{ height: '100%' }}>
          {selectedConversation && token ? (
            <ChatWindow token={token} conversation={selectedConversation} />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '100%', backgroundColor: '#fafafa' }}
            >
              <p style={{ color: '#757575' }}>Chọn một cuộc trò chuyện để bắt đầu</p> {/* Thay Typography bằng p */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

from .views import ConversationCreateView, ConversationListView, MessageListView, UpdateMessageStatusView
from django.urls import path, include



urlpatterns = [
    path("conversations/list/", ConversationListView.as_view(), name='list-conversations'), #api lấy danh sách hội thoại
    path("conversations/create/", ConversationCreateView.as_view(), name='create-conversations'), #api tạo hội thoại
    path('messages/', MessageListView.as_view(), name='message-list'), #api lấy tin nhắn
    path('messages/update-status/', UpdateMessageStatusView.as_view(), name='message-update-satus') #api cập nhật trạng thái tin nhắn
]



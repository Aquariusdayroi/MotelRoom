from rest_framework import  status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from chat.models import Conversation, Message, MessageMedia
from .serializers import ConversationSerializer, MessageMediaSerializer, MessageSerializer
from django.db import models
from rest_framework.views import APIView
from rest_framework import generics

#---------------------------------------------------------------------------------------------------#
#Api lấy danh sách cuộc trò chuyện
class ConversationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        conversations = Conversation.objects.filter(
            models.Q(user_one=user) | models.Q(user_two=user)
        )
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)

#---------------------------------------------------------------------------------------------------#
#Api tạo cuộc trò chuyện mới
class ConversationCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        user_two = request.data.get("user_two")

        if str(user.id) == str(user_two):
            return Response({
                "status": False,
                "message": "Không thể tạo cuộc trò chuyện với chính mình."
                }, status=status.HTTP_400_BAD_REQUEST)

        exists = Conversation.objects.filter(
            models.Q(user_one=user, user_two_id=user_two) |
            models.Q(user_one_id=user_two, user_two=user)
        ).exists()

        if exists:
            return Response({
                "status": False,
                "message": "Cuộc trò chuyện đã tồn tại."
                }, status=status.HTTP_400_BAD_REQUEST)

        conversation = Conversation.objects.create(user_one=user, user_two_id=user_two)
        serializer = ConversationSerializer(conversation)
        return Response({
            'status': True,
            'mesage': 'Tạo cuộc trò chuyện mới thành công',
            'data': serializer.data
            }, status=status.HTTP_201_CREATED)


#---------------------------------------------------------------------------------------------------#
#Api lấy tin nhắn cũ
class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        conversation_id = self.request.query_params.get('conversation_id')
        if conversation_id:
            return Message.objects.filter(conversation_id=conversation_id).order_by('create_at')
        return Message.objects.none()

        
#---------------------------------------------------------------------------------------------------#
#Api cập nhật trạng thái tin nhắn
class UpdateMessageStatusView(APIView):
    def post(self, request):
        message_id = request.data.get('message_id')
        new_status = request.data.get('status')  # 'delivered' hoặc 'read'
        try:
            message = Message.objects.get(id=message_id)
            if new_status in ['delivered', 'read']:
                message.status = new_status
                message.save()
                return Response({'status': 'success'}, status=200)
            return Response({'error': 'Trạng thái không hợp lệ'}, status=400)
        except Message.DoesNotExist:
            return Response({'error': 'Tin nhắn không tồn tại'}, status=404)
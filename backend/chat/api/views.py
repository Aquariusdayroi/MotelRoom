from rest_framework import  status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from chat.models import Conversation, Message, MessageMedia
from .serializers import ConversationSerializer, MessageMediaSerializer, MessageSerializer
from django.db import models, IntegrityError, transaction
from rest_framework.views import APIView
from rest_framework import generics
from django.db.models import Q
#---------------------------------------------------------------------------------------------------#
#Api lấy danh sách cuộc trò chuyện
class ConversationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        conversations = Conversation.objects.filter(
            models.Q(user_one=user) | models.Q(user_two=user)
        ).order_by('-created_at')
        
        serializer = ConversationSerializer(conversations, many=True, context={'request': request})
        return Response(serializer.data)

#---------------------------------------------------------------------------------------------------#
#Api tạo cuộc trò chuyện mới
class ConversationCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        user_two = request.data.get("user_two")
        print(f"Yêu cầu tạo cuộc trò chuyện: user={user.id}, user_two={user_two}")

        if user_two is None:
            return Response({
                "status": False,
                "message": "Không có dữ liệu truyền vào."
            }, status=status.HTTP_400_BAD_REQUEST)

        if str(user.id) == str(user_two):
            return Response({
                "status": False,
                "message": "Không thể tạo cuộc trò chuyện với chính mình."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                # Kiểm tra cuộc trò chuyện hiện có
                conversation = Conversation.objects.filter(
                    Q(user_one=user, user_two_id=user_two) |
                    Q(user_one_id=user_two, user_two=user)
                ).first()

                if conversation is not None:
                    conversation.save()
                    return Response({
                        "status": True,
                        "message": "Cuộc trò chuyện đã tồn tại.",
                        'data': ConversationSerializer(conversation, context={'request': request}).data
                    }, status=status.HTTP_200_OK)

                conversation = Conversation.objects.create(user_one=user, user_two_id=user_two)
                serializer = ConversationSerializer(conversation, context={'request': request})

                return Response({
                    'status': True,
                    'message': 'Tạo cuộc trò chuyện mới thành công',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)

        except IntegrityError:
            print(f"Lỗi IntegrityError: Thử lấy lại cuộc trò chuyện")
            conversation = Conversation.objects.filter(
                Q(user_one=user, user_two_id=user_two) |
                Q(user_one_id=user_two, user_two=user)
            ).first()
            if conversation:
                print(f"Tìm thấy cuộc trò chuyện sau lỗi: ID={conversation.id}")
                return Response({
                    "status": True,
                    "message": "Cuộc trò chuyện đã tồn tại.",
                    'data': ConversationSerializer(conversation, context={'request': request}).data
                }, status=status.HTTP_200_OK)
            print(f"Không tìm thấy cuộc trò chuyện sau lỗi")
            return Response({
                "status": False,
                "message": "Lỗi khi tạo cuộc trò chuyện."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#---------------------------------------------------------------------------------------------------#
#Api lấy tin nhắn cũ
class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        conversation_id = self.request.query_params.get('conversation_id')
        if conversation_id:
            return Message.objects.filter(conversation_id=conversation_id).order_by('-create_at')
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
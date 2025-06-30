from notification.models import Notification
from rest_framework import permissions, status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from user.models import User

# Api lấy toàn bộ thông báo của người dùng
from .serializers import NotificationSerializer

class NotificationListView(GenericAPIView):
    """
    API endpoint that allows notifications to be viewed or edited.
    """
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Lấy thông báo của người dùng hiện tại
        return self.queryset.filter(user=self.request.user)
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)

        return Response({
                "success": True,
                "message": "Lấy danh sách thông báo thành công.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

# Tạo thông báo mới
def create_notification(user: User, title: str, message: str, actor: User = None, **kwargs):
    """
    Tạo thông báo mới cho người dùng.
    
    """
    if user == actor:
        pass
    
    if not isinstance(user, User):
        raise ValueError("user must be an instance of User")
    
    if actor is None:
        actor = User.objects.filter(is_superuser=True).first()
    
    return Notification.objects.create(
        user=user,
        title=title,
        message=message,
        actor=actor,
        **kwargs
    )
    
# Api đánh dấu thông báo là đã đọc, xóa thông báo
class NotificationReadDeleteView(GenericAPIView):
    """
    API endpoint that allows a notification to be marked as read.
    """
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, id, *args, **kwargs):
        notification = Notification.objects.get(id=id, user=request.user)
        if not notification:
            return Response({
                "success": False,
                "message": "ID không hợp lệ hoặc thông báo không tồn tại."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            notification.is_read = True
            notification.save()
            return Response({
                "success": True,
                "message": "Đánh dấu thông báo là đã đọc thành công."
            }, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({
                "success": False,
                "message": "Thông báo không tồn tại hoặc không thuộc về người dùng này."
            }, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id, *args, **kwargs):
        try:
            notification = Notification.objects.get(id=id, user=request.user)
            notification.delete()
            return Response({
                "success": True,
                "message": "Xóa thông báo thành công."
            }, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({
                "success": False,
                "message": "Thông báo không tồn tại hoặc không thuộc về người dùng này."
            }, status=status.HTTP_404_NOT_FOUND)
            
            
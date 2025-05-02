from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rental_post.models import RentalPost
from .serializers import RentalPostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound


class RentalPostListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Lấy tất cả bài đăng của người dùng đang đăng nhập"""
        posts = RentalPost.objects.filter(user=request.user)
        serializer = RentalPostSerializer(posts, many=True)
        return Response({
            "message": "Lấy danh sách bài đăng thành công.",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        """Đăng bài mới"""
        serializer = RentalPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({
                "message": "Tạo bài đăng mới thành công.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "message": "Tạo bài đăng thất bại. Vui lòng kiểm tra lại dữ liệu.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class RentalPostDetailUpdateDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        """Xem chi tiết bài đăng theo ID"""
        try:
            post = RentalPost.objects.get(id=id, user=request.user)
        except RentalPost.DoesNotExist:
            raise NotFound(detail="Bài đăng không tồn tại.")

        serializer = RentalPostSerializer(post)
        return Response({
            "message": "Lấy thông tin bài đăng thành công.",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request, id):
        """Sửa bài đăng (cập nhật bài đăng theo ID)"""
        try:
            post = RentalPost.objects.get(id=id, user=request.user)
        except RentalPost.DoesNotExist:
            raise NotFound(detail="Bài đăng không tồn tại.")

        serializer = RentalPostSerializer(post, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Cập nhật bài đăng thành công.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        return Response({
            "message": "Cập nhật thất bại. Dữ liệu không hợp lệ.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """Xóa bài đăng"""
        try:
            post = RentalPost.objects.get(id=id, user=request.user)
        except RentalPost.DoesNotExist:
            raise NotFound(detail="Bài đăng không tồn tại.")
        post.delete()
        return Response(
            {"detail": "Bài đăng đã được xóa."},
            status=status.HTTP_204_NO_CONTENT
        )


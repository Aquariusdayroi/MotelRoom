from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from review.models import Review
from rental_post.models import RentalPost
from review.api.serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

class ReviewListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        """Lấy tất cả review theo bài đăng, có thể lọc theo rating"""
        rating = request.query_params.get("rating")
        reviews = Review.objects.filter(rental_post__id=post_id)

        if rating:
            try:
                rating = float(rating)
                reviews = reviews.filter(rating=rating)
            except ValueError:
                return Response(
                    {"message": "Rating không hợp lệ."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, post_id):
        """Tạo review mới cho bài đăng (mỗi người chỉ được 1 review/bài)"""
        rental_post = get_object_or_404(RentalPost, id=post_id)

        # Kiểm tra người dùng đã review chưa
        if Review.objects.filter(rental_post=rental_post, user=request.user).exists():
            return Response(
                {"message": "Bạn đã đánh giá bài đăng này rồi."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(rental_post=rental_post, user=request.user)
            return Response({
                "message": "Đánh giá đã được tạo thành công.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "message": "Tạo đánh giá thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class ReviewDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, post_id, id):
        return get_object_or_404(Review, id=id, rental_post_id=post_id)

    def get(self, request, post_id, id):
        review = self.get_object(post_id, id)
        serializer = ReviewSerializer(review)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, post_id, id):
        review = self.get_object(post_id, id)
        if review.user != request.user:
            return Response({"message": "Bạn không có quyền sửa đánh giá này."}, status=status.HTTP_403_FORBIDDEN)
        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Cập nhật đánh giá thành công.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "message": "Cập nhật thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id, id):
        review = self.get_object(post_id, id)
        if review.user != request.user:
            return Response({"message": "Bạn không có quyền xóa đánh giá này."}, status=status.HTTP_403_FORBIDDEN)
        review.delete()
        return Response({"message": "Xóa đánh giá thành công."}, status=status.HTTP_204_NO_CONTENT)

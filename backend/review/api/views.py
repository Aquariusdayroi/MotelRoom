from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from review.models import Review
from rental_post.models import RentalPost
from review.api.serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from django.utils import timezone
from datetime import timedelta

# API lấy review của người dùng hiện tại theo bài đăng
class UserReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        """Lấy review của người dùng hiện tại cho bài đăng cụ thể"""
        try:
            review = Review.objects.get(rental_post__id=post_id, user=request.user)
        except Review.DoesNotExist:
            return Response({
                "success": False,
                "message": "Không tìm thấy review của bạn cho bài đăng này."
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = ReviewSerializer(review, context={'request': request})
        return Response({
            "success": True,
            "message": "Lấy review thành công.",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request, post_id):
        """Sửa review của người dùng hiện tại cho bài đăng"""
        # Lấy review của người dùng hiện tại cho bài đăng
        review = Review.objects.filter(rental_post_id=post_id, user=request.user).first()

        if not review:
            return Response({
                "success": False,
                "message": "Không tìm thấy review của bạn cho bài đăng này."
            }, status=status.HTTP_404_NOT_FOUND)

        # Cập nhật review nếu tồn tại
        serializer = ReviewSerializer(review, context={'request': request}, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Cập nhật đánh giá thành công.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        return Response({
            "success": False,
            "message": "Cập nhật thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id):
        """Xóa review của người dùng hiện tại cho bài đăng"""
        # Lấy review của người dùng hiện tại cho bài đăng
        review = Review.objects.filter(rental_post_id=post_id, user=request.user).first()

        if not review:
            return Response({
                "success": False,
                "message": "Không tìm thấy review của bạn cho bài đăng này."
            }, status=status.HTTP_404_NOT_FOUND)

        # Xóa review nếu tồn tại
        review.delete()
        return Response({
            "success": True,
            "message": "Xóa đánh giá thành công."
        }, status=status.HTTP_204_NO_CONTENT)



# API xem danh sách review, tạo review mới cho bài đăng
class ReviewListCreateAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request, post_id):
        """Lấy tất cả review theo bài đăng (trừ review của người hiện tại nếu đã đăng nhập), có thể lọc theo rating"""
        rating = request.query_params.get("rating")
        reviews = Review.objects.filter(rental_post__id=post_id)
        
        # Nếu người dùng đã đăng nhập thì loại bỏ review của chính họ
        if request.user.is_authenticated:
            reviews = reviews.exclude(user=request.user)

        # Nếu có query parameter "rating", lọc theo rating
        if rating:
            try:
                rating = float(rating)
                reviews = reviews.filter(rating=rating)
            except ValueError:
                return Response({
                    "success": False,
                    "message": "Rating không hợp lệ."
                }, status=status.HTTP_400_BAD_REQUEST)

        # Serialize và trả về dữ liệu review
        serializer = ReviewSerializer(reviews, many=True, context={'request': request})
        return Response({
            "success": True,
            "message": "Lấy danh sách đánh giá thành công.",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request, post_id):
        """Tạo review mới cho bài đăng (mỗi người chỉ được 1 review/bài)"""
        rental_post = get_object_or_404(RentalPost, id=post_id)

        if Review.objects.filter(rental_post=rental_post, user=request.user).exists():
            return Response({
                "success": False,
                "message": "Bạn đã đánh giá bài đăng này rồi."
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = ReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(rental_post=rental_post, user=request.user)
            return Response({
                "success": True,
                "message": "Đánh giá đã được tạo thành công.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "success": False,
            "message": "Tạo đánh giá thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


# API xem, sửa, xóa review theo ID của người dùng hiện tại
class ReviewDetailAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, post_id, id):
        """Lấy review theo ID bài đăng và ID review"""
        return get_object_or_404(Review, id=id, rental_post_id=post_id)

    def get(self, request, post_id, id):
        """Lấy chi tiết review của bài đăng cho người dùng hiện tại"""
        # Nếu người dùng chưa đăng nhập, họ có thể xem review của bất kỳ ai
        if not request.user.is_authenticated:
            review = self.get_object(post_id, id)
            return Response({
                "success": True,
                "message": "Lấy chi tiết đánh giá thành công.",
                "data": ReviewSerializer(review, context={'request': request}).data
            }, status=status.HTTP_200_OK)

        # Nếu người dùng đã đăng nhập, chỉ trả về review của họ
        review = Review.objects.filter(rental_post_id=post_id, id=id).first()

        if not review:
            return Response({
                "success": False,
                "message": "Bạn không có quyền xem review này hoặc không tồn tại."
            }, status=status.HTTP_403_FORBIDDEN)

        return Response({
            "success": True,
            "message": "Lấy chi tiết đánh giá thành công.",
            "data": ReviewSerializer(review).data
        }, status=status.HTTP_200_OK)

# API thống kê lượt review bài đăng
class ReviewCountAPIView(APIView):
    def get(self, request, post_id):

        # Kiểm tra xem bài đăng có tồn tại hay không
        try:
            rental_post = RentalPost.objects.get(pk=post_id)
        except RentalPost.DoesNotExist:
            return Response({"error": f"Bài đăng với ID {post_id} không tồn tại."}, 
                            status=status.HTTP_404_NOT_FOUND)

        # Lọc review theo bài đăng, tháng và năm hiện tại
        reviews_count = Review.objects.filter(
            rental_post=rental_post,
        ).count()

        return Response({
            "success": True,    
            "post_id": post_id,
            "reviews_count": reviews_count,
        })



#Api tạo đánh giá
class ReviewCreateOrUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, post_id):
        """
        Tạo mới đánh giá cho bài đăng. Mỗi người chỉ được đánh giá 1 lần cho mỗi bài đăng.
        """
        rental_post = get_object_or_404(RentalPost, id=post_id)
        # Kiểm tra đã có review chưa
        if Review.objects.filter(rental_post=rental_post, user=request.user).exists():
            return Response({
                "success": False,
                "message": "Bạn đã đánh giá bài đăng này rồi. Hãy sử dụng chức năng cập nhật để thay đổi đánh giá!"
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = ReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(rental_post=rental_post, user=request.user)
            return Response({
                "success": True,
                "message": "Đánh giá đã được tạo thành công.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Tạo đánh giá thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, post_id):
        """
        Cập nhật đánh giá của người dùng cho bài đăng.
        """
        rental_post = get_object_or_404(RentalPost, id=post_id)
        review = Review.objects.filter(rental_post=rental_post, user=request.user).first()
        if not review:
            return Response({
                "success": False,
                "message": "Bạn chưa đánh giá bài đăng này. Hãy tạo đánh giá trước!"
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = ReviewSerializer(review, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Cập nhật đánh giá thành công.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "message": "Cập nhật đánh giá thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
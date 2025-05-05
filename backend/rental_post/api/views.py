from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rental_post.models import RentalPost
from .serializers import RentalPostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from backend import settings
# API xem toàn bộ bài đăng, tạo bài đăng của người dùng hiện tại
class RentalPostListCreateAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RentalPostSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return RentalPost.objects.filter(user=self.request.user)

    def get(self, request):
        """Lấy danh sách bài đăng với phân trang"""
        if not request.user.is_authenticated:
            return Response({
                "success": False,
                "message": "Bạn chưa đăng nhập."
            }, status=status.HTTP_401_UNAUTHORIZED)

        if request.user.role != 'owner':
            return Response({
                "success": False,
                "message": "Bạn chưa là Owner để truy cập vào danh sách bài đăng."
            }, status=status.HTTP_403_FORBIDDEN)

        page_number = request.query_params.get('page', 1)
        cache_key = f'rental_posts_cache_page_{page_number}_{request.user.id}'
        cached_posts = cache.get(cache_key)

        if cached_posts:
            cached_posts["success"] = True
            return Response(cached_posts, status=status.HTTP_200_OK)

        posts = self.get_queryset()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = self.get_serializer(result_page, many=True)

        result_data = {
            "success": True,
            "count": posts.count(),
            "next": paginator.get_next_link(),
            "previous": paginator.get_previous_link(),
            "results": {
                "message": "Lấy danh sách bài đăng thành công.",
                "data": serializer.data
            }
        }

        cache.set(cache_key, result_data)
        return Response(result_data, status=status.HTTP_200_OK)



    def post(self, request):
        """Tạo bài đăng mới"""
        if request.user.role != 'owner':
            return Response({
                "success": False,
                "message": "Bạn phải là Owner để tạo bài đăng."
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = RentalPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)

            total_items = RentalPost.objects.filter(user=request.user).count()
            page_size = settings.REST_FRAMEWORK.get('PAGE_SIZE', 6)
            total_pages = (total_items + page_size - 1) // page_size

            for page in range(1, total_pages + 1):
                cache_key = f'rental_posts_cache_page_{page}_{request.user.id}'
                cache.delete(cache_key)

            return Response({
                "success": True,
                "message": "Bài đăng đã được tạo thành công.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            "success": False,
            "message": "Tạo bài đăng thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
# API xem chi tiết bài đăng, sửa bài đăng, xóa bài đăng theo ID của người dùng hiện tại
class RentalPostDetailUpdateDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        """Xem chi tiết bài đăng theo ID"""
        try:
            post = RentalPost.objects.get(id=id, user=request.user)
        except RentalPost.DoesNotExist:
            raise NotFound(detail="Không tìm thấy bài đăng của bạn.")

        serializer = RentalPostSerializer(post)
        return Response({
            "success": True,
            "message": "Lấy thông tin bài đăng thành công.",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request, id):
        """Sửa bài đăng (cập nhật bài đăng theo ID)"""
        if request.user.role != 'owner':
            return Response({
                "success": False,
                "message": "Bạn phải là Owner để sửa bài đăng."
            }, status=status.HTTP_403_FORBIDDEN)
            
        try:
            post = RentalPost.objects.get(id=id, user=request.user)
        except RentalPost.DoesNotExist:
            raise NotFound(detail="Không tìm thấy bài đăng của bạn.")

        serializer = RentalPostSerializer(post, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            total_items = RentalPost.objects.filter(user=request.user).count()
            page_size = settings.REST_FRAMEWORK.get('PAGE_SIZE', 6)
            total_pages = (total_items + page_size - 1) // page_size

            for page in range(1, total_pages + 1):
                cache_key = f'rental_posts_cache_page_{page}_{request.user.id}'
                cache.delete(cache_key)
            return Response({
                "success": True,
                "message": "Cập nhật bài đăng thành công.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        return Response({
            "success": False,
            "message": "Cập nhật thất bại. Dữ liệu không hợp lệ.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """Xóa bài đăng"""
        if request.user.role != 'owner':
            return Response({
                "success": False,
                "message": "Bạn phải là Owner để xóa bài đăng."
            }, status=status.HTTP_403_FORBIDDEN)
        try:
            post = RentalPost.objects.get(id=id, user=request.user)
        except RentalPost.DoesNotExist:
            raise NotFound(detail="Không tìm thấy bài đăng của bạn.")
        post.delete()
        total_items = RentalPost.objects.filter(user=request.user).count()
        page_size = settings.REST_FRAMEWORK.get('PAGE_SIZE', 6)
        total_pages = (total_items + page_size - 1) // page_size

        for page in range(1, total_pages + 1):
            cache_key = f'rental_posts_cache_page_{page}_{request.user.id}'
            cache.delete(cache_key)
        return Response({
            "success": True,
            "message": "Bài đăng đã được xóa."
        }, status=status.HTTP_204_NO_CONTENT)



#Api tìm kiếm bài đăng theo bộ lọc
@method_decorator(cache_page(60*5), name='dispatch') #Lưu cache 5p
class RentalPostSearchAPIView(ListAPIView):

    serializer_class = RentalPostSerializer
    def get_queryset(self):
        filter_params = {
            "home_type": "home_type__iexact", #Loại nhà
            "price_min":  "price__gte", #Giá bắt đầu
            "price_max": "price__lte", #Giá kết thúc
            "id": "id__exact",#Tìm theo id
        }
        filters = {}
        for param, field in filter_params.items():
            value = self.request.query_params.get(param)
            if value:
                filters[field] = value
        
        if filters:
            return RentalPost.objects.filter(**filters)
        else: 
            return RentalPost.objects.all()
        
    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        if page : 
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                "status": True,
                "message": "Lấy danh sách bài viết thành công.",
                "data": serializer.data 
            })
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": True,
            "count": len(serializer.data),
            "message": "Lấy danh sách bài viết thành công.",
            "data": serializer.data
        }, status=status.HTTP_200_OK)
        
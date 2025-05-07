from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rental_post.models import RentalPost
from .serializers import RentalPostSerializer, RentalPostFavoriteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import backend.settings as settings

from django.db.models import F, FloatField
from django.db.models.expressions import ExpressionWrapper
from django.db.models.functions import ACos, Cos, Radians, Sin

from favorite.models import Favorite

# Custom pagination class với page_size được xác định trực tiếp
class CustomRentalPostPaginationOwnerList(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100  



class SmartPagination(PageNumberPagination):
    page_size = 18
    def get_paginated_response(self, data):
        total_pages = (self.page.paginator.count + self.get_page_size(self.request) - 1) // self.get_page_size(self.request)
        return Response({
            "status": True,
            "message": "Lấy danh sách bài viết thành công.",
            "count": self.page.paginator.count,
            "total_pages": total_pages,
            "current_page": self.page.number,
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "results": data
        })

# API xem toàn bộ bài đăng, tạo bài đăng của người dùng hiện tại
class RentalPostListCreateAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RentalPostSerializer
    pagination_class = CustomRentalPostPaginationOwnerList

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



#Api lấy danh sách bài đăng 
class RentalPostListAPIView(ListAPIView):

    serializer_class = RentalPostSerializer
    pagination_class = SmartPagination
    

    def paginate_queryset(self, queryset):
        if self.paginator is not None:
            self.paginator.page_size = 20
        return super().paginate_queryset(queryset)

    def get_queryset(self):
        cache_key = f"rentalpost_list_user_{self.request.user.id if self.request.user.is_authenticated else 'anon'}"
        queryset = cache.get(cache_key)
        if queryset is None:
            queryset = RentalPost.objects.prefetch_related('image')
            cache.set(cache_key, queryset, timeout=60*10)  # 10 phút
        return queryset
    

    def get_serializer_context(self):
        context =  super().get_serializer_context()
        if self.request.user.is_authenticated:
            favorite_ids = set(
                Favorite.objects.filter(user=self.request.user).values_list('rentalpost_id', flat =True)    
            )
            context['favorite_post_ids'] = favorite_ids

        return context

    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        kwargs['context']['expand_user'] = True
        kwargs["fields"] = ['id', 'title', 'home_type', 'price', 'acreage','address', 'user', 'images', 'update_at', 'is_favorite']
        return self.serializer_class(*args, **kwargs)        


# #Api tìm kiếm bài đăng theo bộ lọc
class RentalPostSearchAPIView(ListAPIView):
    serializer_class = RentalPostSerializer
    pagination_class = SmartPagination

    def paginate_queryset(self, queryset):
        if self.paginator is not None:
            self.paginator.page_size = 18
        return super().paginate_queryset(queryset)

    def get_queryset(self):

        queryset = RentalPost.objects.select_related('address').prefetch_related('image')

        lat = self.request.query_params.get('lat')
        lng = self.request.query_params.get('lng')
        # radius_km = request.query_params.get('radius', 5)  # mặc định 5km

        if lat and lng:
            try:
                lat = float(lat)
                lng = float(lng)
                # radius_km = float(radius_km)

                # Haversine formula tính khoảng cách giữa 2 tọa độ (trả về km)
                distance_expr = ExpressionWrapper(
                    6371 * ACos(
                        Cos(Radians(lat)) *
                        Cos(Radians(F('address__latitude'))) *
                        Cos(Radians(F('address__longitude')) - Radians(lng)) +
                        Sin(Radians(lat)) *
                        Sin(Radians(F('address__latitude')))
                    ),
                    output_field=FloatField()
                )

                queryset = queryset.annotate(distance = distance_expr)
                queryset = queryset.order_by('distance')
              
            except ValueError:
                pass 
            
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
            queryset = queryset.filter(**filters)
        return queryset
        

    
    def get_serializer_context(self):
        context =  super().get_serializer_context()
        if self.request.user.is_authenticated:
            favorite_ids = set(
                Favorite.objects.filter(user=self.request.user).values_list('rentalpost_id', flat =True)    
            )
            context['favorite_post_ids'] = favorite_ids

        return context

    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        kwargs['context']['expand_user'] = True
        kwargs["fields"] = ['id', 'title', 'home_type', 'price', 'acreage','address', 'user', 'images', 'update_at', 'is_favorite']
        return self.serializer_class(*args, **kwargs)        
    

#Api lấy danh sách bài đăng yêu thích
class RentalPostFavoriteListAPIView(ListAPIView):

    serializer_class = RentalPostFavoriteSerializer
    pagination_class = SmartPagination

    def paginate_queryset(self, queryset):
        if self.paginator is not None:
            self.paginator.page_size = 6
        return super().paginate_queryset(queryset)
    
    def get_queryset(self):
        cache_key = f"rentalpost_favorite_user_{self.request.user.id if self.request.user.is_authenticated else 'anon'}"
        queryset = cache.get(cache_key)
        if queryset is None:
            queryset = RentalPost.objects.filter(favorite__user=self.request.user).select_related('address').prefetch_related('image')
            cache.set(cache_key, queryset, timeout=60*10)  # 10 phút
        return queryset
    
    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        kwargs['context']['expand_user'] = True
        kwargs["fields"] = ['id', 'title', 'home_type', 'price', 'acreage','address', 'user', 'images', 'update_at', 'is_favorite']
        return self.serializer_class(*args, **kwargs)        
        



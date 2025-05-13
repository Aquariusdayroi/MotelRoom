#Django 
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout, get_user_model
from django.utils import timezone
from django.utils.dateparse import parse_date
from django.db.models import Count, Avg

#Rest frame work
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework import generics, serializers, status, permissions, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.views import APIView

#Model
from user.models import User, OwnerRequest
from rental_post.models import RentalPost
from review.models import Review



#Serializers
from .serializers import UserSerializer, RegisterSerializer, CustomTokenObtainPairSerializer, GoogleLoginSerializer
from .serializers import OwnerRequestSerializer, UpdateUserSerializer, OwnerRequestAdminSerializer
from rental_post.api.serializers import RentalPostSerializer
from review.api.serializers import ReviewSerializer

#Python
import os
from datetime import datetime, timedelta
import time

#Review
from review.models import Review
from review.api.serializers import ReviewSerializer

#JWT Token
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.exceptions import AuthenticationFailed

#Gmail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model


#---------------------------------------------------------------------------------------------------#
# Api admin lấy danh sách user
class AdminManagerUserAPIViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'], url_path='get-list')
    def get_list(self, request):
        # Lấy danh sách người dùng
        if not request.user.is_superuser and request.user.role != 'admin':
            return Response({"success": False, 
                             "message": "Permission denied."
                            }, 
                            status=status.HTTP_403_FORBIDDEN)
        
        # Lọc theo một số tiêu chí hoặc lấy tất cả người dùng
        filter_params = {
            'fullname': 'fullname',
            'role': 'role',
            'city': 'city',
            'district': 'district',
            'address': 'address',
            'email': 'email__icontains',
            'phone_number': 'phone_number',
            'fullname': 'fullname__icontains',
            'is_active': 'is_active',
        }

        # Tạo một dictionary chứa các bộ lọc
        filters = {}

        # Duyệt qua các filter_params và lấy giá trị từ request.query_params
        for param, field in filter_params.items():
            value = request.query_params.get(param)
            if value:
                filters[field] = value

        # Áp dụng các bộ lọc vào queryset
        if filters:
            users = User.objects.filter(**filters)
        else:
            users = User.objects.all()
        
        serializer = self.get_serializer(users, many=True)
        return Response({
            "success": True,
            "message": "Lấy danh sách người dùng thành công.",
            "users": serializer.data
        }, status=status.HTTP_200_OK)
        
    @action(detail=True, methods=['delete'])
    def delete(self, request, *args, **kwargs):
        # Xóa người dùng
        user_to_delete = self.get_object()
        
        if not request.user.is_superuser and request.user.role != 'admin':
            return Response({"success": False, 
                             "message": "Permission denied."
                            }, 
                            status=status.HTTP_403_FORBIDDEN)
            
        # Kiểm tra xem người dùng có quyền xóa chính mình hay không
        if user_to_delete == request.user:
            return Response({
                "success": False, 
                "message": "Không thể xóa tài khoản của chính mình."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user_to_delete.delete()
        return Response({
            "success": True,
            "message": "Xóa tài khoản thành công."
        }, status=status.HTTP_204_NO_CONTENT)
        
    @action(detail=False, methods=['get'])
    def stat(self, request, *args, **kwargs):
        # Thống kê số lượng người dùng theo tiêu chí
        total_users = User.objects.count()
        
        fields_param = request.query_params.get('fields')
        if not fields_param:
            return Response({
                "success": False,
                "message": "Thiếu tham số fields. Ví dụ: ?fields=role,city"
            }, status=status.HTTP_400_BAD_REQUEST)

        fields = [f.strip() for f in fields_param.split(',')]
                
        # Lọc dữ liệu đầu vào trước khi thống kê
        filterable_fields = [f.name for f in User._meta.fields]  # tất cả field hợp lệ
        filters = {}

        # Hỗ trợ lọc created, created__gte, created__lte
        for key in request.query_params:
            if key == 'fields':
                continue
            if key.startswith('created'):
                date_value = parse_date(request.query_params.get(key))
                if date_value:
                    filters[key] = date_value
            elif key in filterable_fields:
                filters[key] = request.query_params.get(key)

        filtered_users = User.objects.filter(**filters)
        filtered_count = filtered_users.count()
        
        statistics = {}

        for field in fields:
            if field not in filterable_fields:
                continue

            stats = User.objects.values(field).annotate(count=Count('id')).order_by(field)
            statistics[field] = list(stats)

        return Response({
            "success": True,
            "message": "Thống kê số lượng người dùng thành công.",
            "total_users": total_users,
            "filtered_users": filtered_count,
            "statistics": statistics
        }, status=status.HTTP_200_OK)
        
    @action(detail=False, methods=['get'])
    def stat_review(self, request, *args, **kwargs):
        if not request.user.is_superuser and request.user.role != 'admin':
            return Response({"success": False, 
                             "message": "Permission denied."
                            }, 
                            status=status.HTTP_403_FORBIDDEN)
            
        # Thống kê số lượt đánh giá của người dùng
        users = User.objects.all()
        user_ids = users.values_list("id", flat=True)
        
        stats = (
            Review.objects.filter(user_id__in=user_ids) 
            .values("user_id")
            .annotate(
                total_reviews=Count("id")
            )
            .order_by("-total_reviews")        
        )
        
        if not stats:
            return Response({
               "success": False,
               "message": "Không có người dùng nào đánh giá."
           }, status=status.HTTP_404_NOT_FOUND) 
        
        results = []
        for stat in stats:
            user = users.get(id=stat['user_id'])
            results.append({
                "fullname": user.fullname,
                "total_reviews": stat["total_reviews"]
            })
            
        total_user_reviewed = stats.count()
        
        return Response({
            "success": True,
            "message": "Thống kê lượt đánh giá thành công.",
            "total_user_reviewed": total_user_reviewed,
            "results": results
        }, status=status.HTTP_200_OK)

#---------------------------------------------------------------------------------------------------#
# Api người dùng xem Chi tiết, cập nhật, xóa tài khoản
class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = UpdateUserSerializer 
    permission_classes = [IsAuthenticated]  # Chỉ cần đăng nhập
    
    def get_object(self):
        return self.request.user  # Lấy người dùng hiện tại
    
    def retrieve(self, request, *args, **kwargs):
        # Lấy thông tin người dùng
        serializer = self.get_serializer(self.get_object())
        return Response({
            "success": True,
            "message": "Lấy thông tin người dùng thành công.",
            "user": serializer.data
        }, status=status.HTTP_200_OK)
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()  # Lấy đối tượng người dùng hiện tại
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Tiến hành cập nhật đối tượng
        self.perform_update(serializer)

        # Trả về dữ liệu người dùng đã cập nhật, sử dụng UpdateUserSerializer để lấy thông tin địa chỉ
        read_serializer = UpdateUserSerializer(instance, context=self.get_serializer_context())

        return Response({
            "success": True,
            "message": "Cập nhật thông tin thành công.",
            "user": read_serializer.data  # Trả về dữ liệu đã cập nhật, bao gồm thông tin địa chỉ
        })



    def destroy(self, request, *args, **kwargs):
        # Xóa tài khoản người dùng
        instance = self.get_object()
        instance.delete()
        return Response({
            "success": True,
            "message": "Xóa tài khoản thành công."
        }, status=status.HTTP_204_NO_CONTENT)


#---------------------------------------------------------------------------------------------------#
# Api Đăng nhập
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def handle_exception(self, exc):
        if isinstance(exc, AuthenticationFailed):
            return Response({
                "success": False,
                "message": exc.detail["detail"]
            }, status=status.HTTP_401_UNAUTHORIZED)
        return super().handle_exception(exc)

#---------------------------------------------------------------------------------------------------#
# Api Đăng xuất
class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request): 
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({
                "success": False,
                "message": "Thiếu refresh token."
            }, status=status.HTTP_400_BAD_REQUEST) 

        try:
            time.sleep(1)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({
                "success": True,
                "message": "Đăng xuất thành công."
            }, status=status.HTTP_200_OK)
        except TokenError:
            return Response({
                "success": False,
                "message": "Refresh token không hợp lệ hoặc đã hết hạn."
            }, status=status.HTTP_400_BAD_REQUEST)
            

#---------------------------------------------------------------------------------------------------#
# Api xác thực email
class VerifyEmailView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = get_user_model().objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            
            user.email_verified_at = datetime.now()
            user.save()
            return Response({"success": True, "message": "Xác minh email thành công."})
        else:
            return Response({"success": False, "message": "Liên kết xác minh không hợp lệ hoặc đã hết hạn."}, status=400)


#---------------------------------------------------------------------------------------------------#
#Api Đăng ký
class RegisterAPIView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny] #Bất kỳ ai

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "success": False,
                "message": "Đăng ký thất bại.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        return Response({
            "success": True,
            "message": "Đăng ký thành công.",
            "user":  UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    


#---------------------------------------------------------------------------------------------------#
#Api Đăng nhập bằng google 
class GoogleLoginView(APIView):
    def post(self, request):
        serializer = GoogleLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "message": "Đăng nhập bằng Google thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


#---------------------------------------------------------------------------------------------------#
# API người dùng gửi yêu cầu đăng ký owner
class OwnerRequestAPIViewSet(viewsets.ViewSet):
    queryset = OwnerRequest.objects.all()
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def send_request(self, request):
        serializer = OwnerRequestSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'success': True,
            'message': 'Yêu cầu đăng ký chủ phòng đã được gửi.'  
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def my_request(self, request):
        try:
            req = request.user.ownerrequest
        except OwnerRequest.DoesNotExist:
            return Response({
                "success": False,
                "message": "Bạn chưa gửi yêu cầu trở thành chủ phòng."
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "success": True,
            "message": "Lấy thông tin yêu cầu thành công.",
            "status": req.status,
            "reviewed_at": req.reviewed_at,
            "rejection_reason": req.rejection_reason
        }, status=status.HTTP_200_OK)


#---------------------------------------------------------------------------------------------------#        
# API admin xem và xử lý yêu cầu
class OwnerRequestAdminAPIViewSet(viewsets.ViewSet):
    queryset = OwnerRequest.objects.all()
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['get'], url_path='list-request')
    def list_request(self, request):
        requests = OwnerRequest.objects.filter(status='pending')
        serializer = OwnerRequestAdminSerializer(requests, many=True)
        return Response({
            "success": True,
            "message": "Lấy danh sách yêu cầu thành công.",
            "requests": serializer.data
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        try:
            owner_request = OwnerRequest.objects.get(pk=pk, status='pending')
        except OwnerRequest.DoesNotExist:
            return Response({
                'success': False,
                'message': "Không tìm thấy yêu cầu phù hợp."
            }, status=status.HTTP_404_NOT_FOUND)
            
        user = owner_request.user
        user.role = 'owner'
        user.cccd = owner_request.cccd
        user.image_front_cccd = owner_request.image_front_cccd
        user.image_back_cccd = owner_request.image_back_cccd
        user.save()    

        owner_request.status = 'approved'
        owner_request.reviewed_at = timezone.now()
        owner_request.save()

        return Response({
            'success': True,
            'message': 'Yêu cầu đã được chấp nhận.'
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        try:
            owner_request = OwnerRequest.objects.get(pk=pk, status='pending')
        except OwnerRequest.DoesNotExist:
            return Response({
                'success': False,
                'message': "Không tìm thấy yêu cầu phù hợp."
            }, status=status.HTTP_404_NOT_FOUND)

        reason = request.data.get('reason')
        if not reason:
            return Response({
                'success': False,
                'message': 'Phải có lý do từ chối.'
            }, status=status.HTTP_400_BAD_REQUEST)

        owner_request.status = 'rejected'
        owner_request.rejection_reason = reason
        owner_request.reviewed_at = timezone.now()
        owner_request.save()

        return Response({
            'success': True,
            'message': 'Yêu cầu bị từ chối.'
        }, status=status.HTTP_200_OK)


#---------------------------------------------------------------------------------------------------#      
# API admin thống kê số bài đăng theo tiêu chí
class AdminStatsRentalPostAPIViewSet(viewsets.ModelViewSet):
    queryset = RentalPost.objects.all()
    permission_classes = [IsAdminUser]
    
    @action(detail=False, methods=['get'])
    def stat(self, request, *args, **kwargs):
        # Thống kê số lượng bài đăng theo tiêu chí
        total_rentalposts = RentalPost.objects.count()
        
        fields_param = request.query_params.get('fields')
        if not fields_param:
            return Response({
                "success": False,
                "message": "Thiếu tham số fields. Ví dụ: ?fields=title,address."
            }, status=status.HTTP_400_BAD_REQUEST)

        fields = [f.strip() for f in fields_param.split(',')]
                
        # Lọc dữ liệu đầu vào trước khi thống kê
        filterable_fields = [f.name for f in RentalPost._meta.fields]  # tất cả field hợp lệ
        filters = {}

        # Hỗ trợ lọc create_at, create_at__gte, create_at__lte
        for key in request.query_params:
            if key == 'fields':
                continue
            if key.startswith('create_at'):
                date_value = parse_date(request.query_params.get(key))
                if date_value:
                    filters[key] = date_value
            elif key in filterable_fields:
                filters[key] = request.query_params.get(key)

        filtered_rentals = RentalPost.objects.filter(**filters)
        filtered_count = filtered_rentals.count()
        
        statistics = {}

        for field in fields:
            if field not in filterable_fields:
                continue

            stats = RentalPost.objects.values(field).annotate(count=Count('id')).order_by(field)
            statistics[field] = list(stats)

        return Response({
            "success": True,
            "message": "Thống kê số lượng bài đăng thành công.",
            "total_rentalposts": total_rentalposts,
            "filtered_rentals": filtered_count,
            "statistics": statistics
        }, status=status.HTTP_200_OK)
        
    @action(detail=False, methods=['get'], url_path="static-owner-rentalpost")
    def stat_rental(self, request, *args, **kwargs): # Api thống kê số bài đăng và chủ trọ và bài đăng của từng  chủ trọ
        owners = User.objects.filter(role='owner')
        owner_ids = owners.values_list("id", flat=True)
        
        stats = (
            RentalPost.objects.filter(user_id__in=owner_ids) .values("user_id").annotate(
                total_rental_posts=Count("id")
            )
            .order_by("-total_rental_posts")        
        )
        
        if not stats:
           return Response({
               "success": False,
               "message": "Không có chủ trọ nào có bài đăng."
           }, status=status.HTTP_404_NOT_FOUND) 
        
        # Tổng số bài đăng
        total_rentalpost = sum(stat["total_rental_posts"] for stat in stats)

        results = []
        for stat in stats:
            results.append({
                "owner_id": stat['user_id'],
                "total_rental_posts": stat["total_rental_posts"]
            })
            
        total_owner = stats.count()
        
        return Response({
            "success": True,
            "message": "Thống kê số bài đăng thành công.",
            "total_owner": total_owner,
            "total_rentalposts": total_rentalpost, 
            "results": results
        }, status=status.HTTP_200_OK)
        
# API chủ bài đăng thống kê lượt đánh giá
class OwnerStatAPIViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def stat_review(self, request, *args, **kwargs):
        if request.user.role != 'owner':
            return Response({
                                "success": False,
                                "message": "Permission denied.",
                            }, status=status.HTTP_403_FORBIDDEN)
        
        # Lấy bài đăng của người dùng hiện tại
        posts = RentalPost.objects.filter(user=request.user)
                
        if not posts.exists():
            return Response({"success": False,
                             "message": "Không tìm thấy bài đăng."
                            }, 
                            status=status.HTTP_404_NOT_FOUND)
            
        post_ids = posts.values_list("id", flat=True)
        
        stats = (
            Review.objects.filter(rental_post_id__in=post_ids) 
            .values("rental_post_id")
            .annotate(
                avg_rating=Avg("rating"),
                total_reviews=Count("id")
            )
            # .order_by("-total_reviews")        
        )
        
        if not stats:
            return Response({
               "success": False,
               "message": "Không có bài đăng nào có review."
           }, status=status.HTTP_404_NOT_FOUND) 
        
        stats_dict = {s["rental_post_id"]: s for s in stats}
        
        results = []
        for post in posts:
            stat = stats_dict.get(post.id)
            avg = round(float(stat["avg_rating"]), 2) if stat else 0
            total = stat["total_reviews"] if stat else 0

            results.append({
                "post_id": post.id,
                "title": post.title,
                "avg_rating": avg,
                "total_reviews": total
            })
        
        return Response({
            "success": True,
            "message": "Thống kê lượt đánh giá thành công.",
            "results": results
        }, status=status.HTTP_200_OK)
        
#---------------------------------------------------------------------------------------------------#
# Api lấy thông tin người dùng theo id
class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Bất kỳ ai

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        try:
            user = self.get_queryset().get(id=user_id)
            serializer = self.get_serializer(user)
            return Response({
                "success": True,
                "message": "Lấy thông tin người dùng thành công.",
                "user": serializer.data
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({
                "success": False,
                "message": "Người dùng không tồn tại."
            }, status=status.HTTP_404_NOT_FOUND)
            
            
#---------------------------------------------------------------------------------------------------#
# API lấy 10 review hàng đầu trong trang cá nhân của tôi
class MyLatestReviewsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Lấy 10 review mới nhất của người dùng hiện tại"""
        # Sắp xếp theo rating, lấy 10 review mới nhất
        user = request.user
        if user.role == 'owner':
            reviews = Review.objects.filter(rental_post__user=user).exclude(user=user).order_by('-rating', '-time')[:10]
        else:
            reviews = Review.objects.filter(user=user).order_by('-rating', '-time')[:10]
        serializer = ReviewSerializer(reviews, many=True)
        return Response({
            "success": True,
            "message": "Lấy danh sách review thành công.",
            "reviews": serializer.data
        }, status=status.HTTP_200_OK)   



#---------------------------------------------------------------------------------------------------#
# API lấy 10 review của người dùng khác
class UserLatestReviewsAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, user_id):
        """Lấy 10 review của người dùng khác"""
        target_user = get_object_or_404(User, id=user_id)
        user = User.objects.filter(id=user_id).first()
        if user.role == 'owner':
        # Lấy các review của người khác viết cho bài đăng mà user là chủ
            reviews = Review.objects.filter(rental_post__user=user).exclude(user=user).order_by('-rating', '-time')[:10]
        else:
            # Người thường: lấy review mà chính họ viết
            reviews = Review.objects.filter(user=user).order_by('-rating', '-time')[:10]
        
        return Response({
            "success": True,
            "message": "Lấy danh sách review thành công.",
            "reviews": ReviewSerializer(reviews, many=True).data
        }, status=status.HTTP_200_OK)
        
# API thống kê số lượng người dùng đang đăng nhập

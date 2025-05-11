from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout, get_user_model
from django.utils import timezone
from django.utils.dateparse import parse_date
from django.db.models import Count

from rest_framework import generics, serializers, status, permissions, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.views import APIView
from user.models import User, OwnerRequest
from .serializers import UserSerializer, RegisterSerializer, CustomTokenObtainPairSerializer, GoogleLoginSerializer, OwnerRequestSerializer, UpdateUserSerializer 
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny, IsAuthenticatedOrReadOnly

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

# Api admin lấy danh sách user
class UserListCreateAPIViewSet(viewsets.ModelViewSet):
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
# Xử lý ảnh: xóa sau khi duyệt
def delete_image_file(image_field):
    if image_field and os.path.isfile(image_field.path):
        os.remove(image_field.path)

# API tạo yêu cầu thành Owner
class OwnerRequestViewSet(viewsets.ModelViewSet):
    queryset = OwnerRequest.objects.all()
    serializer_class = OwnerRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OwnerRequest.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        existing_request = OwnerRequest.objects.filter(user=user).first()

        if existing_request:
            if existing_request.status == 'pending':
                return Response({
                    "success": False,
                    "message": "Yêu cầu đang chờ xử lý."
                }, status=status.HTTP_400_BAD_REQUEST)
            elif existing_request.status == 'approved':
                return Response({
                    "success": False,
                    "message": "Bạn đã được xác minh là chủ phòng."
                }, status=status.HTTP_400_BAD_REQUEST)
            elif existing_request.status == 'rejected':
                cooldown_days = 3
                if existing_request.reviewed_at and timezone.now() < existing_request.reviewed_at + timedelta(days=cooldown_days):
                    remaining = (existing_request.reviewed_at + timedelta(days=cooldown_days)) - timezone.now()
                    return Response({
                        "success": False,
                        "message": f"Bạn cần chờ thêm {remaining.days} ngày và {remaining.seconds // 3600} giờ trước khi gửi lại yêu cầu."
                    }, status=status.HTTP_400_BAD_REQUEST)
                    
                # Cho phép gửi lại -> cập nhật yêu cầu cũ
                serializer = self.get_serializer(existing_request, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save(status='pending', reviewed_at=None, rejection_reason=None)
                return Response({
                    "success": True,
                    "message": "Yêu cầu đã được gửi lại.",
                    "user": UserSerializer(user).data
                }, status=status.HTTP_200_OK)
        
        # Nếu chưa từng gửi yêu cầu
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response({
            "success": True,
            "message": "Yêu cầu đã được gửi thành công.",
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], url_path='my-request')
    def my_request(self, request):
        user = request.user
        try:
            owner_request = OwnerRequest.objects.get(user=user)
            serializer = self.get_serializer(owner_request)
            return Response({
                "success": True,
                "message": "Lấy thông tin yêu cầu thành công.",
                "request": serializer.data
            }, status=status.HTTP_200_OK)
        except OwnerRequest.DoesNotExist:
            return Response({
                "success": False,
                "message": "Bạn chưa gửi yêu cầu nào."
            }, status=status.HTTP_404_NOT_FOUND)
        
class AdminRequestViewSet(viewsets.ModelViewSet):
    queryset = OwnerRequest.objects.all()
    serializer_class = OwnerRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return OwnerRequest.objects.all()

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser], url_path='list-requests')
    def get_list(self, request):
        # Lấy danh sách yêu cầu chủ phòng
        if not request.user.is_superuser and request.user.role != 'admin':
            return Response({"success": False, 
                             "message": "Permission denied."
                            }, 
                            status=status.HTTP_403_FORBIDDEN)
        
        owner_requests = OwnerRequest.objects.all()
        serializer = self.get_serializer(owner_requests, many=True)
        return Response({
            "success": True,
            "message": "Lấy danh sách yêu cầu thành công.",
            "requests": serializer.data
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def approve(self, request, pk=None):
        owner_request = self.get_object()
        owner_request.status = 'approved'
        owner_request.reviewed_at = timezone.now()
        owner_request.save()

        # Cập nhật role user
        owner_request.user.role = 'owner'
        owner_request.user.save()
        
        # Xóa ảnh
        delete_image_file(owner_request.image_front_cccd)
        delete_image_file(owner_request.image_back_cccd)

        owner_request.image_front_cccd.delete(save=True)
        owner_request.image_back_cccd.delete(save=True)

        return Response({
            "success": True,
            "message": "Yêu cầu đã được duyệt.",
            "user": UserSerializer(owner_request.user).data
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reject(self, request, pk=None):
        owner_request = self.get_object()
        reason = request.data.get('reason')
        if not reason:
            return Response({
                "success": False,
                "message": "Lý do từ chối là bắt buộc."
            }, status=status.HTTP_400_BAD_REQUEST)

        owner_request.status = 'rejected'
        owner_request.reviewed_at = timezone.now()
        owner_request.rejection_reason = reason
        owner_request.save()

        # Xóa ảnh
        delete_image_file(owner_request.image_front_cccd)
        delete_image_file(owner_request.image_back_cccd)

        owner_request.image_front_cccd.delete(save=True)
        owner_request.image_back_cccd.delete(save=True)

        return Response({
            "success": True,
            "message": "Yêu cầu đã bị từ chối.",
            "user": UserSerializer(owner_request.user).data
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
            reviews = Review.objects.filter(rental_post__owner=user).exclude(user=user).order_by('-rating', '-time')[:10]
        else:
            reviews = Review.objects.filter(user=user).order_by('-rating', '-time')[:10]
        serializer = ReviewSerializer(reviews, many=True)
        return Response({
            "success": True,
            "message": "Lấy danh sách review thành công.",
            "reviews": serializer.data
        }, status=status.HTTP_200_OK)   

# API lấy 10 review của người dùng khác
class UserLatestReviewsAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, user_id):
        """Lấy 10 review của người dùng khác"""
        target_user = get_object_or_404(User, id=user_id)
        user = User.objects.filter(id=user_id).first()
        if user.role == 'owner':
        # Lấy các review của người khác viết cho bài đăng mà user là chủ
            reviews = Review.objects.filter(rental_post__owner=user).exclude(user=user).order_by('-rating', '-time')[:10]
        else:
            # Người thường: lấy review mà chính họ viết
            reviews = Review.objects.filter(user=user).order_by('-rating', '-time')[:10]
        
        return Response({
            "success": True,
            "message": "Lấy danh sách review thành công.",
            "reviews": ReviewSerializer(reviews, many=True).data
        }, status=status.HTTP_200_OK)
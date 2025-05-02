from django.urls import path, include
from .views import UserListCreateAPIViewSet, UserRetrieveUpdateDestroyAPIView, RegisterAPIView, GoogleLoginView, VerifyEmailView, OwnerRequestViewSet
from .views import CustomTokenObtainPairView

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'owner-requests', OwnerRequestViewSet, basename='owner-request')

router_admin = DefaultRouter()
router_admin.register(r'admin-requests', UserListCreateAPIViewSet, basename='admin-request')

urlpatterns = [
    path('admin/', include(router_admin.urls)), # api admin quản lý người dùng
    path('me', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'), # api người dùng xem, cập nhật, xóa tài khoản của mình
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), # api đăng nhập
    path('register', RegisterAPIView.as_view(), name ='register' ), # api đăng ký 
    path('login/google', GoogleLoginView.as_view(), name='google-login'), # api đăng nhập bằng google
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'), # api xác thực email
    path('', include(router.urls)), # api người dùng gửi yêu cầu làm chủ nhà
]


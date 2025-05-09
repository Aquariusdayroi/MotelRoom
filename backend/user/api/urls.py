from django.urls import path, include
from .views import UserRetrieveUpdateDestroyAPIView, RegisterAPIView, GoogleLoginView, VerifyEmailView, OwnerRequestViewSet, AdminRequestViewSet
from .views import CustomTokenObtainPairView, LogoutView
from rental_post.api.views import RentalPostFavoriteListAPIView

from rest_framework.routers import DefaultRouter

owner_router = DefaultRouter()
owner_router.register(r'owner-requests', OwnerRequestViewSet, basename='owner-request')

admin_router = DefaultRouter()
admin_router.register(r'owner-requests', AdminRequestViewSet, basename='admin-request')



urlpatterns = [
    path('me', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'), # api người dùng xem, cập nhật, xóa tài khoản của mình
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), # api đăng nhập
    path('register', RegisterAPIView.as_view(), name ='register' ), # api đăng ký 
    path('login/google', GoogleLoginView.as_view(), name='google-login'), # api đăng nhập bằng google
    path('logout/', LogoutView.as_view(), name='logout'), #Api logout
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'), # api xác thực email
    path('', include(owner_router.urls)), # api người dùng gửi yêu cầu làm chủ nhà
    path('admin/', include(admin_router.urls)), # api admin duyệt yêu cầu làm chủ nhà
    path('my-favorite/', RentalPostFavoriteListAPIView.as_view(), name = 'my-favorite'), #api lấy danh sách bài đăng người dùng yêu thích
]


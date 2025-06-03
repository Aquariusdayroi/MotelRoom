from django.urls import path, include

from .views import UserRetrieveUpdateDestroyAPIView, RegisterAPIView, GoogleLoginView, VerifyEmailView , UserDetailAPIView, OwnerRequestAdminAPIViewSet, OwnerCountByDateAPIView, UserCountByDateAPIView
from .views import OwnerRequestAPIViewSet, OwnerRequestAPIViewSet, UserLatestReviewsAPIView, MyLatestReviewsAPIView
from .views import CustomTokenObtainPairView, LogoutView, PasswordResetRequestAPIView, PasswordResetConfirmAPIView
from rental_post.api.views import RentalPostFavoriteListAPIView

from rest_framework.routers import DefaultRouter

router_owner_request = DefaultRouter()
router_owner_request.register(r'owner-requests', OwnerRequestAPIViewSet, basename='owner-request')

router_admin_request = DefaultRouter()
router_admin_request.register(r'owner-requests', OwnerRequestAdminAPIViewSet, basename='admin-request')

urlpatterns = [
    path('me', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'), # api người dùng xem, cập nhật, xóa tài khoản của mình
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), # api đăng nhập
    path('register', RegisterAPIView.as_view(), name ='register' ), # api đăng ký 
    path('login/google', GoogleLoginView.as_view(), name='google-login'), # api đăng nhập bằng google
    path('logout/', LogoutView.as_view(), name='logout'), #Api logout
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'), # api xác thực email
    path('', include(router_owner_request.urls)),  # người dùng gửi yêu cầu đăng lý làm chủ nhà 
    path('admin/', include(router_admin_request.urls)), 
    path('my-favorite/', RentalPostFavoriteListAPIView.as_view(), name = 'my-favorite'), #api lấy danh sách bài đăng người dùng yêu thích
    path('user-info/<int:user_id>/', UserDetailAPIView.as_view(), name='user-info'), # api lấy thông tin người dùng khác
    path('user-info/<int:user_id>/reviews/', UserLatestReviewsAPIView.as_view(), name='user-reviews'), # api lấy danh sách đánh giá của người dùng khác
    path('user-info/my-reviews/', MyLatestReviewsAPIView.as_view(), name='my-reviews'), # api lấy danh sách đánh giá của người dùng hiện tại
    path('admin/owner-count/', OwnerCountByDateAPIView.as_view(), name='owner-count'), # api lấy số lượng owner đăng ký theo ngày tháng năm
    path('admin/user-count/', UserCountByDateAPIView.as_view(), name='user-count'), # api lấy số lượng user đăng ký theo ngày tháng năm
    path('password-reset/', PasswordResetRequestAPIView.as_view(), name='password-reset'), #api khôi phục mật khẩu
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmAPIView.as_view(), name='password-reset-confirm'), #api xác nhận khôi phục mật khẩu
]


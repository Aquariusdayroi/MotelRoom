from django.urls import path
from .views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView, RegisterAPIView, GoogleLoginView, VerifyEmailView


from .views import CustomTokenObtainPairView

urlpatterns = [
    path('get_all', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('<int:pk>', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), # api đăng nhập
    path('register', RegisterAPIView.as_view(), name = 'register' ), # api đăng ký 
    path('login/google', GoogleLoginView.as_view(), name='google-login'), # api đăng nhập bằng google
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'),
]


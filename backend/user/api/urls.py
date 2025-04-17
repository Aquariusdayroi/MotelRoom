from django.urls import path
from .views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView, RegisterAPIView


from .views import CustomTokenObtainPairView, home, logout_view

urlpatterns = [
    path('get_all', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('<int:pk>', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), # api Đăng nhập
    path('register', RegisterAPIView.as_view(), name = 'register' ), # api đăng ký 
    path('', home),
    path('logout', logout_view),
]


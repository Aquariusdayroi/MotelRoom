from django.urls import path
from .views import AddFavoriteAPIView, DeleteFavoriteAPIView

urlpatterns = [
    path('add/<int:post_id>/', AddFavoriteAPIView.as_view(), name='add-favorite-rentalpost'), #Api thêm bài đăng yêu thích
    path('delete/<int:post_id>/', DeleteFavoriteAPIView.as_view(), name='delete-favorite-rentalpost'), #Api xóa bài đăng yêu thích
]
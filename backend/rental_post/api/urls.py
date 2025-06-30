from django.urls import path
from . import views

urlpatterns = [
    path('my-posts/', views.RentalPostListCreateAPIView.as_view(), name='rentalpost-list-create'),
    path('my-posts/top-views/', views.TopViewedPostsAPIView.as_view(), name='rentalpost-top5-views'),
    path('my-posts/<int:id>/', views.RentalPostDetailUpdateDeleteAPIView.as_view(), name='rentalpost-detail-update-delete'),
    path('my-posts/search/', views.MyRentalPostSearchKeyWordAPIView.as_view(), name='my-rentalpost-search'),
    path('', views.RentalPostListAPIView.as_view(), name= 'rentalpost-list'),
    path('<int:id>/', views.RentalPostDetailAPIView.as_view(), name= 'rentalpost-detail'),
    path('by-user/<int:user_id>/', views.RentalPostListByUserAPIView.as_view(), name= 'rentalpost-by-user'),
    path('search/', views.RentalPostSearchAPIView.as_view(), name= 'rentalpost-search'),
    path('<int:rentalpost_id>/user-info/', views.RentalPostUserInfoAPIView.as_view(), name='rentalpost-user-info'),
    path('<int:id>/delete/', views.RentalPostAdminDeleteAPIView.as_view(), name='rentalpost-delete'),
    # path('my')
]
from django.urls import path
from . import views

urlpatterns = [
    path('my-posts/', views.RentalPostListCreateAPIView.as_view(), name='rentalpost-list-create'),
    path('my-posts/<int:id>/', views.RentalPostDetailUpdateDeleteAPIView.as_view(), name='rentalpost-detail-update-delete'),
    path('', views.RentalPostListAPIView.as_view(), name= 'rentalpost-list'),
    path('search/', views.RentalPostSearchAPIView.as_view(), name= 'rentalpost-search'),
    # path('my')
]
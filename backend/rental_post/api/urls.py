from django.urls import path
from . import views

urlpatterns = [
    path('my-posts/', views.RentalPostListCreateAPIView.as_view(), name='rentalpost-list-create'),
    path('my-posts/<int:id>/', views.RentalPostDetailUpdateDeleteAPIView.as_view(), name='rentalpost-detail-update-delete'),
    path('post/', views.RentalPostSearchAPIView.as_view(), name= 'rentalpost-list'),
    # path('my')
]
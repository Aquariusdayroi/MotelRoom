from .views import DistrictListCreateAPIView, DistrictDetailRetrieveUpdateDestroyAPIView
from django.urls import path
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('by-city/<int:city_id>/get_all/', DistrictListCreateAPIView.as_view(), name='get_all_district'),
    path('by-city/<int:city_id>/get/<int:id>/', DistrictDetailRetrieveUpdateDestroyAPIView.as_view(), name='get_district_id'),
]

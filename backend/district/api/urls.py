from django.urls import path
from .views import DistrictListAPIView, DistrictDetailAPIView, DistrictByCityAPIView

urlpatterns = [
    path('get-all/', DistrictListAPIView.as_view(), name='district-list'),
    path('<int:id>/', DistrictDetailAPIView.as_view(), name='district-detail'),
    path('by-city/<int:city_id>/', DistrictByCityAPIView.as_view(), name='district-by-city'),
]

from django.urls import path
from .views import CityListAPIView, CityDetailAPIView


urlpatterns = [
    path('get_all/', CityListAPIView.as_view(), name='get_all_city'),
    path('<int:id>/', CityDetailAPIView.as_view(), name='city-detail'),
]


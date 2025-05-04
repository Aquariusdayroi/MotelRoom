from django.urls import path
from .views import CityListCreateAPIView, CityDetailRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('get_all/', CityListCreateAPIView.as_view(), name='get_all_city'),
    path("get/<int:id>/", CityDetailRetrieveUpdateDestroyAPIView.as_view(), name='get_city_id'),
]


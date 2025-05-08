from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageViewSet

router = DefaultRouter()
router.register(r'request', ImageViewSet, basename='image')

urlpatterns = [
    path('', include(router.urls)),
]

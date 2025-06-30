"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from rest_framework.routers import DefaultRouter

from user.api.views import AdminManagerUserAPIViewSet, OwnerRequestAdminAPIViewSet, AdminStatsRentalPostAPIViewSet, \
                        OwnerStatAPIViewSet

router_admin = DefaultRouter()
router_admin.register(r'requests', AdminManagerUserAPIViewSet, basename='admin-request')

router_admin_check_request = DefaultRouter()
router_admin_check_request.register(r'requests', OwnerRequestAdminAPIViewSet, basename='owner-requests-admin')

router_admin_rentalpost = DefaultRouter()
router_admin_rentalpost.register(r'requests', AdminStatsRentalPostAPIViewSet, basename='rental-posts-admin')

router_owner = DefaultRouter()
router_owner.register(r'requests', OwnerStatAPIViewSet, basename='owner-manager')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('city/api/', include('city.api.urls')),
    path('district/api/', include('district.api.urls')),
    path('user/api/', include('user.api.urls')), #api liên quan user 
    path('user-admin/api/', include(router_admin.urls)), # api admin quản lý người dùng
    path('rental-post-admin/api/', include(router_admin_rentalpost.urls)), # api admin thống kê số lượng bài đăng
    path('owner-requests-admin/', include(router_admin_check_request.urls)),  # api admin xem danh sách, duyệt hoặc từ chối yêu cầu
    path('rental_post/api/', include('rental_post.api.urls')), #api liên quan rental post
    path('rental_post/api/', include('review.api.urls')), #api liên quan review
    path('owner/api/', include(router_owner.urls)), #api owner thống kê thông tin đến bài đăng
    path('images/api/', include('image.api.urls')), #api liên quan đến image
    path('favorite/api/', include('favorite.api.url')), #api liên quan đến yêu thích
    path('chat/api/', include('chat.api.urls')), #api liên quan đến chat
    path('notification/api/', include('notification.api.urls')), #api liên quan đến thông báo
] 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
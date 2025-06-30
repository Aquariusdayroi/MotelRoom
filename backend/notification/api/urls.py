from notification.api import views
from django.urls import path

urlpatterns = [
    path('all/', views.NotificationListView.as_view(), name='notification-list'),
    path('<int:id>/', views.NotificationReadDeleteView.as_view(), name='notification-read-delete'),
]
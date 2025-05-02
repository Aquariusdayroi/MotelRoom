from django.urls import path
from review.api.views import ReviewListCreateAPIView, ReviewDetailAPIView

urlpatterns = [
    path('by-posts/<int:post_id>/reviews/', ReviewListCreateAPIView.as_view(), name='review-list-create'),
    path('by-posts/<int:post_id>/reviews/<int:id>/', ReviewDetailAPIView.as_view(), name='review-detail'),
]

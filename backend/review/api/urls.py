from django.urls import path
from review.api.views import ReviewListCreateAPIView, ReviewDetailAPIView, UserReviewAPIView, ReviewCountAPIView

urlpatterns = [
    path('by-posts/<int:post_id>/reviews/', ReviewListCreateAPIView.as_view(), name='review-list-create'),
    path('by-posts/<int:post_id>/reviews/static/', ReviewCountAPIView.as_view(), name='review-static'),
    path('by-posts/<int:post_id>/reviews/<int:id>/', ReviewDetailAPIView.as_view(), name='review-detail'),
    path('by-posts/<int:post_id>/reviews/my-review/', UserReviewAPIView.as_view(), name='user-review-list-create'),
]

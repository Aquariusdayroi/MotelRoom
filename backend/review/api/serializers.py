from rest_framework import serializers
from review.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rental_post', 'user', 'rating', 'comment', 'time']
        read_only_fields = ['id', 'user', 'time', 'rental_post']

from rest_framework import serializers
from review.models import Review
from user.models import User

class ReviewSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    fullname = serializers.CharField(source='user.fullname', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'rental_post', 'user', 'fullname', 'avatar', 'rating', 'comment', 'time']
        read_only_fields = ['id', 'user', 'time', 'rental_post']

    def get_avatar(self, obj):
        # Truy cập avatar của user từ đối tượng Review
        return obj.user.avatar.url if obj.user.avatar else None


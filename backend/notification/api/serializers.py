from rest_framework import serializers
from notification.models import Notification
from user.models import User
from rental_post.api.serializers import UserForRentalPostSerializer

class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False,
        allow_null=True
    )
    actor = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'user', 'actor', 'title', 'message', 'data', 'is_read', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_actor(self, obj):
        return UserForRentalPostSerializer(obj.actor, context=self.context).data

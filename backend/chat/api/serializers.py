from rest_framework import serializers


from chat.models import Conversation, Message, MessageMedia
from user.models import User


class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'fullname', 'email', 'avatar']

class ConversationSerializer(serializers.ModelSerializer):
    user_one = UserSimpleSerializer(read_only=True)
    user_two = UserSimpleSerializer(read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'avatar', 'user_one', 'user_two', 'last_message','created_at']

    def get_last_message(self, obj):
        last_msg = Message.objects.filter(conversation=obj).order_by('-create_at').first()
        if last_msg:
            return {'content': last_msg.content, 'create_at': last_msg.create_at}
        return None

class MessageMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageMedia
        fields = ['image', 'media_type']

class MessageSerializer(serializers.ModelSerializer):
    media = MessageMediaSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'status', 'create_at', 'media']

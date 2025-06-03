from django.db import models
from user.models import User



# Create your models here.
class Conversation(models.Model):
    user_one = models.ForeignKey(User, related_name='conversations_one', on_delete=models.CASCADE)
    user_two = models.ForeignKey(User, related_name='conversations_two', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)

    unique_together = [
            ('user_one', 'user_two'),
            ('user_two', 'user_one'),  
        ]
    def __str__(self):
        return f"Conversation between {self.user_one} and {self.user_two}"
    
class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)  
    status = models.CharField(max_length=20, choices=[('sent', 'Sent'), ('delivered', 'Delivered'), ('read', 'Read')], default='sent')
    create_at = models.DateTimeField(auto_now_add=True)


class MessageMedia(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='media')
    image = models.ImageField(upload_to='message_media/')
    media_type = models.CharField(max_length=10, choices=[('image', 'Image')], default='image')
from django.contrib import admin
from .models import Conversation, MessageMedia, Message
# Register your models here.

admin.site.register(Conversation)
admin.site.register(MessageMedia)
admin.site.register(Message)
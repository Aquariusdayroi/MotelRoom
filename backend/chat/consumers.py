import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Conversation, Message, User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope['user']
        if user.is_anonymous or not user.is_authenticated:
            await self.close(code=4001, reason="Unauthorized")
            return

        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.room_group_name = f'chat_{self.conversation_id}'

        try:
            conversation = await database_sync_to_async(Conversation.objects.get)(id=self.conversation_id)
        except Conversation.DoesNotExist:
            await self.close(code=4002, reason="Conversation not found")
            return

        try:
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        except Exception as e:
            await self.close(code=4003, reason="Failed to join group")
            return

        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get('type') == 'ping':
            await self.send(text_data=json.dumps({'type': 'pong'}))
            return

        message = data['message']
        sender_id = data['sender_id']

        msg_obj = await self.save_message(sender_id, self.conversation_id, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'id': msg_obj.id,
                'message': message,
                'sender_id': sender_id,
                'create_at': str(msg_obj.create_at),
                'status': msg_obj.status,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'id': event['id'],
            'content': event['message'],
            'sender': event['sender_id'],
            'create_at': event['create_at'],
            'status': event['status'],
        }, ensure_ascii=False))

    @database_sync_to_async
    def save_message(self, sender_id, conversation_id, message):
        sender = User.objects.get(id=sender_id)
        conversation = Conversation.objects.get(id=conversation_id)
        return Message.objects.create(
            conversation=conversation,
            sender=sender,
            content=message,
        )
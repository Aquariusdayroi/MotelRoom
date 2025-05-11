import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Conversation, Message, User
from chat.online_users import online_users
from django.db.models import Q
from asgiref.sync import sync_to_async

@sync_to_async
def get_friends_or_chat_users(user):
    return list(Conversation.objects.filter(
        Q(user_one_id=user.id) | Q(user_two_id=user.id)
    ).values_list('id', flat=True))

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
        
        online_users[user.id] = self.channel_name
        await self.accept()
        await self.broadcast_online_status(True) 

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            user = self.scope["user"]
            online_users.pop(user.id, None)
            await self.broadcast_online_status(False)   # Thông báo offline
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    # Nhận và gửi data  chat đến các user trong kenh và ping-pong
    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get('type') == 'ping':
            await self.send(text_data=json.dumps({'type': 'pong'}))
            return
        
        if data.get("type") == "check_online":
            target_user_id = data["target_user_id"]
            is_online = target_user_id in online_users
            await self.send(text_data=json.dumps({
                "type": "online_status",
                "user_id": target_user_id,
                "online": is_online
            }))
            return
         
        if data.get("type") == "read_message": 
            message_id = data["message_id"]
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "read_status",
                    "message_id": message_id
                }
            )
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


    #Data dạng chat
    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'id': event['id'],
            'content': event['message'],
            'sender': event['sender_id'],
            'create_at': event['create_at'],
            'status': event['status'],
        }, ensure_ascii=False))

    #Data dạng read_mesage
    async def read_status(self, event):
        print('he')
        await self.send(text_data=json.dumps({
            "type": "read_status",
            "message_id": event["message_id"]
        }))

    #Data dạng status
    async def online_status(self, event):
        await self.send(text_data=json.dumps({
            "type": "online_status",
            "user_id": event["user_id"],
            "online": event["online"]
        }))

    #Gửi data custom đến các user trong kênh với user
    async def broadcast_online_status(self, is_online):
        # Lấy danh sách user cần được thông báo
        user = self.scope['user']
        related_user_ids = await get_friends_or_chat_users(user)  # Bạn cần implement
        
        for uid in related_user_ids:
            await self.channel_layer.group_send(
                f"chat_{uid}",
                {
                    "type": "online_status",
                    "user_id": user.id,
                    "online": is_online
                }
            )



    @database_sync_to_async
    def save_message(self, sender_id, conversation_id, message):
        sender = User.objects.get(id=sender_id)
        conversation = Conversation.objects.get(id=conversation_id)
        return Message.objects.create(
            conversation=conversation,
            sender=sender,
            content=message,
        )
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

        self.conversation_ids = await get_friends_or_chat_users(user)
        self.room_group_names = []
        
        for conversation_id in self.conversation_ids:
            room_group_name = f'chat_{conversation_id}'
            # Kiểm tra tồn tại hội thoại
            try:
                conversation = await database_sync_to_async(Conversation.objects.get)(id=conversation_id)
            except Conversation.DoesNotExist:
                print('Không tìm thấy cuộc hoại thoại')
                continue  

            # Thêm người dùng vào group
            try:
                await self.channel_layer.group_add(room_group_name, self.channel_name)
                self.room_group_names.append(room_group_name)
            except Exception as e:
                print(e)
                continue  # có thể log lỗi nếu muốn

        # Đăng ký người dùng online
        online_users[user.id] = self.channel_name

        await self.accept() 
        await self.broadcast_online_status(True)

    async def disconnect(self, close_code):
        for room_group_name in getattr(self, 'room_group_names', []):
            await self.channel_layer.group_discard(room_group_name, self.channel_name)
        
        user = self.scope["user"]
        online_users.pop(user.id, None)
        await self.broadcast_online_status(False)   # Thông báo offline


    # Nhận và gửi data  chat đến các user trong kenh và ping-pong
    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get('type') == 'ping':
            await self.send(text_data=json.dumps({'type': 'pong'}))
            return
        
        if data.get("type") == "check_online":
            target_user_id = data["target_user_id"]
            is_online = target_user_id in online_users
        
            await self.send(
                text_data=json.dumps(
                    {
                        "type": "online_status",
                        "user_id": target_user_id,
                        "online": is_online
                    }
                )
            )
            return
         
        conversation_id = data['conversation_id']
        room_group_name = f'chat_{conversation_id}'

        
        if data.get("type") == "read_message": 
            message_id = data["message_id"]
            await self.channel_layer.group_send(
                room_group_name,
                {
                    "type": "read_status",
                    "message_id": message_id
                }
            )
            return

        message = data['message']
        sender_id = data['sender_id']

        msg_obj = await self.save_message(sender_id, conversation_id, message)

        await self.channel_layer.group_send(
            room_group_name,
            {
                'type': 'chat_message',
                'conversation_id': conversation_id,
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
            'type': 'chat_message',
            'conversation_id': event['conversation_id'],
            'id': event['id'],
            'content': event['message'],
            'sender': event['sender_id'],
            'create_at': event['create_at'],
            'status': event['status'],
        }, ensure_ascii=False))


    #Data dạng read_mesage
    async def read_status(self, event):
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
        for uid in self.conversation_ids:
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
        conversation.save()
        return Message.objects.create(
            conversation=conversation,
            sender=sender,
            content=message,
        )
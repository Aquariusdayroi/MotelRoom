from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from favorite.models import Favorite
from rental_post.models import RentalPost
from .serializers import FavoriteSerializer

class AddFavoriteAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, post_id): 
        user = request.user
        try: 
            rentalpost = RentalPost.objects.get(pk = post_id)
        except: 
            return Response({
                'status': False,
                'message': 'Bài đăng không tồn tại'
            }, status= status.HTTP_404_NOT_FOUND)
        
        favorite, created = Favorite.objects.get_or_create(
            user = user, 
            rentalpost = rentalpost
        )
        if created: 
            return Response({
                'status': True,
                'message': 'Thêm bài đăng yêu thích thành công.'
            }, status= status.HTTP_201_CREATED)
        else:
            return Response({
                'status': False,
                'message': 'Bài đăng đã nằm trong danh sách yêu thích.'
            }, status= status.HTTP_200_OK)
        



class DeleteFavoriteAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):
        user = request.user
        deleted, _ = Favorite.objects.filter(
            user = user, 
            rentalpost_id = post_id
        ).delete()

        if deleted: 
            return Response({
                'status': True,
                'message': 'Đã xóa bài đăng khỏi danh sách yêu thích.'
            }, status= status.HTTP_204_NO_CONTENT)
        else:
            return Response({
                'status': False,
                'message': 'Bài đăng không nằm trong danh sách yêu thích để xóa.'
            }, status=status.HTTP_404_NOT_FOUND)
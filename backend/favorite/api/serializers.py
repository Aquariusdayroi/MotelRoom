from rest_framework import serializers
from favorite.models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__' 
        read_only_fields = ['id']

from rest_framework import serializers
from rental_post.models import RentalPost
from city.api.serializers import CitySerializer
from district.models import District
from district.api.serializers import DistrictSerializer
from city.models import City
from address.models import Address
from address.api.serializers import AddressSerializer
from image.api.serializers import ImageSerializer

from rest_framework import serializers
from rental_post.models import RentalPost
from address.api.serializers import AddressSerializer

from django.contrib.auth import get_user_model


User = get_user_model()

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserForRentalPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'fullname', 'avatar'] 


class RentalPostSerializer(DynamicFieldsModelSerializer):
    address = AddressSerializer()
    user = serializers.SerializerMethodField()
    images = ImageSerializer(source='image', many=True, read_only=True)
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = RentalPost
        fields = [
            'id', 'user', 'home_type', 'title', 'information_detail',
            'address', 'total_occupancy', 'acreage', 'price', 
            'create_at', 'update_at', 'has_toilet', 'private_rental',
            'has_washing', 'curfew_time', 'images', 'is_favorite',
        ]
        read_only_fields = ('user', 'create_at', 'update_at')

    def get_is_favorite(self, obj):
        favorite_ids = self.context.get('favorite_post_ids', set())
        return obj.id in favorite_ids
    
    
    def get_user(self, obj):
        if self.context.get("expand_user"):
            return UserForRentalPostSerializer(obj.user).data
        return obj.user.id

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address = Address.objects.create(**address_data)
        rental_post = RentalPost.objects.create(address=address, **validated_data)
        return rental_post
    
    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)

        # Cập nhật các trường cơ bản của RentalPost
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Cập nhật địa chỉ nếu có
        if address_data:
            address = instance.address
            if address:
                for attr, value in address_data.items():
                    setattr(address, attr, value)
                address.save()
            else:
                address = Address.objects.create(**address_data)
                instance.address = address

        instance.save()
        return instance




class RentalPostFavoriteSerializer(DynamicFieldsModelSerializer):
    address = AddressSerializer()
    user = serializers.SerializerMethodField()
    images = ImageSerializer(source='image', many=True, read_only=True)
    is_favorite = serializers.BooleanField(default = True)

    class Meta:
        model = RentalPost
        fields = [
            'id', 'user', 'home_type', 'title', 'information_detail',
            'address', 'total_occupancy', 'acreage', 'price', 
            'create_at', 'update_at', 'has_toilet', 'private_rental',
            'has_washing', 'curfew_time', 'images', 'is_favorite',
        ]
        read_only_fields = ('user', 'create_at', 'update_at')
    
    
    def get_user(self, obj):
        if self.context.get("expand_user"):
            return UserForRentalPostSerializer(obj.user).data
        return obj.user.id

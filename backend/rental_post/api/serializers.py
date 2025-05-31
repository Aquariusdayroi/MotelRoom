from rest_framework import serializers
from rental_post.models import RentalPost
from city.api.serializers import CitySerializer
from district.models import District
from district.api.serializers import DistrictSerializer
from city.models import City
from address.models import Address
from address.api.serializers import AddressSerializer, AddressNestedSerializer
from image.api.serializers import ImageSerializer
from image.models import Image
from backend import settings
from django.core import validators
import os

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
        
    def get_avatar(self, obj):
        request = self.context.get('request')
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
        elif obj.avatar:
            return obj.avatar.url
        return None

# class RentalPostSerializer(DynamicFieldsModelSerializer):
#     address = AddressSerializer()
#     user = serializers.SerializerMethodField()
#     images = ImageSerializer(source='image', many=True, read_only=True)
#     is_favorite = serializers.SerializerMethodField()

#     class Meta:
#         model = RentalPost
#         fields = [
#             'id', 'user', 'home_type', 'title', 'information_detail',
#             'address', 'total_occupancy', 'acreage', 'price', 
#             'create_at', 'update_at', 'has_toilet', 'private_rental',
#             'has_washing', 'curfew_time', 'images', 'is_favorite',
#         ]
#         read_only_fields = ('user', 'create_at', 'update_at')

#     def get_is_favorite(self, obj):
#         favorite_ids = self.context.get('favorite_post_ids', set())
#         return obj.id in favorite_ids
    
    
#     def get_user(self, obj):
#         if self.context.get("expand_user"):
#             return UserForRentalPostSerializer(obj.user).data
#         return obj.user.id

#     def create(self, validated_data):
#         address_data = validated_data.pop('address')
#         address = Address.objects.create(**address_data)
#         rental_post = RentalPost.objects.create(address=address, **validated_data)
#         return rental_post
    
#     def update(self, instance, validated_data):
#         address_data = validated_data.pop('address', None)

#         # Cập nhật các trường cơ bản của RentalPost
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)

#         # Cập nhật địa chỉ nếu có
#         if address_data:
#             address = instance.address
#             if address:
#                 for attr, value in address_data.items():
#                     setattr(address, attr, value)
#                 address.save()
#             else:
#                 address = Address.objects.create(**address_data)
#                 instance.address = address

#         instance.save()
#         return instance

class RentalPostSerializer(DynamicFieldsModelSerializer):
    # CHỈ dùng AddressSerializer để đọc (read-only)
    address = AddressNestedSerializer(read_only=True)
    user = serializers.SerializerMethodField()
    fullname = serializers.CharField(source='user.fullname', read_only=True)
    avatar = serializers.ImageField(source='user.avatar', read_only=True)
    images = ImageSerializer(source='image', many=True, read_only=True)
    is_favorite = serializers.SerializerMethodField()

    # Các trường cần để ghi (ghi qua FormData)
    description = serializers.CharField(write_only=True)
    latitude = serializers.CharField(write_only=True, required=False)
    longitude = serializers.CharField(write_only=True, required=False)
    city = serializers.IntegerField(write_only=True)
    district = serializers.IntegerField(write_only=True)

    class Meta:
        model = RentalPost
        fields = [
            'id', 'user', 'fullname', 'avatar', 'home_type', 'title', 'information_detail',
            'address', 'description', 'latitude', 'longitude',
            'city', 'district', 'total_occupancy', 'acreage', 'price',
            'create_at', 'update_at',  'images', 'is_favorite', 'is_public', 'views',

            # Tiện nghi cơ bản
            'has_wifi',
            'has_tv',
            'has_kitchen',
            'has_washing_machine',
            'has_parking',
            'has_fridge',
            'has_air_conditioner',
            'has_attic',
            'has_water_heater',

            # Tiện nghi thêm
            'has_dehumidifier',
            'has_hot_tub',
            'has_balcony',
            'has_elevator',
            'has_microwave',

            # Tiện nghi an toàn
            'has_security_camera',
            'has_first_aid_kit',
            'has_fingerprint_lock',
        ]

        read_only_fields = ('user', 'create_at', 'update_at', 'address', 'is_favorite', 'views')

    def get_is_favorite(self, obj):
        favorite_ids = self.context.get('favorite_post_ids', set())
        return obj.id in favorite_ids
    
    def get_user(self, obj):
        if self.context.get("expand_user"):
            return UserForRentalPostSerializer(obj.user, context=self.context).data
        return obj.user.id

    def create(self, validated_data):
        # Lấy dữ liệu địa chỉ từ validated_data
        description = validated_data.pop('description', None)
        latitude = validated_data.pop('latitude', None)
        longitude = validated_data.pop('longitude', None)
        city_id = validated_data.pop('city', None)
        district_id = validated_data.pop('district', None)
        request = self.context.get('request')
        image_files = request.FILES.getlist('images')

        # Kiểm tra đủ thông tin
        if None in (description, city_id, district_id):
            raise serializers.ValidationError("Thiếu thông tin địa chỉ.")

        try:
            city = City.objects.get(pk=city_id)
            district = District.objects.get(pk=district_id)
        except City.DoesNotExist:
            raise serializers.ValidationError("Thành phố không tồn tại.")
        except District.DoesNotExist:
            raise serializers.ValidationError("Quận/huyện không tồn tại.")

        address = Address.objects.create(
            description=description,
            latitude=latitude,
            longitude=longitude,
            city=city,
            district=district
        )

        # Tạo RentalPost
        rental_post = RentalPost.objects.create(address=address, **validated_data)
        for img in image_files:
            Image.objects.create(rental_post=rental_post, image_url=img)
        return rental_post

    def update(self, instance, validated_data):
        """
        Cập nhật một instance với các validated data.  Chỉ cập nhật
        các trường có trong validated_data.
        """
        print(validated_data)
        address_data = validated_data.pop('address', None) 
        request = self.context.get('request')
        if 'images' in request.FILES:
            new_images = request.FILES.getlist('images')
            validated_data.pop('images', None)
            if new_images is not None:
                instance.image.all().delete()
                print("Deleting old images")
                for image_data in new_images:          
                    print(image_data)
                    Image.objects.create(rental_post=instance, image_url=image_data)

        if address_data is not None: 
            address = instance.address
            if address:
                city_id = address_data.get('city', None)
                district_id = address_data.get('district', None)

                try:
                    if city_id is not None:
                        city = City.objects.get(pk=city_id)
                        address.city = city
                    if district_id is not None:
                        district = District.objects.get(pk=district_id)
                        address.district = district
                    address.save()
                except City.DoesNotExist:
                    raise serializers.ValidationError("Thành phố không tồn tại.")
                except District.DoesNotExist:
                    raise serializers.ValidationError("Quận/huyện không tồn tại.")
            else:
                address_serializer = AddressNestedSerializer(data=address_data)
                if address_serializer.is_valid():
                    new_address = address_serializer.save()
                    instance.address = new_address

        for attr, value in validated_data.items():
            if value == None: 
                continue
            else:
                setattr(instance, attr, value)

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
            'create_at', 'update_at', 'images', 'is_favorite', 'is_public',
        ]
        read_only_fields = ('user', 'create_at', 'update_at')
    
    
    def get_user(self, obj):
        if self.context.get("expand_user"):
            return UserForRentalPostSerializer(obj.user).data
        return obj.user.id
